"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type WorkflowImage = {
  alt: string;
  src: string;
};

type WorkflowImageOption = 0 | 1 | 2;

export function WorkflowImageSelector({
  images,
  label,
}: {
  images: readonly WorkflowImage[];
  label: string;
}) {
  const [activeOption, setActiveOption] = useState<WorkflowImageOption>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const point = carouselRef.current?.closest("li");

    if (!point) {
      return;
    }

    const updateAutoPlay = () => {
      setIsAutoPlaying(point.classList.contains("is-workflow-point-focused"));
    };

    updateAutoPlay();
    const observer = new MutationObserver(updateAutoPlay);
    observer.observe(point, { attributeFilter: ["class"], attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveOption((option) => ((option + 1) % 3) as WorkflowImageOption);
    }, 1500);

    return () => window.clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="aboutdev-workflow-carousel" ref={carouselRef}>
      <span className="aboutdev-workflow-image-placeholder">
        {images.map((image, index) => (
          <Image
            alt={image.alt}
            aria-hidden={index !== activeOption}
            className={`aboutdev-workflow-carousel-image${
              index === activeOption ? " is-active" : ""
            }`}
            fill
            key={image.src}
            sizes="(max-width: 720px) 30vw, 230px"
            src={image.src}
            style={{
              opacity: index === activeOption ? 1 : 0,
              zIndex: index === activeOption ? 0 : -1,
            }}
          />
        ))}
      </span>
      <div
        aria-label={`${label} image selector`}
        className="uiux-stack-squares aboutdev-workflow-image-selector"
        role="group"
      >
        {images.map((_, option) => {
          const letter = String.fromCharCode(65 + option);
          const isActive = activeOption === option;

          return (
            <button
              aria-label={`Select ${label} image ${letter}`}
              aria-pressed={isActive}
              className={`uiux-stack-square${isActive ? " is-active" : ""}`}
              key={letter}
              onClick={(event) => {
                event.stopPropagation();
                setActiveOption(option as WorkflowImageOption);
              }}
              onPointerDown={(event) => event.stopPropagation()}
              style={
                isActive
                  ? {
                      borderColor: "#f3fff7",
                      color: "var(--case-accent-core)",
                    }
                  : { color: "#f3fff7" }
              }
              type="button"
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
