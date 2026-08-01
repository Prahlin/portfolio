"use client";

import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export type MobilePlatform = "android" | "apple";
type ProjectTone = "commerce" | "entertainment" | "finance";
type ResponsiveAssetGap = {
  maxPx: number;
  minPx: number;
  tightLanePx: number;
  wideLanePx: number;
};

const projectNameColors: Record<ProjectTone, string> = {
  commerce: "#ffb866",
  entertainment: "#b88cff",
  finance: "#6fa4ff",
};

const strokedWhiteTextStyle = {
  WebkitTextStroke: "4.2px #000",
  color: "#f3fff7",
  paintOrder: "stroke fill",
  textShadow: "0 0 0 #000",
};

const projectLinks: Array<{
  caseStudyId: string;
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
    caseStudyId: "alla-vostra",
    category: "RESTAURANT",
    hasWeb: true,
    href: "/projects/alla-vostra",
    mobilePlatforms: ["android", "apple"],
    name: "Alla Vostra",
    nameFontSize: "calc(var(--hero-carousel-name-font-size) - 1px)",
    tone: "commerce",
  },
  {
    caseStudyId: "cinerific",
    category: "STREAMING",
    hasTablet: true,
    href: "/projects/cinerific",
    mobilePlatforms: ["android"],
    name: "Cinerific",
    tone: "entertainment",
  },
  {
    caseStudyId: "credit-king",
    category: "FINANCE",
    href: "#credit-king",
    mobilePlatforms: ["android", "apple"],
    name: "Credit King",
    tone: "finance",
  },
];

function getCaseStudyRowScrollOffset() {
  const isWideLandscape = window.matchMedia(
    "(min-width: 1024px) and (orientation: landscape)",
  ).matches;
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  if (isWideLandscape) {
    return Math.max(18, Math.min(44, window.innerHeight * 0.035));
  }

  if (isPortrait) {
    return Math.max(14, Math.min(36, window.innerHeight * 0.03));
  }

  return Math.max(16, Math.min(40, window.innerHeight * 0.0325));
}

function scrollCaseStudyRowIntoView(caseStudyId: string) {
  const targetCard = document.getElementById(caseStudyId);

  if (!targetCard) {
    return;
  }

  const caseGrid = targetCard.closest<HTMLElement>(".case-grid");
  const targetTop = targetCard.getBoundingClientRect().top;
  const rowCards = caseGrid
    ? Array.from(caseGrid.children).filter((child): child is HTMLElement => {
        if (!(child instanceof HTMLElement)) {
          return false;
        }

        const cardTop = child.getBoundingClientRect().top;

        return Math.abs(cardTop - targetTop) <= 8;
      })
    : [targetCard];
  const rowTop = Math.min(
    ...rowCards.map((card) => card.getBoundingClientRect().top),
  );

  window.scrollTo({
    behavior: "smooth",
    top: window.scrollY + rowTop - getCaseStudyRowScrollOffset(),
  });

  window.history.replaceState(null, "", `#${caseStudyId}`);
}

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

function TabletMark({
  showPlatformIcon = true,
}: {
  showPlatformIcon?: boolean;
} = {}) {
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
      {showPlatformIcon ? <AndroidLogoImage x={13.26608} y={7.65486} /> : null}
    </svg>
  );
}

