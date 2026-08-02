import { useRef, useCallback } from "react";
import type { Experience } from "../../data/experiences";
import "./ExperienceCard.css";

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 ~ 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;  // -0.5 ~ 0.5
    card.style.transform =
      `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div
      className="exp-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="/assets/experience/metal_rivet.png"
        alt=""
        className="exp-rivet exp-rivet-tl"
        draggable={false}
      />
      <img
        src="/assets/experience/metal_rivet.png"
        alt=""
        className="exp-rivet exp-rivet-tr"
        draggable={false}
      />
      <img
        src="/assets/experience/metal_rivet.png"
        alt=""
        className="exp-rivet exp-rivet-bl"
        draggable={false}
      />
      <img
        src="/assets/experience/metal_rivet.png"
        alt=""
        className="exp-rivet exp-rivet-br"
        draggable={false}
      />

      <img
        src="/assets/experience/masking_tape_corner.png"
        alt=""
        className="exp-tape"
        draggable={false}
      />

      <span className="exp-page-num">{experience.page}</span>

      <div className="exp-card-header">
        <h3 className="exp-company">{experience.company}</h3>
        <p className="exp-role">{experience.role}</p>
        <p className="exp-date">{experience.date}</p>
      </div>

      <p className="exp-summary">{experience.summary}</p>

      <div className="exp-highlights">
        {experience.highlights.map((h, idx) => (
          <div key={idx} className="exp-highlight">
            <div className="exp-hl-header">
              <img
                src="/assets/experience/lime_sparkle.png"
                alt=""
                className="exp-sparkle"
                draggable={false}
              />
              <h4 className="exp-hl-title">{h.title}</h4>
            </div>
            <p className="exp-hl-content">{h.content}</p>
          </div>
        ))}
      </div>

      <div className="exp-metric">
        <img
          src="/assets/experience/lime_sparkle.png"
          alt=""
          className="exp-sparkle exp-metric-sparkle"
          draggable={false}
        />
        <span className="exp-metric-value">{experience.metric.value}</span>
        <span className="exp-metric-label">{experience.metric.label}</span>
        {experience.metric.items && experience.metric.items.length > 0 && (
          <div className="exp-metric-items">
            {experience.metric.items.map((item, idx) => (
              <span key={idx} className="exp-metric-item">
                {item}
              </span>
            ))}
          </div>
        )}
        {experience.metric.detail && (
          <span className="exp-metric-detail">{experience.metric.detail}</span>
        )}
      </div>

      {experience.tags.length > 0 && (
        <div className="exp-tags">
          {experience.tags.map((tag) => (
            <span key={tag} className="exp-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
