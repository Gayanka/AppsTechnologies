# Mail / SMTP setup

This project supports sending contact form emails via PHPMailer (recommended) or falls back to PHP `mail()`.

Steps to enable secure SMTP sending with PHPMailer:

1. Install Composer (if not already installed): https://getcomposer.org/

2. From the project root run:

```bash
composer require phpmailer/phpmailer
```

This will create `vendor/` and the Composer autoloader used by `assets/mail.php`.

3. Edit `assets/mail_config.php` and set your SMTP credentials and `use_smtp => true`.

4. Ensure your PHP environment has `openssl` enabled (needed for TLS) and the server can connect to your SMTP host/port.

5. For production, avoid committing credentials. Use environment variables and load them in `assets/mail_config.php`.

Troubleshooting:
- If sending fails, check PHP error logs and SMTP provider logs.
- If using a cloud host, ensure outbound SMTP ports are allowed (e.g., 587, 465).
- Consider provider-specific settings (e.g., Google requires app passwords or OAuth).

If you want, I can update `mail_config.php` to load from environment variables and add an example `.env` and a non-committed `.env.example`.
