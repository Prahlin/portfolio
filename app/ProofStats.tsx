"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type ProofStat = {
  label: string;
  value: string;
};

type LabelLineMode = 1 | 2 | 3;

function getLabelLines(label: string, lineMode: LabelLineMode) {
  const words = label.split(" ");

  if (lineMode === 1 || words.length <= 1) {
    return [label];
  }

  if (lineMode === 2) {
    const splitIndex = Math.ceil(words.length / 2);

    return [
      words.slice(0, splitIndex).join(" "),
      words.slice(splitIndex).join(" "),
    ].filter(Boolean);
  }

  return words;
}

function getContentWidth(element: HTMLElement) {
  const styles = window.getComputedStyle(element);
  const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
  const paddingRight = Number.parseFloat(styles.paddingRight) || 0;

  return element.getBoundingClientRect().width - paddingLeft - paddingRight;
}

export function ProofStats({ stats }: { stats: ProofStat[] }) {
  const [lineMode, setLineMode] = useState<LabelLineMode>(1);
  const measureRef = useRef<HTMLSpanElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let frame = 0;

    const measureLine = (line: string) => {
      const measure = measureRef.current;

      if (!measure) {
        return 0;
      }

      measure.textContent = line;

      return measure.getBoundingClientRect().width;
    };

    const syncLineMode = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const strip = stripRef.current;

        if (!strip) {
          return;
        }

        const statCards = Array.from(
          strip.querySelectorAll<HTMLElement>(".stats-strip-item"),
        );
        const targetWidth = Math.min(
          ...statCards.map((card) => getContentWidth(card)),
        );

        if (!Number.isFinite(targetWidth) || targetWidth <= 0) {
          return;
        }

        const maxSingleLineWidth = Math.max(
          ...stats.map((stat) => measureLine(stat.label)),
        );
        const maxTwoLineWidth = Math.max(
          ...stats.flatMap((stat) =>
            getLabelLines(stat.label, 2).map((line) => measureLine(line)),
          ),
        );
        const nextLineMode =
          targetWidth >= maxSingleLineWidth
            ? 1
            : targetWidth >= maxTwoLineWidth
              ? 2
              : 3;

        setLineMode((currentLineMode) =>
          currentLineMode === nextLineMode ? currentLineMode : nextLineMode,
        );
      });
    };

    syncLineMode();
    window.addEventListener("resize", syncLineMode);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncLineMode);

    if (resizeObserver && stripRef.current) {
      resizeObserver.observe(stripRef.current);
      stripRef.current
        .querySelectorAll<HTMLElement>(".stats-strip-item")
        .forEach((card) => resizeObserver.observe(card));
    }

    if ("fonts" in document) {
      document.fonts.ready.then(syncLineMode).catch(() => {});
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("resize", syncLineMode);
      resizeObserver?.disconnect();
    };
  }, [stats]);

  return (
    <div
      className="stats-strip"
      aria-label="Project proof points"
      data-label-line-mode={lineMode}
      ref={stripRef}
    >
      {stats.map((stat) => (
        <div className="stats-strip-item" key={stat.label}>
          <strong>{stat.value}</strong>
          <span className="stats-strip-label" aria-label={stat.label}>
            <span className="stats-strip-label-sr">{stat.label}</span>
            {getLabelLines(stat.label, lineMode).map((line, index) => (
              <span
                className="stats-strip-label-line"
                aria-hidden="true"
                key={`${line}-${index}`}
              >
                {line}
              </span>
            ))}
          </span>
        </div>
      ))}
      <span
        className="stats-strip-measure"
        aria-hidden="true"
        ref={measureRef}
      />
    </div>
  );
}
