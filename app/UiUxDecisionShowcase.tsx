"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

function UiUxCarouselArrowSurface({
  direction,
}: {
  direction: "next" | "previous";
}) {
  const isPrevious = direction === "previous";
  const path = isPrevious
    ? "M 94 4 Q 99 4 99 10 L 99 190 Q 99 196 94 196 L 10 110 Q 0 100 10 90 Z"
    : "M 6 4 Q 1 4 1 10 L 1 190 Q 1 196 6 196 L 90 110 Q 100 100 90 90 Z";
  const gradientPrefix = `uiux-carousel-${direction}`;

  return (
    <svg
      aria-hidden="true"
      className="uiux-carousel-arrow-surface"
      preserveAspectRatio="none"
      viewBox="0 0 100 200"
    >
      <defs>
        <linearGradient
          id={`${gradientPrefix}-inactive-base`}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="#194632" stopOpacity="0.5" />
          <stop offset="1" stopColor="#0e2f21" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id={`${gradientPrefix}-active-base`}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="#194632" />
          <stop offset="1" stopColor="#0e2f21" />
        </linearGradient>
        <linearGradient
          id={`${gradientPrefix}-inactive-sheen`}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.0275" />
          <stop offset="0.34" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`${gradientPrefix}-active-sheen`}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.055" />
          <stop offset="0.34" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={`${gradientPrefix}-inactive-radial`}
          cx="0.68"
          cy="0.18"
          r="0.8"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.0225" />
          <stop offset="0.68" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${gradientPrefix}-active-radial`}
          cx="0.68"
          cy="0.18"
          r="0.8"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.045" />
          <stop offset="0.68" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="uiux-carousel-arrow-shape uiux-carousel-arrow-shape-inactive">
        <path
          className="uiux-carousel-arrow-shape-base"
          d={path}
          fill={`url(#${gradientPrefix}-inactive-base)`}
        />
        <path d={path} fill={`url(#${gradientPrefix}-inactive-sheen)`} />
        <path d={path} fill={`url(#${gradientPrefix}-inactive-radial)`} />
      </g>
      <g className="uiux-carousel-arrow-shape uiux-carousel-arrow-shape-active">
        <path
          className="uiux-carousel-arrow-shape-base"
          d={path}
          fill={`url(#${gradientPrefix}-active-base)`}
        />
        <path d={path} fill={`url(#${gradientPrefix}-active-sheen)`} />
        <path d={path} fill={`url(#${gradientPrefix}-active-radial)`} />
      </g>
    </svg>
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

type UiUxCompactDecisionColumnProps = Pick<
  UiUxDecisionShowcaseProps,
  "screenshotAlt" | "screenshotFit" | "screenshotPosition" | "screenshotSrc"
> & {
  decision: UiUxDecision;
  isPrimary: boolean;
};

function UiUxCompactDecisionColumn({
  decision,
  isPrimary,
  screenshotAlt,
  screenshotFit,
  screenshotPosition,
  screenshotSrc,
}: UiUxCompactDecisionColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const focusedButtonRef = useRef<HTMLButtonElement>(null);
  const focusedCopyRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const column = columnRef.current;
    const focusedButton = focusedButtonRef.current;
    const focusedCopy = focusedCopyRef.current;

    if (!column || !focusedButton || !focusedCopy) return;

    const updateNumberPosition = () => {
      const buttonRect = focusedButton.getBoundingClientRect();
      const copyRect = focusedCopy.getBoundingClientRect();

      column.style.setProperty(
        "--uiux-focused-number-offset",
        `${copyRect.top - buttonRect.top}px`,
      );
      column.style.setProperty(
        "--uiux-focused-number-height",
        `${copyRect.height}px`,
      );
    };

    const frame = window.requestAnimationFrame(updateNumberPosition);
    const observer = new ResizeObserver(updateNumberPosition);
    observer.observe(column);
    observer.observe(focusedButton);
    observer.observe(focusedCopy);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [decision.number]);

  return (
    <div
      className={`uiux-compact-decision-column${
        isPrimary ? " is-primary" : " is-adjacent"
      }`}
      data-decision-number={decision.number}
      ref={columnRef}
    >
      <div className="uiux-compact-title-bridge">
        <strong>{decision.title}</strong>
      </div>

      <div className="uiux-compact-active-card">
        <article
          className={`uiux-compact-focused-card${
            decision.placeholder ? " is-placeholder" : ""
          }`}
          data-decision-number={decision.number}
        >
          <button
            aria-label={
              decision.placeholder
                ? `${decision.number}. ${decision.title} placeholder`
                : `${decision.number}. ${decision.title}: ${decision.description}`
            }
            aria-pressed={isPrimary}
            className="uiux-decision-number is-active"
            ref={focusedButtonRef}
            tabIndex={-1}
            type="button"
          >
            <span className="uiux-focused-number-label">
              {Array.from(decision.number).map((digit, index) => (
                <span key={`${decision.number}-${index}`}>{digit}</span>
              ))}
            </span>
          </button>
          <span className="uiux-decision-copy" ref={focusedCopyRef}>
            {!decision.placeholder ? (
              <>
                <strong>{decision.title}</strong>
                <UiUxDecisionDescription description={decision.description} />
              </>
            ) : null}
          </span>
        </article>

        {decision.placeholder ? (
          <div className="uiux-placeholder-body" aria-hidden="true" />
        ) : (
          <div
            className={`uiux-device-slot${
              decision.deviceVariant === "tablet"
                ? " uiux-device-slot-tablet"
                : ""
            }`}
          >
            {decision.deviceVariant !== "tablet" ? (
              <UiUxDeviceContext decision={decision} />
            ) : null}
            <div className="uiux-device-frame-stack">
              <UiUxDeviceFrame
                deviceVariant={decision.deviceVariant}
                screenshotAlt={decision.screenshotAlt ?? screenshotAlt}
                screenshotFit={screenshotFit}
                screenshotPosition={screenshotPosition}
                screenshotSrc={decision.screenshotSrc ?? screenshotSrc}
              />
              {decision.deviceVariant === "tablet" ? (
                <UiUxDeviceContext decision={decision} />
              ) : null}
              <p className="uiux-device-project-label">
                <span>PROJECT:</span>
                {decision.projectHref && decision.projectLabel ? (
                  <Link
                    aria-label={`View the ${decision.projectLabel} project page`}
                    className="uiux-device-project-link"
                    href={decision.projectHref}
                  >
                    {decision.projectLabel}
                  </Link>
                ) : null}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
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
  const [compactColumnCount, setCompactColumnCount] = useState<1 | 2 | 3>(1);
  const [compactNoodle, setCompactNoodle] =
    useState<CompactNoodleGeometry | null>(null);
  const [heldCarouselDirection, setHeldCarouselDirection] = useState<
    -1 | 1 | null
  >(null);
  const compactPanelRef = useRef<HTMLDivElement>(null);
  const activeStripButtonRef = useRef<HTMLDivElement>(null);
  const titleBridgeRef = useRef<HTMLDivElement>(null);
  const focusedButtonRef = useRef<HTMLButtonElement>(null);
  const focusedCopyRef = useRef<HTMLSpanElement>(null);
  const deviceSlotRef = useRef<HTMLDivElement>(null);
  const carouselHoldDelayRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const carouselHoldIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);
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
  const focusedDecisionIndex = Math.max(
    0,
    decisions.findIndex(
      (decision) => decision.number === focusedDecision?.number,
    ),
  );
  const visibleDecisionOffsets =
    compactColumnCount === 1
      ? [0]
      : compactColumnCount === 2
        ? [0, 1]
        : [-1, 0, 1];
  const visibleDecisions = visibleDecisionOffsets.map((offset) => {
    const index =
      (focusedDecisionIndex + offset + decisions.length) % decisions.length;

    return {
      decision: decisions[index],
      isPrimary: offset === 0,
    };
  });

  const clearCarouselHoldTimers = () => {
    if (carouselHoldDelayRef.current) {
      clearTimeout(carouselHoldDelayRef.current);
      carouselHoldDelayRef.current = null;
    }

    if (carouselHoldIntervalRef.current) {
      clearInterval(carouselHoldIntervalRef.current);
      carouselHoldIntervalRef.current = null;
    }
  };

  const moveCarousel = (direction: -1 | 1) => {
    setFocusedDecisionNumber((currentNumber) => {
      const currentIndex = decisions.findIndex(
        (decision) => decision.number === currentNumber,
      );
      const normalizedIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex =
        (normalizedIndex + direction + decisions.length) % decisions.length;

      return decisions[nextIndex]?.number ?? currentNumber;
    });
  };

  const startCarouselHold = (direction: -1 | 1) => {
    clearCarouselHoldTimers();
    setHeldCarouselDirection(direction);
    moveCarousel(direction);
    carouselHoldDelayRef.current = setTimeout(() => {
      carouselHoldIntervalRef.current = setInterval(() => {
        moveCarousel(direction);
      }, 180);
    }, 420);
  };

  const stopCarouselHold = () => {
    clearCarouselHoldTimers();
    setHeldCarouselDirection(null);
  };

  useEffect(
    () => () => {
      clearCarouselHoldTimers();
    },
    [],
  );

  useLayoutEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth <= 630) {
        setCompactColumnCount(1);
      } else if (window.innerWidth <= 980) {
        setCompactColumnCount(2);
      } else {
        setCompactColumnCount(3);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);

    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

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
            <div
              className="uiux-compact-decision-panel"
              data-column-count={compactColumnCount}
              ref={compactPanelRef}
            >
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
                data-column-count={compactColumnCount}
                role="group"
              >
                <button
                  aria-label="Previous UI or UX decision"
                  className={`uiux-carousel-arrow uiux-carousel-arrow-previous${
                    heldCarouselDirection === -1 ? " is-held" : ""
                  }`}
                  onBlur={stopCarouselHold}
                  onKeyDown={(event) => {
                    if (
                      !event.repeat &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      startCarouselHold(-1);
                    }
                  }}
                  onKeyUp={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      stopCarouselHold();
                    }
                  }}
                  onPointerCancel={stopCarouselHold}
                  onPointerDown={(event) => {
                    if (event.button !== 0) return;
                    event.currentTarget.setPointerCapture(event.pointerId);
                    startCarouselHold(-1);
                  }}
                  onPointerUp={stopCarouselHold}
                  type="button"
                >
                  <UiUxCarouselArrowSurface direction="previous" />
                </button>

                {visibleDecisions.map(({ decision, isPrimary }) =>
                  isPrimary ? (
                    <div
                      aria-label={`Current UI or UX decision ${decision.number}`}
                      aria-live="polite"
                      className="uiux-carousel-current uiux-decision-number is-active"
                      key={decision.number}
                      ref={activeStripButtonRef}
                    >
                      {decision.number}
                    </div>
                  ) : (
                    <button
                      aria-label={`Show UI or UX decision ${decision.number}`}
                      className="uiux-carousel-preview uiux-decision-number"
                      key={decision.number}
                      onClick={() =>
                        setFocusedDecisionNumber(decision.number)
                      }
                      type="button"
                    >
                      {decision.number}
                    </button>
                  ),
                )}

                <button
                  aria-label="Next UI or UX decision"
                  className={`uiux-carousel-arrow uiux-carousel-arrow-next${
                    heldCarouselDirection === 1 ? " is-held" : ""
                  }`}
                  onBlur={stopCarouselHold}
                  onKeyDown={(event) => {
                    if (
                      !event.repeat &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      startCarouselHold(1);
                    }
                  }}
                  onKeyUp={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      stopCarouselHold();
                    }
                  }}
                  onPointerCancel={stopCarouselHold}
                  onPointerDown={(event) => {
                    if (event.button !== 0) return;
                    event.currentTarget.setPointerCapture(event.pointerId);
                    startCarouselHold(1);
                  }}
                  onPointerUp={stopCarouselHold}
                  type="button"
                >
                  <UiUxCarouselArrowSurface direction="next" />
                </button>
              </div>

              <div
                className="uiux-compact-columns"
                data-column-count={compactColumnCount}
              >
                {visibleDecisions.map(({ decision, isPrimary }) => (
                  <UiUxCompactDecisionColumn
                    decision={decision}
                    isPrimary={isPrimary}
                    key={decision.number}
                    screenshotAlt={screenshotAlt}
                    screenshotFit={screenshotFit}
                    screenshotPosition={screenshotPosition}
                    screenshotSrc={screenshotSrc}
                  />
                ))}
              </div>

              <div
                className="uiux-compact-title-bridge uiux-compact-legacy-title"
                ref={titleBridgeRef}
              >
                <strong>{focusedDecision.title}</strong>
              </div>

              <div className="uiux-compact-active-card uiux-compact-legacy-card">
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
