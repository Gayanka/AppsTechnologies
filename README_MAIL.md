# Mail / SMTP setup

This project supports sending contact form emails via PHPMailer (recommended) or falls back to PHP `mail()`.

Steps to enable secure SMTP sending with PHPMailer:

1. Install Composer (if not already installed): https://getcomposer.org/

2. From the project root run:

```bash
composer require phpmailer/phpmailer league/oauth2-client
```

This will create `vendor/` and the Composer autoloader used by `assets/mail.php`.

3. Edit `assets/mail_config.php` and set your SMTP settings.

- For standard SMTP auth, set `auth_type => 'plain'` and supply `username`/`password`.
- For OAuth2 auth, set `auth_type => 'oauth'`, enable `use_smtp`, and configure the `oauth` block.

4. Ensure your PHP environment has `openssl` enabled (needed for TLS) and the server can connect to your SMTP host/port.

5. For production, avoid committing credentials. The config now reads from environment variables automatically. Create a `.env` file locally (not committed) or set the variables in your hosting panel.

Example environment variables:

```bash
SMTP_USE_SMTP=true
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=tls
SMTP_AUTH_TYPE=plain
SMTP_USERNAME=info@appstechnologies.co.nz
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=no-reply@appstechnologies.co.nz
SMTP_FROM_NAME="Apps Technologies"
SMTP_TO_EMAIL=info@appstechnologies.co.nz
```

For OAuth2:

```bash
SMTP_AUTH_TYPE=oauth
SMTP_OAUTH_CLIENT_ID=your-client-id
SMTP_OAUTH_CLIENT_SECRET=your-client-secret
SMTP_OAUTH_REFRESH_TOKEN=your-refresh-token
SMTP_OAUTH_USER=info@appstechnologies.co.nz
SMTP_OAUTH_SCOPES=https://mail.google.com/
```

Important for cPanel:
- cPanel does support environment variables in some setups, but they are not always available the same way as on a local development machine.
- The most reliable method on cPanel is usually to set the values in a small PHP bootstrap file or use the hosting panel’s application environment feature if available.
- If your host does not expose custom environment variables to PHP, you can still hard-code the values in `assets/mail_config.php` temporarily, or use a `.user.ini`/PHP include approach if your host permits it.

Troubleshooting:
- If sending fails, check PHP error logs and SMTP provider logs.
- If using a cloud host, ensure outbound SMTP ports are allowed (e.g., 587, 465).
- Consider provider-specific settings (e.g., Google requires app passwords or OAuth).

If you want, I can update `mail_config.php` to load from environment variables and add an example `.env` and a non-committed `.env.example`.
