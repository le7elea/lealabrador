import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/portfolio/Background";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Resume } from "@/components/portfolio/Resume";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CursorGlow } from "@/components/portfolio/CursorGlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lea Sheila Labrador — UI/UX Designer & Front-End Developer" },
      {
        name: "description",
        content:
          "Portfolio of Lea Sheila Labrador — UI/UX Designer, Front-End Developer and Computer Science Graduate. Crafting beautiful, accessible, modern digital experiences.",
      },
      { property: "og:title", content: "Lea Sheila Labrador — Portfolio" },
      {
        property: "og:description",
        content: "UI/UX Designer & Front-End Developer building premium, modern web experiences.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen">
      <Background />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
