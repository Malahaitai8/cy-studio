import { useState, useCallback, useEffect, useRef } from "react";
import { projects, type Project } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import "./ProjectsSection.css";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dealt, setDealt] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger card deal animation every time section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let reentryTimer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so cards reset before re-animating
          reentryTimer = setTimeout(() => setDealt(true), 80);
        } else {
          clearTimeout(reentryTimer);
          setDealt(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(reentryTimer);
    };
  }, []);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    // Scroll section to center of viewport, then show modal
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setModalOpen(true), 350);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 420);
  }, []);

  return (
    <section className="projects-section" ref={sectionRef}>
      {/* Background texture */}
      <div className="projects-bg-grid" />
      <div className="projects-bg-stars">
        <span className="star star-1">✦</span>
        <span className="star star-2">✦</span>
        <span className="star star-3">✧</span>
        <span className="star star-4">✦</span>
        <span className="star star-5">✧</span>
      </div>

      <div className="projects-content">
        {/* Left title area */}
        <div className="projects-left">
          <span className="section-number">/ 02</span>
          <h2 className="section-title-zh">项目展示</h2>
          <p className="section-title-en">THINGS I MADE</p>
          <p className="section-desc">
            用代码与设计解决真实问题，
            <br />
            让想法落地，创造可衡量的价值。
          </p>
        </div>

        {/* Right cards area — staggered dealing */}
        <div className="projects-cards">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              dealt={dealt}
              onViewDetail={() => openModal(project)}
            />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
