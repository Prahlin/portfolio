"use client";

import { useEffect, useState, type ReactNode } from "react";

export function LandingNavFrame({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const collapseStart = 120;
    let animationFrame = 0;
    let previousScrollY = window.scrollY;
    let isInitialUpdate = true;

    const updateStickyState = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const isMovingUp = scrollY < previousScrollY;
        const isMovingDown = scrollY > previousScrollY;

        setIsScrolled(scrollY > 0);
        setIsSticky((currentIsSticky) => {
          if (scrollY <= 0) {
            return false;
          }

          if (isInitialUpdate || isMovingDown) {
            return true;
          }

          if (isMovingUp && scrollY <= collapseStart) {
            return false;
          }

          return currentIsSticky;
        });

        previousScrollY = scrollY;
        isInitialUpdate = false;
      });
    };

    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateStickyState);
    };
  }, []);

  return (
    <div
      className={`landing-nav-frame${isScrolled ? " landing-nav-frame-scrolled" : ""}${isSticky ? " landing-nav-frame-sticky" : ""}`}
    >
      {children}
    </div>
  );
}
