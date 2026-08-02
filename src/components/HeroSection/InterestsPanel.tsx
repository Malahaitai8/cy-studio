import "./InterestsPanel.css";

export default function InterestsPanel() {
  return (
    <div className="interests-panel">
      {/* Title */}
      <div className="interests-title-row">
        <svg
          className="star-icon"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 0l2.5 8.5H22l-6 5 2.5 8.5L12 17l-6.5 5L8 13.5l-6-5h7.5z"
            fill="#c8ff00"
          />
        </svg>
        <span className="interests-title">THINGS I LIKE</span>
      </div>

      {/* Icons image */}
      <img
        src="/things-i-like-icons.png"
        alt="Things I like: planet, camera, paw, browser"
        className="interests-icons"
        draggable={false}
      />
    </div>
  );
}
