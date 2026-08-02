import type { ReactNode } from "react";
import type { Project } from "../../data/projects";
import "./ProjectInfo.css";

interface Props {
  project: Project;
  children?: ReactNode;
}

export default function ProjectInfo({ project, children }: Props) {
  return (
    <div className="project-info">
      {/* Project titles */}
      <p className="pi-english-title">{project.englishTitle}</p>
      <h3 className="pi-title">{project.title}</h3>

      {/* Decorative line + star */}
      <div className="pi-divider">
        <span className="pi-divider-line" />
        <span className="pi-divider-star">✦</span>
      </div>

      {/* Summary */}
      <p className="pi-summary">{project.summary}</p>

      {/* Meta info */}
      <div className="pi-meta">
        <div className="pi-meta-row">
          <span className="pi-meta-label">Role</span>
          <span className="pi-meta-value">{project.meta.role}</span>
        </div>
        <div className="pi-meta-row">
          <span className="pi-meta-label">Time</span>
          <span className="pi-meta-value">{project.meta.time}</span>
        </div>
        <div className="pi-meta-row">
          <span className="pi-meta-label">Type</span>
          <span className="pi-meta-value">{project.meta.type}</span>
        </div>
        <div className="pi-meta-row">
          <span className="pi-meta-label">Team</span>
          <span className="pi-meta-value">{project.meta.team}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="pi-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="pi-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="pi-links">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pi-link"
          >
            View Demo ↗
            <span className="pi-link-underline" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pi-link"
          >
            GitHub ↗
            <span className="pi-link-underline" />
          </a>
        )}
      </div>

      {/* What I did */}
      <div className="pi-contributions">
        <h4 className="pi-section-title">What I did</h4>
        <ol className="pi-contrib-list">
          {project.contributions.map((item, idx) => (
            <li key={idx} className="pi-contrib-item">
              {item}
            </li>
          ))}
        </ol>
      </div>

      {/* Carousel slot — injected from parent */}
      {children}

      {/* Product Features */}
      {project.features && project.features.length > 0 && (
        <div className="pi-features">
          <h4 className="pi-section-title">产品功能</h4>
          <ul className="pi-feature-list">
            {project.features.map((item, idx) => (
              <li key={idx} className="pi-feature-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* User Flow */}
      {project.userFlow && project.userFlow.length > 0 && (
        <div className="pi-userflow">
          <h4 className="pi-section-title">使用流程</h4>
          <ol className="pi-flow-list">
            {project.userFlow.map((step, idx) => (
              <li key={idx} className="pi-flow-item">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

    </div>
  );
}
