"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

export type UiUxNoodlePoint = readonly [x: number, y: number];

type UiUxDecisionDetailScreenshot = {
  deviceDescription?: string;
  deviceAspect?: "standard" | "tall";
  deviceVariant?: "phone" | "phone-android" | "tablet";
  projectHref?: string;
  projectLabel?: string;
  screenshotAlt: string;
  screenshotSrc: string;
};

export type UiUxDecision = {
  compactOnly?: boolean;
  description: string;
  detailScreenshots?: Partial<
    Record<1 | 2 | 3, UiUxDecisionDetailScreenshot>
  >;
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

const UIUX_DECISION_GRADIENT_TONES: Record<string, string> = {
  "01": "cohesion",
  "02": "collaboration",
  "03": "leadership",
  "04": "sustainability",
  "05": "adaptability",
  "06": "cohesion",
  "07": "adaptability",
};

const UIUX_DECISION_CASE_TONES: Record<string, string> = {
  "01": "purple",
  "02": "yellow",
  "03": "blue",
  "04": "orange",
  "05": "green",
};

function getDecisionGradientTone(decisionNumber: string) {
  return UIUX_DECISION_GRADIENT_TONES[decisionNumber];
}

function getDecisionCaseTone(decisionNumber: string) {
  return UIUX_DECISION_CASE_TONES[decisionNumber];
}

const UIUX_KEY_COLORS: Record<string, string> = {
  vision: "#ff4fa3",
  integrity: "#00bfea",
  sustainability: "#ff7a1a",
  leadership: "#6c9cff",
  collaboration: "#ffc928",
  cohesion: "#c084fc",
  adaptability: "#78c83a",
};

const UIUX_KEY_GRADIENTS: Record<
  string,
  readonly [start: string, middle: string, end: string]
> = {
  "01": ["#dd4bfd", "#7a1fdd", "#6816ce"],
  "02": ["#ffd102", "#e8aa01", "#cb7d00"],
  "03": ["#01abfd", "#0071f3", "#024dd0"],
  "04": ["#ffdf02", "#ed5d07", "#cc330f"],
  "05": ["#33f150", "#099341", "#026946"],
};

const UIUX_STAR_TIP_COUNT = 5;
const UIUX_STAR_ROTATION_STEP = 360 / UIUX_STAR_TIP_COUNT;
const UIUX_STAR_INITIAL_ROTATION = 144;
const UIUX_STAR_TIP_SEQUENCE = [
  "purple",
  "yellow",
  "blue",
  "orange",
  "green",
] as const;
const UIUX_STAR_SETTLE_OFFSET_BY_TIP = {
  purple: 0,
  yellow: 1,
  blue: 0,
  orange: 0,
  green: 1,
} as const;

function UiUxCarouselStar({
  onRotationComplete,
  rotationStep,
  shouldReduceMotion,
}: {
  onRotationComplete: () => void;
  rotationStep: number;
  shouldReduceMotion: boolean | null;
}) {
  const activeTip =
    UIUX_STAR_TIP_SEQUENCE[
      ((rotationStep % UIUX_STAR_TIP_COUNT) + UIUX_STAR_TIP_COUNT) %
        UIUX_STAR_TIP_COUNT
    ];
  const targetRotation =
    UIUX_STAR_INITIAL_ROTATION +
    rotationStep * UIUX_STAR_ROTATION_STEP +
    UIUX_STAR_SETTLE_OFFSET_BY_TIP[activeTip];

  return (
    <div aria-hidden="true" className="uiux-carousel-star-frame">
      <div className="uiux-carousel-star-mask">
        <motion.div
          animate={{
            rotate: targetRotation,
          }}
          className="uiux-carousel-star"
          data-active-tip={activeTip}
          initial={false}
          onAnimationComplete={() => onRotationComplete()}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { damping: 22, mass: 0.75, stiffness: 170, type: "spring" }
          }
        >
          <Image
            alt=""
            aria-hidden="true"
            className="uiux-carousel-star-image uiux-carousel-star-image-fill-muted"
            height={2048}
            sizes="527px"
            src="/images/uiux/philosophy-star-rounded-gradient.png"
            width={2048}
          />
          <Image
            alt=""
            aria-hidden="true"
            className="uiux-carousel-star-image uiux-carousel-star-image-muted"
            height={2052}
            sizes="527px"
            src="/images/uiux/philosophy-star-rounded-hollow.png"
            width={2052}
          />
          <Image
            alt=""
            aria-hidden="true"
            className="uiux-carousel-star-image uiux-carousel-star-image-active"
            height={2048}
            sizes="527px"
            src="/images/uiux/philosophy-star-rounded-gradient.png"
            width={2048}
          />
        </motion.div>
      </div>
    </div>
  );
}

type DesktopStackRole =
  | "active"
  | "next"
  | "next-outer"
  | "previous"
  | "previous-outer"
  | "rear"
  | "rear-hidden";

const DESKTOP_CANONICAL_STACK_WIDTH = 654.4125;
const DESKTOP_ADJACENT_STACK_OFFSET = 645.2431;
const DESKTOP_ADJACENT_STACK_SCALE_X = 0.6664507;
const DESKTOP_OUTER_STACK_OFFSET = 932.1406;
const DESKTOP_OUTER_STACK_SCALE_X = 0.0977649;

const DESKTOP_STACK_VARIANTS = {
  active: {
    opacity: 1,
    originX: 0.5,
    rotateY: 0,
    scaleX: 0.891,
    scaleY: 0.81,
    z: 0,
  },
  next: {
    opacity: 0.25,
    originX: 0,
    rotateY: 36,
    scaleX: DESKTOP_ADJACENT_STACK_SCALE_X,
    scaleY: 0.7938,
    z: 0,
  },
  "next-outer": {
    opacity: 0.02,
    originX: 0,
    rotateY: 144,
    scaleX: DESKTOP_OUTER_STACK_SCALE_X,
    scaleY: 0.62,
    z: -240,
  },
  previous: {
    opacity: 0.25,
    originX: 1,
    rotateY: -36,
    scaleX: DESKTOP_ADJACENT_STACK_SCALE_X,
    scaleY: 0.7938,
    z: 0,
  },
  "previous-outer": {
    opacity: 0.02,
    originX: 1,
    rotateY: -144,
    scaleX: DESKTOP_OUTER_STACK_SCALE_X,
    scaleY: 0.62,
    z: -240,
  },
  rear: {
    opacity: 0,
    originX: 0.5,
    rotateY: 180,
    scaleX: 0.55,
    scaleY: 0.48,
    z: -480,
  },
  "rear-hidden": {
    opacity: 0,
    originX: 0.5,
    rotateY: -180,
    scaleX: 0.55,
    scaleY: 0.48,
    z: -480,
  },
} satisfies Record<DesktopStackRole, Record<string, number>>;

