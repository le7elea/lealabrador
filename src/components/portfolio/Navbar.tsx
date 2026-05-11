import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <a
            href="#home"
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${scrolled ? "glass-strong" : ""}`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground font-bold text-sm glow-border">
              L
            </span>
            <span className="font-display text-sm font-semibold tracking-wide">
              Lea<span className="text-primary">.</span>
            </span>
          </a>
          <nav
            className={`hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex ${scrolled ? "glass-strong" : "glass"}`}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition hover:bg-primary/15 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground glow-border transition hover:scale-105"
          >
            Hire me
          </a>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden rounded-full glass p-2.5"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <motion.div
          className="mx-auto mt-2 h-[2px] max-w-6xl origin-left rounded-full bg-gradient-to-r from-primary via-accent to-primary"
          style={{ scaleX }}
        />
      </motion.header>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="absolute right-0 top-0 h-full w-72 glass-strong p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} className="rounded-full glass p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base hover:bg-primary/15"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-xl bg-primary px-4 py-3 text-center text-primary-foreground glow-border"
              >
                Hire me
              </a>
            </nav>
          </motion.div>
        </div>
      )}
    </>
  );
}
