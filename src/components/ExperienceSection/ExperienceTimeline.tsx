import type { Experience } from "../../data/experiences";
import "./ExperienceTimeline.css";

interface Props {
  experiences: Experience[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ExperienceTimeline({
  experiences,
  activeIndex,
  onSelect,
}: Props) {
  return (
    <div className="exp-left">
      {/* Section title */}
      <span className="exp-section-number">/ 03</span>
      <h2 className="exp-section-title">EXPERIENCE</h2>
      <p className="exp-section-desc">
        Things I learned, things I built.
        <br />
        一些关于成长、探索和实践的记录。
      </p>

      {/* Timeline */}
      <div className="exp-timeline">
        {/* Vertical track */}
        <div className="exp-timeline-track">
          <div
            className="exp-timeline-dot-active"
            style={{ top: `${activeIndex * 88}px` }}
          />
        </div>

        {/* Timeline items */}
        <div className="exp-timeline-items">
          {experiences.map((exp, idx) => (
            <button
              key={exp.id}
              className={`exp-timeline-item${idx === activeIndex ? " is-active" : ""}`}
              onClick={() => onSelect(idx)}
            >
              <span className="exp-tl-index">{exp.index}</span>
              <span className="exp-tl-company">{exp.company}</span>
              <span className="exp-tl-date">{exp.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orbit doodle decoration at bottom-left */}
      <img
        src="/assets/experience/orbit_doodle.png"
        alt=""
        className="exp-orbit-doodle"
        draggable={false}
      />
    </div>
  );
}
