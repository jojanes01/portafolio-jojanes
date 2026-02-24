import { About } from "app/components/landing/About";
import { Experience } from "app/components/landing/Experience";
import { Hero } from "app/components/landing/Hero";
import { LastestBlog } from "app/components/landing/LastestBlog/LastestBlog";
import { ProjectSection } from "app/components/landing/Projects/ProjectSection";
import { Skills } from "app/components/landing/Skills";
import { Testimonies } from "app/components/landing/Testimonies";

export default function Home() {
  return (
    /*
     * <main> is a simple flex column — no max-w here.
     * - Hero is full-width (manages its own ambient glows).
     * - Each section below already handles max-w-6xl + mx-auto internally.
     * pt-8 compensates for the Hero bottom fade so the first section
     * isn't glued to the carousel divider.
     */
    <main className="flex flex-col">
      <Hero />
      <ProjectSection />
      <Testimonies />
      <About />
      <Experience />
      <Skills />
      <LastestBlog />
    </main>
  );
}
