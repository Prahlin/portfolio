"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Cpu, Wrench } from "lucide-react";

type ProductivityHack = {
  copy: readonly [string, string, string];
  gradient: readonly [string, string, string];
  title: string;
};

type ProductivityMode = "automation" | "setup";
type CameraRotationDirection = "clockwise" | "counterclockwise";

type HackStyle = CSSProperties & {
  "--hack-color-core": string;
  "--hack-color-edge": string;
  "--hack-color-mid": string;
};

type FormationStyle = CSSProperties & {
  "--productivity-hacks-rotation": string;
};

type ApertureStyle = CSSProperties & {
  "--productivity-aperture-core": string;
  "--productivity-aperture-edge": string;
  "--productivity-aperture-mid": string;
};

const PRODUCTIVITY_HACK_UPWARD_ROTATIONS = [-144, 144, 72, 0, -72] as const;

function normalizeProductivityAngle(angle: number) {
  return ((angle + 180) % 360 + 360) % 360 - 180;
}

const PRODUCTIVITY_HACK_HIT_AREAS = [
  {
    d: "M140.24 52L53.7599 52C40.4713 52 32.3206 66.5619 39.2691 77.8891L96.5 171.185C96.729 171.558 97.271 171.558 97.5 171.185L154.731 77.8892C161.679 66.5619 153.529 52 140.24 52Z",
    transform:
      "translate(70.868 85.016) translate(132.551 131.4445) rotate(144) translate(-97 -92)",
  },
  {
    d: "M140.24 52L53.7599 52C40.4713 52 32.3206 66.5619 39.2691 77.8891L96.5 171.185C96.729 171.558 97.271 171.558 97.5 171.185L154.731 77.8892C161.679 66.5619 153.529 52 140.24 52Z",
    transform:
      "translate(-32.97 85.016) translate(132.551 131.4445) rotate(-144) translate(-97 -92)",
  },
  {
    d: "M140.24 52L53.7599 52C40.4713 52 32.3206 66.5619 39.2691 77.8891L96.5 171.185C96.729 171.558 97.271 171.558 97.5 171.185L154.731 77.8892C161.679 66.5619 153.529 52 140.24 52Z",
    transform:
      "translate(-49.979 -2.977) translate(117.472 120.682) rotate(-72) translate(-97 -92)",
  },
  {
    d: "M140.24 52L53.7599 52C40.4713 52 32.3206 66.5619 39.2691 77.8891L96.5 171.185C96.729 171.558 97.271 171.558 97.5 171.185L154.731 77.8892C161.679 66.5619 153.529 52 140.24 52Z",
    transform: "translate(54.5 -35.33)",
  },
  {
    d: "M140.24 52L53.7599 52C40.4713 52 32.3206 66.5619 39.2691 77.8891L96.5 171.185C96.729 171.558 97.271 171.558 97.5 171.185L154.731 77.8892C161.679 66.5619 153.529 52 140.24 52Z",
    transform:
      "translate(118.035 -2.977) translate(117.472 120.682) rotate(72) translate(-97 -92)",
  },
] as const;

const automationCardHeightReference =
  "GitHub Actions Automatically updates and deploys GitHub Repo Changes to the Portfolio Website";

const productivityHacks: readonly ProductivityHack[] = [
  {
    copy: [
      "Cmd + S = Crop & Save\nCmd + Shift + S = Print Screen",
      "",
      "Cmd + 1 = Read Repo\nCmd + 2 = Commit Message\nCmd + 3 = Generate Worklog",
    ],
    gradient: ["#dd4bfd", "#7a1fdd", "#6816ce"],
    title: "Shortcuts",
  },
  {
    copy: [
      automationCardHeightReference,
      "MCPs allow me to make code changes, inspect diffs, and push commits while on-the-go",
      "",
    ],
    gradient: ["#ffd102", "#e8aa01", "#cb7d00"],
    title: "Automation",
  },
  {
    copy: [
      "Multiple VSCode sessions ensures that multiple projects are worked on in tandem.",
      "Multiple AI Bots ensure that multiple apps are work on concurrently",
      "Multiple Monitors eliminates the occurence of workspace clutter.",
    ],
    gradient: ["#01abfd", "#0071f3", "#024dd0"],
    title: "Multi-",
  },
  {
    copy: ["", "", ""],
    gradient: ["#ff9a24", "#ed5d07", "#cc330f"],
    title: "System",
  },
  {
    copy: ["", "", ""],
    gradient: ["#33f150", "#099341", "#026946"],
    title: "Tuning",
  },
] as const;

