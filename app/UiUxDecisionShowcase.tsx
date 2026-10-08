"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

export type UiUxNoodlePoint = readonly [x: number, y: number];

export type UiUxDecision = {
  compactOnly?: boolean;
  description: string;
  deviceDescription?: string;
  deviceTitle?: string;
  deviceVariant?: "phone" | "phone-android" | "tablet";
  number: string;
  noodle: readonly UiUxNoodlePoint[];
  placeholder?: boolean;
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

type CompactNoodlePath = {
  endCircleX: number;
  endCircleY: number;
  points: string;
  startCircleX: number;
  startCircleY: number;
};

type CompactNoodleGeometry = {
  devicePath?: CompactNoodlePath;
  height: number;
  inactiveButtonRects?: Array<{
    height: number;
    width: number;
    x: number;
    y: number;
  }>;
  selectorPath?: CompactNoodlePath;
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
        <span key={`${index}-${line}`}>
          {line.split(/\b(Always|Never)\b/).map((part, partIndex) => {
            if (part === "Always") {
              return (
                <em
                  className="uiux-description-always"
                  key={`${part}-${partIndex}`}
                >
                  {part}
                </em>
              );
            }

            if (part === "Never") {
              return (
                <span
                  className="uiux-description-never"
                  key={`${part}-${partIndex}`}
                >
                  {part}
                </span>
              );
            }

            return part;
          })}
        </span>
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

  const isAndroidPhone = deviceVariant === "phone-android";

  return (
    <figure
      className={`uiux-device-frame${
        isAndroidPhone ? " uiux-device-frame-android" : ""
      }`}
    >
      <div className="uiux-device-screen">
        {screenshotSrc ? (
          <Image
            alt={screenshotAlt}
            className="uiux-device-screenshot"
            fill
            sizes="(max-width: 820px) 66vw, 270px"
            src={screenshotSrc}
            style={{
              objectFit: isAndroidPhone ? "contain" : screenshotFit,
              objectPosition: screenshotPosition,
            }}
          />
        ) : (
          <span className="uiux-device-placeholder">
            <ImageIcon aria-hidden />
            <span>Your screenshot</span>
          </span>
        )}
      </div>
      {!isAndroidPhone ? (
        <>
          <span className="uiux-device-speaker" aria-hidden="true" />
          <span className="uiux-device-home-indicator" aria-hidden="true" />
        </>
      ) : null}
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
  const activeStripButtonRef = useRef<HTMLButtonElement>(null);
  const titleBridgeRef = useRef<HTMLDivElement>(null);
  const focusedButtonRef = useRef<HTMLButtonElement>(null);
  const focusedCopyRef = useRef<HTMLSpanElement>(null);
  const deviceSlotRef = useRef<HTMLDivElement>(null);
  const stageDecisions = decisions.filter((decision) => !decision.compactOnly);
  const leftDecisions = stageDecisions.filter(
    (decision) => decision.side === "left",
  );
  const rightDecisions = stageDecisions.filter(
    (decision) => decision.side === "right",
  );
  const focusedDecision =
    decisions.find((decision) => decision.number === focusedDecisionNumber) ??
    decisions[0];

  useLayoutEffect(() => {
    const panel = compactPanelRef.current;
    const activeStripButton = activeStripButtonRef.current;
    const titleBridge = titleBridgeRef.current;
    const focusedButton = focusedButtonRef.current;
    const focusedCopy = focusedCopyRef.current;
    const deviceFrame =
      deviceSlotRef.current?.querySelector<HTMLElement>(".uiux-device-frame");

    if (
      !panel ||
      !activeStripButton ||
      !titleBridge ||
      !focusedButton ||
      !focusedCopy
    ) {
      setCompactNoodle(null);
      return;
    }

    const updateNoodle = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      if (!isPortrait && !deviceFrame) {
        setCompactNoodle(null);
        return;
      }

      const connectorButton = isPortrait
        ? focusedButton
        : activeStripButton;
      const panelRect = panel.getBoundingClientRect();
      const activeStripButtonRect = activeStripButton.getBoundingClientRect();
      const titleBridgeRect = titleBridge.getBoundingClientRect();
      const connectorButtonRect = connectorButton.getBoundingClientRect();
      const focusedButtonRect = focusedButton.getBoundingClientRect();
      const focusedCopyRect = focusedCopy.getBoundingClientRect();
      const deviceRect = deviceFrame?.getBoundingClientRect();

      if (panelRect.width === 0 || panelRect.height === 0) {
        setCompactNoodle(null);
        return;
      }

      const deviceStartX =
        connectorButtonRect.left +
        connectorButtonRect.width / 2 -
        panelRect.left;
      const deviceStartY = connectorButtonRect.bottom - panelRect.top;
      const deviceX = deviceRect
        ? deviceRect.left + deviceRect.width / 2 - panelRect.left
        : 0;
      const deviceY = deviceRect ? deviceRect.top - panelRect.top : 0;
      const deviceMiddleY = deviceStartY + (deviceY - deviceStartY) / 2;
      const selectorStartX =
        activeStripButtonRect.left +
        activeStripButtonRect.width / 2 -
        panelRect.left;
      const selectorStartY = activeStripButtonRect.bottom - panelRect.top;
      const selectorEndX =
        titleBridgeRect.left + titleBridgeRect.width / 2 - panelRect.left;
      const selectorEndY = titleBridgeRect.top - panelRect.top;
      const selectorMiddleY =
        selectorStartY + (selectorEndY - selectorStartY) / 2;
      const inactiveButtonRects = isPortrait
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              ".uiux-compact-decision-strip .uiux-decision-number:not(.is-active)",
            ),
          ).map((button) => {
            const rect = button.getBoundingClientRect();

            return {
              height: rect.height,
              width: rect.width,
              x: rect.left - panelRect.left,
              y: rect.top - panelRect.top,
            };
          })
        : undefined;

      panel.style.setProperty(
        "--uiux-focused-number-offset",
        `${focusedCopyRect.top - focusedButtonRect.top}px`,
      );
      panel.style.setProperty(
        "--uiux-focused-number-height",
        `${focusedCopyRect.height}px`,
      );

      setCompactNoodle({
        devicePath: isPortrait || !deviceRect
          ? undefined
          : {
              endCircleX: deviceX,
              endCircleY: deviceY,
              points: `${deviceStartX},${deviceStartY} ${deviceStartX},${deviceMiddleY} ${deviceX},${deviceMiddleY} ${deviceX},${deviceY}`,
              startCircleX: deviceStartX,
              startCircleY: deviceStartY,
            },
        height: panelRect.height,
        inactiveButtonRects,
        selectorPath: isPortrait
          ? {
              endCircleX: selectorEndX,
              endCircleY: selectorEndY,
              points: `${selectorStartX},${selectorStartY} ${selectorStartX},${selectorMiddleY} ${selectorEndX},${selectorMiddleY} ${selectorEndX},${selectorEndY}`,
              startCircleX: selectorStartX,
              startCircleY: selectorStartY,
            }
          : undefined,
        width: panelRect.width,
      });
    };

    const frame = window.requestAnimationFrame(updateNoodle);
    const observer = new ResizeObserver(updateNoodle);
    observer.observe(panel);
    observer.observe(activeStripButton);
    observer.observe(titleBridge);
    observer.observe(focusedButton);
    observer.observe(focusedCopy);
    if (deviceFrame) {
      observer.observe(deviceFrame);
    }
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
            {stageDecisions.map((decision) => (
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
                  {compactNoodle.inactiveButtonRects?.length ? (
                    <defs>
                      <mask
                        id="uiux-inactive-button-mask"
                        maskUnits="userSpaceOnUse"
                      >
                        <rect
                          fill="white"
                          height={compactNoodle.height}
                          width={compactNoodle.width}
                        />
                        {compactNoodle.inactiveButtonRects.map(
                          (rect, index) => (
                            <rect
                              fill="black"
                              height={rect.height}
                              key={index}
                              width={rect.width}
                              x={rect.x}
                              y={rect.y}
                            />
                          ),
                        )}
                      </mask>
                    </defs>
                  ) : null}
                  {compactNoodle.selectorPath ? (
                    <g
                      mask={
                        compactNoodle.inactiveButtonRects?.length
                          ? "url(#uiux-inactive-button-mask)"
                          : undefined
                      }
                    >
                      <polyline points={compactNoodle.selectorPath.points} />
                      <circle
                        cx={compactNoodle.selectorPath.startCircleX}
                        cy={compactNoodle.selectorPath.startCircleY}
                        r="4.5"
                      />
                      <circle
                        cx={compactNoodle.selectorPath.endCircleX}
                        cy={compactNoodle.selectorPath.endCircleY}
                        r="4.5"
                      />
                    </g>
                  ) : null}
                  {compactNoodle.devicePath ? (
                    <>
                      <polyline points={compactNoodle.devicePath.points} />
                      <circle
                        cx={compactNoodle.devicePath.startCircleX}
                        cy={compactNoodle.devicePath.startCircleY}
                        r="4.5"
                      />
                      <circle
                        cx={compactNoodle.devicePath.endCircleX}
                        cy={compactNoodle.devicePath.endCircleY}
                        r="4.5"
                      />
                    </>
                  ) : null}
                </svg>
              ) : null}

              <div
                aria-label="Choose a UI or UX decision"
                className="uiux-compact-decision-strip"
                role="group"
              >
                {decisions.map((decision) => {
                  const isActive = decision.number === focusedDecision.number;
                  const buttonLabel = decision.placeholder
                    ? `${decision.number}. Empty placeholder`
                    : `${decision.number}. ${decision.title}: ${decision.description}`;

                  return (
                  <button
                    aria-label={buttonLabel}
                    aria-pressed={isActive}
                    className={`uiux-decision-number${isActive ? " is-active" : ""}`}
                    key={decision.number}
                    onClick={() => setFocusedDecisionNumber(decision.number)}
                    ref={isActive ? activeStripButtonRef : undefined}
                    type="button"
                  >
                    {decision.number}
                  </button>
                  );
                })}
              </div>

              <div className="uiux-compact-title-bridge" ref={titleBridgeRef}>
                <strong>{focusedDecision.title}</strong>
              </div>

              <div className="uiux-compact-active-card">
                <article
                  className={`uiux-compact-focused-card${
                    focusedDecision.placeholder ? " is-placeholder" : ""
                  }`}
                  data-decision-number={focusedDecision.number}
                >
                  <button
                    aria-label={
                      focusedDecision.placeholder
                        ? `${focusedDecision.number}. Empty placeholder`
                        : `${focusedDecision.number}. ${focusedDecision.title}: ${focusedDecision.description}`
                    }
                    aria-pressed="true"
                    className="uiux-decision-number is-active"
                  ref={focusedButtonRef}
                  type="button"
                >
                  {!focusedDecision.placeholder ? (
                    <span className="uiux-focused-number-label">
                      {Array.from(focusedDecision.number).map((digit, index) => (
                        <span key={`${focusedDecision.number}-${index}`}>
                          {digit}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </button>
                  <span className="uiux-decision-copy" ref={focusedCopyRef}>
                    {!focusedDecision.placeholder ? (
                      <>
                        <strong>{focusedDecision.title}</strong>
                        <UiUxDecisionDescription
                          description={focusedDecision.description}
                        />
                      </>
                    ) : null}
                  </span>
                </article>

                {focusedDecision.placeholder ? (
                  <div className="uiux-placeholder-body" aria-hidden="true" />
                ) : (
                  <div
                    className={`uiux-device-slot${
                      focusedDecision.deviceVariant === "tablet"
                        ? " uiux-device-slot-tablet"
                        : ""
                    }`}
                    ref={deviceSlotRef}
                  >
                  {focusedDecision.deviceVariant !== "tablet" ? (
                    <UiUxDeviceContext decision={focusedDecision} />
                  ) : null}
                  <div className="uiux-device-frame-stack">
                    <UiUxDeviceFrame
                      deviceVariant={focusedDecision.deviceVariant}
                      screenshotAlt={
                        focusedDecision.screenshotAlt ?? screenshotAlt
                      }
                      screenshotFit={screenshotFit}
                      screenshotPosition={screenshotPosition}
                      screenshotSrc={
                        focusedDecision.screenshotSrc ?? screenshotSrc
                      }
                    />
                    {focusedDecision.deviceVariant === "tablet" ? (
                      <UiUxDeviceContext decision={focusedDecision} />
                    ) : null}
                    <p className="uiux-device-project-label">
                      <span>PROJECT:</span>
                      {focusedDecision.projectHref &&
                      focusedDecision.projectLabel ? (
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
                )}
              </div>
            </div>
          ) : null}

          <div className="uiux-decision-column uiux-decision-column-left">
            {leftDecisions.map((decision) => (
              <UiUxDecisionCard decision={decision} key={decision.number} />
            ))}
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
