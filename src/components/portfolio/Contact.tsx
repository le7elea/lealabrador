import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Facebook, Send, CheckCircle2, LoaderCircle } from "lucide-react";
import { SectionHeader } from "./Section";
import { sendContactEmail } from "@/lib/contact.functions";

const contactEmail = "leasheilalabrador@gmail.com";

const cards = [
  {
    icon: Mail,
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/lea-labrador",
    href: "https://www.linkedin.com/in/lea-labrador-27b741363/",
  },
  { icon: Github, label: "GitHub", value: "@le7elea", href: "https://github.com/le7elea" },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Lea Labrador",
    href: "https://www.facebook.com/share/17Y2c8WT1T/",
  },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
  submittedAt: number;
};

function createInitialForm(): FormState {
  return {
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
    submittedAt: Date.now(),
  };
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(createInitialForm);
  const messageLength = form.message.trim().length;

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setError("");

    try {
      await sendContactEmail({ data: form });
      setSent(true);
      setForm(createInitialForm());
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while sending your message.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="contact" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Get in touch"
          title={
            <>
              Let's build something <span className="text-gradient">remarkable</span>
            </>
          }
          description="Open to internships, junior roles, freelance and design collaborations."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
            {cards.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex items-center gap-4 rounded-2xl glass p-4 transition hover:-translate-y-0.5 hover:border-primary/50"
                target={c.label === "Email" ? undefined : "_blank"}
                rel={c.label === "Email" ? undefined : "noreferrer"}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary glow-text" />
                <h3 className="font-display text-2xl font-bold">Message sent</h3>
                <p className="text-muted-foreground">
                  Your message was sent successfully. I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-3 inline-flex items-center rounded-full border border-primary/30 px-5 py-2 text-sm text-primary transition hover:bg-primary/10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary">Direct email</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                      Send a project inquiry
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      The form sends straight to my inbox, so include enough context for a useful
                      reply.
                    </p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.2em] ${
                      isSending
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {isSending ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                    {isSending ? "Sending" : "Ready"}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    maxLength={80}
                    value={form.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="you@gmail.com"
                    maxLength={120}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <Field
                  label="Subject"
                  type="text"
                  name="subject"
                  placeholder="Project, role, idea..."
                  className="mt-4"
                  maxLength={120}
                  value={form.subject}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="mt-4">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Message
                    </label>
                    <span className="text-xs text-muted-foreground">{messageLength}/4000</span>
                  </div>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    minLength={20}
                    maxLength={4000}
                    placeholder="Tell me a bit about it..."
                    className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.6_0.25_295/0.25)]"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Share enough detail so I can respond helpfully. Minimum 20 characters.
                  </p>
                </div>
                {error ? (
                  <p className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Replies usually go out within 24 to 48 hours.
                  </p>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-border transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 sm:min-w-44"
                  >
                    {isSending ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        required
        {...props}
        className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.6_0.25_295/0.25)]"
      />
    </div>
  );
}
