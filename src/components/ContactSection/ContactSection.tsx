import { useRef, useEffect, useState } from "react";
import { decorations } from "../../data/contact";
import ContactIntro from "./ContactIntro";
import ContactCard from "./ContactCard";
import Decoration from "./Decoration";
import Sticker from "./Sticker";
import BlinkingSticker from "./BlinkingSticker";
import "./ContactSection.css";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Reveal on scroll (matching RevealSection behavior)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className={`contact-section ${visible ? "contact-section--visible" : ""}`}
      ref={sectionRef}
    >
      {/* Outer rounded frame */}
      <div className="contact-frame">
        {/* Decorative elements */}
        {decorations.map((deco, i) => (
          <Decoration
            key={`${deco.type}-${i}`}
            type={deco.type}
            x={deco.x}
            y={deco.y}
            rotate={deco.rotate}
          />
        ))}

        {/* Stickered characters */}

        {/* Top-right: winking sticker */}
        <Sticker
          src="/contact-sticker-wink.png"
          alt=""
          className="contact-sticker--wink"
        />

        {/* Left-middle: hi-mail sticker */}
        <Sticker
          src="/contact-sticker-hi-mail.png"
          alt=""
          className="contact-sticker--hi-mail"
        />

        {/* Bottom-left: star-eyes sticker */}
        <Sticker
          src="/contact-sticker-star-eyes.png"
          alt=""
          className="contact-sticker--star-eyes"
        />

        {/* Bottom-right: blinking pair */}
        <BlinkingSticker
          openSrc="/contact-sticker-expectant-open.png"
          closedSrc="/contact-sticker-expectant-closed.png"
          alt=""
          className="contact-sticker--expectant"
        />

        {/* Content: left intro + right card */}
        <div className="contact-content">
          <div className="contact-intro-wrapper">
            <ContactIntro />
            {/* Green heart next to LET'S CONNECT */}
            <img
              src="/deco-heart-green.png"
              alt=""
              className="contact-deco-heart--intro"
            />
          </div>
          <ContactCard />
        </div>

        {/* Bottom text */}
        <div className="contact-thanks-row">
          <img
            src="/deco-heart-green.png"
            alt=""
            className="contact-deco-heart--thanks"
          />
          <img
            src="/deco-star-4pt.png"
            alt=""
            className="contact-deco-star--thanks-left"
          />
          <p className="contact-thanks">Thanks for stopping by!</p>
          <img
            src="/deco-star-4pt.png"
            alt=""
            className="contact-deco-star--thanks-right"
          />
          <img
            src="/deco-heart-green.png"
            alt=""
            className="contact-deco-heart--thanks-right"
          />
        </div>
      </div>
    </section>
  );
}