const productivityHackKeywords = ["GitHub Actions", "MCPs"] as const;

function renderHighlightedHackText(text: string) {
  const keywordPattern = new RegExp(
    `(${productivityHackKeywords.join("|")})`,
    "g",
  );

  return text.split(keywordPattern).map((part, index) =>
    productivityHackKeywords.includes(
      part as (typeof productivityHackKeywords)[number],
    ) ? (
      <strong key={`${part}-${index}`}>{part}</strong>
    ) : (
      part
    ),
  );
}

const PRODUCTIVITY_MESH_SECTORS = [
  { angle: -90, color: "#ff7a1a", id: "tangerine" },
  { angle: -18, color: "#18dc78", id: "jade" },
  { angle: 54, color: "#c94cf4", id: "violet" },
  { angle: 126, color: "#f4cf20", id: "solar" },
  { angle: 198, color: "#18aef0", id: "electric-blue" },
] as const;

const PRODUCTIVITY_MESH_RAY_OFFSETS = [-28, -18, -9, 0, 9, 18, 28] as const;
const PRODUCTIVITY_MESH_CROSS_RADII = [8, 13, 20, 30, 44, 62, 86, 112] as const;

function productivityMeshPoint(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: (151.5 + Math.cos(radians) * radius).toFixed(3),
    y: (145 + Math.sin(radians) * radius).toFixed(3),
  };
}

