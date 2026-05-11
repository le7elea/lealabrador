import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_24px_oklch(0.6_0.25_295/0.7)]" />
        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lea Sheila Labrador — Designed &amp; built with care.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:lea@example.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full glass transition hover:scale-110 hover:bg-primary/20 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href="#home"
              aria-label="Back to top"
              className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground glow-border transition hover:scale-110"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
