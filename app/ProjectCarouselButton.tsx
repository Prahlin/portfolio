"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const projectLinks = [
  { href: "#cinerific", label: "View Cinerific" },
  { href: "#alla-vostra", label: "View Alla Vostra" },
  { href: "#credit-king", label: "View Credit King" },
];

export function ProjectCarouselButton() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeProject = projectLinks[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % projectLinks.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <a
      className="button button-primary carousel-button"
      href={activeProject.href}
    >
      <span className="carousel-button-window" aria-live="polite">
        <span className="carousel-button-label" key={activeProject.href}>
          {activeProject.label}
        </span>
      </span>
      <ArrowRight aria-hidden size={18} />
    </a>
  );
}
