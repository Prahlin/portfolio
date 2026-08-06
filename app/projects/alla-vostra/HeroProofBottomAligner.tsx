"use client";

import { useEffect } from "react";

const WIDE_HERO_QUERY = "(min-width: 981px)";

export default function HeroProofBottomAligner() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(WIDE_HERO_QUERY);
    let frame = 0;

    const getElements = () => {
      const hero = document.querySelector<HTMLElement>(
        ".alla-vostra-case .project-hero",
      );
      const heroGrid = document.querySelector<HTMLElement>(
        ".alla-vostra-case .project-hero-grid",
      );
      const heroCopy = document.querySelector<HTMLElement>(
        ".alla-vostra-case .project-hero-copy",
      );
      const showcase = document.querySelector<HTMLElement>(
        ".alla-vostra-case .av-showcase",
      );
      const contactButton = document.querySelector<HTMLElement>(
        ".alla-vostra-case .project-hero .project-contact-button",
      );

      return { contactButton, hero, heroCopy, heroGrid, showcase };
    };

    const sync = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const { contactButton, showcase } = getElements();

        if (!contactButton || !showcase || !mediaQuery.matches) {
          showcase?.style.removeProperty("--av-proof-row-bottom");
          return;
        }

        const contactRect = contactButton.getBoundingClientRect();
        const showcaseRect = showcase.getBoundingClientRect();
        const bottomOffset = showcaseRect.bottom - contactRect.bottom;

        showcase.style.setProperty(
          "--av-proof-row-bottom",
          `${bottomOffset.toFixed(2)}px`,
        );
      });
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(sync);
    const observedElements = Object.values(getElements()).filter(
      (element): element is HTMLElement => Boolean(element),
    );

    observedElements.forEach((element) => resizeObserver?.observe(element));
    sync();

    window.addEventListener("resize", sync);
    mediaQuery.addEventListener("change", sync);
    document.fonts?.ready.then(sync).catch(() => {});

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      const { showcase } = getElements();

      showcase?.style.removeProperty("--av-proof-row-bottom");
      window.removeEventListener("resize", sync);
      mediaQuery.removeEventListener("change", sync);
      resizeObserver?.disconnect();
    };
  }, []);

  return null;
}