function UiUxActiveKey({
  className,
  decisionNumber,
  fillOverride,
  gradientTone,
  outlineColor = "#fff",
  outlineOnly = false,
  outlineOpacity = "1",
}: {
  className?: string;
  decisionNumber?: string;
  fillOverride?: string;
  gradientTone?: string;
  outlineColor?: string;
  outlineOnly?: boolean;
  outlineOpacity?: string;
}) {
  const instanceId = useId().replaceAll(":", "");
  const gradientId = `uiux-carousel-key-color-${instanceId}`;
  const defaultGradientId = `uiux-carousel-key-gradient-${instanceId}`;
  const sheenId = `uiux-carousel-key-sheen-${instanceId}`;
  const radialId = `uiux-carousel-key-radial-${instanceId}`;
  const borderId = `uiux-carousel-key-active-border-${instanceId}`;
  const maskId = `uiux-carousel-key-mask-${instanceId}`;
  const gradientColors = decisionNumber
    ? UIUX_KEY_GRADIENTS[decisionNumber]
    : undefined;
  const fillColor = gradientTone
    ? UIUX_KEY_COLORS[gradientTone]
    : undefined;

  return (
    <svg
      aria-hidden="true"
      className={`uiux-carousel-key${className ? ` ${className}` : ""}`}
      viewBox="0 0 200 200"
    >
      <defs>
        {gradientColors ? (
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={gradientId}
            x1="25"
            x2="175"
            y1="30"
            y2="175"
          >
            <stop offset="0" stopColor={gradientColors[0]} />
            <stop offset="0.52" stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} />
          </linearGradient>
        ) : null}
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={defaultGradientId}
          x1="0"
          x2="0"
          y1="114"
          y2="200"
        >
          <stop offset="0" stopColor="#0d1f16" stopOpacity="0.88" />
          <stop offset="1" stopColor="#050d09" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={sheenId}
          x1="0"
          x2="0"
          y1="114"
          y2="200"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.0275" />
          <stop offset="0.34" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          cx="133"
          cy="130"
          gradientUnits="userSpaceOnUse"
          id={radialId}
          r="126"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.0225" />
          <stop offset="0.68" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <filter
          filterUnits="userSpaceOnUse"
          height="300"
          id={borderId}
          width="300"
          x="-50"
          y="-50"
        >
          <feComponentTransfer in="SourceAlpha" result="solid-alpha">
            <feFuncA intercept="0" slope="1000" type="linear" />
          </feComponentTransfer>
          <feMorphology
            in="solid-alpha"
            operator="dilate"
            radius={outlineOnly ? "2" : "1.6"}
            result="expanded-alpha"
          />
          <feComposite
            in="expanded-alpha"
            in2="solid-alpha"
            operator="out"
            result="border-alpha"
          />
          <feFlood
            className={
              outlineOnly ? undefined : "uiux-carousel-key-border-color"
            }
            floodColor={outlineOnly ? outlineColor : "#020604"}
            floodOpacity={outlineOnly ? outlineOpacity : "0.82"}
            result="border-color"
          />
          <feComposite
            in="border-color"
            in2="border-alpha"
            operator="in"
            result="border"
          />
          <feMerge>
            <feMergeNode in="border" />
            {outlineOnly ? null : <feMergeNode in="SourceGraphic" />}
          </feMerge>
        </filter>
        <mask
          id={maskId}
          height="280"
          maskUnits="userSpaceOnUse"
          width="280"
          x="-40"
          y="-40"
        >
          <g transform="translate(16 83.5) scale(1.05)">
              <circle cx="50" cy="70" fill="white" r="34" />
              <circle cx="29" cy="48" fill="white" r="19" />
              <path
                d="M65 55H80V85H65L56 76V64Z"
                fill="white"
              />
              <rect
              fill="white"
              height="18"
              rx="9"
              width="94"
              x="65"
              y="61"
            />
            <path
              d="M104 73H121V98Q121 103 116 103H109Q104 103 104 98ZM126 73H143V106Q143 111 138 111H131Q126 111 126 106ZM148 73H159V94Q159 99 154 99H153Q148 99 148 94Z"
              fill="white"
            />
              <circle cx="50" cy="70" fill="black" r="17" />
              <circle cx="29" cy="48" fill="black" r="7" />
          </g>
        </mask>
      </defs>
      <g filter={`url(#${borderId})`}>
        <rect
          fill={
            fillOverride ?? (gradientColors
              ? `url(#${gradientId})`
              : (fillColor ?? `url(#${defaultGradientId})`))
          }
          height="280"
          mask={`url(#${maskId})`}
          width="280"
          x="-40"
          y="-40"
        />
        {!fillColor && !fillOverride ? (
          <>
            <rect
              fill={`url(#${sheenId})`}
              height="280"
              mask={`url(#${maskId})`}
              width="280"
              x="-40"
              y="-40"
            />
            <rect
              fill={`url(#${radialId})`}
              height="280"
              mask={`url(#${maskId})`}
              width="280"
              x="-40"
              y="-40"
            />
          </>
        ) : null}
      </g>
    </svg>
  );
}

const UIUX_LOCK_ASSETS: Record<string, string> = {
  "01": "/images/uiux/philosophy-lock-01.svg",
  "02": "/images/uiux/philosophy-lock-02.svg",
  "03": "/images/uiux/philosophy-lock-03.svg",
  "04": "/images/uiux/philosophy-lock-04.svg",
  "05": "/images/uiux/philosophy-lock-05.svg",
};

