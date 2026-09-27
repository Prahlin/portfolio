"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Pause, Play } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

type FlowView = "ui" | "ux";

type ProductFlowNavStyle = CSSProperties & {
  "--product-flow-nav-fixed-left": string;
  "--product-flow-nav-fixed-width": string;
  "--product-flow-nav-measured-height": string;
};

type FlowBox = {
  height: number;
  opacity?: number;
  title: string;
  width: number;
  x: number;
  y: number;
};

type FlowBoxStyle = CSSProperties & {
  "--flow-box-center-left": string;
  "--flow-box-height": string;
  "--flow-box-left": string;
  "--flow-box-opacity"?: number;
  "--flow-box-top": string;
  "--flow-box-width": string;
};

type FlowDividerStyle = CSSProperties & {
  "--flow-connector-left": string;
  "--flow-connector-length": string;
  "--flow-connector-top": string;
};

type FoundationSwatch = {
  hex: string;
  name: string;
  text: string;
};

type FoundationColorGroup = {
  swatches: [FoundationSwatch, FoundationSwatch];
  title: string;
};

type FoundationTypeSample = {
  artwork?: {
    alt: string;
  };
  label: string;
  sample: string;
  weight: number;
};

type FoundationSpacingSample = {
  label: string;
  tokens: readonly number[];
};

type FoundationAssetGroup = {
  cards: ReactNode;
  className?: string;
  title: string;
};

const flowCoordinateFrame = { height: 1648, width: 807.2, x: 122.8, y: 270 };

const flowPanel: FlowBox = {
  height: flowCoordinateFrame.height,
  title: "Cinerific product flow",
  width: flowCoordinateFrame.width,
  x: flowCoordinateFrame.x,
  y: flowCoordinateFrame.y,
};

const flowRails: FlowBox[] = [
  { height: 252.7, title: "Welcome", width: 86.4, x: 122.8, y: 281 },
  {
    height: 252.7,
    opacity: 0.86,
    title: "Preview",
    width: 86.4,
    x: 122.8,
    y: 555.7,
  },
  {
    height: 527.4,
    opacity: 0.76,
    title: "Browse Selection",
    width: 86.4,
    x: 122.8,
    y: 830.3,
  },
  {
    height: 252.7,
    opacity: 0.56,
    title: "Favorites",
    width: 86.4,
    x: 122.8,
    y: 1379.7,
  },
  {
    height: 252.7,
    opacity: 0.48,
    title: "Settings",
    width: 86.4,
    x: 122.8,
    y: 1654.3,
  },
];

const flowDividerYPositions = [544.7, 819.3, 1368.7, 1643.3];

const uiFoundationSections = [
  {
    copy:
      "A cinematic dark palette pairs aubergine depth with silver clarity and vivid focus accents.",
    title: "Colors & Theming",
  },
  {
    copy:
      "Manrope creates a consistent voice across display moments, navigation, metadata, and controls.",
    title: "Typography & Spacing",
  },
  {
    copy:
      "The marquee-inspired identity shifts between a clean wordmark and a playful googly-eyed character.",
    title: "Iconography & Imagery",
  },
  { title: "Animations" },
  { title: "Navigations" },
  { title: "Controls & Inputs" },
  { title: "Visual Hierarchy" },
];

const cinerificColorGroups: FoundationColorGroup[] = [
  {
    swatches: [
      { hex: "#23001F", name: "Aubergine", text: "#E7E7E7" },
      { hex: "#600878", name: "Electric Violet", text: "#FFFFFF" },
    ],
    title: "Primaries",
  },
  {
    swatches: [
      { hex: "#C86BE0", name: "Focus Lavender", text: "#080007" },
      { hex: "#FFC91B", name: "Marquee Gold", text: "#080007" },
    ],
    title: "Accents",
  },
  {
    swatches: [
      { hex: "#080007", name: "Cinema Black", text: "#E7E7E7" },
      { hex: "#E7E7E7", name: "Projector Silver", text: "#1F1F1F" },
    ],
    title: "Neutrals",
  },
];

const cinerificTypeSamples: FoundationTypeSample[] = [
  {
    label: "Manrope",
    sample: "Manrope",
    weight: 800,
  },
  {
    artwork: {
      alt: "Broadway rendered in the Broadway typeface",
    },
    label: "Broadway",
    sample: "",
    weight: 400,
  },
];

