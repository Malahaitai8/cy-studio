import { useEffect, useState } from "react";

interface Props {
  message: string;
  show: boolean;
  duration?: number;
}

export default function CopyToast({
  message,
  show,
  duration = 1800,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!visible) return null;

  return (
    <div
      className={`copy-toast ${show ? "copy-toast--enter" : "copy-toast--exit"}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