function UiUxActiveLock({
  className,
  cutout = false,
  decisionNumber,
}: {
  className?: string;
  cutout?: boolean;
  decisionNumber: string;
}) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={`uiux-carousel-key uiux-carousel-lock${
        className ? ` ${className}` : ""
      }`}
      height={200}
      src={
        cutout
          ? "/images/uiux/philosophy-lock-outline.svg"
          : (UIUX_LOCK_ASSETS[decisionNumber] ?? UIUX_LOCK_ASSETS["01"])
      }
      unoptimized
      width={200}
    />
  );
}

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
  const instanceId = useId().replaceAll(":", "");
  const isPrevious = direction === "previous";
  const path = isPrevious
    ? "M 156 20 C 115 39 70 62 30 86 Q 4 100 30 114 C 70 138 115 161 156 180 Q 176 190 176 166 C 179 122 179 78 176 34 Q 176 10 156 20 Z"
    : "M 44 20 C 85 39 130 62 170 86 Q 196 100 170 114 C 130 138 85 161 44 180 Q 24 190 24 166 C 21 122 21 78 24 34 Q 24 10 44 20 Z";
  const gradientPrefix = `uiux-carousel-${direction}-${instanceId}`;

  return (
    <svg
      aria-hidden="true"
      className="uiux-carousel-arrow-surface"
      preserveAspectRatio="none"
      viewBox="0 0 200 200"
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

function UiUxCarouselAxisBends() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="uiux-carousel-axis-bend is-left"
        preserveAspectRatio="none"
        viewBox="0 0 32 10"
      >
        <path d="M 32 1 C 18 1 8 3 0 9" />
      </svg>
      <svg
        aria-hidden="true"
        className="uiux-carousel-axis-bend is-right"
        preserveAspectRatio="none"
        viewBox="0 0 32 10"
      >
        <path d="M 0 1 C 14 1 24 3 32 9" />
      </svg>
    </>
  );
}

type UiUxCarouselArrowButtonProps = {
  direction: -1 | 1;
  holdEnabled?: boolean;
  isHeld: boolean;
  onStart: (direction: -1 | 1) => void;
  onStop: () => void;
};

function UiUxCarouselArrowButton({
  direction,
  holdEnabled = true,
  isHeld,
  onStart,
  onStop,
}: UiUxCarouselArrowButtonProps) {
  const isPrevious = direction === -1;
  const directionName = isPrevious ? "previous" : "next";

  return (
    <button
      aria-label={`${isPrevious ? "Previous" : "Next"} UI or UX decision`}
      className={`uiux-carousel-arrow uiux-carousel-arrow-${directionName}${
        isHeld ? " is-held" : ""
      }`}
      onBlur={onStop}
      onClick={
        holdEnabled
          ? undefined
          : () => {
              onStart(direction);
              onStop();
            }
      }
      onKeyDown={(event) => {
        if (!holdEnabled) return;

        if (
          !event.repeat &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onStart(direction);
        }
      }}
      onKeyUp={(event) => {
        if (!holdEnabled) return;

        if (event.key === "Enter" || event.key === " ") {
          onStop();
        }
      }}
      onLostPointerCapture={onStop}
      onPointerCancel={onStop}
      onPointerDown={(event) => {
        if (!holdEnabled) return;
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        onStart(direction);
      }}
      onPointerUp={onStop}
      type="button"
    >
      <UiUxCarouselArrowSurface direction={directionName} />
    </button>
  );
}

function UiUxDecisionCard({ decision }: { decision: UiUxDecision }) {
  return (
    <article className="uiux-decision-card">
      <span className="uiux-decision-number">{decision.number}</span>
      <span className="uiux-decision-copy">
        <strong data-title={decision.title}>{decision.title}</strong>
        <UiUxDecisionDescription description={decision.description} />
      </span>
    </article>
  );
}

function UiUxDecisionDescription({ description }: { description: string }) {
  const sourceLines = description.split("\n");
  const lines =
    sourceLines.length >= 4
      ? [sourceLines.slice(0, 2).join(" "), ...sourceLines.slice(2)]
      : sourceLines;

  return (
    <span className="uiux-decision-description">
      {lines.map((line, index) => {
        const isEmphasis = index === 1;

        return (
          <span
            className={
              isEmphasis
                ? "uiux-description-emphasis"
                : index === 0
                  ? "uiux-description-opening"
                  : "uiux-description-closing"
            }
            data-title={line}
            key={`${index}-${line}`}
          >
            {line === "EASY" ? (
              <>
                <span className="uiux-description-easy">EASY</span>
                <span className="uiux-description-dash"> —</span>
              </>
            ) : (
              line.split(/\b(Always|Never)\b/).map((part, partIndex) => {
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
              })
            )}
          </span>
        );
      })}
    </span>
  );
}

function UiUxStackSquares({
  activeSquare,
  decisionTitle,
  onSelect,
}: {
  activeSquare: number;
  decisionTitle: string;
  onSelect: (number: number) => void;
}) {
  return (
    <div
      aria-label={`${decisionTitle} detail selector`}
      className="uiux-stack-squares"
      role="group"
    >
      {[1, 2, 3].map((number) => (
        <button
          aria-label={`Show ${decisionTitle} detail ${number}`}
          aria-pressed={activeSquare === number}
          className={`uiux-stack-square${
            activeSquare === number ? " is-active" : ""
          }`}
          key={number}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(number);
          }}
          onPointerDown={(event) => event.stopPropagation()}
          type="button"
        >
          {number}
        </button>
      ))}
    </div>
  );
}

