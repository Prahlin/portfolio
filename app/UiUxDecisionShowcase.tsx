import Image from "next/image";
import { ImageIcon } from "lucide-react";

export type UiUxNoodlePoint = readonly [x: number, y: number];

export type UiUxDecision = {
  description: string;
  number: string;
  noodle: readonly UiUxNoodlePoint[];
  side: "left" | "right";
  title: string;
};

type UiUxDecisionShowcaseProps = {
  decisions: readonly UiUxDecision[];
  eyebrow?: string;
  screenshotAlt?: string;
  screenshotFit?: "contain" | "cover";
  screenshotPosition?: string;
  screenshotSrc?: string;
  subtitle: string;
  title: string;
};

const STAGE_WIDTH = 1180;
const STAGE_HEIGHT = 650;

function UiUxNoodle({ decision }: { decision: UiUxDecision }) {
  const lastPoint = decision.noodle.at(-1);

  if (!lastPoint) {
    return null;
  }

  return (
    <g className="uiux-noodle">
      <polyline points={decision.noodle.map((point) => point.join(",")).join(" ")} />
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="4.5" />
    </g>
  );
}

function UiUxDecisionCard({ decision }: { decision: UiUxDecision }) {
  return (
    <article className="uiux-decision-card">
      <span className="uiux-decision-number">{decision.number}</span>
      <span className="uiux-decision-copy">
        <strong>{decision.title}</strong>
        <span>{decision.description}</span>
      </span>
    </article>
  );
}

export function UiUxDeviceFrame({
  screenshotAlt = "UI design screenshot",
  screenshotFit = "cover",
  screenshotPosition = "center",
  screenshotSrc,
}: Pick<
  UiUxDecisionShowcaseProps,
  "screenshotAlt" | "screenshotFit" | "screenshotPosition" | "screenshotSrc"
>) {
  return (
    <figure className="uiux-device-frame">
      <div className="uiux-device-screen">
        {screenshotSrc ? (
          <Image
            alt={screenshotAlt}
            className="uiux-device-screenshot"
            fill
            sizes="(max-width: 820px) 66vw, 270px"
            src={screenshotSrc}
            style={{ objectFit: screenshotFit, objectPosition: screenshotPosition }}
          />
        ) : (
          <span className="uiux-device-placeholder">
            <ImageIcon aria-hidden />
            <span>Your screenshot</span>
          </span>
        )}
      </div>
      <span className="uiux-device-speaker" aria-hidden="true" />
      <span className="uiux-device-home-indicator" aria-hidden="true" />
    </figure>
  );
}

export function UiUxDecisionShowcase({
  decisions,
  eyebrow = "UI / UX",
  screenshotAlt,
  screenshotFit,
  screenshotPosition,
  screenshotSrc,
  subtitle,
  title,
}: UiUxDecisionShowcaseProps) {
  const leftDecisions = decisions.filter((decision) => decision.side === "left");
  const rightDecisions = decisions.filter((decision) => decision.side === "right");

  return (
    <section className="uiux-decision-section" id="uiux">
      <div className="site-shell">
        <div className="uiux-decision-heading">
          <p>{eyebrow}</p>
          <h2>{title}</h2>
          <span>{subtitle}</span>
        </div>

        <div className="uiux-decision-stage">
          <svg
            aria-hidden="true"
            className="uiux-noodle-canvas"
            preserveAspectRatio="none"
            viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
          >
            {decisions.map((decision) => (
              <UiUxNoodle decision={decision} key={decision.number} />
            ))}
          </svg>

          <div className="uiux-decision-column uiux-decision-column-left">
            {leftDecisions.map((decision) => (
              <UiUxDecisionCard decision={decision} key={decision.number} />
            ))}
          </div>

          <div className="uiux-device-slot">
            <UiUxDeviceFrame
              screenshotAlt={screenshotAlt}
              screenshotFit={screenshotFit}
              screenshotPosition={screenshotPosition}
              screenshotSrc={screenshotSrc}
            />
          </div>

          <div className="uiux-decision-column uiux-decision-column-right">
            {rightDecisions.map((decision) => (
              <UiUxDecisionCard decision={decision} key={decision.number} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
