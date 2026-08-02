export default function ContactIntro() {
  return (
    <div className="contact-intro">
      <span className="contact-intro__kicker">LET&apos;S CONNECT</span>
      <h2 className="contact-intro__title">CONTACT</h2>
      <p className="contact-intro__subtitle">
        Let&rsquo;s{" "}
        <span className="contact-intro__keep">
          keep in touch
          <span className="contact-intro__underline" aria-hidden="true">
            <svg
              viewBox="0 0 140 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8c10-4 25-6 38-4 12 2 22 6 34 4 14-2 28-6 42-4 10 2 16 6 22 6"
                stroke="#a3e635"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        .
      </p>
      <p className="contact-intro__desc">
        我一直期待新的机会与合作，
        <br />
        欢迎随时联系我。
      </p>
    </div>
  );
}
