import { useEffect, useState, useRef, useCallback } from "react";
import type { Project } from "../../data/projects";
import "./ProjectModal.css";

interface Props {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Reset on open
  useEffect(() => {
    if (isOpen) setScrolled(false);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll shadow detection
  useEffect(() => {
    const el = bodyRef.current;
    if (!el || !isOpen) return;
    const onScroll = () => setScrolled(el.scrollTop > 4);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className={`project-modal-overlay${isOpen ? " is-visible" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`project-modal${isOpen ? " is-visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed top bar */}
        <div className={`modal-topbar${scrolled ? " scrolled" : ""}`}>
          <div className="modal-topbar-left">
            <span className="modal-star">✦</span>
            <span className="modal-dossier-prefix">PROJECT DOSSIER / </span>
            <span className="modal-dossier-number">NO.{project.id}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-top-divider" />

        {/* Scrollable content */}
        <div className="modal-body" ref={bodyRef}>
          {/* ── Compact info ── */}
          <p className="modal-english-title">{project.englishTitle}</p>
          <h2 className="modal-main-title">{project.title}</h2>
          <p className="modal-summary">{project.summary}</p>

          {/* Meta grid */}
          <div className="modal-meta-grid">
            <div className="modal-meta-card">
              <span className="modal-meta-label">Role</span>
              <span className="modal-meta-value">{project.meta.role}</span>
            </div>
            <div className="modal-meta-card">
              <span className="modal-meta-label">Time</span>
              <span className="modal-meta-value">{project.meta.time}</span>
            </div>
            <div className="modal-meta-card">
              <span className="modal-meta-label">Type</span>
              <span className="modal-meta-value">{project.meta.type}</span>
            </div>
            <div className="modal-meta-card">
              <span className="modal-meta-label">Team</span>
              <span className="modal-meta-value">{project.meta.team}</span>
            </div>
          </div>

          {/* Tags + Links in one row */}
          <div className="modal-tags-links-row">
            <div className="modal-tags-row">
              {project.tags.map((tag) => (
                <span key={tag} className="modal-tag">{tag}</span>
              ))}
            </div>
            <div className="modal-links-row">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="modal-link">
                  View Demo ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link">
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          {/* ── Section 01: Background ── */}
          {project.background && (
            <div className="modal-section">
              <div className="modal-section-header">
                <span className="modal-section-num">01</span>
                <div className="modal-section-titles">
                  <span className="modal-section-title-en">Project Background</span>
                  <span className="modal-section-title-zh">项目背景</span>
                </div>
              </div>
              <p className="modal-section-body">{project.background}</p>
            </div>
          )}

          {/* ── Section 02: What I did ── */}
          <div className="modal-section">
            <div className="modal-section-header">
              <span className="modal-section-num">02</span>
              <div className="modal-section-titles">
                <span className="modal-section-title-en">What I did</span>
                <span className="modal-section-title-zh">我的工作</span>
              </div>
            </div>
            <ol className="modal-did-list">
              {project.contributions.map((item, idx) => (
                <li key={idx} className="modal-did-item">{item}</li>
              ))}
            </ol>
          </div>

          {/* ── Section 03: Features & Workflow ── */}
          {(project.features || project.userFlow) && (
            <div className="modal-section">
              <div className="modal-section-header">
                <span className="modal-section-num">03</span>
                <div className="modal-section-titles">
                  <span className="modal-section-title-en">Features &amp; Workflow</span>
                  <span className="modal-section-title-zh">产品功能与使用流程</span>
                </div>
              </div>
              {project.features && (
                <ul className="modal-feature-list">
                  {project.features.map((item, idx) => (
                    <li key={idx} className="modal-feature-item">{item}</li>
                  ))}
                </ul>
              )}
              {project.userFlow && (
                <ol className="modal-flow-list">
                  {project.userFlow.map((step, idx) => (
                    <li key={idx} className="modal-flow-item">{step}</li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {/* ── Interface Preview (bottom) ── */}
          <div className="modal-preview-header">
            <span className="modal-preview-title">INTERFACE PREVIEW</span>
          </div>

          <div className="project-showcase">
            <img
              src={project.showcase}
              alt={`${project.title} — showcase`}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
