"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

export type UiUxNoodlePoint = readonly [x: number, y: number];

export type UiUxDecision = {
  description: string;
  deviceDescription?: string;
  deviceTitle?: string;
  deviceVariant?: "phone" | "tablet";
  number: string;
  noodle: readonly UiUxNoodlePoint[];
  projectHref?: string;
  projectLabel?: string;
  screenshotAlt?: string;
  screenshotSrc?: string;
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

type CompactNoodleGeometry = {
  deviceCircleX: number;
  deviceCircleY: number;
  devicePoints: string;
  deviceStartCircleX: number;
  deviceStartCircleY: number;
  height: number;
  width: number;
};

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
        <UiUxDecisionDescription description={decision.description} />
      </span>
    </article>
  );
}

function UiUxDecisionDescription({ description }: { description: string }) {
  return (
    <span className="uiux-decision-description">
      {description.split("\n").map((line, index) => (
        <span key={`${index}-${line}`}>{line}</span>
      ))}
    </span>
  );
}

function UiUxDeviceContext({ decision }: { decision: UiUxDecision }) {
  if (!decision.deviceTitle) {
    return null;
  }

  return (
    <div className="uiux-device-context">
      <h3>{decision.deviceTitle}</h3>
      {decision.deviceDescription ? <p>{decision.deviceDescription}</p> : null}
    </div>
  );
}

