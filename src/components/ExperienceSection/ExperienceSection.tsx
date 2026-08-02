import { useState, useCallback, useEffect, useRef } from "react";
import { experiences } from "../../data/experiences";
import ExperienceTimeline from "./ExperienceTimeline";
import ExperienceCard from "./ExperienceCard";
import "./ExperienceSection.css";

type TransitionPhase = "idle" | "fade-out" | "fade-in";

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const busyRef = useRef(false);

  // Detect when the section occupies most of the viewport (for intro trigger)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFullyVisible(entry.intersectionRatio >= 0.85);
      },
      { threshold: [0, 0.5, 0.85, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const switchTo = useCallback((index: number) => {
    if (busyRef.current) return;
    if (index < 0 || index >= experiences.length) return;
    if (index === activeIndexRef.current) return;

    busyRef.current = true;
    setTransitionPhase("fade-out");

    setTimeout(() => {
      setActiveIndex(index);
      setTransitionPhase("fade-in");

      setTimeout(() => {
        setTransitionPhase("idle");
        busyRef.current = false;
      }, 380);
    }, 340);
  }, []);

  // Keyboard: ← → ↑ ↓ to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullyVisible) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        switchTo(activeIndexRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        switchTo(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullyVisible, switchTo]);

  const goNext = useCallback(() => switchTo(activeIndexRef.current + 1), [switchTo]);
  const goPrev = useCallback(() => switchTo(activeIndexRef.current - 1), [switchTo]);

  return (
    <section className="experience-section" ref={sectionRef}>
      <div className="exp-bg-dots" />
      <div className="exp-bg-crosses">
        <span className="exp-cross exp-cross-1">+</span>
        <span className="exp-cross exp-cross-2">+</span>
        <span className="exp-cross exp-cross-3">+</span>
      </div>
      <div className="exp-bg-stars">
        <span className="exp-star exp-star-1">✦</span>
        <span className="exp-star exp-star-2">✦</span>
        <span className="exp-star exp-star-3">✦</span>
        <span className="exp-star exp-star-4">✦</span>
        <span className="exp-star exp-star-5">✧</span>
      </div>

      <div className="exp-content">
        <ExperienceTimeline
          experiences={experiences}
          activeIndex={activeIndex}
          onSelect={switchTo}
        />

        <div className="exp-right">
          <div className="exp-card-wrapper">
            {experiences.map((exp, idx) => {
              const isCurrent = idx === activeIndex;
              const isFadingOut = transitionPhase === "fade-out" && isCurrent;
              const isFadingIn = transitionPhase === "fade-in" && isCurrent;

              let className = "exp-card-page";
              if (isCurrent) {
                className += " is-visible";
                if (isFadingOut) className += " fade-out";
                if (isFadingIn) className += " fade-in";
              } else {
                className += " is-hidden";
              }

              return (
                <div key={exp.id} className={className}>
                  <ExperienceCard experience={exp} />
                </div>
              );
            })}

            {/* Page-turn nav hints */}
            <div className="exp-nav-hints">
              <button
                className="exp-nav-hint"
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous experience"
              >
                ‹
              </button>
              <span className="exp-nav-dots">
                {experiences.map((_, i) => (
                  <button
                    key={i}
                    className={`exp-nav-dot${i === activeIndex ? " is-active" : ""}`}
                    onClick={() => switchTo(i)}
                    aria-label={`Experience ${i + 1}`}
                  />
                ))}
              </span>
              <button
                className="exp-nav-hint"
                onClick={goNext}
                disabled={activeIndex === experiences.length - 1}
                aria-label="Next experience"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
