<?php
// Mail configuration — copy and set values for your server.
// For production prefer environment variables and not committing credentials.

$MAIL_CONFIG = [
    // Set to true to use SMTP via PHPMailer. Requires composer install: composer require phpmailer/phpmailer
    'use_smtp'   => false,
    'host'       => 'smtp.example.com',
    'port'       => 587,
    'username'   => 'smtp-user@example.com',
    'password'   => 'smtp-password',
    'secure'     => 'tls', // 'tls' or 'ssl' or '' for none

    // From address shown on outgoing emails
    'from_email' => 'no-reply@appstechnologies.co.nz',
    'from_name'  => 'Apps Technologies',

    // Destination/recipient for contact form messages
    'to_email'   => 'info@appstechnologies.co.nz'
];

// For security: if you prefer environment variables, load them here instead, e.g.
// $MAIL_CONFIG['username'] = getenv('SMTP_USER');

?>
