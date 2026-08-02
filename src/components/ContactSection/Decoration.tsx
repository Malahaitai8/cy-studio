import { type ReactNode } from "react";

interface Props {
  type: "sparkle" | "heart" | "paper-plane" | string;
  x: string;
  y: string;
  rotate: number;
  className?: string;
  children?: ReactNode;
}

const iconMap: Record<string, string> = {
  sparkle: "✦",
  heart: "♥",
  "paper-plane": "✈",
};

export default function Decoration({
  type,
  x,
  y,
  rotate,
  className = "",
  children,
}: Props) {
  const isCustom = !iconMap[type];
  const symbol = isCustom ? children : iconMap[type];
  const isPlane = type === "paper-plane";

  return (
    <span
      className={`contact-decoration contact-deco-${type} ${className}`}
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden="true"
    >
      {isPlane ? (
        <span className="contact-deco-paper-plane__inner">{symbol}</span>
      ) : (
        symbol
      )}
    </span>
  );
}
