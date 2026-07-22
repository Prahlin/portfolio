"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  nameFontSize?: string;
  tone: ProjectTone;
}> = [
  {
    category: "RESTAURANT",
    hasWeb: true,
    href: "/projects/alla-vostra",
    mobilePlatforms: ["android", "apple"],
    name: "Alla Vostra",
    nameFontSize: "calc(var(--hero-carousel-name-font-size) - 1px)",
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
  const arrowRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const activeProject = projectLinks[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % projectLinks.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    let frame = 0;

    const syncHeroActionGeometry = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const arrow = arrowRef.current;
        const button = buttonRef.current;
        const heroCopy = document.querySelector<HTMLElement>(".hero-copy");
        const heroActions =
          document.querySelector<HTMLElement>(".hero-actions");
        const socialButton =
          document.querySelector<HTMLElement>(".hero-social-button");
        const targetIcon =
          document.querySelector<SVGSVGElement>(".dribbble-icon-mark") ??
          document.querySelector<SVGSVGElement>(".linkedin-icon-mark");

        if (heroActions && socialButton) {
          const socialButtonHeight =
            socialButton.getBoundingClientRect().height;

          if (socialButtonHeight > 0) {
            const setPx = (name: string, value: number) => {
              heroActions.style.setProperty(name, `${value}px`);
            };

            setPx("--hero-social-button-height", socialButtonHeight);
            setPx("--hero-social-font-size", socialButtonHeight * 0.275);
            setPx("--hero-social-icon-size", socialButtonHeight * 0.605);
            setPx("--hero-social-gap", socialButtonHeight * 0.045833);
            setPx("--hero-social-pad-x", socialButtonHeight / 8);
            setPx("--hero-view-label-font-size", socialButtonHeight * 0.275);
            heroCopy?.style.setProperty(
              "--hero-eyebrow-font-size",
              `${socialButtonHeight * 0.367}px`,
            );
            setPx("--hero-carousel-base-font-size", socialButtonHeight * 0.3125);
            setPx(
              "--hero-carousel-name-font-size",
              socialButtonHeight * 0.320834,
            );
            setPx(
              "--hero-carousel-category-font-size",
              socialButtonHeight * 0.160416,
            );
            setPx(
              "--hero-carousel-arrow-font-size",
              socialButtonHeight * 0.458333,
            );
          }
        }

        if (arrow && button && targetIcon) {
          const arrowRect = arrow.getBoundingClientRect();
          const buttonRect = button.getBoundingClientRect();
          const targetIconRect = targetIcon.getBoundingClientRect();
          const targetIconCenter =
            targetIconRect.left + targetIconRect.width / 2;
          const arrowLeft =
            targetIconCenter - buttonRect.left - arrowRect.width / 2;
          const clampedArrowLeft = Math.max(
            0,
            Math.min(arrowLeft, buttonRect.width - arrowRect.width),
          );

          button.style.setProperty(
            "--carousel-arrow-left",
            `${clampedArrowLeft}px`,
          );
        }

        const viewLabel =
          document.querySelector<HTMLElement>(".hero-view-label");
        const githubText =
          document.querySelector<HTMLElement>(".github-label-text");
        const githubIcon =
          document.querySelector<SVGSVGElement>(".github-icon-mark");

        if (viewLabel && githubText && githubIcon) {
          const viewLabelRect = viewLabel.getBoundingClientRect();
          const githubTextRect = githubText.getBoundingClientRect();
          const githubIconRect = githubIcon.getBoundingClientRect();
          const stackLeft = githubTextRect.left - viewLabelRect.left;
          const stackWidth = githubIconRect.right - githubTextRect.left;

          viewLabel.style.setProperty(
            "--hero-view-stack-left",
            `${stackLeft}px`,
          );
          viewLabel.style.setProperty(
            "--hero-view-stack-width",
            `${stackWidth}px`,
          );
        }
      });
    };

    syncHeroActionGeometry();
    window.addEventListener("resize", syncHeroActionGeometry);

    const targetIcon =
      document.querySelector<SVGSVGElement>(".dribbble-icon-mark") ??
      document.querySelector<SVGSVGElement>(".linkedin-icon-mark");
    const targetButton = targetIcon?.closest(".hero-social-button");
    const viewLabel = document.querySelector<HTMLElement>(".hero-view-label");
    const githubText = document.querySelector<HTMLElement>(".github-label-text");
    const githubIcon =
      document.querySelector<SVGSVGElement>(".github-icon-mark");
    const githubButton = githubText?.closest(".github-button");
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncHeroActionGeometry);

    if (resizeObserver) {
      if (buttonRef.current) {
        resizeObserver.observe(buttonRef.current);
      }

      if (targetIcon) {
        resizeObserver.observe(targetIcon);
      }

      if (targetButton) {
        resizeObserver.observe(targetButton);
      }

      if (viewLabel) {
        resizeObserver.observe(viewLabel);
      }

      if (githubText) {
        resizeObserver.observe(githubText);
      }

      if (githubIcon) {
        resizeObserver.observe(githubIcon);
      }

      if (githubButton) {
        resizeObserver.observe(githubButton);
      }
    }

    if ("fonts" in document) {
      document.fonts.ready.then(syncHeroActionGeometry).catch(() => {});
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("resize", syncHeroActionGeometry);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <a
      className="button button-primary carousel-button"
      href={activeProject.href}
      ref={buttonRef}
      style={{
        boxSizing: "border-box",
        display: "block",
        maxWidth: "100%",
        minWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        position: "relative",
        width: "100%",
      }}
    >
      <span
        className="carousel-button-window"
        aria-live="polite"
        style={{
          alignItems: "center",
          display: "grid",
          justifyContent: "stretch",
          left: 0,
          minWidth: 0,
          overflow: "visible",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width:
            "var(--carousel-arrow-left, calc(100% - clamp(10px, 3vw, 16px) - 21px))",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="carousel-button-label"
          key={activeProject.href}
          style={{
            minWidth: 0,
            paddingLeft: 0,
            width: "100%",
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
              fontSize: "var(--hero-carousel-name-font-size)",
              gap: "2.2px",
              justifyContent: "center",
              lineHeight: 0.95,
            }}
          >
            <span
              className="carousel-button-action-name"
              style={{ fontSize: activeProject.nameFontSize }}
            >
              {activeProject.name}
            </span>
            <span
              className="carousel-button-action-category"
              style={{
                WebkitTextStroke: 0,
                color: "#000",
                fontSize: "var(--hero-carousel-category-font-size)",
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
        ref={arrowRef}
        style={{
          ...strokedWhiteTextStyle,
          flex: "0 0 auto",
          fontSize: "var(--hero-carousel-arrow-font-size)",
          fontWeight: 900,
          left:
            "var(--carousel-arrow-left, calc(100% - clamp(10px, 3vw, 16px) - 21px))",
          lineHeight: 1,
          marginLeft: 0,
          position: "absolute",
          right: "auto",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        →
      </span>
    </a>
  );
}
