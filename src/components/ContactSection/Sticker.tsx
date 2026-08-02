interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function Sticker({ src, alt, className = "" }: Props) {
  return (
    <div className={`contact-sticker ${className}`} aria-hidden="true">
      <img
        src={src}
        alt={alt}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