const cinerificSpacingSamples: FoundationSpacingSample[] = [
  { label: "Component", tokens: [8, 14, 20, 24] },
  { label: "Layout", tokens: [34, 50, 72, 80] },
];

const cinerificAvatarSamples = [
  {
    label: "Boy",
    name: "Steve",
    src: "/images/cinerific/ui-foundations/avatar-steve.png",
  },
  {
    label: "Girl",
    name: "Janny",
    src: "/images/cinerific/ui-foundations/avatar-janny.png",
  },
  {
    label: "Gender Neutral",
    name: "Martin",
    src: "/images/cinerific/ui-foundations/avatar-martin.png",
  },
  {
    label: "Guest",
    name: "Guest",
    src: "/images/cinerific/ui-foundations/avatar-guest.png",
  },
];

const cinerificTitleCardSamples = [
  {
    height: 526,
    label: "During Navigation",
    presentation: "card" as const,
    src: "/images/cinerific/ui-foundations/one-last-breath-700x526.webp",
    width: 700,
  },
  {
    height: 834,
    label: "In Hero",
    presentation: "hero" as const,
    src: "/images/cinerific/ui-foundations/one-last-breath-1194x834.webp",
    width: 1194,
  },
];

const browseSelectionNodeLayout = [
  { title: "Genre", width: 180, x: 350, y: -196 },
  { title: "Order", width: 180, x: 610, y: -196 },
  { title: "ALL", width: 90, x: 300, y: 0 },
  { title: "Action", width: 110, x: 420, y: 0 },
  { title: "Comedy", width: 120, x: 555, y: 0 },
  { title: "Thriller", width: 110, x: 705, y: 0 },
  { title: "Horror", width: 110, x: 300, y: 140 },
  { title: "Drama", width: 110, x: 420, y: 140 },
  { title: "Doc", width: 90, x: 555, y: 140 },
  { title: "Romance", width: 120, x: 705, y: 140 },
];

const browseSelectionNodes: FlowBox[] = browseSelectionNodeLayout.map((node) => ({
  height: 84,
  ...node,
  y: 1080 + node.y,
}));

const flowNodes: FlowBox[] = [
  { height: 84, title: "Hero", width: 119.8, x: 318.1, y: 308.5 },
  {
    height: 84,
    title: "Create My Account",
    width: 175,
    x: 403.7,
    y: 441.1,
  },
  { height: 84, title: "Sign In", width: 155.3, x: 506.4, y: 308.5 },
  {
    height: 84,
    title: "Forgot Username",
    width: 165,
    x: 615.6,
    y: 441.1,
  },
  { height: 84, title: "Home", width: 112, x: 511, y: 629.3 },
  ...browseSelectionNodes,
];

function getFlowXPercent(x: number) {
  return ((x - flowCoordinateFrame.x) / flowCoordinateFrame.width) * 100;
}

function getFlowYPercent(y: number) {
  return ((y - flowCoordinateFrame.y) / flowCoordinateFrame.height) * 100;
}

function getFlowBoxStyle(box: FlowBox): FlowBoxStyle {
  return {
    "--flow-box-center-left": `${getFlowXPercent(box.x + box.width / 2)}%`,
    "--flow-box-height": `${(box.height / flowCoordinateFrame.height) * 100}%`,
    "--flow-box-left": `${getFlowXPercent(box.x)}%`,
    "--flow-box-opacity": box.opacity ?? 1,
    "--flow-box-top": `${getFlowYPercent(box.y)}%`,
    "--flow-box-width": `${(box.width / flowCoordinateFrame.width) * 100}%`,
  };
}

function getFlowDividerStyle(y: number): FlowDividerStyle {
  return {
    "--flow-connector-left": `${getFlowXPercent(204)}%`,
    "--flow-connector-length": `${((930 - 204) / flowCoordinateFrame.width) * 100}%`,
    "--flow-connector-top": `${getFlowYPercent(y)}%`,
  };
}

