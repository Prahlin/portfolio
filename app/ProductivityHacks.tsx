import type { CSSProperties } from "react";
import {
  Blocks,
  Cpu,
  Gauge,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type ProductivityHack = {
  copy: string;
  gradient: readonly [string, string, string];
  icon: LucideIcon;
  title: string;
};

type HackStyle = CSSProperties & {
  "--hack-color-core": string;
  "--hack-color-edge": string;
  "--hack-color-mid": string;
};

const productivityHacks: readonly ProductivityHack[] = [
  {
    copy: "Short placeholder copy for the first productivity hack.",
    gradient: ["#dd4bfd", "#7a1fdd", "#6816ce"],
    icon: Cpu,
    title: "Shortcut Placeholder",
  },
  {
    copy: "Brief placeholder paragraph for a tool, technique, or repeatable productivity habit.",
    gradient: ["#ffd102", "#e8aa01", "#cb7d00"],
    icon: Wrench,
    title: "Tooling Placeholder",
  },
  {
    copy: "Temporary supporting copy for the central productivity card.",
    gradient: ["#01abfd", "#0071f3", "#024dd0"],
    icon: Terminal,
    title: "Terminal Placeholder",
  },
  {
    copy: "Placeholder text that can later be replaced by a slightly longer practical explanation.",
    gradient: ["#ffdf02", "#ed5d07", "#cc330f"],
    icon: Blocks,
    title: "System Placeholder",
  },
  {
    copy: "Short placeholder paragraph for the final productivity hack.",
    gradient: ["#33f150", "#099341", "#026946"],
    icon: Gauge,
    title: "Tuning Placeholder",
  },
] as const;

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

        <div className="productivity-hacks-bench">
          <CircuitRibbon />
          <div className="productivity-hacks-mobile-spine" aria-hidden="true" />

          <div className="productivity-hacks-track">
            {productivityHacks.map((hack, index) => {
              const Icon = hack.icon;
              const style: HackStyle = {
                "--hack-color-core": hack.gradient[0],
                "--hack-color-mid": hack.gradient[1],
                "--hack-color-edge": hack.gradient[2],
              };

              return (
                <article
                  className="productivity-hack-card"
                  data-hack-index={String(index + 1).padStart(2, "0")}
                  key={hack.title}
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

                  <div className="productivity-hack-icon" aria-hidden="true">
                    <Icon strokeWidth={2.15} />
                  </div>

                  <div className="productivity-hack-copy">
                    <h3>{hack.title}</h3>
                    <p>{hack.copy}</p>
                    <div
                      className="productivity-hack-indicators"
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="productivity-hack-preview" aria-hidden="true">
                    <span />
                    <span />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