function UiUxDeviceContext({
  decision,
  description = decision.deviceDescription,
}: {
  decision: UiUxDecision;
  description?: string;
}) {
  if (!decision.deviceTitle && !description) {
    return null;
  }
  const highlightedPrefix = description?.startsWith("Visual Hierarchy")
    ? "Visual Hierarchy"
    : description?.startsWith("Wow-inducing")
      ? "Wow-inducing"
      : description?.startsWith("Seamless Transitions")
        ? "Seamless Transitions"
        : description?.startsWith("Flexible Layouts")
          ? "Flexible Layouts"
          : description?.startsWith("Fluid Animations")
            ? "Fluid Animations"
            : description?.startsWith("Logical Structure")
              ? "Logical Structure"
              : description?.startsWith("Simple interfaces")
                ? "Simple interfaces"
                : description?.startsWith("Minimalism")
                  ? "Minimalism"
                  : description?.startsWith("Affordance")
                    ? "Affordance"
                    : description?.startsWith("User feedback")
                      ? "User feedback"
                      : description?.startsWith("Feedback")
                        ? "Feedback"
                        : undefined;

  return (
    <div
      className={`uiux-device-context${decision.number === "01" ? " uiux-device-context-purple" : ""}`}
    >
      {decision.deviceTitle ? (
        <h3>
          {decision.number === "04" ? (
            <span className="uiux-device-context-highlight-orange">
              {decision.deviceTitle}
            </span>
          ) : (
            decision.deviceTitle
          )}
        </h3>
      ) : null}
      {description ? (
        <p
          className={
            decision.number === "02" ||
            decision.number === "03" ||
            decision.number === "04"
              ? "uiux-device-context-pyramid"
              : undefined
          }
        >
          {(decision.number === "01" ||
            decision.number === "02" ||
            decision.number === "03" ||
            decision.number === "04") &&
          highlightedPrefix ? (
            <>
              <span
                className={
                  decision.number === "04"
                    ? "uiux-device-context-highlight-orange"
                    : decision.number === "03"
                    ? "uiux-device-context-highlight-blue"
                    : decision.number === "01"
                    ? "uiux-device-context-highlight-purple"
                    : "uiux-device-context-highlight"
                }
              >
                {highlightedPrefix}
              </span>
              {description.slice(highlightedPrefix.length).includes("\n") ? (
                <>
                  {description.slice(highlightedPrefix.length).startsWith("\n") ? (
                    <br />
                  ) : null}
                  {description
                    .slice(highlightedPrefix.length)
                    .replace(/^\n/, "")
                    .split("\n")
                    .map((line, index) => (
                      <span key={`${index}-${line}`}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                </>
              ) : (
                description.slice(highlightedPrefix.length)
              )}
            </>
          ) : (
            description
          )}
        </p>
      ) : null}
    </div>
  );
}

export function UiUxDeviceFrame({
  deviceAspect = "standard",
  deviceVariant = "phone",
  screenshotAlt = "UI design screenshot",
  screenshotFit = "cover",
  screenshotPosition = "center",
  screenshotSrc,
}: Pick<
  UiUxDecisionShowcaseProps,
  "screenshotAlt" | "screenshotFit" | "screenshotPosition" | "screenshotSrc"
> & {
  deviceAspect?: "standard" | "tall";
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
      }${
        isAndroidPhone && deviceAspect === "tall"
          ? " uiux-device-frame-android-tall"
          : ""
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
  isBlank?: boolean;
  isEmphasized?: boolean;
  isPrimary: boolean;
  onPreviewPressEnd?: () => void;
  onPreviewPressStart?: () => void;
};

function UiUxCompactDecisionColumn({
  decision,
  isBlank = false,
  isEmphasized = false,
  isPrimary,
  onPreviewPressEnd,
  onPreviewPressStart,
  screenshotAlt,
  screenshotFit,
  screenshotPosition,
  screenshotSrc,
}: UiUxCompactDecisionColumnProps) {
  const [activeDetail, setActiveDetail] = useState(1);
  const activeDetailScreenshot =
    decision.detailScreenshots?.[activeDetail as 1 | 2 | 3];
  const activeDeviceVariant =
    activeDetailScreenshot?.deviceVariant ?? decision.deviceVariant;
  const activeScreenshotSrc =
    activeDetailScreenshot?.screenshotSrc ??
    (activeDetail === 1 ? decision.screenshotSrc ?? screenshotSrc : undefined);
  const activeProjectHref =
    activeDetailScreenshot?.projectHref ?? decision.projectHref;
  const activeProjectLabel =
    activeDetailScreenshot?.projectLabel ?? decision.projectLabel;
  const shouldShowDevice = Boolean(activeScreenshotSrc);

  return (
    <div
      className={`uiux-compact-decision-column${
        isPrimary ? " is-primary" : " is-adjacent"
      }${isEmphasized ? " is-preview-emphasized" : ""}`}
      data-decision-number={decision.number}
      onPointerCancel={isPrimary ? undefined : onPreviewPressEnd}
      onPointerDown={
        isPrimary
          ? undefined
          : (event) => {
              if (event.pointerType !== "mouse") {
                onPreviewPressStart?.();
              }
            }
      }
      onPointerLeave={isPrimary ? undefined : onPreviewPressEnd}
      onPointerUp={isPrimary ? undefined : onPreviewPressEnd}
    >
      <div
        className="uiux-compact-title-bridge"
        data-gradient-tone={getDecisionGradientTone(decision.number)}
      >
        {!isBlank ? (
          <>
            <strong data-title={decision.title}>{decision.title}</strong>
          </>
        ) : null}
      </div>

      <div className="uiux-compact-active-card">
        <article
          className={`uiux-compact-focused-card${
            decision.placeholder ? " is-placeholder" : ""
          }`}
          data-decision-number={decision.number}
          data-gradient-tone={getDecisionGradientTone(decision.number)}
        >
          {isBlank ? (
            <div
              aria-hidden="true"
              className="uiux-decision-number is-active uiux-empty-number-placeholder"
            />
          ) : (
            <>
              <button
                aria-label={
                  decision.placeholder
                    ? `${decision.number}. ${decision.title} placeholder`
                    : `${decision.number}. ${decision.title}: ${decision.description}`
                }
                aria-pressed={isPrimary}
                className="uiux-decision-number is-active"
                tabIndex={-1}
                type="button"
              >
                <span className="uiux-focused-number-label">
                  <span>{Number.parseInt(decision.number, 10)}</span>
                </span>
              </button>
              <span className="uiux-decision-copy">
                {!decision.placeholder ? (
                  <>
                    <strong>{decision.title}</strong>
                    <UiUxDecisionDescription description={decision.description} />
                  </>
                ) : null}
              </span>
              {!decision.placeholder ? (
                <UiUxStackSquares
                  activeSquare={activeDetail}
                  decisionTitle={decision.title}
                  onSelect={setActiveDetail}
                />
              ) : null}
            </>
          )}
        </article>

        {isBlank ? null : decision.placeholder ? (
          <div className="uiux-placeholder-body" aria-hidden="true" />
        ) : shouldShowDevice ? (
          <div
            className={`uiux-device-slot${
              activeDeviceVariant === "tablet"
                ? " uiux-device-slot-tablet"
                : ""
            }${
              activeDetailScreenshot?.deviceAspect === "tall"
                ? " uiux-device-slot-tall"
                : ""
            }`}
            data-decision-number={decision.number}
            data-detail-number={activeDetail}
          >
            {(activeDetail === 1 || activeDetailScreenshot?.deviceDescription) &&
            activeDeviceVariant !== "tablet" ? (
              <UiUxDeviceContext
                decision={decision}
                description={
                  activeDetailScreenshot?.deviceDescription ??
                  decision.deviceDescription
                }
              />
            ) : null}
            {(activeDetail === 1 || activeDetailScreenshot?.deviceDescription) &&
            activeDeviceVariant === "tablet" ? (
              <UiUxDeviceContext
                decision={decision}
                description={
                  activeDetailScreenshot?.deviceDescription ??
                  decision.deviceDescription
                }
              />
            ) : null}
            <div className="uiux-device-frame-stack">
              {activeProjectHref && activeProjectLabel ? (
                <p className="uiux-device-project-label">
                  <span>PROJECT:</span>
                  <Link
                    aria-label={`View the ${activeProjectLabel} project page`}
                    className="uiux-device-project-link"
                    href={activeProjectHref}
                  >
                    {activeProjectLabel}
                  </Link>
                </p>
              ) : null}
              <UiUxDeviceFrame
                deviceAspect={activeDetailScreenshot?.deviceAspect}
                deviceVariant={activeDeviceVariant}
                screenshotAlt={
                  activeDetailScreenshot?.screenshotAlt ??
                  decision.screenshotAlt ??
                  screenshotAlt
                }
                screenshotFit={screenshotFit}
                screenshotPosition={screenshotPosition}
                screenshotSrc={activeScreenshotSrc}
              />
            </div>
          </div>
        ) : null}
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
  const shouldReduceMotion = useReducedMotion();
  const [focusedDecisionNumber, setFocusedDecisionNumber] = useState(
    decisions[0]?.number ?? "",
  );
  const [focusedDetail, setFocusedDetail] = useState(1);
  const [compactColumnCount, setCompactColumnCount] = useState<1 | 3>(1);
  const [compactNoodle, setCompactNoodle] =
    useState<CompactNoodleGeometry | null>(null);
  const [carouselDirection, setCarouselDirection] = useState<-1 | 1>(1);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [starRotationStep, setStarRotationStep] = useState(0);
  const [starButtonMaskReleased, setStarButtonMaskReleased] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<
    "ui" | "ux" | null
  >("ui");
  const [heldCarouselDirection, setHeldCarouselDirection] = useState<
    -1 | 1 | null
  >(null);
  const [pressedDecisionNumber, setPressedDecisionNumber] = useState<
    string | null
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
  const carouselDirectionRef = useRef<-1 | 1>(1);
  const carouselDirectionFrameRef = useRef<number | null>(null);
  const starMaskReleaseDelayRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const starRotationQueueRef = useRef<Array<() => void>>([]);
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
  const focusedDetailScreenshot =
    focusedDecision?.detailScreenshots?.[focusedDetail as 1 | 2 | 3];
  const focusedDeviceVariant =
    focusedDetailScreenshot?.deviceVariant ?? focusedDecision?.deviceVariant;
  const focusedScreenshotSrc =
    focusedDetailScreenshot?.screenshotSrc ??
    (focusedDetail === 1
      ? focusedDecision?.screenshotSrc ?? screenshotSrc
      : undefined);
  const focusedProjectHref =
    focusedDetailScreenshot?.projectHref ?? focusedDecision?.projectHref;
  const focusedProjectLabel =
    focusedDetailScreenshot?.projectLabel ?? focusedDecision?.projectLabel;
  const shouldShowFocusedDevice = Boolean(focusedScreenshotSrc);
  const isUxMode = selectedDiscipline === "ux";

  useEffect(() => {
    setFocusedDetail(1);
  }, [focusedDecisionNumber]);
  const visibleDecisionOffsets =
    compactColumnCount === 1
      ? [0]
      : carouselDirection === -1
        ? [-3, -2, -1, 0, 1, 2]
        : [-2, -1, 0, 1, 2, 3];
  // Three-stack mode: replace the desktop offsets above with [-1, 0, 1].
  // Desktop keeps six face instances mounted even though there are five
  // decisions. Absolute face positions give the repeated rear decision a
  // unique, stable identity so it can enter from behind in either direction.
  const visibleDecisions = visibleDecisionOffsets.map((offset) => {
    const facePosition = carouselPosition + offset;
    const index =
      ((facePosition % decisions.length) + decisions.length) % decisions.length;
    const role: DesktopStackRole =
      offset === -3
        ? "rear-hidden"
        : offset === -2
          ? "previous-outer"
          : offset === -1
            ? "previous"
            : offset === 1
              ? "next"
              : offset === 2
                ? "next-outer"
                : offset === 3
                  ? "rear"
                  : "active";

    return {
      decision: decisions[index],
      facePosition,
      isPrimary: offset === 0,
      role,
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

  const runNextStarRotation = () => {
    starMaskReleaseDelayRef.current = null;
    const action = starRotationQueueRef.current.shift();

    if (!action) {
      setStarButtonMaskReleased(false);
      return;
    }

    action();

    if (starRotationQueueRef.current.length > 0) {
      starMaskReleaseDelayRef.current = setTimeout(
        runNextStarRotation,
        100,
      );
    } else if (shouldReduceMotion) {
      setStarButtonMaskReleased(false);
    }
  };

  const scheduleStarRotation = (action: () => void) => {
    starRotationQueueRef.current.push(action);
    setStarButtonMaskReleased(true);

    if (starMaskReleaseDelayRef.current === null) {
      starMaskReleaseDelayRef.current = setTimeout(
        runNextStarRotation,
        100,
      );
    }
  };

  const handleStarRotationComplete = () => {
    if (
      starRotationQueueRef.current.length === 0 &&
      starMaskReleaseDelayRef.current === null
    ) {
      setStarButtonMaskReleased(false);
    }
  };

  const stageCarouselAction = (direction: -1 | 1, action: () => void) => {
    const isDesktopDirectionChange =
      compactColumnCount === 3 && carouselDirectionRef.current !== direction;

    carouselDirectionRef.current = direction;
    setCarouselDirection(direction);

    if (!isDesktopDirectionChange) {
      action();
      return;
    }

    if (carouselDirectionFrameRef.current !== null) {
      cancelAnimationFrame(carouselDirectionFrameRef.current);
    }

    carouselDirectionFrameRef.current = requestAnimationFrame(() => {
      carouselDirectionFrameRef.current = null;
      action();
    });
  };

  const applyCarouselMove = (direction: -1 | 1) => {
    scheduleStarRotation(() => {
      setStarRotationStep((currentStep) => currentStep + direction);
      stageCarouselAction(direction, () => {
        setCarouselPosition((currentPosition) => currentPosition + direction);
        setFocusedDecisionNumber((currentNumber) => {
          const currentIndex = decisions.findIndex(
            (decision) => decision.number === currentNumber,
          );
          const normalizedIndex = currentIndex >= 0 ? currentIndex : 0;
          const nextIndex =
            (normalizedIndex + direction + decisions.length) %
            decisions.length;

          return decisions[nextIndex]?.number ?? currentNumber;
        });
      });
    });
  };

  const moveCarousel = (direction: -1 | 1) => {
    applyCarouselMove(direction);
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

  const selectDisciplineAtFirstStack = (discipline: "ui" | "ux") => {
    setSelectedDiscipline(discipline);
    clearCarouselHoldTimers();
    setHeldCarouselDirection(null);

    const firstDecisionNumber = decisions[0]?.number;
    const currentIndex = decisions.findIndex(
      (decision) => decision.number === focusedDecisionNumber,
    );

    if (!firstDecisionNumber || currentIndex <= 0) {
      if (firstDecisionNumber) {
        setFocusedDecisionNumber(firstDecisionNumber);
      }
      return;
    }

    const backwardDistance = -currentIndex;
    const forwardDistance = decisions.length - currentIndex;
    const positionDelta =
      Math.abs(backwardDistance) <= Math.abs(forwardDistance)
        ? backwardDistance
        : forwardDistance;
    const direction = positionDelta < 0 ? -1 : 1;

    scheduleStarRotation(() => {
      setStarRotationStep((currentStep) => currentStep + positionDelta);
      stageCarouselAction(direction, () => {
        setCarouselPosition(
          (currentPosition) => currentPosition + positionDelta,
        );
        setFocusedDecisionNumber(firstDecisionNumber);
      });
    });
  };

  useEffect(
    () => () => {
      clearCarouselHoldTimers();

      if (starMaskReleaseDelayRef.current !== null) {
        clearTimeout(starMaskReleaseDelayRef.current);
        starMaskReleaseDelayRef.current = null;
      }
      starRotationQueueRef.current = [];

      if (carouselDirectionFrameRef.current !== null) {
        cancelAnimationFrame(carouselDirectionFrameRef.current);
        carouselDirectionFrameRef.current = null;
      }
    },
    [],
  );

  useLayoutEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth <= 980) {
        setCompactColumnCount(1);
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
  }, [focusedDecisionNumber, focusedDetail]);

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

              {compactColumnCount === 3 ? (
                <div
                  className="uiux-compact-3d-shell"
                  data-discipline={selectedDiscipline}
                >
                  <svg
                    aria-hidden="true"
                    className="uiux-inactive-icon-filter-defs"
                  >
                    <defs>
                      <filter
                        colorInterpolationFilters="sRGB"
                        height="140%"
                        id="uiux-inactive-icon-outline"
                        width="140%"
                        x="-20%"
                        y="-20%"
                      >
                        <feComponentTransfer
                          in="SourceAlpha"
                          result="solid-alpha"
                        >
                          <feFuncA
                            intercept="0"
                            slope="1000"
                            type="linear"
                          />
                        </feComponentTransfer>
                        <feMorphology
                          in="solid-alpha"
                          operator="dilate"
                          radius="2"
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
                  <UiUxCarouselStar
                    onRotationComplete={handleStarRotationComplete}
                    rotationStep={starRotationStep}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                  <div
                    aria-label="Choose UI or UX emphasis"
                    className="uiux-star-discipline-labels"
                    data-star-mask={
                      ((starRotationStep % UIUX_STAR_TIP_COUNT) +
                        UIUX_STAR_TIP_COUNT) %
                      UIUX_STAR_TIP_COUNT
                    }
                    data-case-tone={getDecisionCaseTone(
                      focusedDecision.number,
                    )}
                    data-gradient-tone={getDecisionGradientTone(
                      focusedDecision.number,
                    )}
                    data-mask-released={
                      starButtonMaskReleased ? "true" : undefined
                    }
                    data-selected-discipline={selectedDiscipline ?? "ui"}
                    role="group"
                  >
                    <span
                      aria-hidden="true"
                      className="uiux-star-discipline-frame"
                    />
                    <button
                      aria-pressed={selectedDiscipline === "ui"}
                      className={`uiux-star-discipline-label is-ui${
                        selectedDiscipline === "ui" ? " is-selected" : ""
                      }`}
                      onClick={() => selectDisciplineAtFirstStack("ui")}
                      type="button"
                    >
                      <span>UI</span>
                    </button>
                    <button
                      aria-pressed={selectedDiscipline === "ux"}
                      className={`uiux-star-discipline-label is-ux${
                        selectedDiscipline === "ux" ? " is-selected" : ""
                      }`}
                      onClick={() => selectDisciplineAtFirstStack("ux")}
                      type="button"
                    >
                      <span>UX</span>
                    </button>
                  </div>
                  {isUxMode ? (
                    <UiUxActiveLock
                      className="uiux-star-lock-white"
                      cutout
                      decisionNumber={focusedDecision.number}
                    />
                  ) : (
                    <UiUxActiveKey
                      className="uiux-star-key-outline"
                      decisionNumber={focusedDecision.number}
                      outlineColor="#fff"
                      outlineOnly
                      outlineOpacity="0.9"
                    />
                  )}

                  <UiUxCarouselArrowButton
                    direction={-1}
                    isHeld={heldCarouselDirection === -1}
                    onStart={startCarouselHold}
                    onStop={stopCarouselHold}
                  />

                  <div
                    aria-label="Choose a UI or UX decision"
                    className="uiux-compact-3d-track"
                    role="group"
                  >
                    {visibleDecisions.map(
                      ({ decision, facePosition, isPrimary, role }) => {
                        const isRearSide = role.endsWith("outer");
                        const isRearCenter =
                          role === "rear" || role === "rear-hidden";
                        const isRear = isRearSide || isRearCenter;
                        const usesPrimaryLayout = true;
                        const stackTransition = shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              damping: 24,
                              mass: 0.85,
                              stiffness: 180,
                              type: "spring" as const,
                            };
                        const stackMotion = DESKTOP_STACK_VARIANTS[role];
                        return (
                          <motion.div
                            animate={{
                              x:
                                role === "previous-outer"
                                  ? -DESKTOP_OUTER_STACK_OFFSET
                                  : role === "previous"
                                    ? -DESKTOP_ADJACENT_STACK_OFFSET
                                    : role === "next"
                                      ? DESKTOP_ADJACENT_STACK_OFFSET
                                      : role === "next-outer"
                                        ? DESKTOP_OUTER_STACK_OFFSET
                                        : 0,
                              y: 0,
                            }}
                            className="uiux-compact-3d-cell"
                            data-face-position={facePosition}
                            initial={false}
                            key={facePosition}
                            transition={stackTransition}
                          >
                            <motion.div
                              animate={{ width: DESKTOP_CANONICAL_STACK_WIDTH }}
                              className="uiux-compact-3d-positioner"
                              initial={false}
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0 }
                                  : stackTransition
                              }
                            >
                              <motion.div
                                animate={role}
                                className={`uiux-compact-3d-stack is-${role}${
                                  usesPrimaryLayout
                                    ? " is-primary-layout"
                                    : ""
                                }${
                                  pressedDecisionNumber === decision.number
                                    ? " is-preview-emphasized"
                                    : ""
                                }`}
                                data-case-tone={getDecisionCaseTone(
                                  decision.number,
                                )}
                                data-decision-number={decision.number}
                                aria-hidden={isRear ? true : undefined}
                                inert={isRear ? true : undefined}
                                initial={
                                  shouldReduceMotion
                                    ? false
                                    : {
                                        ...stackMotion,
                                        opacity: 0,
                                      }
                                }
                                onClickCapture={
                                  isPrimary || isRear
                                    ? undefined
                                    : (event) => {
                                        if (
                                          event.target instanceof Element &&
                                          event.target.closest(
                                            ".uiux-carousel-arrow",
                                          )
                                        ) {
                                          return;
                                        }

                                        event.preventDefault();
                                        event.stopPropagation();
                                        const direction =
                                          role === "previous" ? -1 : 1;
                                        scheduleStarRotation(() => {
                                          setStarRotationStep(
                                            (currentStep) =>
                                              currentStep + direction,
                                          );
                                          stageCarouselAction(
                                            direction,
                                            () => {
                                              setCarouselPosition(
                                                (currentPosition) =>
                                                  currentPosition + direction,
                                              );
                                              setFocusedDecisionNumber(
                                                decision.number,
                                              );
                                            },
                                          );
                                        });
                                      }
                                }
                                onPointerCancel={
                                  isRear
                                    ? undefined
                                    : () => setPressedDecisionNumber(null)
                                }
                                onPointerDown={
                                  isRear
                                    ? undefined
                                    : (event) => {
                                        if (
                                          !isPrimary &&
                                          event.pointerType !== "mouse"
                                        ) {
                                          setPressedDecisionNumber(
                                            decision.number,
                                          );
                                        }
                                      }
                                }
                                onPointerLeave={
                                  isRear
                                    ? undefined
                                    : () => setPressedDecisionNumber(null)
                                }
                                onPointerUp={
                                  isRear
                                    ? undefined
                                    : () => setPressedDecisionNumber(null)
                                }
                                transition={stackTransition}
                                variants={DESKTOP_STACK_VARIANTS}
                              >
                                <UiUxCarouselAxisBends />

                                {isPrimary ? (
                                  <div
                                    aria-label={`Current ${isUxMode ? "UX" : "UI"} decision ${decision.number}`}
                                    aria-live="polite"
                                    className="uiux-carousel-current uiux-decision-number is-active"
                                    ref={activeStripButtonRef}
                                  >
                                    <span
                                      className="uiux-decision-number-text"
                                      data-gradient-tone={getDecisionGradientTone(
                                        decision.number,
                                      )}
                                    >
                                      {decision.number}
                                    </span>
                                  </div>
                                ) : isRearCenter ? (
                                  <div
                                    aria-hidden="true"
                                    className="uiux-carousel-current uiux-decision-number is-active"
                                  >
                                    <span
                                      className="uiux-decision-number-text"
                                      data-gradient-tone={getDecisionGradientTone(
                                        decision.number,
                                      )}
                                    >
                                      {decision.number}
                                    </span>
                                  </div>
                                ) : isRear ? (
                                  <div
                                    aria-hidden="true"
                                    className="uiux-carousel-preview uiux-decision-number"
                                  >
                                    <span
                                      className="uiux-decision-number-text"
                                      data-gradient-tone={getDecisionGradientTone(
                                        decision.number,
                                      )}
                                    >
                                      {decision.number}
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      aria-label={`Show ${isUxMode ? "UX" : "UI"} decision ${decision.number}`}
                                      className="uiux-carousel-preview uiux-decision-number"
                                      onClick={() =>
                                        setFocusedDecisionNumber(
                                          decision.number,
                                        )
                                      }
                                      type="button"
                                    >
                                      <span
                                        className="uiux-decision-number-text"
                                        data-gradient-tone={getDecisionGradientTone(
                                          decision.number,
                                        )}
                                      >
                                        {decision.number}
                                      </span>
                                    </button>

                                    <div className="uiux-inactive-stack-navigation">
                                      <UiUxCarouselArrowButton
                                        direction={-1}
                                        holdEnabled={false}
                                        isHeld={false}
                                        onStart={startCarouselHold}
                                        onStop={stopCarouselHold}
                                      />
                                      <UiUxCarouselArrowButton
                                        direction={1}
                                        holdEnabled={false}
                                        isHeld={false}
                                        onStart={startCarouselHold}
                                        onStop={stopCarouselHold}
                                      />
                                    </div>
                                  </>
                                )}

                                <UiUxCompactDecisionColumn
                                  decision={decision}
                                  isBlank={isUxMode}
                                  isPrimary={usesPrimaryLayout}
                                  screenshotAlt={screenshotAlt}
                                  screenshotFit={screenshotFit}
                                  screenshotPosition={screenshotPosition}
                                  screenshotSrc={screenshotSrc}
                                />
                              </motion.div>
                          </motion.div>
                        </motion.div>
                        );
                      },
                    )}
                  </div>

                  <UiUxCarouselArrowButton
                    direction={1}
                    isHeld={heldCarouselDirection === 1}
                    onStart={startCarouselHold}
                    onStop={stopCarouselHold}
                  />
                </div>
              ) : (
                <>
                  <div
                    aria-label="Choose a UI or UX decision"
                    className="uiux-compact-decision-strip"
                    data-column-count={compactColumnCount}
                    role="group"
                  >
                    <UiUxCarouselStar
                      onRotationComplete={handleStarRotationComplete}
                      rotationStep={starRotationStep}
                      shouldReduceMotion={shouldReduceMotion}
                    />

                    <UiUxCarouselArrowButton
                      direction={-1}
                      isHeld={heldCarouselDirection === -1}
                      onStart={startCarouselHold}
                      onStop={stopCarouselHold}
                    />

                    {visibleDecisions.map(({ decision, isPrimary }) =>
                      isPrimary ? (
                        <div
                          aria-label={`Current UI or UX decision ${decision.number}`}
                          aria-live="polite"
                          className="uiux-carousel-current uiux-decision-number is-active"
                          key={decision.number}
                          ref={activeStripButtonRef}
                        >
                          {isUxMode ? (
                            <UiUxActiveLock
                              className="uiux-star-lock-white"
                              cutout
                              decisionNumber={decision.number}
                            />
                          ) : (
                            <UiUxActiveKey
                              className="uiux-star-key-outline"
                              decisionNumber={decision.number}
                              outlineColor="#fff"
                              outlineOnly
                              outlineOpacity="0.9"
                            />
                          )}
                          <span
                            className="uiux-decision-number-text"
                            data-gradient-tone={getDecisionGradientTone(
                              decision.number,
                            )}
                          >
                            {decision.number}
                          </span>
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
                          <span
                            className="uiux-decision-number-text"
                            data-gradient-tone={getDecisionGradientTone(
                              decision.number,
                            )}
                          >
                            {decision.number}
                          </span>
                        </button>
                      ),
                    )}

                    <UiUxCarouselArrowButton
                      direction={1}
                      isHeld={heldCarouselDirection === 1}
                      onStart={startCarouselHold}
                      onStop={stopCarouselHold}
                    />
                  </div>

                  <div
                    className="uiux-compact-columns"
                    data-column-count={compactColumnCount}
                  >
                    {visibleDecisions.map(({ decision, isPrimary }) => (
                      <UiUxCompactDecisionColumn
                        decision={decision}
                        isBlank={isUxMode}
                        isEmphasized={
                          !isPrimary &&
                          pressedDecisionNumber === decision.number
                        }
                        isPrimary={isPrimary}
                        key={decision.number}
                        onPreviewPressEnd={() =>
                          setPressedDecisionNumber(null)
                        }
                        onPreviewPressStart={() =>
                          setPressedDecisionNumber(decision.number)
                        }
                        screenshotAlt={screenshotAlt}
                        screenshotFit={screenshotFit}
                        screenshotPosition={screenshotPosition}
                        screenshotSrc={screenshotSrc}
                      />
                    ))}
                  </div>
                </>
              )}

              <div
                className="uiux-compact-title-bridge uiux-compact-legacy-title"
                data-gradient-tone={getDecisionGradientTone(
                  focusedDecision.number,
                )}
                ref={titleBridgeRef}
              >
                <strong data-title={focusedDecision.title}>
                  {focusedDecision.title}
                </strong>
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
                  {!focusedDecision.placeholder ? (
                    <UiUxStackSquares
                      activeSquare={focusedDetail}
                      decisionTitle={focusedDecision.title}
                      onSelect={setFocusedDetail}
                    />
                  ) : null}
                </article>

                {focusedDecision.placeholder ? (
                  <div className="uiux-placeholder-body" aria-hidden="true" />
                ) : shouldShowFocusedDevice ? (
                  <div
                    className={`uiux-device-slot${
                      focusedDeviceVariant === "tablet"
                        ? " uiux-device-slot-tablet"
                        : ""
                    }${
                      focusedDetailScreenshot?.deviceAspect === "tall"
                        ? " uiux-device-slot-tall"
                        : ""
                    }`}
                    data-decision-number={focusedDecision.number}
                    data-detail-number={focusedDetail}
                    ref={deviceSlotRef}
                  >
                    {(focusedDetail === 1 ||
                      focusedDetailScreenshot?.deviceDescription) &&
                    focusedDeviceVariant !== "tablet" ? (
                      <UiUxDeviceContext
                        decision={focusedDecision}
                        description={
                          focusedDetailScreenshot?.deviceDescription ??
                          focusedDecision.deviceDescription
                        }
                      />
                    ) : null}
                    {(focusedDetail === 1 ||
                      focusedDetailScreenshot?.deviceDescription) &&
                    focusedDeviceVariant === "tablet" ? (
                      <UiUxDeviceContext
                        decision={focusedDecision}
                        description={
                          focusedDetailScreenshot?.deviceDescription ??
                          focusedDecision.deviceDescription
                        }
                      />
                    ) : null}
                    <div className="uiux-device-frame-stack">
                      {focusedProjectHref && focusedProjectLabel ? (
                        <p className="uiux-device-project-label">
                          <span>PROJECT:</span>
                          <Link
                            aria-label={`View the ${focusedProjectLabel} project page`}
                            className="uiux-device-project-link"
                            href={focusedProjectHref}
                          >
                            {focusedProjectLabel}
                          </Link>
                        </p>
                      ) : null}
                      <UiUxDeviceFrame
                        deviceAspect={focusedDetailScreenshot?.deviceAspect}
                        deviceVariant={focusedDeviceVariant}
                        screenshotAlt={
                          focusedDetailScreenshot?.screenshotAlt ??
                          focusedDecision.screenshotAlt ??
                          screenshotAlt
                        }
                        screenshotFit={screenshotFit}
                        screenshotPosition={screenshotPosition}
                        screenshotSrc={focusedScreenshotSrc}
                      />
                    </div>
                  </div>
                ) : null}
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
