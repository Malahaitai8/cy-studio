import { useState, useCallback } from "react";
import "./ProjectGallery.css";

interface Props {
  previews: string[];
  projectTitle: string;
}

export default function ProjectGallery({ previews, projectTitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [erroredImages, setErroredImages] = useState<Set<string>>(new Set());

  const validPreviews = previews.filter((src) => !erroredImages.has(src));
  const total = validPreviews.length;
  const displayIndex = total > 0 ? Math.min(currentIndex, total - 1) : 0;

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
  }, [total]);

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev >= total - 1 ? 0 : prev + 1));
  }, [total]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleImageError = useCallback((src: string) => {
    setErroredImages((prev) => new Set(prev).add(src));
  }, []);

  return (
    <div className="gallery">
      {/* Header: preview label + arrows */}
      <div className="gallery-header">
        <span className="gallery-preview-label">
          PREVIEW{" "}
          <span className="gallery-current">
            {String(displayIndex + 1).padStart(2, "0")}
          </span>{" "}
          / {String(total).padStart(2, "0")}
        </span>
        <div className="gallery-arrows">
          <button
            className="gallery-arrow"
            onClick={goToPrev}
            disabled={total <= 1}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="gallery-arrow"
            onClick={goToNext}
            disabled={total <= 1}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="gallery-main">
        {total > 0 ? (
          <img
            key={validPreviews[displayIndex]}
            src={validPreviews[displayIndex]}
            alt={`${projectTitle} — preview ${displayIndex + 1}`}
            className="gallery-main-img"
            onError={() => handleImageError(validPreviews[displayIndex])}
            draggable={false}
          />
        ) : (
          <div className="gallery-placeholder">
            <span>No preview images available</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="gallery-thumbnails">
          {validPreviews.map((src, idx) => (
            <button
              key={src}
              className={`gallery-thumb${idx === displayIndex ? " is-active" : ""}`}
              onClick={() => goToIndex(idx)}
              aria-label={`Preview ${idx + 1}`}
            >
              <img
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                onError={() => handleImageError(src)}
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Pagination dots */}
      {total > 1 && (
        <div className="gallery-dots">
          {validPreviews.map((_, idx) => (
            <button
              key={idx}
              className={`gallery-dot${idx === displayIndex ? " is-active" : ""}`}
              onClick={() => goToIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
