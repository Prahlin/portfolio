"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type Platform = "android" | "apple" | "web";

const projectLinks: Array<{
  href: string;
  label: string;
  platforms: Platform[];
}> = [
  {
    href: "/projects/alla-vostra",
    label: "Restaurant App",
    platforms: ["android", "apple", "web"],
  },
  { href: "#cinerific", label: "Streaming App", platforms: ["android"] },
  {
    href: "#credit-king",
    label: "Finance App",
    platforms: ["android", "apple"],
  },
];

function AndroidMark() {
  return (
    <svg
      aria-hidden
      className="carousel-button-android"
      height="1.6em"
      viewBox="4 3.4 16 12.8"
      width="1.6em"
    >
      <path className="android-antenna" d="M7.6 7.2 5.7 4.7" />
      <path className="android-antenna" d="m16.4 7.2 1.9-2.5" />
      <path className="android-head" d="M5.5 14a6.5 6.5 0 0 1 13 0v1H5.5z" />
      <circle className="android-eye" cx="9.7" cy="11.7" r="0.7" />
      <circle className="android-eye" cx="14.3" cy="11.7" r="0.7" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg
      aria-hidden
      className="carousel-button-apple"
      height="1.6em"
      viewBox="0 0 24 24"
      width="1.6em"
    >
      <path d="M12 6.5V3.4c0-.9.7-1.6 1.6-1.6h.3" />
      <path d="M17.8 21.1c-1.1.7-2.1.8-3 .3-1.7-.8-3.1-.8-4.8 0-1 .5-2 .4-3-.3C4.8 19.5 3.2 15.2 3.4 11.6c.2-3.2 2.4-5.4 5-5.4 1.4 0 2.4.7 3.2.7.7 0 1.8-.7 3.2-.7 2.2 0 4.1 1.5 4.8 3.7-1.6.7-2.4 1.9-2.4 3.5 0 1.8 1 3.1 2.6 3.7-.5 1.6-1.2 3-2 4Z" />
    </svg>
  );
}

function WebMark() {
  return (
    <svg
      aria-hidden
      className="carousel-button-web"
      height="1.6em"
      viewBox="0 0 24 24"
      width="1.6em"
    >
      <circle className="web-globe-shell" cx="12" cy="12" r="8.2" />
      <path className="web-globe-line" d="M3.8 12h16.4" />
      <path className="web-globe-line" d="M5.6 8.1h12.8" />
      <path className="web-globe-line" d="M5.6 15.9h12.8" />
      <path className="web-globe-line" d="M12 3.8c2.2 2.3 3.3 5 3.3 8.2s-1.1 5.9-3.3 8.2" />
      <path className="web-globe-line" d="M12 3.8c-2.2 2.3-3.3 5-3.3 8.2s1.1 5.9 3.3 8.2" />
    </svg>
  );
}

const platformMarks: Record<Platform, typeof AndroidMark> = {
  android: AndroidMark,
  apple: AppleMark,
  web: WebMark,
};

export function ProjectCarouselButton() {
  const [activeIndex, setActiveIndex] = useState(0);
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
          <span className="carousel-button-action">View</span>
          <span className="carousel-button-project">
            <span>{activeProject.label}</span>
            {activeProject.platforms.map((platform) => {
              const PlatformMark = platformMarks[platform];

              return <PlatformMark key={platform} />;
            })}
          </span>
        </span>
      </span>
      <ArrowRight aria-hidden size={18} />
    </a>
  );
}
