import { useState, useEffect, lazy, Suspense } from "react";
import HeaderNav from "./HeaderNav";
import HeroLeftContent from "./HeroLeftContent";
import FloatingNotes from "./FloatingNotes";
import InterestsPanel from "./InterestsPanel";
import ErrorBoundary from "../ErrorBoundary";
import "./HeroSection.css";

const ModelViewer = lazy(() => import("./ModelViewer"));

const BASE_WIDTH = 1536;
const BASE_HEIGHT = 1024;

function useCanvasScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Only apply desktop scaling — clamp to no smaller than 1200px width equivalent
      if (vw < 1200) {
        setScale(vw / BASE_WIDTH);
      } else {
        setScale(Math.min(vw / BASE_WIDTH, vh / BASE_HEIGHT));
      }
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
}

export default function HeroSection() {
  const scale = useCanvasScale();

  return (
    <section
      className="hero-section"
      style={{ height: `${BASE_HEIGHT * scale}px` }}
    >
      <div
        className="hero-canvas"
        style={{ transform: `scale(${scale})` }}
      >
        {/* z-index: 1 — Rotate ring (behind model) */}
        <img
          src="/drag-to-rotate-ring.png"
          alt=""
          className="rotate-ring"
          draggable={false}
        />

        {/* z-index: 2 — 3D Model (lazy loaded) */}
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ModelViewer />
          </Suspense>
        </ErrorBoundary>

        {/* z-index: 3 — Left content + Notes + Interests */}
        <HeroLeftContent />
        <FloatingNotes />
        <InterestsPanel />
      </div>

      {/* z-index: 10 — Fixed nav (outside canvas to avoid transform bug) */}
      <HeaderNav />
    </section>
  );
}