function WebMark({ scale = 1 }: { scale?: number }) {
  const size = `${(1.2 * scale).toFixed(3)}em`;

  return (
    <svg
      aria-hidden
      className="carousel-button-web"
      height={size}
      style={{ height: size, width: size }}
      viewBox="0 0 24 24"
      width={size}
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

const platformLabelColumnStart = 3;

function getPlatformLabelGridColumn(index: number) {
  return platformLabelColumnStart + index * 2;
}

function getPlatformDividerGridColumn(index: number) {
  return getPlatformLabelGridColumn(index) + 1;
}

function getPlatformListGridTemplate(columnCount: number) {
  const columns = ["max-content", "1px"];

  Array.from({ length: columnCount }).forEach((_, index) => {
    columns.push("max-content");

    if (index < columnCount - 1) {
      columns.push("1px");
    }
  });

  return columns.join(" ");
}

function PlatformIconSlot({
  gridColumn,
  gridRow,
  label,
}: {
  gridColumn?: number;
  gridRow?: number;
  label: string;
}) {
  return (
    <span
      className="case-card-title-platform-slot"
      data-platform-label={label}
      style={
        gridColumn && gridRow
          ? {
              gridColumn: String(gridColumn),
              gridRow: String(gridRow),
            }
          : undefined
      }
    >
    </span>
  );
}

function PlatformLabelDivider({
  gridColumn,
  gridRow,
  kind,
}: {
  gridColumn?: number;
  gridRow?: number | string;
  kind: "grid" | "item";
}) {
  return (
    <span
      aria-hidden="true"
      className={`case-card-title-platform-divider case-card-title-platform-${kind}-divider`}
      style={
        gridColumn && gridRow
          ? {
              gridColumn: String(gridColumn),
              gridRow: String(gridRow),
            }
          : undefined
      }
    />
  );
}

function PlatformLabelSlots({
  labels,
  row,
}: {
  labels: string[];
  row: number;
}) {
  return labels.map((label, index) => (
    <PlatformIconSlot
      gridColumn={getPlatformLabelGridColumn(index)}
      gridRow={row}
      key={`${row}-${label}`}
      label={label}
    />
  ));
}

function PlatformColumnDividers({
  columnCount,
  gridRow,
}: {
  columnCount: number;
  gridRow: number | string;
}) {
  return Array.from({ length: Math.max(0, columnCount - 1) }).map(
    (_, index) => (
      <PlatformLabelDivider
        gridColumn={getPlatformDividerGridColumn(index)}
        gridRow={gridRow}
        key={`divider-${index}`}
        kind="item"
      />
    ),
  );
}

function AndroidPlatformMark() {
  return (
    <svg
      aria-hidden
      className="case-card-title-platform-mark case-card-title-platform-mark-android"
      viewBox="4 3.4 16 12.8"
    >
      <path
        d="M7.6 7.2 5.7 4.7"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
      <path
        d="m16.4 7.2 1.9-2.5"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
      <path
        d="M5.5 14a6.5 6.5 0 0 1 13 0v1H5.5z"
        fill="#f3fff7"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      <circle cx="9.7" cy="11.7" fill="#000" r="0.56" />
      <circle cx="14.3" cy="11.7" fill="#000" r="0.56" />
    </svg>
  );
}

function ApplePlatformMark() {
  return (
    <svg
      aria-hidden
      className="case-card-title-platform-mark case-card-title-platform-mark-apple"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 6.5V3.4c0-.9.7-1.6 1.6-1.6h.3"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M17.8 21.1c-1.1.7-2.1.8-3 .3-1.7-.8-3.1-.8-4.8 0-1 .5-2 .4-3-.3C4.8 19.5 3.2 15.2 3.4 11.6c.2-3.2 2.4-5.4 5-5.4 1.4 0 2.4.7 3.2.7.7 0 1.8-.7 3.2-.7 2.2 0 4.1 1.5 4.8 3.7-1.6.7-2.4 1.9-2.4 3.5 0 1.8 1 3.1 2.6 3.7-.5 1.6-1.2 3-2 4Z"
        fill="#f3fff7"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function PlatformLogoMark({ platform }: { platform: MobilePlatform }) {
  return platform === "android" ? (
    <AndroidPlatformMark />
  ) : (
    <ApplePlatformMark />
  );
}

function FactorDeviceMark({ device }: { device: "phone" | "tablet" }) {
  return device === "phone" ? (
    <PhoneMark mobilePlatforms={[]} />
  ) : (
    <TabletMark showPlatformIcon={false} />
  );
}

export function ProjectDeviceStack({
  assetGap,
  color,
  hasTablet,
  hasWeb,
  mobilePlatforms,
  responsiveAssetGap,
  showPlatformLabels,
  webIconScale,
}: {
  assetGap?: string;
  color: string;
  hasTablet?: boolean;
  hasWeb?: boolean;
  mobilePlatforms: MobilePlatform[];
  responsiveAssetGap?: ResponsiveAssetGap;
  showPlatformLabels?: boolean;
  webIconScale?: number;
}) {
  const stackRef = useRef<HTMLSpanElement>(null);
  const [measuredAssetGap, setMeasuredAssetGap] = useState<string | null>(null);
  const stackStyle: CSSProperties & {
    "--project-device-stack-gap"?: string;
  } = {
    color,
  };
  const stackGap = measuredAssetGap ?? assetGap;

  useLayoutEffect(() => {
    if (!responsiveAssetGap) {
      setMeasuredAssetGap(null);
      return;
    }

    const stack = stackRef.current;
    const measurementTarget = stack?.parentElement ?? stack;

    if (!measurementTarget) {
      return;
    }

    let frame = 0;
    const updateGap = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const laneWidth = measurementTarget.getBoundingClientRect().width;
        const activeRange = Math.max(
          1,
          responsiveAssetGap.wideLanePx - responsiveAssetGap.tightLanePx,
        );
        const progress = Math.min(
          1,
          Math.max(
            0,
            (laneWidth - responsiveAssetGap.tightLanePx) / activeRange,
          ),
        );
        const nextGap =
          responsiveAssetGap.minPx +
          (responsiveAssetGap.maxPx - responsiveAssetGap.minPx) * progress;
        const nextGapValue = `${nextGap.toFixed(2)}px`;

        setMeasuredAssetGap((currentGap) =>
          currentGap === nextGapValue ? currentGap : nextGapValue,
        );
      });
    };

    updateGap();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateGap);

    resizeObserver?.observe(measurementTarget);
    window.addEventListener("resize", updateGap);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateGap);
    };
  }, [
    responsiveAssetGap?.maxPx,
    responsiveAssetGap?.minPx,
    responsiveAssetGap?.tightLanePx,
    responsiveAssetGap?.wideLanePx,
  ]);

  if (stackGap) {
    stackStyle["--project-device-stack-gap"] = stackGap;
  }

  if (showPlatformLabels) {
    const platforms: Array<MobilePlatform | "web"> = [];
    const factorDevices: Array<"phone" | "tablet"> = [];

    if (mobilePlatforms.includes("android") || hasTablet) {
      platforms.push("android");
    }

    if (mobilePlatforms.includes("apple")) {
      platforms.push("apple");
    }

    if (hasWeb) {
      platforms.push("web");
    }

    if (mobilePlatforms.length > 0) {
      factorDevices.push("phone");
    }

    if (hasTablet) {
      factorDevices.push("tablet");
    }

    const platformLabels = platforms.map((platform) =>
      platform === "web" ? "WEB" : platform === "android" ? "AND" : "IOS",
    );
    const factorDeviceLabels = factorDevices.map((device) =>
      device === "phone" ? "PHONE" : "TABLET",
    );
    const labelColumnCount = Math.max(
      platformLabels.length,
      factorDeviceLabels.length,
      1,
    );
    const dividerGridRow = factorDeviceLabels.length > 0 ? "1 / 3" : 1;
    const platformListStyle = {
      ...stackStyle,
      gridTemplateColumns: getPlatformListGridTemplate(labelColumnCount),
    };

    return (
      <span
        className="carousel-button-project case-card-title-platform-list"
        ref={stackRef}
        style={platformListStyle}
      >
        <span className="case-card-title-platform-heading case-card-title-platform-heading-platform">
          PLATFORM
        </span>
        <PlatformLabelDivider
          gridColumn={2}
          gridRow={dividerGridRow}
          kind="grid"
        />
        <PlatformLabelSlots labels={platformLabels} row={1} />
        <PlatformColumnDividers
          columnCount={labelColumnCount}
          gridRow={dividerGridRow}
        />
        {factorDevices.length > 0 ? (
          <>
            <span className="case-card-title-platform-heading case-card-title-platform-heading-factor">
              DEVICE
            </span>
            <PlatformLabelSlots labels={factorDeviceLabels} row={2} />
          </>
        ) : null}
      </span>
    );
  }

  return (
    <span className="carousel-button-project" ref={stackRef} style={stackStyle}>
      {mobilePlatforms.map((platform) => (
        <PhoneMark key={platform} mobilePlatforms={[platform]} />
      ))}
      {hasTablet ? <TabletMark /> : null}
      {hasWeb ? <WebMark scale={webIconScale} /> : null}
    </span>
  );
}

