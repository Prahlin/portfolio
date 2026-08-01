"use client";

import { useLayoutEffect, useRef } from "react";

const ledeLines = [
  { text: "Concept > Prototype > Build > Shipment", compact: true },
  { text: "All-In-One, 100% Hassle-Free", strong: true },
];

const FITTED_LINE_SCALE = "--hero-lede-line-scale-x";

function HeroLedeLine({
  compact,
  strong,
  text,
}: {
  compact?: boolean;
  strong?: boolean;
  text: string;
}) {
  const content = (
    <span
      className={`hero-lede-line-visual${compact ? " hero-lede-line-visual-compact" : ""}`}
    >
      {text}
    </span>
  );

  return (
    <span className="hero-lede-line">
      {strong ? <strong>{content}</strong> : content}
    </span>
  );
}

export function HeroLede() {
  const ledeRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const lede = ledeRef.current;

    if (!lede) {
      return;
    }

    let animationFrame = 0;

    const syncLineFit = () => {
      const lines = Array.from(
        lede.querySelectorAll<HTMLElement>(".hero-lede-line"),
      );

      lines.forEach((line) => {
        const visual = line.querySelector<HTMLElement>(
          ".hero-lede-line-visual",
        );
        const availableWidth = line.getBoundingClientRect().width;

        if (!visual || availableWidth <= 0) {
          return;
        }

        const currentScale =
          Number.parseFloat(visual.style.getPropertyValue(FITTED_LINE_SCALE)) ||
          1;
        const naturalWidth =
          visual.getBoundingClientRect().width / currentScale;

        if (naturalWidth <= 0) {
          return;
        }

        const fittedScale = Math.min(1, availableWidth / naturalWidth);

        visual.style.setProperty(FITTED_LINE_SCALE, fittedScale.toFixed(4));
      });
    };

    const scheduleLineFit = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(syncLineFit);
    };

    const syncLineFitNow = () => {
      cancelAnimationFrame(animationFrame);
      syncLineFit();
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleLineFit);

    syncLineFitNow();
    resizeObserver?.observe(lede);
    window.addEventListener("resize", scheduleLineFit);
    window.addEventListener("hero-stack-sync", syncLineFitNow);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleLineFit);
      window.removeEventListener("hero-stack-sync", syncLineFitNow);
    };
  }, []);

  return (
    <p className="hero-lede" ref={ledeRef}>
      {ledeLines.map((line) => (
        <HeroLedeLine key={line.text} {...line} />
      ))}
    </p>
  );
}
