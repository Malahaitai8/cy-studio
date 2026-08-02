import { useState, useEffect, useRef, useCallback } from "react";
import type { Project } from "../../data/projects";
import "./ProjectCard.css";

interface Props {
  project: Project;
  index: number;
  dealt: boolean;
  onViewDetail: () => void;
}

export default function ProjectCard({ project, index, dealt, onViewDetail }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const entranceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Auto-flip on entrance — staggered per card
  useEffect(() => {
    if (!dealt) {
      setIsFlipped(false);
      if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);
      return;
    }
    // Wait for slide-in to settle, then flip sequentially
    entranceTimerRef.current = setTimeout(() => {
      setIsFlipped(true);
    }, 350 + index * 180);

    return () => {
      if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);
    };
  }, [dealt, index]);

  const handleCardClick = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onViewDetail();
    },
    [onViewDetail]
  );

  return (
    <div
      className={`project-card${dealt ? " dealt" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onClick={handleCardClick}
    >
      <div className={`project-card-inner${isFlipped ? " is-flipped" : ""}`}>
        {/* Back face (black card) */}
        <div className="project-card-face project-card-back">
          <img
            src={project.backImage}
            alt={`${project.title} — back`}
            draggable={false}
          />
        </div>

        {/* Front face (white card + arrow button overlay) */}
        <div className="project-card-face project-card-front">
          <img
            src={project.frontImage}
            alt={`${project.title} — front`}
            draggable={false}
          />
          <button
            className="card-arrow-btn"
            onClick={handleButtonClick}
            aria-label={`View ${project.title} details`}
          >
            <img
              src="/arrow_button.png"
              alt=""
              draggable={false}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
