import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  openSrc: string;
  closedSrc: string;
  alt: string;
  className?: string;
}

export default function BlinkingSticker({
  openSrc,
  closedSrc,
  alt,
  className = "",
}: Props) {
  const [closed, setClosed] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mountedRef = useRef(true);
  // Cycle counter: determines whether next blink is double or single
  const cycleRef = useRef(0);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback(
    (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        timersRef.current = timersRef.current.filter((t) => t !== id);
        if (mountedRef.current) fn();
      }, delay);
      timersRef.current.push(id);
      return id;
    },
    []
  );

  const scheduleBlink = useCallback(() => {
    // Double-blinks are eager and frequent (1.2–2.2s gap)
    // Single blinks are relaxed (2.0–3.5s gap) — one "normal" blink in the cycle
    const isDouble = cycleRef.current % 4 !== 3; // 3 double, 1 single
    const interval = isDouble
      ? 1200 + Math.random() * 1000 // double: eager, short wait
      : 2000 + Math.random() * 1500; // single: relaxed, longer wait

    cycleRef.current++;

    addTimer(() => {
      const blinkCount = isDouble ? 2 : 1;
      const blinkDuration = 90 + Math.random() * 50;
      const gapBetweenBlinks = 50;

      for (let i = 0; i < blinkCount; i++) {
        const offset = i * (blinkDuration + gapBetweenBlinks);

        addTimer(() => setClosed(true), offset);
        addTimer(() => setClosed(false), offset + blinkDuration);
      }

      const totalDuration = blinkCount * (blinkDuration + gapBetweenBlinks);
      addTimer(scheduleBlink, totalDuration);
    }, interval);
  }, [addTimer]);

  useEffect(() => {
    mountedRef.current = true;
    scheduleBlink();

    return () => {
      mountedRef.current = false;
      clearAllTimers();
    };
  }, [scheduleBlink, clearAllTimers]);

  return (
    <div
      className={`contact-sticker contact-sticker--blink ${className}`}
      aria-hidden="true"
    >
      <img
        src={openSrc}
        alt={alt}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          opacity: closed ? 0 : 1,
          transition: "opacity 0s",
        }}
      />
      <img
        src={closedSrc}
        alt=""
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          opacity: closed ? 1 : 0,
          transition: "opacity 0s",
        }}
      />
    </div>
  );
}
