import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Figma,
  Atom,
  Wind,
  Flame,
  Github,
  Smartphone,
  PenTool,
  Layers,
  Search,
  GitBranch,
  Accessibility,
  FileCode,
} from "lucide-react";
import { SectionHeader } from "./Section";

const tech = [
  { name: "Java", icon: Atom, level: 92 },
  { name: "React", icon: Atom, level: 80 },
  { name: "JavaScript", icon: FileCode, level: 80 },
  { name: "Tailwind CSS", icon: Wind, level: 80 },
  { name: "Firebase", icon: Flame, level: 85 },
  { name: "HTML / CSS", icon: Code2, level: 95 },
  { name: "GitHub", icon: Github, level: 85 },
  { name: "Responsive", icon: Smartphone, level: 92 },
];

const design = [
  { name: "Figma", icon: Figma, level: 95 },
  { name: "Wireframing", icon: PenTool, level: 90 },
  { name: "Prototyping", icon: Layers, level: 88 },
  { name: "UX Research", icon: Search, level: 82 },
  { name: "User Flow", icon: Palette, level: 90 },
  { name: "Accessibility", icon: Accessibility, level: 85 },
];

function SkillCard({
  name,
  icon: Icon,
  level,
  i,
}: {
  name: string;
  icon: typeof Atom;
  level: number;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.04 }}
      className="group glass relative overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/50"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/30 opacity-0 blur-2xl transition group-hover:opacity-100" />
      <div className="relative flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{level}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.04, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ boxShadow: "0 0 16px oklch(0.6 0.25 295 / 0.7)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Skills"
          title={
            <>
              Tools of the <span className="text-gradient">craft</span>
            </>
          }
          description="A blend of engineering precision and design sensibility."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 font-display text-lg text-muted-foreground">Development</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {tech.map((s, i) => (
                <SkillCard key={s.name} {...s} i={i} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-5 font-display text-lg text-muted-foreground">Design</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {design.map((s, i) => (
                <SkillCard key={s.name} {...s} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
