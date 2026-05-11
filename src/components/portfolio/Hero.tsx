import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const ROLES = [
  "Computer Science Graduate",
  "UI/UX Designer",
  "Front-End Developer",
  "Web Developer",
];

function useTyping() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = ROLES[i];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1400);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((n) => (n + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return text;
}

export function Hero() {
  const typed = useTyping();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-5 pt-32 pb-20"
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Available for opportunities &
          collaborations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Hi, I'm <span className="text-gradient glow-text">Lea Sheila</span>
          <br /> Labrador
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex h-8 items-center justify-center font-display text-lg sm:text-xl md:text-2xl"
        >
          <span className="text-muted-foreground">I'm a&nbsp;</span>
          <span className="text-primary glow-text">{typed}</span>
          <span className="ml-1 inline-block h-6 w-[2px] bg-primary animate-blink" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-muted-foreground"
        >
          I craft thoughtful, accessible, and visually striking digital experiences - blending clean
          front-end engineering, with user-centered design that feels effortless to use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-border transition hover:scale-105"
          >
            View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#resume"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition hover:bg-primary/15"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: "https://github.com/le7elea", label: "GitHub" },
            {
              icon: Linkedin,
              href: "https://www.linkedin.com/in/lea-labrador-27b741363/",
              label: "LinkedIn",
            },
            { icon: Mail, href: "mailto:leasheilalabrador@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full glass transition hover:scale-110 hover:bg-primary/20 hover:text-primary"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
