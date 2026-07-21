"use client";

import { useEffect, useState } from "react";

type MobilePlatform = "android" | "apple";
type ProjectTone = "commerce" | "entertainment" | "finance";

const projectNameColors: Record<ProjectTone, string> = {
  commerce: "#ffad4d",
  entertainment: "#9b5cff",
  finance: "#2f6bff",
};

const strokedWhiteTextStyle = {
  WebkitTextStroke: "4.2px #000",
  color: "#f3fff7",
  paintOrder: "stroke fill",
  textShadow: "0 0 0 #000",
};

const projectLinks: Array<{
  category: string;
  hasWeb?: boolean;
  hasTablet?: boolean;
  href: string;
  mobilePlatforms: MobilePlatform[];
  name: string;
  tone: ProjectTone;
}> = [
  {
    category: "RESTAURANT",
    hasWeb: true,
    href: "/projects/alla-vostra",
    mobilePlatforms: ["android", "apple"],
    name: "Alla Vostra",
    tone: "commerce",
  },
  {
    category: "STREAMING",
    hasTablet: true,
    href: "/projects/cinerific",
    mobilePlatforms: ["android"],
    name: "Cinerific",
    tone: "entertainment",
  },
  {
    category: "FINANCE",
    href: "#credit-king",
    mobilePlatforms: ["android", "apple"],
    name: "Credit King",
    tone: "finance",
  },
];

const androidLogoSize = {
  height: 8.69299,
  width: 10.86624,
};

const iosLogoSize = {
  height: 10.47816,
  width: 10.47816,
};

function AndroidLogoImage({ x, y }: { x: number; y: number }) {
  return (
    <image
      height={androidLogoSize.height}
      href="/images/android-device-logo.svg"
      preserveAspectRatio="xMidYMid meet"
      width={androidLogoSize.width}
      x={x}
      y={y}
    />
  );
}

function PhoneAndroidIcon({ slot }: { slot: "single" | "top" }) {
  const y = slot === "single" ? 11.43286 : 6.93286;

  return <AndroidLogoImage x={6.23608} y={y} />;
}

function IosLogoImage({ x, y }: { x: number; y: number }) {
  return (
    <image
      height={iosLogoSize.height}
      href="/images/ios-device-logo.svg"
      preserveAspectRatio="xMidYMid meet"
      width={iosLogoSize.width}
      x={x}
      y={y}
    />
  );
}

function PhoneAppleIcon({ slot }: { slot: "bottom" | "single" }) {
  const y = slot === "single" ? 11.27372 : 17.47372;

  return <IosLogoImage x={5.92372} y={y} />;
}

function PhoneMark({
  mobilePlatforms,
}: {
  mobilePlatforms: MobilePlatform[];
}) {
  return (
    <svg
      aria-hidden
      className="carousel-button-phone"
      height="1.936em"
      style={{ height: "1.936em", width: "1.36125em" }}
      viewBox="0 0 22.5 32"
      width="1.36125em"
    >
      <rect
        className="phone-mini-frame"
        height="29.2"
        rx="2.7"
        width="19"
        x="1.75"
        y="1.4"
      />
      <rect
        className="phone-mini-screen"
        height="22.8"
        rx="1.4"
        width="14.5"
        x="4"
        y="4.6"
      />
      <path className="phone-mini-speaker" d="M8.875 3.2h4.75" />
      <circle className="phone-mini-home" cx="11.25" cy="29" r="0.7" />
      {mobilePlatforms.map((platform, index) => {
        const slot =
          mobilePlatforms.length === 1
            ? "single"
            : index === 0
              ? "top"
              : "bottom";

        return platform === "android" ? (
          <PhoneAndroidIcon
            key={platform}
            slot={slot === "bottom" ? "top" : slot}
          />
        ) : (
          <PhoneAppleIcon
            key={platform}
            slot={slot === "top" ? "bottom" : slot}
          />
        );
      })}
    </svg>
  );
}

