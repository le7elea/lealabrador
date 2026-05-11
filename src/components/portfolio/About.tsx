import { motion } from "framer-motion";
import { SectionHeader } from "./Section";
import profile from "@/assets/me1.png";

export function About() {
  return (
    <section id="about" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="About me"
          title={
            <>
              Designer who codes,
              <br />
              developer who designs.
            </>
          }
        />
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[auto_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto"
          >
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-primary via-accent to-primary opacity-50 blur-2xl animate-glow-pulse" />
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-primary/40 glow-border sm:h-72 sm:w-72">
              <img
                src={profile}
                alt="Lea Sheila Labrador"
                width={768}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-muted-foreground"
          >
            <p className="text-lg text-foreground/90">
              I'm a Computer Science graduate passionate about building digital products that are
              <span className="text-primary"> beautiful, intuitive, and human-centered</span>.
            </p>
            <p>
              My journey started with curiosity for how interfaces shape the way people think and
              feel. That curiosity grew into a craft - combining design intuition with the
              discipline of clean front-end engineering to ship experiences that simply work.
            </p>
            <p>
              I love working at the intersection of design and code: prototyping in Figma,
              validating with users, and shipping production-ready code with care for accessibility,
              motion, and performance.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { k: "4", v: "Projects shipped" },
                { k: "2yrs", v: "Design + dev" },
                { k: "100%", v: "Accessibility minded" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl font-bold text-primary glow-text">
                    {s.k}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
