<?php
// Mail configuration.
// Sensitive values are loaded from environment variables when available.

function env($key, $default = '')
{
    $value = getenv($key);
    return $value === false ? $default : $value;
}

$MAIL_CONFIG = [
    // Set to true to use SMTP via PHPMailer.
    'use_smtp'   => filter_var(env('SMTP_USE_SMTP', 'false'), FILTER_VALIDATE_BOOL),

    // SMTP server settings
    'host'       => env('SMTP_HOST', 'smtp.example.com'),
    'port'       => (int) env('SMTP_PORT', '587'),
    'secure'     => env('SMTP_SECURE', 'tls'), // 'tls' or 'ssl' or '' for none

    // Authentication mode: 'plain' or 'oauth'
    'auth_type'  => env('SMTP_AUTH_TYPE', 'plain'),

    // Plain SMTP credentials
    'username'   => env('SMTP_USERNAME', 'smtp-user@example.com'),
    'password'   => env('SMTP_PASSWORD', 'smtp-password'),

    // OAuth2 settings for SMTP authentication
    'oauth' => [
        'client_id'     => env('SMTP_OAUTH_CLIENT_ID', ''),
        'client_secret' => env('SMTP_OAUTH_CLIENT_SECRET', ''),
        'refresh_token' => env('SMTP_OAUTH_REFRESH_TOKEN', ''),
        'user_name'     => env('SMTP_OAUTH_USER', 'info@appstechnologies.co.nz'),
        'redirect_uri'  => env('SMTP_OAUTH_REDIRECT_URI', ''),
        'url_authorize' => env('SMTP_OAUTH_URL_AUTHORIZE', ''),
        'url_access_token' => env('SMTP_OAUTH_URL_ACCESS_TOKEN', ''),
        'url_resource_owner_details' => env('SMTP_OAUTH_URL_RESOURCE_OWNER_DETAILS', ''),
        'scopes'        => array_filter(array_map('trim', explode(',', env('SMTP_OAUTH_SCOPES', '')))),
    ],

    // From address shown on outgoing emails
    'from_email' => env('SMTP_FROM_EMAIL', 'no-reply@appstechnologies.co.nz'),
    'from_name'  => env('SMTP_FROM_NAME', 'Apps Technologies'),
    'smtp_debug' => filter_var(env('SMTP_DEBUG', 'false'), FILTER_VALIDATE_BOOL),

    // Destination/recipient for contact form messages
    'to_email'   => env('SMTP_TO_EMAIL', 'info@appstechnologies.co.nz')
];

?>

