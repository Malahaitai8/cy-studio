import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function RevealSection({ children, className, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={className}
      style={{
        scrollSnapAlign: "start",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) scale(1)"
          : "translateX(80px) scale(0.96)",
        transition:
          "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
