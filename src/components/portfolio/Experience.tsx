import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, BookOpen } from "lucide-react";
import { SectionHeader } from "./Section";

const items = [
  {
    icon: GraduationCap,
    title: "B.S. in Computer Science",
    org: "Bohol Island State University - Balilihan Campus",
    date: "2022 — 2026",
    desc: "Graduated with a focus on web technologies, HCI and software engineering.",
  },
  {
    icon: Briefcase,
    title: "DICT AI.Deas for Impact 2025",
    org: "Top 4 Finalist, Visionary Innovators (Special Award)",
    date: "2025",
    desc: "Alalay App connects blue-collar workers with employers through a simple and accessible job-matching platform.",
  },
  {
    icon: BookOpen,
    title: "Techstars Weekend Bohol 2025",
    org: "3rd Place Winner",
    date: "2025",
    desc: "Bettr App helps users reduce gambling habits through tools focused on self-control, financial awareness, and healthier daily routines.",
  },
  {
    icon: Award,
    title: "Certifications & Seminars",
    org: "Various",
    date: "2024-2025",
    desc: "Responsive web design, Firebase essentials, accessibility and design thinking.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Journey"
          title={
            <>
              Experience &amp; <span className="text-gradient">Education</span>
            </>
          }
        />

        <div className="relative mt-16 pl-6 sm:pl-10">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent sm:left-4" />
          <div className="space-y-6">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[1.45rem] top-5 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_4px_oklch(0.6_0.27_295/0.6)] sm:-left-[1.95rem]" />
                <div className="glass rounded-2xl p-5 transition hover:border-primary/50">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                      <it.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                        <span className="text-xs text-primary">{it.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{it.org}</p>
                      <p className="mt-2 text-sm text-foreground/80">{it.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