function CarouselArrowMark() {
  return (
    <img
      alt=""
      aria-hidden
      className="carousel-button-arrow-mark"
      draggable={false}
      style={{
        display: "block",
        height: "100%",
        verticalAlign: "top",
        width: "100%",
      }}
      src="/images/carousel-arrow.svg"
    />
  );
}

export function ProjectCarouselButton() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projectButtonRef = useRef<HTMLAnchorElement>(null);
  const activeProject = projectLinks[activeIndex];

  const handleArrowClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollCaseStudyRowIntoView(activeProject.caseStudyId);
  };

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
        const heroCopy = document.querySelector<HTMLElement>(".hero-copy");
        const heroActions =
          document.querySelector<HTMLElement>(".hero-actions");
        const proofPanel = document.querySelector<HTMLElement>(".proof-panel");
        const stackRow = document.querySelector<HTMLElement>(".stack-row");
        const heroVisual = document.querySelector<HTMLElement>(".hero-visual");
        const navBar = document.querySelector<HTMLElement>(".nav-bar");
        const profilePhoto =
          document.querySelector<HTMLElement>(".profile-photo");
        const socialButton =
          document.querySelector<HTMLElement>(".hero-social-button");
        const visualFrameSelectors = [
          ".profile-photo",
          ".phone-shell-commerce",
          ".phone-shell-finance",
          ".tablet-shell",
        ];

        if (proofPanel && profilePhoto) {
          const proofRect = proofPanel.getBoundingClientRect();
          const profileRect = profilePhoto.getBoundingClientRect();
          const proofWidth = profileRect.right - proofRect.left;

          if (proofWidth > 0) {
            [heroCopy, proofPanel, stackRow].forEach((element) => {
              element?.style.setProperty(
                "--hero-proof-landscape-width",
                `${proofWidth}px`,
              );
            });
          }
        }

        if (heroVisual && navBar && stackRow) {
          const isTwoColumnHero = window.matchMedia(
            "(min-width: 981px)",
          ).matches;

          if (!isTwoColumnHero) {
            heroVisual.style.removeProperty("--hero-visual-center-offset");
          } else {
            const visualRects = visualFrameSelectors
              .map((selector) =>
                document.querySelector<HTMLElement>(selector),
              )
              .filter((element): element is HTMLElement => Boolean(element))
              .map((element) => element.getBoundingClientRect());

            if (visualRects.length > 0) {
              const navRect = navBar.getBoundingClientRect();
              const stackRect = stackRow.getBoundingClientRect();
              const visualTop = Math.min(
                ...visualRects.map((rect) => rect.top),
              );
              const visualBottom = Math.max(
                ...visualRects.map((rect) => rect.bottom),
              );
              const currentOffset =
                Number.parseFloat(
                  window
                    .getComputedStyle(heroVisual)
                    .getPropertyValue("--hero-visual-center-offset"),
                ) || 0;
              const visualCenterWithoutOffset =
                (visualTop + visualBottom) / 2 - currentOffset;
              const targetCenter = (navRect.top + stackRect.bottom) / 2;
              const nextOffset = targetCenter - visualCenterWithoutOffset;

              heroVisual.style.setProperty(
                "--hero-visual-center-offset",
                `${nextOffset}px`,
              );
            }
          }
        }

        if (heroActions && socialButton) {
          const heroActionsWidth = heroActions.getBoundingClientRect().width;
          const socialButtonHeight =
            socialButton.getBoundingClientRect().height;

          if (heroCopy && heroActionsWidth > 0) {
            heroCopy.style.setProperty(
              "--hero-text-stack-width",
              `${heroActionsWidth}px`,
            );
          }

          if (socialButtonHeight > 0) {
            const setPx = (name: string, value: number) => {
              heroActions.style.setProperty(name, `${value}px`);
            };

            setPx("--hero-social-button-height", socialButtonHeight);
            setPx("--hero-social-font-size", socialButtonHeight * 0.295833);
            setPx("--hero-social-icon-size", socialButtonHeight * 0.672);
            const baseSocialButtonHeight = 48;
            const baseSocialGap = baseSocialButtonHeight * 0.045833 + 1;
            const stretchedSocialGap =
              Math.max(0, socialButtonHeight - baseSocialButtonHeight) *
              0.091666;

            setPx("--hero-social-gap", baseSocialGap + stretchedSocialGap);
            setPx("--hero-social-pad-x", socialButtonHeight / 8);
            setPx("--hero-view-label-font-size", socialButtonHeight * 0.275);
            heroCopy?.style.setProperty(
              "--hero-eyebrow-font-size",
              `${socialButtonHeight * 0.367}px`,
            );
            heroCopy?.style.setProperty(
              "--hero-lede-font-size",
              `${socialButtonHeight * 0.5}px`,
            );
            setPx(
              "--hero-carousel-base-font-size",
              socialButtonHeight * 0.34375,
            );
            setPx(
              "--hero-carousel-name-font-size",
              socialButtonHeight * 0.352917,
            );
            setPx(
              "--hero-carousel-category-font-size",
              socialButtonHeight * 0.176458,
            );
            setPx(
              "--hero-carousel-arrow-font-size",
              socialButtonHeight * 0.458333,
            );
          }
        }

        window.dispatchEvent(new CustomEvent("hero-stack-sync"));

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
          const clusterLeft = Math.min(githubTextRect.left, githubIconRect.left);
          const stackLeft = clusterLeft - viewLabelRect.left;

          viewLabel.style.setProperty(
            "--hero-view-stack-left",
            `${stackLeft}px`,
          );
        }
      });
    };

    syncHeroActionGeometry();
    window.addEventListener("resize", syncHeroActionGeometry);

    const targetIcon =
      document.querySelector<SVGSVGElement>(".dribbble-icon-mark") ??
      document.querySelector<SVGSVGElement>(".linkedin-icon-mark");
    const navBar = document.querySelector<HTMLElement>(".nav-bar");
    const heroVisual = document.querySelector<HTMLElement>(".hero-visual");
    const heroActions = document.querySelector<HTMLElement>(".hero-actions");
    const stackRow = document.querySelector<HTMLElement>(".stack-row");
    const proofPanel = document.querySelector<HTMLElement>(".proof-panel");
    const profilePhoto = document.querySelector<HTMLElement>(".profile-photo");
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
      if (projectButtonRef.current) {
        resizeObserver.observe(projectButtonRef.current);
      }

      if (heroActions) {
        resizeObserver.observe(heroActions);
      }

      if (navBar) {
        resizeObserver.observe(navBar);
      }

      if (heroVisual) {
        resizeObserver.observe(heroVisual);
      }

      if (stackRow) {
        resizeObserver.observe(stackRow);
      }

      if (proofPanel) {
        resizeObserver.observe(proofPanel);
      }

      if (profilePhoto) {
        resizeObserver.observe(profilePhoto);
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
    <span className="carousel-button-group">
      <a
        aria-label={`Open ${activeProject.name} project`}
        className="button button-primary carousel-button"
        href={activeProject.href}
        ref={projectButtonRef}
      >
        <span className="carousel-button-window" aria-live="polite">
          <span className="carousel-button-label" key={activeProject.href}>
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
            <ProjectDeviceStack
              color={projectNameColors[activeProject.tone]}
              hasTablet={activeProject.hasTablet}
              hasWeb={activeProject.hasWeb}
              mobilePlatforms={activeProject.mobilePlatforms}
            />
          </span>
        </span>
      </a>
      <a
        aria-label={`Scroll to ${activeProject.name} case study`}
        className="button button-primary carousel-arrow-button"
        href={`#${activeProject.caseStudyId}`}
        onClick={handleArrowClick}
      >
        <span aria-hidden className="carousel-button-arrow">
          <CarouselArrowMark />
        </span>
      </a>
    </span>
  );
}
