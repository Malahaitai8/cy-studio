import HeroSection from "./components/HeroSection/HeroSection";
import RevealSection from "./components/RevealSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import ContactSection from "./components/ContactSection/ContactSection";

function App() {
  return (
    <main>
      <HeroSection />
      <RevealSection id="projects">
        <ProjectsSection />
      </RevealSection>
      <RevealSection id="experience">
        <ExperienceSection />
      </RevealSection>
      <RevealSection id="contact">
        <ContactSection />
      </RevealSection>
    </main>
  );
}

export default App;
