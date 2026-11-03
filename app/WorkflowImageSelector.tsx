"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type WorkflowImage = {
  alt: string;
  src: string;
};

type WorkflowImageOption = 0 | 1 | 2;

const WORKFLOW_IMAGE_CYCLE_MS = 3000;
const WORKFLOW_IMAGE_FADE_MS = 1080;

export function WorkflowImageSelector({
  images,
  label,
}: {
  images: readonly WorkflowImage[];
  label: string;
}) {
  const [activeOption, setActiveOption] = useState<WorkflowImageOption>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
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
      setIsFadingOut(false);
      return;
    }

    let fadeTimer: number | undefined;
    let advanceTimer: number | undefined;
    let isCancelled = false;

    const scheduleNextImage = () => {
      fadeTimer = window.setTimeout(() => {
        setIsFadingOut(true);

        advanceTimer = window.setTimeout(() => {
          if (isCancelled) {
            return;
          }

          setActiveOption(
            (option) => ((option + 1) % 3) as WorkflowImageOption,
          );
          setIsFadingOut(false);
          scheduleNextImage();
        }, WORKFLOW_IMAGE_FADE_MS);
      }, WORKFLOW_IMAGE_CYCLE_MS - WORKFLOW_IMAGE_FADE_MS);
    };

    scheduleNextImage();

    return () => {
      isCancelled = true;
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
      if (advanceTimer !== undefined) window.clearTimeout(advanceTimer);
    };
  }, [isAutoPlaying]);

  return (
    <div
      className={`aboutdev-workflow-carousel${
        isFadingOut ? " is-detail-fading-out" : ""
      }`}
      data-auto-detail-cycle={isAutoPlaying ? "true" : undefined}
      ref={carouselRef}
    >
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
          />
        ))}
      </span>
      <div
        aria-label={`${label} image selector`}
        className="uiux-stack-squares is-merged aboutdev-workflow-image-selector"
        data-active-square={activeOption + 1}
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
                setIsFadingOut(false);
                setActiveOption(option as WorkflowImageOption);
              }}
              onPointerDown={(event) => event.stopPropagation()}
              type="button"
            />
          );
        })}
      </div>
    </div>
  );
}
