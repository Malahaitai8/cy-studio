import { useEffect, useCallback } from "react";
import type { Experience } from "../../data/experiences";
import "./ExperienceModal.css";

interface Props {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceModal({ experience, isOpen, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className={`exp-modal-overlay${isOpen ? " is-visible" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`exp-modal${isOpen ? " is-visible" : ""}`}>
        {/* Close button */}
        <button
          className="exp-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header: company, role, date */}
        <div className="exp-modal-header">
          <h3 className="exp-modal-company">{experience.company}</h3>
          <p className="exp-modal-role">{experience.role}</p>
          <p className="exp-modal-date">{experience.date}</p>
        </div>

        {/* Body: two columns */}
        <div className="exp-modal-body">
          {/* Left column: background + responsibility */}
          <div className="exp-modal-col">
            <div className="exp-modal-section">
              <h4 className="exp-modal-section-title">项目背景</h4>
              <p className="exp-modal-text">{experience.modal.background}</p>
            </div>
            <div className="exp-modal-section">
              <h4 className="exp-modal-section-title">负责内容</h4>
              <p className="exp-modal-text">{experience.modal.responsibility}</p>
            </div>
          </div>

          {/* Right column: outcome */}
          <div className="exp-modal-col">
            <div className="exp-modal-section">
              <h4 className="exp-modal-section-title">
                {experience.isEarlierExperience ? "关键产出" : "关键成果"}
              </h4>
              <p className="exp-modal-text">{experience.modal.outcome}</p>
            </div>
          </div>
        </div>

        {/* Bottom tags */}
        {experience.tags.length > 0 && (
          <div className="exp-modal-tags">
            {experience.tags.map((tag) => (
              <span key={tag} className="exp-modal-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
