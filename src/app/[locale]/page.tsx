import { About } from "app/components/landing/About";
import { Experience } from "app/components/landing/Experience";
import { Hero } from "app/components/landing/Hero";
import { LastestBlog } from "app/components/landing/LastestBlog/LastestBlog";
import { ProjectSection } from "app/components/landing/Projects/ProjectSection";
import { Skills } from "app/components/landing/Skills";
import { Testimonies } from "app/components/landing/Testimonies";

export default function Home() {
  return (
    <main>
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
