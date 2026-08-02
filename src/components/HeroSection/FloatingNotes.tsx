import "./FloatingNotes.css";

export default function FloatingNotes() {
  return (
    <>
      {/* Black note — CURRENT VIBES */}
      <div className="note-black-wrapper">
        <img
          src="/current-vibes-note-transparent(1).png"
          alt=""
          className="note-img"
          draggable={false}
        />
      </div>

      {/* Silver note — Quote */}
      <div className="note-silver-wrapper">
        <img
          src="/note-quote-metal.png"
          alt=""
          className="note-img"
          draggable={false}
        />
      </div>
    </>
  );
}
