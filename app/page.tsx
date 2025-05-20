import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section"; // Import HeroSection
import { ProjectsSection } from "@/components/projects-section"; // Import ProjectsSection
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer"; // Import Footer

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16"> {/* pt-16 to offset fixed navbar height */}
        <HeroSection />

        <ProjectsSection />

        <SkillsSection />

        <ContactSection />
        
        <Footer />
      </main>
    </div>
  );
}
