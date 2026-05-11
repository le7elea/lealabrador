import { Download, FileText } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";
import resumeFile from "@/assets/CV-RESUME(LEA LABRADOR).pdf";

export function Resume() {
  return (
    <section id="resume" className="relative px-5 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Resume"
          title={
            <>
              Take a closer <span className="text-gradient">look</span>
            </>
          }
        />
        <Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <div className="glass relative overflow-hidden rounded-3xl p-8">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
              <FileText className="h-10 w-10 text-primary glow-text" />
              <h3 className="mt-4 font-display text-2xl font-bold">Lea Sheila Labrador CV</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Career objective, education, work history, certifications, and technical skills,
                distilled into one clean document.
              </p>
              <a
                href={resumeFile}
                download
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-border transition hover:scale-105"
                aria-label="Download Lea Sheila Labrador CV as PDF"
              >
                <Download className="h-4 w-4" /> Download CV (PDF)
              </a>
            </div>
            <div className="glass rounded-3xl p-8">
              <h4 className="text-xs uppercase tracking-[0.2em] text-primary">Career objective</h4>
              <p className="mt-3 text-sm text-foreground/90">
                To grow as a UI/UX-focused front-end developer who ships polished, accessible
                products and elevates teams through thoughtful design systems and clean code.
              </p>
              <h4 className="mt-6 text-xs uppercase tracking-[0.2em] text-primary">Top skills</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Figma", "HTML", "CSS", "React", "Firebase", "Prototyping", "Accessibility"].map(
                  (s) => (
                    <span
                      key={s}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {s}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
