import { useState, useEffect } from "react";
import "./HeroLeftContent.css";

const FULL_TEXT = "欢迎来到我的小世界，\n这里记录着关于我的一些小小碎片，\n如果你对我感兴趣，就看下去吧~";

function useTypewriter(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return displayed;
}

export default function HeroLeftContent() {
  const displayedText = useTypewriter(FULL_TEXT, 80);

  return (
    <div className="hero-left">
      {/* 1. Glass pill */}
      <img
        src="/intro-glass-pill.png"
        alt=""
        className="glass-pill"
        draggable={false}
      />

      {/* 2. Main title */}
      <img
        src="/hero-title-transparent.png"
        alt="WELCOME TO MY CORNER OF THE INTERNET"
        className="main-title"
        draggable={false}
      />

      {/* 3. Green handwriting */}
      <img
        src="/handwriting-meet-me.png"
        alt=""
        className="handwriting"
        draggable={false}
      />

      {/* 4. Chinese intro text — typewriter */}
      <p className="intro-zh">
        {displayedText.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
        <span className="cursor-blink">|</span>
      </p>

      {/* 5. CTA button */}
      <a href="#projects" className="cta-btn" onClick={(e) => {
        e.preventDefault();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }}>
        开始逛逛&nbsp;&nbsp;↗
      </a>

      {/* 6. Secondary link */}
      <a href="#projects" className="secondary-link" onClick={(e) => {
        e.preventDefault();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }}>
        看看我做过什么&nbsp;&nbsp;→
      </a>

      {/* 7. GitHub info */}
      <a
        href="https://github.com/Malahaitai8?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="github-row"
      >
        <svg
          className="github-icon"
          width="46"
          height="46"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
            fill="#111"
          />
        </svg>
        <div className="github-text">
          <span className="github-label">GitHub</span>
          <span className="github-handle">@Malahaitai8</span>
        </div>
      </a>
    </div>
  );
}
