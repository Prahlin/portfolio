"use client";

import { useLayoutEffect, useRef } from "react";

const ledeLines = [
  { text: "From Original Idea to Production Release," },
  { text: "All-In-One, 100% Stress-Free", strong: true },
];

function HeroLedeLine({ strong, text }: { strong?: boolean; text: string }) {
  const characters = Array.from(text);
  const content = (
    <span className="hero-lede-line-visual" aria-hidden>
      {characters.map((character, index) => (
        <span className="hero-lede-char" key={`${character}-${index}`}>
          {character}
        </span>
      ))}
    </span>
  );

  return (
    <span className="hero-lede-line" aria-label={text}>
      {strong ? <strong>{content}</strong> : content}
    </span>
  );
}

export function HeroLede() {
  const ledeRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    let frame = 0;

    const syncLineSpacing = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const lede = ledeRef.current;

        if (!lede) {
          return;
        }

        const targetWidth = lede.getBoundingClientRect().width;
        const lines = lede.querySelectorAll<HTMLElement>(
          ".hero-lede-line-visual",
        );

        lines.forEach((line) => {
          const characters = Array.from(
            line.querySelectorAll<HTMLElement>(".hero-lede-char"),
          );

          line.style.setProperty("--hero-lede-letter-gap", "0px");

          if (characters.length < 2) {
            return;
          }

          const naturalWidth = characters.reduce(
            (width, character) => width + character.getBoundingClientRect().width,
            0,
          );
          let gap = (targetWidth - naturalWidth) / (characters.length - 1);

          line.style.setProperty("--hero-lede-letter-gap", `${gap}px`);

          const renderedWidth = line.getBoundingClientRect().width;
          gap += (targetWidth - renderedWidth) / (characters.length - 1);

          line.style.setProperty("--hero-lede-letter-gap", `${gap}px`);
        });
      });
    };

    syncLineSpacing();
    window.addEventListener("resize", syncLineSpacing);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncLineSpacing);

    if (resizeObserver && ledeRef.current) {
      resizeObserver.observe(ledeRef.current);
    }

    if ("fonts" in document) {
      document.fonts.ready.then(syncLineSpacing).catch(() => {});
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("resize", syncLineSpacing);
      resizeObserver?.disconnect();
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
