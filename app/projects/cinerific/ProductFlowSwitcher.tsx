"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

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
          <div className="section-heading" id="ui-foundations">
            <p>UI Foundations</p>
            <h2>UI Foundations</h2>
          </div>
        ) : (
          <div id="ux-product-flow">
            <div className="section-heading">
              <p>Product Flow</p>
              <h2>Product Flow</h2>
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
