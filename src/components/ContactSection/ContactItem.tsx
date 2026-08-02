import { useState, useCallback } from "react";
import type { ContactItemData } from "../../data/contact";

interface Props {
  item: ContactItemData;
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

const iconSrcMap: Record<string, string> = {
  email: "/contact-icon-email.png",
  phone: "/contact-icon-phone.png",
  github: "/contact-icon-github.png",
  resume: "/contact-icon-resume-pdf.png",
};

export default function ContactItem({ item }: Props) {
  const [copied, setCopied] = useState(false);
  const { type, label, value, action, href } = item;
  const iconSrc = iconSrcMap[type];

  const handleAction = useCallback(
    async (e: React.MouseEvent) => {
      if (action === "link" && href) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      if (action === "copy") {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // Fallback for older browsers
          const ta = document.createElement("textarea");
          ta.value = value;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }
      }
    },
    [action, href, value]
  );

  const isLink = action === "link";

  return (
    <div
      className={`contact-item ${isLink ? "contact-item--link" : ""}`}
      onClick={isLink ? handleAction : undefined}
      role={isLink ? "button" : undefined}
      tabIndex={isLink ? 0 : undefined}
      onKeyDown={
        isLink
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleAction(e as unknown as React.MouseEvent);
              }
            }
          : undefined
      }
      aria-label={isLink ? `${label}: ${value} — 点击在新标签页打开` : undefined}
    >
      {/* Left: icon */}
      <div className="contact-item__icon" aria-hidden="true">
        <img
          src={iconSrc}
          alt=""
          className="contact-item__icon-img"
        />
      </div>

      {/* Center: label + value */}
      <div className="contact-item__info">
        <span className="contact-item__label">{label}</span>
        <span className="contact-item__value">{value}</span>
      </div>

      {/* Right: action button */}
      <button
        className={`contact-item__btn ${copied ? "is-copied" : ""}`}
        onClick={action === "copy" ? handleAction : undefined}
        aria-label={
          action === "copy"
            ? copied
              ? "已复制"
              : `复制 ${label}: ${value}`
            : `打开 ${label}`
        }
        type="button"
      >
        {action === "copy" ? (
          copied ? (
            "COPIED"
          ) : (
            "COPY"
          )
        ) : (
          <ArrowIcon />
        )}
      </button>
    </div>
  );
}