function ProductivityDepthMesh() {
  return (
    <svg
      aria-hidden="true"
      className="productivity-hacks-perspective-mesh"
      preserveAspectRatio="none"
      viewBox="0 0 303 290"
    >
      {PRODUCTIVITY_MESH_SECTORS.map((sector) => (
        <g key={sector.id} stroke={sector.color}>
          {PRODUCTIVITY_MESH_RAY_OFFSETS.map((offset) => {
            const innerPoint = productivityMeshPoint(sector.angle + offset, 6);
            const outerPoint = productivityMeshPoint(sector.angle + offset, 112);

            return (
              <line
                className="productivity-hacks-perspective-mesh-ray"
                key={`${sector.id}-ray-${offset}`}
                x1={innerPoint.x}
                x2={outerPoint.x}
                y1={innerPoint.y}
                y2={outerPoint.y}
              />
            );
          })}

          {PRODUCTIVITY_MESH_CROSS_RADII.map((radius) => {
            const startPoint = productivityMeshPoint(sector.angle - 30, radius);
            const endPoint = productivityMeshPoint(sector.angle + 30, radius);

            return (
              <line
                className="productivity-hacks-perspective-mesh-crossline"
                key={`${sector.id}-cross-${radius}`}
                x1={startPoint.x}
                x2={endPoint.x}
                y1={startPoint.y}
                y2={endPoint.y}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function ProductivityApertureMedallion({
  hack,
  mode,
}: {
  hack: ProductivityHack;
  mode: ProductivityMode;
}) {
  return (
    <div
      aria-hidden="true"
      className="productivity-hacks-aperture-medallion"
      data-active-hack={hack.title}
      data-selected-mode={mode}
    >
      <span className="productivity-hacks-aperture-ring is-outer" />
      <span className="productivity-hacks-aperture-ring is-inner" />
      <span className="productivity-hacks-aperture-iris" />
      <span className="productivity-hacks-aperture-symbol">
        <Wrench
          className="productivity-hacks-aperture-mode-icon is-automation"
          strokeWidth={1.9}
        />
        <Cpu
          className="productivity-hacks-aperture-mode-icon is-setup"
          strokeWidth={1.9}
        />
      </span>
    </div>
  );
}

function CircuitRibbon() {
  return (
    <svg
      aria-hidden="true"
      className="productivity-hacks-ribbon"
      preserveAspectRatio="none"
      viewBox="0 0 1200 560"
    >
      <defs>
        <linearGradient id="productivity-star-outline" x1="0%" x2="100%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#e8aa01" />
          <stop offset="50%" stopColor="#0071f3" />
          <stop offset="100%" stopColor="#ed5d07" />
        </linearGradient>
        <mask id="productivity-ribbon-star-cutout">
          <rect fill="white" height="560" width="1200" />
          <polygon
            fill="black"
            points="600,299 620,354 679,356 632,391 648,448 600,414 552,448 568,391 521,356 580,354"
          />
        </mask>
      </defs>

      <g mask="url(#productivity-ribbon-star-cutout)">
        <path
          className="productivity-ribbon-segment productivity-ribbon-segment--purple"
          d="M -60 266 L 125 207 L 252 280"
        />
        <path
          className="productivity-ribbon-segment productivity-ribbon-segment--yellow"
          d="M 252 280 L 420 380 L 542 321"
        />
        <path
          className="productivity-ribbon-segment productivity-ribbon-segment--blue"
          d="M 542 321 L 600 210 L 658 321"
        />
        <path
          className="productivity-ribbon-segment productivity-ribbon-segment--orange"
          d="M 658 321 L 780 380 L 948 280"
        />
        <path
          className="productivity-ribbon-segment productivity-ribbon-segment--green"
          d="M 948 280 L 1075 207 L 1260 266"
        />
      </g>

      <g className="productivity-ribbon-traces">
        <path d="M 0 244 L 124 201 L 251 274" />
        <path d="M 949 274 L 1076 201 L 1200 244" />
        <path d="M 276 296 L 421 374 L 526 323" />
        <path d="M 674 323 L 779 374 L 924 296" />
        <path d="M 557 303 L 600 224 L 643 303" />
      </g>

      <polygon
        className="productivity-ribbon-star-outline"
        points="600,299 620,354 679,356 632,391 648,448 600,414 552,448 568,391 521,356 580,354"
      />
    </svg>
  );
}

export function ProductivityHacks() {
  const [activeHack, setActiveHack] = useState<number | null>(null);
  const [hoveredHack, setHoveredHack] = useState<number | null>(null);
  const [isFormationAnimating, setIsFormationAnimating] = useState(false);
  const [isFormationFolded, setIsFormationFolded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [cameraRotationDirection, setCameraRotationDirection] =
    useState<CameraRotationDirection>("clockwise");
  const [selectedProductivityMode, setSelectedProductivityMode] =
    useState<ProductivityMode>("automation");
  const formationAnimationTimerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const formationAnimationFrameRef = useRef<number[]>([]);

  useEffect(
    () => () => {
      formationAnimationTimerRef.current.forEach(clearTimeout);
      formationAnimationFrameRef.current.forEach(cancelAnimationFrame);
    },
    [],
  );

  const rotateHackUpward = (index: number) => {
    if (index === activeHack || isFormationAnimating) {
      return;
    }

    const clickedTriangleAngle = normalizeProductivityAngle(
      rotation - PRODUCTIVITY_HACK_UPWARD_ROTATIONS[index],
    );

    if (clickedTriangleAngle < 0) {
      setCameraRotationDirection("counterclockwise");
    } else if (clickedTriangleAngle > 0) {
      setCameraRotationDirection("clockwise");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRotation(PRODUCTIVITY_HACK_UPWARD_ROTATIONS[index]);
      setActiveHack(index);
      return;
    }

    formationAnimationTimerRef.current.forEach(clearTimeout);
    formationAnimationFrameRef.current.forEach(cancelAnimationFrame);
    formationAnimationTimerRef.current = [];
    formationAnimationFrameRef.current = [];

    setIsFormationAnimating(true);
    setIsFormationFolded(true);

    const foldTimer = setTimeout(() => {
      setRotation(PRODUCTIVITY_HACK_UPWARD_ROTATIONS[index]);
      setActiveHack(index);

      const swapFrame = requestAnimationFrame(() => {
        const unfoldFrame = requestAnimationFrame(() => {
          setIsFormationFolded(false);
        });

        formationAnimationFrameRef.current.push(unfoldFrame);
      });

      formationAnimationFrameRef.current.push(swapFrame);
    }, 500);
    const settleTimer = setTimeout(() => {
      setIsFormationAnimating(false);
      formationAnimationTimerRef.current = [];
      formationAnimationFrameRef.current = [];
    }, 1120);

    formationAnimationTimerRef.current = [foldTimer, settleTimer];
  };

  const formationStyle: FormationStyle = {
    "--productivity-hacks-rotation": `${rotation}deg`,
  };
  const activeProductivityHack = productivityHacks[activeHack ?? 3];
  const activeProductivityStyle: ApertureStyle = {
    "--productivity-aperture-core": activeProductivityHack.gradient[0],
    "--productivity-aperture-mid": activeProductivityHack.gradient[1],
    "--productivity-aperture-edge": activeProductivityHack.gradient[2],
  };

  return (
    <section className="productivity-hacks-section" id="productivity-hacks">
      <div className="site-shell">
        <div className="aboutdev-section-head productivity-hacks-head">
          <div>
            <p className="aboutdev-eyebrow">Tools, Systems &amp; Shortcuts</p>
            <h2>Productivity Hacks</h2>
          </div>
          <p>Brief placeholder introduction for the productivity hacks section.</p>
        </div>

        <div
          aria-label="Choose Automation or Setup"
          className={`productivity-hacks-mode-selector${
            isFormationAnimating ? " is-formation-animating" : ""
          }${isFormationFolded ? " is-formation-folded" : ""}`}
          data-camera-rotation-direction={cameraRotationDirection}
          data-selected-mode={selectedProductivityMode}
          role="group"
          style={activeProductivityStyle}
        >
          <svg
            aria-hidden="true"
            className="productivity-hacks-inactive-text-filter-defs"
          >
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                height="140%"
                id="productivity-hacks-inactive-text-outline"
                width="140%"
                x="-20%"
                y="-20%"
              >
                <feComponentTransfer in="SourceAlpha" result="solid-alpha">
                  <feFuncA intercept="0" slope="1000" type="linear" />
                </feComponentTransfer>
                <feMorphology
                  in="solid-alpha"
                  operator="dilate"
                  radius="1"
                  result="expanded-alpha"
                />
                <feComposite
                  in="expanded-alpha"
                  in2="solid-alpha"
                  operator="out"
                  result="outline-alpha"
                />
                <feFlood
                  floodColor="#c6ffd9"
                  floodOpacity="0.5"
                  result="outline-color"
                />
                <feComposite
                  in="outline-color"
                  in2="outline-alpha"
                  operator="in"
                />
              </filter>
            </defs>
          </svg>
          <span
            aria-hidden="true"
            className="productivity-hacks-mode-selector-frame"
          />
          <ProductivityApertureMedallion
            hack={activeProductivityHack}
            mode={selectedProductivityMode}
          />
          <button
            aria-label="Automation"
            aria-pressed={selectedProductivityMode === "automation"}
            className={`productivity-hacks-mode-button is-automation${
              selectedProductivityMode === "automation" ? " is-selected" : ""
            }`}
            onClick={() => setSelectedProductivityMode("automation")}
            type="button"
          >
            <span aria-hidden="true">
              AUTO-
              <br />
              MATION
            </span>
          </button>
          <button
            aria-label="Office setup"
            aria-pressed={selectedProductivityMode === "setup"}
            className={`productivity-hacks-mode-button is-setup${
              selectedProductivityMode === "setup" ? " is-selected" : ""
            }`}
            onClick={() => setSelectedProductivityMode("setup")}
            type="button"
          >
            <span aria-hidden="true">
              OFFICE
              <br />
              SETUP
            </span>
          </button>
        </div>

        <div
          className={`productivity-hacks-bench${
            isFormationAnimating ? " is-formation-animating" : ""
          }${isFormationFolded ? " is-formation-folded" : ""}`}
          style={formationStyle}
        >
          <CircuitRibbon />
          <div className="productivity-hacks-mobile-spine" aria-hidden="true" />
          <div className="productivity-hacks-center-rays" aria-hidden="true" />

          <svg
            aria-hidden="true"
            className="productivity-hack-triangle-definitions"
            focusable="false"
          >
            <defs>
              <clipPath
                id="productivity-triangle-up"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M .455 .09 Q .5 .005 .545 .09 L .94 .87 Q 1 .995 .86 .995 L .14 .995 Q 0 .995 .06 .87 L .455 .09 Z" />
              </clipPath>
              <clipPath
                id="productivity-triangle-down"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M .14 .005 Q 0 .005 .06 .13 L .455 .91 Q .5 .995 .545 .91 L .94 .13 Q 1 .005 .86 .005 Z" />
              </clipPath>
            </defs>
          </svg>

          <div
            aria-hidden="true"
            className="productivity-hacks-figma-formation"
          >
            <img
              alt=""
              className="productivity-hacks-figma-layer productivity-hacks-figma-layer--jade"
              height="241.364"
              src="/images/productivity-hacks-figma-jade-inward-fade.svg?v=frame15-gradient-fill-sharp-tips-1"
              width="234.944"
            />
            <img
              alt=""
              className="productivity-hacks-figma-layer productivity-hacks-figma-layer--solar"
              height="262.889"
              src="/images/productivity-hacks-figma-solar-inward-fade.svg?v=frame15-gradient-fill-sharp-tips-1"
              width="265.102"
            />
            <img
              alt=""
              className="productivity-hacks-figma-layer productivity-hacks-figma-layer--violet"
              height="262.889"
              src="/images/productivity-hacks-figma-violet-inward-fade.svg?v=frame15-gradient-fill-sharp-tips-1"
              width="265.102"
            />
            <img
              alt=""
              className="productivity-hacks-figma-layer productivity-hacks-figma-layer--electric-blue"
              height="241.364"
              src="/images/productivity-hacks-figma-electric-blue-inward-fade.svg?v=frame15-gradient-fill-sharp-tips-1"
              width="234.944"
            />
            <img
              alt=""
              className="productivity-hacks-figma-layer productivity-hacks-figma-layer--tangerine"
              height="184"
              src="/images/productivity-hacks-figma-tangerine-inward-fade.svg?v=frame15-gradient-fill-sharp-tips-1"
              width="194"
            />
            <span className="productivity-hacks-figma-registration-dot" />
            <ProductivityDepthMesh />
          </div>

          <div className="productivity-hacks-track">
            {productivityHacks.map((hack, index) => {
              const activeCopy = hack.copy[0];
              const style: HackStyle = {
                "--hack-color-core": hack.gradient[0],
                "--hack-color-mid": hack.gradient[1],
                "--hack-color-edge": hack.gradient[2],
              };

              return (
                <article
                  className={`productivity-hack-card productivity-hack-card--triangle ${
                    index % 2 === 0
                      ? "productivity-hack-card--triangle-up"
                      : "productivity-hack-card--triangle-down"
                  }${
                    hoveredHack === index ? " is-productivity-focused" : ""
                  }`}
                  data-hack-index={String(index + 1).padStart(2, "0")}
                  key={hack.title}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") setHoveredHack(index);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType !== "touch") setHoveredHack(null);
                  }}
                  style={style}
                >
                  <span
                    className="productivity-hack-card-star"
                    aria-hidden="true"
                  />
                  <span
                    className="productivity-hack-card-rivet productivity-hack-card-rivet--top"
                    aria-hidden="true"
                  />
                  <span
                    className="productivity-hack-card-rivet productivity-hack-card-rivet--bottom"
                    aria-hidden="true"
                  />

                  <svg
                    aria-hidden="true"
                    className="productivity-hack-triangle-outline"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d={
                        index % 2 === 0
                          ? "M 45.5 9 Q 50 .5 54.5 9 L 94 87 Q 100 99.5 86 99.5 L 14 99.5 Q 0 99.5 6 87 L 45.5 9 Z"
                          : "M 14 .5 Q 0 .5 6 13 L 45.5 91 Q 50 99.5 54.5 91 L 94 13 Q 100 .5 86 .5 Z"
                      }
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  <div className="productivity-hack-content">
                    <div className="productivity-hack-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="productivity-hack-copy">
                      <h3>{hack.title}</h3>
                      <p
                        aria-hidden="true"
                        className="productivity-hack-height-sizer"
                      >
                        {renderHighlightedHackText(automationCardHeightReference)}
                      </p>
                      {activeCopy ? (
                        <p>
                          {activeCopy.split("\n").map((line) => {
                            const [shortcut, action] = line.split(" = ");

                            return (
                              <span key={line}>
                                {action ? (
                                  <>
                                    <strong>{shortcut}</strong>
                                    {" = "}
                                    {renderHighlightedHackText(action)}
                                  </>
                                ) : (
                                  renderHighlightedHackText(line)
                                )}
                              </span>
                            );
                          })}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <svg
            aria-label="Rotate a productivity triangle base upward"
            className="productivity-hacks-hit-areas"
            preserveAspectRatio="none"
            role="group"
            viewBox="0 0 303 290"
          >
            {PRODUCTIVITY_HACK_HIT_AREAS.map((area, index) => {
              const hack = productivityHacks[index];
              const isActive = activeHack === index;

              return (
                <path
                  aria-label={
                    isActive
                      ? `${hack.title} triangle base faces upward`
                      : `Rotate the ${hack.title} triangle base upward`
                  }
                  aria-pressed={isActive}
                  className="productivity-hacks-hit-area"
                  d={area.d}
                  data-hack-index={String(index + 1).padStart(2, "0")}
                  key={hack.title}
                  onClick={() => rotateHackUpward(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      rotateHackUpward(index);
                    }
                  }}
                  onPointerDown={(event) => {
                    event.preventDefault();
                  }}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") setHoveredHack(index);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType !== "touch") setHoveredHack(null);
                  }}
                  role="button"
                  tabIndex={0}
                  transform={area.transform}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
