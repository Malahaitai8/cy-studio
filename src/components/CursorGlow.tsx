import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number; // ms since creation
}

const MAX_AGE = 900; // ms before a point fully fades
const SAMPLE_INTERVAL = 8; // ~120 fps sampling — denser trail
const TRAIL_COLOR = [255, 250, 240]; // warm cream white

/**
 * Canvas-based mouse trail: small glowing dots follow the cursor
 * and fade out over ~700ms.
 * Skips touch devices and reduced-motion users.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastSampleRef = useRef(0);
  const rafRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Decide whether to enable
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setEnabled(false);
      return;
    }
  }, []);

  // Setup canvas + animation loop
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctxRef.current = ctx;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse tracking ──
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // ── Animation loop ──
    const now = performance.now();

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);

      const ctx = ctxRef.current;
      if (!ctx) return;

      const { x, y } = mouseRef.current;

      // Sample new point (throttled)
      if (t - lastSampleRef.current >= SAMPLE_INTERVAL) {
        lastSampleRef.current = t;
        trailRef.current.push({ x, y, age: 0 });
      }

      // Age all points
      const dt = Math.min(t - now, 33); // cap delta to avoid bursts after tab switch
      const points = trailRef.current;
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += dt;
        if (points[i].age > MAX_AGE) {
          points.splice(i, 1);
        }
      }

      // Cap trail length
      if (points.length > 120) {
        points.splice(0, points.length - 120);
      }

      // ── Draw ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const len = points.length;
      for (let i = 0; i < len; i++) {
        const p = points[i];
        const progress = p.age / MAX_AGE; // 0 → 1
        // Ease-out: fast initial fade, slower tail
        const alpha = 1 - Math.pow(progress, 0.5);
        const radius = 3 + (1 - progress) * 5; // 8px → 3px

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TRAIL_COLOR[0]}, ${TRAIL_COLOR[1]}, ${TRAIL_COLOR[2]}, ${(alpha * 0.85).toFixed(3)})`;
        ctx.fill();

        // Outer glow ring
        if (progress < 0.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${TRAIL_COLOR[0]}, ${TRAIL_COLOR[1]}, ${TRAIL_COLOR[2]}, ${(alpha * 0.25).toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