function ProductFlowDiagram() {
  return (
    <figure
      aria-label="Cinerific product flow diagram"
      className="flow-primary-visual flow-chart-mockup flow-chart-table-mockup cinerific-flow-chart-table-mockup"
    >
      <div className="flow-table-frame">
        <div className="flow-diagram-background-plane" aria-hidden>
          <span
            className="flow-diagram-panel-plane"
            style={getFlowBoxStyle(flowPanel)}
          />
        </div>

        <div className="flow-diagram-coordinate-plane" aria-hidden>
          <div className="flow-diagram-connector-layer">
            {flowDividerYPositions.map((y) => (
              <span
                className="flow-diagram-connector-segment flow-diagram-connector-segment-horizontal flow-diagram-connector-segment-hairline"
                key={y}
                style={getFlowDividerStyle(y)}
              />
            ))}
          </div>

          {flowRails.map((rail) => (
            <span
              className="flow-diagram-rail"
              key={rail.title}
              style={getFlowBoxStyle(rail)}
            >
              <span>{rail.title}</span>
            </span>
          ))}

          {flowNodes.map((node) => (
            <span
              className="flow-diagram-node"
              key={`${node.title}-${node.y}`}
              style={getFlowBoxStyle(node)}
            >
              {node.title}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}

function FoundationSwatchCard({ swatch }: { swatch: FoundationSwatch }) {
  return (
    <figure className="flow-screen flow-screen-compact flow-screen-swatch cinerific-foundation-card">
      <span className="flow-screen-label">{swatch.name}</span>
      <div
        className="flow-image-frame cinerific-color-swatch"
        style={{ background: swatch.hex, color: swatch.text }}
      >
        <span>{swatch.hex}</span>
      </div>
    </figure>
  );
}

function FoundationTypeCard({ sample }: { sample: FoundationTypeSample }) {
  return (
    <figure className="flow-screen flow-screen-compact flow-screen-swatch cinerific-foundation-card">
      <span className="flow-screen-label">{sample.label}</span>
      <div className="flow-image-frame cinerific-type-sample">
        {sample.artwork ? (
          <span
            aria-label={sample.artwork.alt}
            className="cinerific-broadway-word"
            role="img"
          />
        ) : (
          <strong style={{ fontWeight: sample.weight }}>{sample.sample}</strong>
        )}
      </div>
    </figure>
  );
}

function FoundationSpacingCard({
  sample,
}: {
  sample: FoundationSpacingSample;
}) {
  return (
    <figure className="flow-screen flow-screen-compact flow-screen-swatch cinerific-foundation-card">
      <span className="flow-screen-label">{sample.label} Spacing</span>
      <div className="flow-image-frame cinerific-spacing-sample">
        {sample.tokens.map((token) => (
          <div className="cinerific-spacing-token" key={token}>
            <span
              aria-hidden
              style={{ width: `${Math.max(18, token * 0.82)}%` }}
            />
            <small>{token} dp</small>
          </div>
        ))}
      </div>
    </figure>
  );
}

function FoundationLogoCard({ withEyes }: { withEyes: boolean }) {
  const label = withEyes ? "With Googly Eyes" : "Without Googly Eyes";

  return (
    <figure className="flow-screen flow-screen-compact flow-screen-swatch cinerific-foundation-card cinerific-logo-card">
      <span className="flow-screen-label">{label}</span>
      <div
        aria-label={`Cinerific logo ${label.toLowerCase()}`}
        className="flow-image-frame cinerific-logo-sample"
        role="img"
      >
        <Image
          alt=""
          className="cinerific-logo-layer"
          fill
          sizes="(orientation: portrait) 100vw, 318px"
          src="/images/cinerific/ui-foundations/logo-simple.png"
        />
        {withEyes ? (
          <Image
            alt=""
            className="cinerific-logo-layer"
            fill
            sizes="(orientation: portrait) 100vw, 318px"
            src="/images/cinerific/ui-foundations/logo-eyes.png"
          />
        ) : null}
      </div>
    </figure>
  );
}

function FoundationAvatar({
  label,
  name,
  src,
}: {
  label: string;
  name: string;
  src: string;
}) {
  return (
    <figure className="flow-screen cinerific-avatar-card">
      <span className="flow-screen-label">{label}</span>
      <Image
        alt={`${name} Cinerific profile avatar`}
        className="cinerific-avatar-image"
        height={1270}
        sizes="(orientation: portrait) 50vw, 152px"
        src={src}
        width={1270}
      />
    </figure>
  );
}

function FoundationTitleCard({
  height,
  label,
  presentation,
  src,
  width,
}: {
  height: number;
  label: string;
  presentation: "card" | "hero";
  src: string;
  width: number;
}) {
  return (
    <figure className="flow-screen cinerific-title-card">
      <span className="flow-screen-label">{label}</span>
      <Image
        alt={`One Last Breath title card, ${label}`}
        className={`cinerific-title-card-image cinerific-title-card-image-${presentation}`}
        height={height}
        sizes="(orientation: portrait) 100vw, 318px"
        src={src}
        width={width}
      />
    </figure>
  );
}

function FoundationLoadingSpinner() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="cinerific-loading-spinner-demo">
      <div
        aria-label="Cinerific loading spinner"
        className={`cinerific-loading-spinner${isPaused ? " is-paused" : ""}`}
        role="img"
      >
        <Image
          alt=""
          className="cinerific-loading-spinner-layer cinerific-loading-spinner-red-star"
          fill
          sizes="(max-width: 720px) calc((min(42vw, 146px) * 2) + 12px), 318px"
          src="/images/cinerific/ui-foundations/loading-spinner-red-star.png"
        />
        <Image
          alt=""
          className="cinerific-loading-spinner-layer cinerific-loading-spinner-wheel"
          fill
          sizes="(max-width: 720px) calc((min(42vw, 146px) * 2) + 12px), 318px"
          src="/images/cinerific/ui-foundations/loading-spinner-wheel.png"
        />
        <Image
          alt=""
          className="cinerific-loading-spinner-layer cinerific-loading-spinner-mini-star"
          fill
          sizes="(max-width: 720px) calc((min(42vw, 146px) * 2) + 12px), 318px"
          src="/images/cinerific/ui-foundations/loading-spinner-mini-star.png"
        />
      </div>
      <button
        aria-label={isPaused ? "Resume loading spinner" : "Pause loading spinner"}
        aria-pressed={isPaused}
        className="cinerific-loading-spinner-toggle"
        onClick={() => setIsPaused((current) => !current)}
        type="button"
      >
        {isPaused ? (
          <Play aria-hidden fill="currentColor" size={20} />
        ) : (
          <Pause aria-hidden fill="currentColor" size={20} />
        )}
      </button>
    </div>
  );
}

function useIsNarrowFoundationLayout() {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const handleChange = () => setIsNarrow(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isNarrow;
}

function ExpandableFoundationGroups({
  groups,
}: {
  groups: FoundationAssetGroup[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isNarrow = useIsNarrowFoundationLayout();
  const extraGroupsId = useId();
  const visibleGroupCount = isNarrow ? 1 : 2;
  const visibleGroups = groups.slice(0, visibleGroupCount);
  const extraGroups = groups.slice(visibleGroupCount);
  const renderGroup = (group: FoundationAssetGroup) => (
    <div
      className={["flow-screen-stack", group.className]
        .filter(Boolean)
        .join(" ")}
      key={group.title}
    >
      <h4>{group.title}</h4>
      <div className="flow-screen-stack-captures">{group.cards}</div>
    </div>
  );

  return (
    <>
      <div className="flow-capture-grid">{visibleGroups.map(renderGroup)}</div>
      {extraGroups.length > 0 ? (
        <>
          <div className="flow-browse-toggle-row">
            <button
              aria-controls={extraGroupsId}
              aria-expanded={isExpanded}
              className="button button-secondary flow-browse-toggle"
              onClick={() => setIsExpanded((current) => !current)}
              type="button"
            >
              {isExpanded ? (
                <ChevronUp aria-hidden size={18} />
              ) : (
                <ChevronDown aria-hidden size={18} />
              )}
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
          <div
            aria-hidden={!isExpanded}
            className={`flow-browse-extra${isExpanded ? " is-open" : ""}`}
            id={extraGroupsId}
          >
            <div className="flow-capture-grid">
              {extraGroups.map(renderGroup)}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function CinerificFoundationAssets({ title }: { title: string }) {
  if (title === "Colors & Theming") {
    return (
      <ExpandableFoundationGroups
        groups={cinerificColorGroups.map((group) => ({
          cards: group.swatches.map((swatch) => (
            <FoundationSwatchCard key={swatch.hex} swatch={swatch} />
          )),
          title: group.title,
        }))}
      />
    );
  }

  if (title === "Typography & Spacing") {
    return (
      <ExpandableFoundationGroups
        groups={[
          {
            cards: cinerificTypeSamples.map((sample) => (
              <FoundationTypeCard key={sample.label} sample={sample} />
            )),
            title: "Fonts",
          },
          {
            cards: cinerificSpacingSamples.map((sample) => (
              <FoundationSpacingCard key={sample.label} sample={sample} />
            )),
            title: "Spacing Scale",
          },
        ]}
      />
    );
  }

  if (title === "Iconography & Imagery") {
    return (
      <ExpandableFoundationGroups
        groups={[
          {
            cards: (
              <>
                <FoundationLogoCard withEyes />
                <FoundationLogoCard withEyes={false} />
              </>
            ),
            className: "cinerific-foundation-stack-full",
            title: "Logo",
          },
          {
            cards: cinerificAvatarSamples.map((avatar) => (
              <FoundationAvatar key={avatar.name} {...avatar} />
            )),
            className: "cinerific-foundation-stack-full",
            title: "Avatars",
          },
          {
            cards: cinerificTitleCardSamples.map((titleCard) => (
              <FoundationTitleCard key={titleCard.label} {...titleCard} />
            )),
            className: "cinerific-foundation-stack-full",
            title: "Title Cards",
          },
        ]}
      />
    );
  }

  if (title === "Animations") {
    return (
      <ExpandableFoundationGroups
        groups={[
          {
            cards: <FoundationLoadingSpinner />,
            title: "Loading Spinner",
          },
        ]}
      />
    );
  }

  return null;
}

export default function ProductFlowSwitcher({
  children,
}: {
  children: ReactNode;
}) {
  const [activeView, setActiveView] = useState<FlowView>("ux");
  const [scrollRequestId, setScrollRequestId] = useState(0);
  const pendingScrollRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const viewStartRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [navStyle, setNavStyle] = useState<ProductFlowNavStyle>({
    "--product-flow-nav-fixed-left": "0px",
    "--product-flow-nav-fixed-width": "100%",
    "--product-flow-nav-measured-height": "var(--product-flow-nav-height)",
  });
  const isUiFoundations = activeView === "ui";

  const switchView = (nextView: FlowView) => {
    pendingScrollRef.current = true;
    setActiveView(nextView);
    setScrollRequestId((currentId) => currentId + 1);
  };

  useEffect(() => {
    const syncViewFromHash = () => {
      const hashView: FlowView | null =
        window.location.hash === "#ui-foundations"
          ? "ui"
          : window.location.hash === "#ux-product-flow"
            ? "ux"
            : null;

      if (hashView) {
        switchView(hashView);
      }
    };

    syncViewFromHash();
    window.addEventListener("hashchange", syncViewFromHash);

    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const navWrap = navWrapRef.current;
    const productFlowSection = navWrap?.closest<HTMLElement>("#product-flow");

    if (!nav || !navWrap || !productFlowSection) {
      return undefined;
    }

    let frameId = 0;

    const setPinnedFromAnchor = () => {
      const anchorTop = navWrap.getBoundingClientRect().top + window.scrollY;
      const sectionBottom =
        productFlowSection.getBoundingClientRect().bottom + window.scrollY;
      const navTop = Number.parseFloat(window.getComputedStyle(nav).top) || 0;
      const pinnedNavBottom = window.scrollY + navTop + nav.offsetHeight;
      const shouldPin =
        window.scrollY >= anchorTop && pinnedNavBottom < sectionBottom;

      setIsPinned((currentValue) =>
        currentValue === shouldPin ? currentValue : shouldPin,
      );
    };

    const measureNav = () => {
      frameId = 0;

      const navWrapRect = navWrap.getBoundingClientRect();
      const nextStyle: ProductFlowNavStyle = {
        "--product-flow-nav-fixed-left": `${navWrapRect.left}px`,
        "--product-flow-nav-fixed-width": `${navWrapRect.width}px`,
        "--product-flow-nav-measured-height": `${nav.offsetHeight}px`,
      };

      setNavStyle((currentStyle) =>
        currentStyle["--product-flow-nav-fixed-left"] ===
          nextStyle["--product-flow-nav-fixed-left"] &&
        currentStyle["--product-flow-nav-fixed-width"] ===
          nextStyle["--product-flow-nav-fixed-width"] &&
        currentStyle["--product-flow-nav-measured-height"] ===
          nextStyle["--product-flow-nav-measured-height"]
          ? currentStyle
          : nextStyle,
      );
      setPinnedFromAnchor();
    };

    const requestMeasure = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(measureNav);
      }
    };

    measureNav();
    window.addEventListener("scroll", setPinnedFromAnchor, { passive: true });
    window.addEventListener("resize", requestMeasure);

    const resizeObserver = new ResizeObserver(requestMeasure);
    resizeObserver.observe(nav);
    resizeObserver.observe(navWrap);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", setPinnedFromAnchor);
      window.removeEventListener("resize", requestMeasure);
    };
  }, []);

  useEffect(() => {
    if (!pendingScrollRef.current) {
      return undefined;
    }

    let frameId = 0;
    let timeoutId = 0;

    const scrollToViewStart = (behavior: ScrollBehavior) => {
      const viewStart = viewStartRef.current;

      if (!viewStart) {
        return;
      }

      const navHeight = navRef.current?.offsetHeight ?? 0;
      const targetTop =
        viewStart.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        18;

      window.scrollTo({ behavior, top: Math.max(0, targetTop) });
      pendingScrollRef.current = false;
    };

    frameId = window.requestAnimationFrame(() => {
      frameId = window.requestAnimationFrame(() => {
        const behavior: ScrollBehavior = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
          ? "instant"
          : "smooth";

        scrollToViewStart(behavior);
        timeoutId = window.setTimeout(() => scrollToViewStart(behavior), 220);
      });
    });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeView, scrollRequestId]);

  return (
    <>
      <div
        className={`product-flow-nav-wrap ${
          isPinned ? "product-flow-nav-pinned" : ""
        }`}
        ref={navWrapRef}
        style={navStyle}
      >
        <nav
          aria-label="Cinerific product flow navigation"
          className="product-flow-nav"
          ref={navRef}
        >
          <button
            aria-pressed={isUiFoundations}
            className={`button ${
              isUiFoundations ? "button-primary" : "button-secondary"
            }`}
            onClick={() => switchView("ui")}
            type="button"
          >
            UI Foundations
          </button>
          <button
            aria-pressed={!isUiFoundations}
            className={`button ${
              isUiFoundations ? "button-secondary" : "button-primary"
            }`}
            onClick={() => switchView("ux")}
            type="button"
          >
            UX Product Flow
          </button>
        </nav>
      </div>

      <div ref={viewStartRef}>
        {isUiFoundations ? (
          <>
            <div className="section-heading">
              <p>UI Foundations</p>
              <h2>UI Foundations</h2>
            </div>

            <div
              className="flow-layout flow-layout-single"
              id="ui-foundations"
            >
              <figure className="flow-primary-visual cinerific-ui-foundations-feature">
                <Image
                  alt="Cinerific interface preview"
                  height={625}
                  priority
                  sizes="(max-width: 720px) calc(100vw - 48px), 760px"
                  src="/images/cinerific_promo.png"
                  width={1000}
                />
              </figure>
            </div>

            <div className="flow-capture-groups">
              {uiFoundationSections.map((section) => (
                <section
                  className="flow-capture-group"
                  id={`ui-foundations-${section.title
                    .toLowerCase()
                    .replaceAll(" & ", "-")
                    .replaceAll(" ", "-")}`}
                  key={section.title}
                >
                  <div className="flow-group-header">
                    <span>UI Foundations</span>
                    <h3>{section.title}</h3>
                    {section.copy ? <p>{section.copy}</p> : null}
                  </div>
                  <div className="flow-capture-body">
                    <CinerificFoundationAssets title={section.title} />
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : (
          <div id="ux-product-flow">
            <div className="section-heading">
              <p>UX Product Flow</p>
              <h2>UX Product Flow</h2>
            </div>
            <div className="flow-layout flow-layout-single">
              <ProductFlowDiagram />
            </div>
            {children}
          </div>
        )}
      </div>
    </>
  );
}
