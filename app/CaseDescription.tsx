"use client";

import { useLayoutEffect, useRef } from "react";

type CaseDescriptionProps = {
  label: string;
  lines: [string, string, string, string];
};

type CaseEyebrowProps = {
  label: string;
  lines: [string, string] | [string, string, string];
};

export function CaseEyebrow({ label, lines }: CaseEyebrowProps) {
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    let frame = 0;

    const syncLineScale = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const eyebrow = eyebrowRef.current;

        if (!eyebrow) {
          return;
        }

        const targetWidth = eyebrow.getBoundingClientRect().width;

        if (targetWidth <= 0) {
          return;
        }

        eyebrow
          .querySelectorAll<HTMLElement>(".case-eyebrow-line-visual")
          .forEach((line) => {
            line.style.setProperty("--case-eyebrow-line-scale", "1");
            line.style.setProperty("--case-eyebrow-word-spacing", "0px");

            const text = line.textContent ?? "";
            const spaces = text.match(/ /g)?.length ?? 0;
            const range = document.createRange();

            range.selectNodeContents(line);
            const naturalWidth = range.getBoundingClientRect().width;
            range.detach();
            const scale =
              naturalWidth > targetWidth ? targetWidth / naturalWidth : 1;
            const wordSpacing =
              naturalWidth < targetWidth && spaces > 0
                ? (targetWidth - naturalWidth) / spaces
                : 0;

            line.style.setProperty(
              "--case-eyebrow-word-spacing",
              `${wordSpacing}px`,
            );
            line.style.setProperty(
              "--case-eyebrow-line-scale",
              `${Math.min(1, scale)}`,
            );
          });
      });
    };

    syncLineScale();
    window.addEventListener("resize", syncLineScale);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncLineScale);

    if (resizeObserver && eyebrowRef.current) {
      resizeObserver.observe(eyebrowRef.current);
    }

    if ("fonts" in document) {
      document.fonts.ready.then(syncLineScale).catch(() => {});
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("resize", syncLineScale);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <span className="case-eyebrow" aria-label={label} ref={eyebrowRef}>
      {lines.map((line) => (
        <span className="case-eyebrow-line" aria-hidden="true" key={line}>
          <span className="case-eyebrow-line-visual">{line}</span>
        </span>
      ))}
    </span>
  );
}

export function CaseDescription({ label, lines }: CaseDescriptionProps) {
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    let frame = 0;

    const syncLineScale = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const description = descriptionRef.current;

        if (!description) {
          return;
        }

        const targetWidth = description.getBoundingClientRect().width;

        if (targetWidth <= 0) {
          return;
        }

        description
          .querySelectorAll<HTMLElement>(".case-description-line-visual")
          .forEach((line) => {
            line.style.setProperty("--case-description-line-scale", "1");
            line.style.setProperty("--case-description-word-spacing", "0px");

            const text = line.textContent ?? "";
            const spaces = text.match(/ /g)?.length ?? 0;
            const range = document.createRange();

            range.selectNodeContents(line);
            const naturalWidth = range.getBoundingClientRect().width;
            range.detach();
            const scale =
              naturalWidth > targetWidth ? targetWidth / naturalWidth : 1;
            const wordSpacing =
              naturalWidth < targetWidth && spaces > 0
                ? (targetWidth - naturalWidth) / spaces
                : 0;

            line.style.setProperty(
              "--case-description-word-spacing",
              `${wordSpacing}px`,
            );
            line.style.setProperty(
              "--case-description-line-scale",
              `${Math.min(1, scale)}`,
            );
          });
      });
    };

    syncLineScale();
    window.addEventListener("resize", syncLineScale);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncLineScale);

    if (resizeObserver && descriptionRef.current) {
      resizeObserver.observe(descriptionRef.current);
    }

    if ("fonts" in document) {
      document.fonts.ready.then(syncLineScale).catch(() => {});
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("resize", syncLineScale);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <p className="case-description" aria-label={label} ref={descriptionRef}>
      {lines.map((line) => (
        <span className="case-description-line" aria-hidden="true" key={line}>
          <span className="case-description-line-visual">{line}</span>
        </span>
      ))}
    </p>
  );
}
