import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const MIN_SUBMISSION_AGE_MS = 1500;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80),
  email: z.string().trim().email("A valid email is required.").max(120),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters.").max(120),
  message: z.string().trim().min(20, "Message must be at least 20 characters.").max(4000),
  website: z.string().trim().max(0).optional().default(""),
  submittedAt: z.number().int().positive(),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

async function getServerEnv(name: string) {
  const directValue = process.env[name];
  if (directValue) {
    return directValue;
  }

  if (process.env.NODE_ENV === "production") {
    return undefined;
  }

  try {
    const [{ readFile }, path] = await Promise.all([
      import("node:fs/promises"),
      import("node:path"),
    ]);
    const envPath = path.resolve(process.cwd(), ".dev.vars");
    const contents = await readFile(envPath, "utf8");
    const line = contents.split(/\r?\n/).find((entry) => entry.startsWith(`${name}=`));

    return line ? line.slice(name.length + 1).trim() : undefined;
  } catch {
    return undefined;
  }
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const request = getRequest();
    const apiKey = await getServerEnv("RESEND_API_KEY");
    const toEmail = (await getServerEnv("CONTACT_TO_EMAIL")) ?? "leasheilalabrador@gmail.com";
    const configuredFromEmail = await getServerEnv("CONTACT_FROM_EMAIL");
    const originHeader = getRequestHeader("origin");
    const userAgent = getRequestHeader("user-agent") ?? "Unknown";
    const referer = getRequestHeader("referer") ?? "Unknown";
    const requestUrl = new URL(request.url);
    const isLocalRequest = isLocalHost(requestUrl.hostname);
    const fromEmail =
      configuredFromEmail ??
      (isLocalRequest ? "Portfolio Contact <onboarding@resend.dev>" : undefined);

    if (!apiKey) {
      throw new Error("Email sending is not configured yet. Add RESEND_API_KEY on the server.");
    }

    if (!fromEmail) {
      throw new Error(
        "Set CONTACT_FROM_EMAIL to a verified sender address before using the contact form in production.",
      );
    }

    if (originHeader) {
      const origin = new URL(originHeader);
      if (origin.host !== requestUrl.host) {
        throw new Error("Invalid request origin.");
      }
    }

    const submissionAge = Date.now() - data.submittedAt;
    if (data.website || submissionAge < MIN_SUBMISSION_AGE_MS) {
      return { ok: true };
    }

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeSubject = escapeHtml(data.subject);
    const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");
    const safeUserAgent = escapeHtml(userAgent);
    const safeReferer = escapeHtml(referer);
    const escapedReplyTo = encodeURIComponent(data.email);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject: `Portfolio Contact: ${data.subject}`,
        text: [
          "NEW PORTFOLIO CONTACT MESSAGE",
          "",
          `Name    : ${data.name}`,
          `Email   : ${data.email}`,
          `Subject : ${data.subject}`,
          "",
          "Message:",
          data.message,
          "",
          "-----",
          `User-Agent: ${userAgent}`,
          `Referer: ${referer}`,
        ].join("\n"),
        html: `
          <div style="margin:0; padding:32px 16px; background:#f3f4f6; font-family:Arial, Helvetica, sans-serif; color:#111827;">
            <div style="max-width:680px; margin:0 auto;">
              <div style="margin-bottom:16px; text-align:center;">
                <span style="display:inline-block; padding:8px 14px; border-radius:999px; background:#111827; color:#ffffff; font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase;">
                  Portfolio Contact
                </span>
              </div>

              <div style="overflow:hidden; border:1px solid #e5e7eb; border-radius:28px; background:#ffffff; box-shadow:0 24px 60px rgba(15, 23, 42, 0.12);">
                <div style="padding:28px 32px; background:linear-gradient(135deg, #111827 0%, #1f2937 55%, #374151 100%); color:#ffffff;">
                  <p style="margin:0 0 10px; font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#cbd5e1;">
                    New message received
                  </p>
                  <h1 style="margin:0; font-size:28px; line-height:1.2; font-weight:700;">
                    ${safeSubject}
                  </h1>
                  <p style="margin:14px 0 0; font-size:15px; line-height:1.7; color:#e5e7eb;">
                    Someone reached out through your portfolio contact form. Their details and message are organized below.
                  </p>
                </div>

                <div style="padding:28px 32px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate; border-spacing:0 14px; margin:0 0 24px;">
                    <tr>
                      <td width="120" style="font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#6b7280; vertical-align:top;">
                        Name
                      </td>
                      <td style="font-size:15px; color:#111827; font-weight:600;">
                        ${safeName}
                      </td>
                    </tr>
                    <tr>
                      <td width="120" style="font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#6b7280; vertical-align:top;">
                        Email
                      </td>
                      <td style="font-size:15px;">
                        <a href="mailto:${escapedReplyTo}" style="color:#2563eb; text-decoration:none; font-weight:600;">
                          ${safeEmail}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td width="120" style="font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#6b7280; vertical-align:top;">
                        Subject
                      </td>
                      <td style="font-size:15px; color:#111827; font-weight:600;">
                        ${safeSubject}
                      </td>
                    </tr>
                  </table>

                  <div style="border:1px solid #e5e7eb; border-radius:22px; background:#f9fafb; padding:22px 22px 20px;">
                    <p style="margin:0 0 14px; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#6b7280;">
                      Message
                    </p>
                    <div style="font-size:15px; line-height:1.8; color:#1f2937;">
                      ${safeMessage}
                    </div>
                  </div>

                  <div style="margin-top:24px; display:block; border-top:1px solid #e5e7eb; padding-top:18px;">
                    <p style="margin:0 0 8px; font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af;">
                      Delivery details
                    </p>
                    <p style="margin:0 0 6px; font-size:12px; line-height:1.6; color:#6b7280;">
                      <strong style="color:#4b5563;">User-Agent:</strong> ${safeUserAgent}
                    </p>
                    <p style="margin:0; font-size:12px; line-height:1.6; color:#6b7280;">
                      <strong style="color:#4b5563;">Referer:</strong> ${safeReferer}
                    </p>
                  </div>
                </div>
              </div>

              <p style="margin:16px 0 0; text-align:center; font-size:12px; line-height:1.6; color:#9ca3af;">
                Sent automatically from your portfolio contact form.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend error:", errorText);
      throw new Error("The message could not be sent right now. Please try again in a moment.");
    }

    return { ok: true };
  });
