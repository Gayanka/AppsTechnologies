<?php

session_start();
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json; charset=utf-8');

// Load optional config
if (file_exists(__DIR__ . '/mail_config.php')) {
    include __DIR__ . '/mail_config.php';
}

// Composer autoload if available (for PHPMailer)
$autoload = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoload)) {
    require $autoload;
}

function json_response($success, $message)
{
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request.');
    }

    // Require AJAX header to reduce CSRF risk from third-party sites
    if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest') {
        throw new Exception('Invalid request source.');
    }

    //honeypot
    if (!empty($_POST['website'])) {
        throw new Exception('Spam detected.');
    }

    //basic rate limiting (session based)
    if (!empty($_SESSION['last_submission']) && time() - $_SESSION['last_submission'] < 15) {
        throw new Exception('Please wait before submitting again.');
    }

    //helper to detect header injection
    function has_header_injection($str)
    {
        return preg_match('/[\r\n]/', $str);
    }

    $name = substr(trim($_POST['name'] ?? ''), 0, 100);
    $email = substr(trim($_POST['email'] ?? ''), 0, 254);
    $subject = substr(trim($_POST['subject'] ?? ''), 0, 150);
    $message = substr(trim($_POST['message'] ?? ''), 0, 5000);

    if ($name === '' || $email === '' || $subject === '' || $message === '') {
        throw new Exception('Please complete all fields.');
    }

    if (has_header_injection($name) || has_header_injection($email) || has_header_injection($subject)) {
        throw new Exception('Invalid input.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Please enter a valid email address.');
    }

    // sanitize message for email body
    $clean_name = filter_var($name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $clean_email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $clean_subject = filter_var($subject, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $clean_message = strip_tags($message);

    $to = $MAIL_CONFIG['to_email'] ?? 'info@appstechnologies.co.nz';

    $emailBody = "Name: {$clean_name}\n\nEmail: {$clean_email}\n\nSubject: {$clean_subject}\n\nMessage:\n{$clean_message}";

    // Attempt to send via PHPMailer SMTP if configured
    $use_smtp = $MAIL_CONFIG['use_smtp'] ?? false;
    if ($use_smtp && class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        $mail = new PHPMailer\\PHPMailer\\PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = $MAIL_CONFIG['host'] ?? '';
            $mail->SMTPAuth = true;
            $mail->Username = $MAIL_CONFIG['username'] ?? '';
            $mail->Password = $MAIL_CONFIG['password'] ?? '';
            $mail->SMTPSecure = $MAIL_CONFIG['secure'] ?? 'tls';
            $mail->Port = $MAIL_CONFIG['port'] ?? 587;

            // Optional: adjust SMTP options for self-signed certs (not recommended for production)
            // $mail->SMTPOptions = [
            //     'ssl' => [
            //         'verify_peer' => false,
            //         'verify_peer_name' => false,
            //         'allow_self_signed' => true
            //     ]
            // ];

            $from_email = $MAIL_CONFIG['from_email'] ?? 'no-reply@appstechnologies.co.nz';
            $from_name = $MAIL_CONFIG['from_name'] ?? 'Apps Technologies';

            $mail->setFrom($from_email, $from_name);
            $mail->addAddress($to);
            $mail->addReplyTo($clean_email, $clean_name);
            $mail->Subject = $clean_subject;
            $mail->Body = $emailBody;
            $mail->AltBody = $emailBody;

            $mail->send();
        } catch (Exception $e) {
            throw new Exception('Mailer Error: ' . $e->getMessage());
        }
    } else {
        // Fallback to PHP mail()
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/plain; charset=utf-8';
        $headers[] = 'From: ' . ($MAIL_CONFIG['from_name'] ?? 'Apps Technologies') . ' <' . ($MAIL_CONFIG['from_email'] ?? 'no-reply@appstechnologies.co.nz') . '>';
        $headers[] = 'Reply-To: ' . $clean_email;
        $headers_str = implode("\r\n", $headers) . "\r\n";

        if (!mail($to, $clean_subject, $emailBody, $headers_str)) {
            throw new Exception('Unable to send your message at this time.');
        }
    }

    // mark submission time
    $_SESSION['last_submission'] = time();

    json_response(true, '✓ Your message has been sent successfully.');
} catch (Exception $e) {
    json_response(false, $e->getMessage());
}
