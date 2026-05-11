# Contact Form Email Setup

The contact form is wired to send mail through Resend from the server.

## Local development

Create `lovable-portfolio/.dev.vars` with:

```env
RESEND_API_KEY=your_real_resend_api_key
CONTACT_TO_EMAIL=leasheilalabrador@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

`onboarding@resend.dev` is fine for local testing.

## Production

For production, use a verified domain sender, for example:

```env
CONTACT_FROM_EMAIL=Portfolio Contact <hello@yourdomain.com>
```

Recommended steps:

1. Create a Resend account and generate an API key.
2. Verify your domain in Resend.
3. Add the DNS records Resend gives you.
4. Wait until the domain status is verified.
5. Set `CONTACT_FROM_EMAIL` to an address on that verified domain.
6. Add the same secrets to your deployed environment.

## Cloudflare / Wrangler

Set secrets for deployment:

```powershell
wrangler secret put RESEND_API_KEY
wrangler secret put CONTACT_TO_EMAIL
wrangler secret put CONTACT_FROM_EMAIL
```

## What is included

- Server-side validation
- Hidden honeypot field for simple bot filtering
- Minimum submit time check to reduce instant bot posts
- Plain text and HTML email content
- Reply-to set to the sender's email