export function UiUxDeviceFrame({
  deviceVariant = "phone",
  screenshotAlt = "UI design screenshot",
  screenshotFit = "cover",
  screenshotPosition = "center",
  screenshotSrc,
}: Pick<
  UiUxDecisionShowcaseProps,
  "screenshotAlt" | "screenshotFit" | "screenshotPosition" | "screenshotSrc"
> & {
  deviceVariant?: UiUxDecision["deviceVariant"];
}) {
  if (deviceVariant === "tablet") {
    return (
      <figure className="uiux-device-frame uiux-device-frame-tablet">
        {screenshotSrc ? (
          <Image
            alt={screenshotAlt}
            className="uiux-device-screenshot uiux-device-tablet-screenshot"
            fill
            sizes="(max-width: 820px) 50vw, 276px"
            src={screenshotSrc}
            style={{ objectFit: "contain", objectPosition: screenshotPosition }}
          />
        ) : null}
      </figure>
    );
  }

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
  const [focusedDecisionNumber, setFocusedDecisionNumber] = useState(
    decisions[0]?.number ?? "",
  );
  const [compactNoodle, setCompactNoodle] =
    useState<CompactNoodleGeometry | null>(null);
  const compactPanelRef = useRef<HTMLDivElement>(null);
  const activeBottomButtonRef = useRef<HTMLButtonElement>(null);
  const deviceSlotRef = useRef<HTMLDivElement>(null);
  const leftDecisions = decisions.filter((decision) => decision.side === "left");
  const rightDecisions = decisions.filter((decision) => decision.side === "right");
  const focusedDecision =
    decisions.find((decision) => decision.number === focusedDecisionNumber) ??
    decisions[0];

  useLayoutEffect(() => {
    const panel = compactPanelRef.current;
    const activeBottomButton = activeBottomButtonRef.current;
    const deviceFrame =
      deviceSlotRef.current?.querySelector<HTMLElement>(".uiux-device-frame");

    if (!panel || !activeBottomButton || !deviceFrame) {
      setCompactNoodle(null);
      return;
    }

    const updateNoodle = () => {
      const panelRect = panel.getBoundingClientRect();
      const activeBottomRect = activeBottomButton.getBoundingClientRect();
      const deviceRect = deviceFrame.getBoundingClientRect();

      if (panelRect.width === 0 || panelRect.height === 0) {
        setCompactNoodle(null);
        return;
      }

      const bottomX =
        activeBottomRect.left + activeBottomRect.width / 2 - panelRect.left;
      const deviceStartX = bottomX;
      const deviceStartY = activeBottomRect.bottom - panelRect.top;
      const deviceX = deviceRect.left + deviceRect.width / 2 - panelRect.left;
      const deviceY = deviceRect.top - panelRect.top;
      const deviceMiddleY = deviceStartY + (deviceY - deviceStartY) / 2;

      setCompactNoodle({
        deviceCircleX: deviceX,
        deviceCircleY: deviceY,
        devicePoints: `${deviceStartX},${deviceStartY} ${deviceStartX},${deviceMiddleY} ${deviceX},${deviceMiddleY} ${deviceX},${deviceY}`,
        deviceStartCircleX: deviceStartX,
        deviceStartCircleY: deviceStartY,
        height: panelRect.height,
        width: panelRect.width,
      });
    };

    const frame = window.requestAnimationFrame(updateNoodle);
    const observer = new ResizeObserver(updateNoodle);
    observer.observe(panel);
    observer.observe(deviceFrame);
    window.addEventListener("resize", updateNoodle);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateNoodle);
    };
  }, [focusedDecisionNumber]);

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

          {focusedDecision ? (
            <div className="uiux-compact-decision-panel" ref={compactPanelRef}>
              {compactNoodle ? (
                <svg
                  aria-hidden="true"
                  className="uiux-compact-noodle"
                  preserveAspectRatio="none"
                  viewBox={`0 0 ${compactNoodle.width} ${compactNoodle.height}`}
                >
                  <polyline points={compactNoodle.devicePoints} />
                  <circle
                    cx={compactNoodle.deviceStartCircleX}
                    cy={compactNoodle.deviceStartCircleY}
                    r="4.5"
                  />
                  <circle
                    cx={compactNoodle.deviceCircleX}
                    cy={compactNoodle.deviceCircleY}
                    r="4.5"
                  />
                </svg>
              ) : null}

              <article className="uiux-compact-focused-card">
                <button
                  aria-label={`${focusedDecision.number}. ${focusedDecision.title}: ${focusedDecision.description}`}
                  aria-pressed="true"
                  className="uiux-decision-number is-active"
                  type="button"
                >
                  {focusedDecision.number}
                </button>
                <span className="uiux-decision-copy">
                  <strong>{focusedDecision.title}</strong>
                  <UiUxDecisionDescription
                    description={focusedDecision.description}
                  />
                </span>
              </article>

              <div
                aria-label="Choose a UI or UX decision"
                className="uiux-compact-decision-strip"
                role="group"
              >
                {decisions.map((decision) => {
                  const isActive = decision.number === focusedDecision.number;

                  return (
                  <button
                    aria-label={`${decision.number}. ${decision.title}: ${decision.description}`}
                    aria-pressed={isActive}
                    className={`uiux-decision-number${isActive ? " is-active" : ""}`}
                    key={decision.number}
                    onClick={() => setFocusedDecisionNumber(decision.number)}
                    ref={isActive ? activeBottomButtonRef : undefined}
                    type="button"
                  >
                    {decision.number}
                  </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="uiux-decision-column uiux-decision-column-left">
            {leftDecisions.map((decision) => (
              <UiUxDecisionCard decision={decision} key={decision.number} />
            ))}
          </div>

          <div
            className={`uiux-device-slot${
              focusedDecision?.deviceVariant === "tablet"
                ? " uiux-device-slot-tablet"
                : ""
            }`}
            ref={deviceSlotRef}
          >
            {focusedDecision?.deviceVariant !== "tablet" && focusedDecision ? (
              <UiUxDeviceContext decision={focusedDecision} />
            ) : null}
            <div className="uiux-device-frame-stack">
              <UiUxDeviceFrame
                deviceVariant={focusedDecision?.deviceVariant}
                screenshotAlt={focusedDecision?.screenshotAlt ?? screenshotAlt}
                screenshotFit={screenshotFit}
                screenshotPosition={screenshotPosition}
                screenshotSrc={focusedDecision?.screenshotSrc ?? screenshotSrc}
              />
              {focusedDecision?.deviceVariant === "tablet" ? (
                <UiUxDeviceContext decision={focusedDecision} />
              ) : null}
              <p className="uiux-device-project-label">
                <span>PROJECT:</span>
                {focusedDecision?.projectHref && focusedDecision.projectLabel ? (
                  <Link
                    aria-label={`View the ${focusedDecision.projectLabel} project page`}
                    className="uiux-device-project-link"
                    href={focusedDecision.projectHref}
                  >
                    {focusedDecision.projectLabel}
                  </Link>
                ) : null}
              </p>
            </div>
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