function TabletMark() {
  return (
    <svg
      aria-hidden
      className="carousel-button-tablet"
      height="1.44em"
      style={{ height: "1.44em", width: "2.16em" }}
      viewBox="0 0 36 24"
      width="2.16em"
    >
      <rect
        className="tablet-mini-frame"
        fill="none"
        height="21.2"
        rx="3"
        stroke="#000"
        strokeWidth="2.2"
        width="33.2"
        x="1.4"
        y="1.4"
      />
      <rect
        className="tablet-mini-screen"
        fill="transparent"
        height="16.8"
        rx="1.4"
        stroke="none"
        width="27.8"
        x="4.8"
        y="3.6"
      />
      <circle
        className="tablet-mini-camera"
        cx="3.2"
        cy="12"
        fill="#000"
        r="0.65"
        stroke="none"
      />
      <AndroidLogoImage x={13.26608} y={7.65486} />
    </svg>
  );
}

function WebMark() {
  return (
    <svg
      aria-hidden
      className="carousel-button-web"
      height="0.9702em"
      style={{ height: "0.9702em", width: "0.9702em" }}
      viewBox="0 0 24 24"
      width="0.9702em"
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
      style={{
        boxSizing: "border-box",
        flex: "0 1 420px",
        gap: "clamp(3px, 1vw, 5px)",
        justifyContent: "flex-start",
        maxWidth: "100%",
        minWidth: 0,
        paddingLeft: "clamp(10px, 3vw, 16px)",
        paddingRight: "clamp(10px, 3vw, 16px)",
        width: "min(420px, 100%)",
      }}
    >
      <span
        className="carousel-button-window"
        aria-live="polite"
        style={{
          alignItems: "center",
          display: "inline-flex",
          flex: "0 1 auto",
          gap: "clamp(0.55em, 2.4vw, 1em)",
          minWidth: 0,
          overflow: "visible",
          whiteSpace: "nowrap",
        }}
      >
        <span className="carousel-button-project">
          <span
            className="carousel-button-project-word"
            style={strokedWhiteTextStyle}
          >
            View
          </span>
        </span>
        <span
          className="carousel-button-label"
          key={activeProject.href}
          style={{
            gap: "clamp(0.55em, 2.4vw, 1em)",
            minWidth: 0,
            paddingLeft: 0,
          }}
        >
          <span
            className={`carousel-button-action carousel-button-action-${activeProject.tone}`}
            style={{
              ...strokedWhiteTextStyle,
              alignItems: "center",
              color: projectNameColors[activeProject.tone],
              display: "inline-flex",
              flexDirection: "column",
              fontSize: "14px",
              gap: "2px",
              justifyContent: "center",
              lineHeight: 0.95,
            }}
          >
            <span className="carousel-button-action-name">
              {activeProject.name}
            </span>
            <span
              className="carousel-button-action-category"
              style={{
                WebkitTextStroke: 0,
                color: "#000",
                fontSize: "7px",
                fontWeight: 900,
                letterSpacing: "0.06em",
                lineHeight: 1,
                textAlign: "center",
                textShadow: "none",
              }}
            >
              {activeProject.category}
            </span>
          </span>
          <span
            className="carousel-button-project"
            style={{ gap: "clamp(0.18em, 1.1vw, 0.34em)" }}
          >
            {activeProject.mobilePlatforms.map((platform) => (
              <PhoneMark key={platform} mobilePlatforms={[platform]} />
            ))}
            {activeProject.hasTablet ? <TabletMark /> : null}
            {activeProject.hasWeb ? <WebMark /> : null}
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className="carousel-button-arrow"
        style={{
          ...strokedWhiteTextStyle,
          flex: "0 0 auto",
          fontSize: "22px",
          fontWeight: 900,
          lineHeight: 1,
          marginLeft: "auto",
        }}
      >
        →
      </span>
    </a>
  );
}
