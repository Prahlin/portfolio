"use client";

import { useLayoutEffect, useRef } from "react";

const ledeLines = [
  { text: "Concept > Prototype > Product > Deployment > Release" },
  { text: "All-In-One, 100% Hassle-Free", strong: true },
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

        const heroCopy = lede.closest<HTMLElement>(".hero-copy");
        const stack =
          document.querySelector<HTMLElement>(".hero-actions") ??
          document.querySelector<HTMLElement>(".stack-row") ??
          document.querySelector<HTMLElement>(".proof-panel");
        const targetWidth =
          stack?.getBoundingClientRect().width ??
          lede.getBoundingClientRect().width;

        if (heroCopy && targetWidth > 0) {
          heroCopy.style.setProperty(
            "--hero-text-stack-width",
            `${targetWidth}px`,
          );
        }

        const lines = lede.querySelectorAll<HTMLElement>(
          ".hero-lede-line-visual",
        );

        lines.forEach((line) => {
          const characters = Array.from(
            line.querySelectorAll<HTMLElement>(".hero-lede-char"),
          );

          line.style.setProperty("--hero-lede-line-font-size", "1em");

          if (characters.length < 2 || targetWidth <= 0) {
            return;
          }

          const naturalWidth = characters.reduce(
            (width, character) => width + character.getBoundingClientRect().width,
            0,
          );
          const justifiedContentWidth = targetWidth * 0.9;
          const scale =
            naturalWidth > justifiedContentWidth
              ? justifiedContentWidth / naturalWidth
              : 1;

          line.style.setProperty("--hero-lede-line-font-size", `${scale}em`);
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

      const observedElements = [
        ledeRef.current.closest<HTMLElement>(".hero-copy"),
        document.querySelector<HTMLElement>(".hero-actions"),
        document.querySelector<HTMLElement>(".hero-social-buttons"),
        document.querySelector<HTMLElement>(".stack-row"),
        document.querySelector<HTMLElement>(".proof-panel"),
      ];

      observedElements.forEach((element) => {
        if (element) {
          resizeObserver.observe(element);
        }
      });
    }

    window.addEventListener("hero-stack-sync", syncLineSpacing);

    if ("fonts" in document) {
      document.fonts.ready.then(syncLineSpacing).catch(() => {});
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("resize", syncLineSpacing);
      window.removeEventListener("hero-stack-sync", syncLineSpacing);
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
