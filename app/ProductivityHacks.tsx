"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Blocks,
  Cpu,
  Gauge,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type ProductivityHack = {
  copy: readonly [string, string, string];
  gradient: readonly [string, string, string];
  icon: LucideIcon;
  title: string;
};

type HackStyle = CSSProperties & {
  "--hack-color-core": string;
  "--hack-color-edge": string;
  "--hack-color-mid": string;
};

type FormationStyle = CSSProperties & {
  "--productivity-hacks-rotation": string;
};

const PRODUCTIVITY_HACK_UPWARD_ROTATIONS = [-144, 144, 72, 0, -72] as const;

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
    icon: Cpu,
    title: "Shortcuts",
  },
  {
    copy: [
      automationCardHeightReference,
      "MCPs allow me to make code changes, inspect diffs, and push commits while on-the-go",
      "",
    ],
    gradient: ["#ffd102", "#e8aa01", "#cb7d00"],
    icon: Wrench,
    title: "Automation",
  },
  {
    copy: [
      "Multiple VSCode sessions ensures that multiple projects are worked on in tandem.",
      "Multiple AI Bots ensure that multiple apps are work on concurrently",
      "Multiple Monitors eliminates the occurence of workspace clutter.",
    ],
    gradient: ["#01abfd", "#0071f3", "#024dd0"],
    icon: Terminal,
    title: "Multi-",
  },
  {
    copy: ["", "", ""],
    gradient: ["#ff9a24", "#ed5d07", "#cc330f"],
    icon: Blocks,
    title: "System",
  },
  {
    copy: ["", "", ""],
    gradient: ["#33f150", "#099341", "#026946"],
    icon: Gauge,
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
  const [selectedProductivityMode, setSelectedProductivityMode] = useState<
    "automation" | "setup"
  >("automation");
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
          className="productivity-hacks-mode-selector"
          data-selected-mode={selectedProductivityMode}
          role="group"
        >
          <span
            aria-hidden="true"
            className="productivity-hacks-mode-selector-frame"
          />
          <button
            aria-pressed={selectedProductivityMode === "automation"}
            className={`productivity-hacks-mode-button is-automation${
              selectedProductivityMode === "automation" ? " is-selected" : ""
            }`}
            onClick={() => setSelectedProductivityMode("automation")}
            type="button"
          >
            <span>AUTOMATION</span>
          </button>
          <button
            aria-pressed={selectedProductivityMode === "setup"}
            className={`productivity-hacks-mode-button is-setup${
              selectedProductivityMode === "setup" ? " is-selected" : ""
            }`}
            onClick={() => setSelectedProductivityMode("setup")}
            type="button"
          >
            <span>SETUP</span>
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
          </div>

          <div className="productivity-hacks-track">
            {productivityHacks.map((hack, index) => {
              const Icon = hack.icon;
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
                    <div className="productivity-hack-icon" aria-hidden="true">
                      <Icon strokeWidth={2.15} />
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

                    <div className="productivity-hack-preview" aria-hidden="true">
                      <span />
                      <span />
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
