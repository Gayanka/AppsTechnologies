<?php

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] === 'POST') {

    // Sanitize header values to prevent header injection.
    function sanitize_header($value) {
        $value = trim($value);
        // remove CRLF to prevent header injection
        $value = str_replace(array("\r", "\n"), '', $value);
        // remove any tags
        $value = filter_var($value, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
        return $value;
    }

    // Gather and sanitize input
    $name = isset($_POST['name']) ? sanitize_header($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $subject_raw = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $subject = sanitize_header($subject_raw);
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validate required fields and formats
    if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Basic length limits to avoid abuse
    if (mb_strlen($name) > 100 || mb_strlen($subject) > 150 || mb_strlen($message) > 5000) {
        http_response_code(400);
        echo "One of the fields is too long.";
        exit;
    }

    // Set the recipient email address.
    $recipient = "info@appstechnologies.co.nz";

    // Build a safe email subject for the mail() call.
    $mail_subject = "New contact from $name - $subject";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers safely.
    // Limit characters in display name and remove any unexpected chars.
    $safe_name = preg_replace('/[^a-zA-Z0-9 \-\._]/', '', $name);
    $email_headers = "From: $safe_name <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email.
    if (mail($recipient, $mail_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>
