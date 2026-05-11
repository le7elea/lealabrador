import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeader } from "./Section";
import visitrak from "@/assets/projectVisitrak.png";
import mobile from "@/assets/project-artefacts.png";
import portfolio from "@/assets/projectPortfolio.png";
import coffee from "@/assets/coffee.png";

const projects = [
  {
    title: "VisiTrak",
    desc: "Visitor management system with QR check-in, role-based access, real-time logs and reporting.",
    tech: ["React", "Firebase", "Tailwind", "QR"],
    image: visitrak,
    featured: true,
  },
  {
    title: "ArtéFacts Prototype",
    desc: "End-to-end mobile experience: research, wireframes, hi-fi prototypes and design system.",
    tech: ["Figma", "Prototyping", "Design System"],
    image: mobile,
  },
  {
    title: "Portfolio Website",
    desc: "This very site — built from scratch with motion, glassmorphism and a custom design system.",
    tech: ["React", "Vite", "Framer Motion"],
    image: portfolio,
  },
  {
    title: "L7-Cafe Website",
    desc: "L7-Cafe is a modern café app that streamlines food ordering, table reservations, and customer engagement in one convenient platform.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: coffee,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Selected work"
          title={
            <>
              Projects I'm <span className="text-gradient">proud of</span>
            </>
          }
          description="A snapshot of recent academic, freelance and personal work."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group glass relative overflow-hidden rounded-3xl p-3 transition hover:-translate-y-1.5 hover:border-primary/50 ${p.featured ? "md:col-span-2" : ""}`}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className={`w-full object-cover transition duration-700 group-hover:scale-105 ${p.featured ? "h-72 md:h-96" : "h-60"}`}
                />
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100"
                  style={{ boxShadow: "inset 0 0 60px oklch(0.55 0.28 295 / 0.4)" }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* <div className="mt-5 flex gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-medium hover:bg-primary/20"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground glow-border hover:scale-105 transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live demo
                  </a>
                </div> */}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
