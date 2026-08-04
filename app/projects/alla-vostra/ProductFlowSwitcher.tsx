"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useId, useState } from "react";

import ExpandableFlowStacks from "./ExpandableFlowStacks";

type FlowView = "ui" | "ux";

type FlowScreen = {
  aspect: "standard" | "tall";
  caption: string;
  label: "Small" | "Large";
  src: string;
  title: string;
};

type FlowScreenStack = {
  screens: FlowScreen[];
  title: string;
};

type ScreenshotGroup = {
  copy: string;
  stacks: FlowScreenStack[];
  title: string;
};

type ProductFlowRect = {
  height: number;
  opacity?: number;
  width: number;
  x: number;
  y: number;
};

type ProductFlowBox = ProductFlowRect & {
  title: string;
};

type ProductFlowConnector = {
  d: string;
  kind?: "arrow-body" | "hairline";
};

type ProductFlowConnectorSegment = {
  axis: "horizontal" | "vertical";
  from: ProductFlowPoint;
  to: ProductFlowPoint;
};

type ProductFlowConnectorSegmentStyle = CSSProperties & {
  "--flow-connector-left": string;
  "--flow-connector-length": string;
  "--flow-connector-top": string;
};

type ProductFlowArrowStyle = CSSProperties & {
  "--flow-arrow-left": string;
  "--flow-arrow-top": string;
};

type ProductFlowBoxStyle = CSSProperties & {
  "--flow-box-height": string;
  "--flow-box-left": string;
  "--flow-box-opacity"?: number;
  "--flow-box-top": string;
  "--flow-box-width": string;
};

type ProductFlowPoint = {
  x: number;
  y: number;
};

type FlowSwatchStyle = CSSProperties & {
  "--flow-swatch-color": string;
  "--flow-swatch-text": string;
};

type FlowSwatch = {
  hex: string;
  name: string;
  text: string;
};

type FlowSwatchGroup = {
  swatches: [FlowSwatch, FlowSwatch];
  title: string;
  tone: string;
};

type FlowFontSample = {
  className: string;
  name: string;
  text: string;
};

type FlowArtSample = {
  alt: string;
  caption?: string;
  name: string;
  src: string;
};

const placeholderSteps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
const colorsAndThemingSwatchGroups: Record<string, FlowSwatchGroup> = {
  "Step 1": {
    swatches: [
      { hex: "#FFFCF2", name: "Quarter Pearl Lusta", text: "#111111" },
      { hex: "#F7B967", name: "Rajah", text: "#111111" },
    ],
    title: "Primaries",
    tone: "primary",
  },
  "Step 2": {
    swatches: [
      { hex: "#7B5C33", name: "Breen", text: "#FFFCF2" },
      { hex: "#FFFFFF", name: "White", text: "#111111" },
    ],
    title: "Accents",
    tone: "accent",
  },
  "Step 3": {
    swatches: [
      { hex: "#111111", name: "Cod Gray", text: "#FFFCF2" },
      { hex: "#3C3B3A", name: "Tuatara", text: "#FFFCF2" },
    ],
    title: "Neutrals",
    tone: "neutral",
  },
};
const colorsAndThemingStepTitles = Object.fromEntries(
  Object.entries(colorsAndThemingSwatchGroups).map(([step, group]) => [
    step,
    group.title,
  ]),
);
const typographyAndSpacingSteps = ["Step 1", "Step 2"];
const typographyAndSpacingStepTitles = { "Step 1": "Fonts" };
const typographyFontSamples: [FlowFontSample, FlowFontSample] = [
  {
    className: "flow-font-sample-dream-avenue",
    name: "Dream Avenue",
    text: "Dream Avenue",
  },
  {
    className: "flow-font-sample-tt-fors",
    name: "TT Fors",
    text: "TT Fors",
  },
];
const iconographyAndImageryStepTitles = {
  "Step 1": "Original Art",
  "Step 2": "Original Photography",
  "Step 3": "Original Hero",
  "Step 4": "Original Icons",
};
const iconographyAndImagerySteps = Object.keys(iconographyAndImageryStepTitles);
const originalArtSamples: FlowArtSample[] = [
  {
    alt: "Alla Vostra truck original art",
    name: "Speedy Delivery",
    src: "/images/alla-vostra/truck1_square_whitefill.png",
  },
  {
    alt: "Alla Vostra bargain original art",
    name: "Great Deal",
    src: "/images/alla-vostra/bargain_square_whitefill.png",
  },
  {
    alt: "Alla Vostra SoFlo original art",
    name: "Local Availability",
    src: "/images/alla-vostra/soflo_square.png",
  },
];
const originalPhotographySamples: FlowArtSample[] = [
  {
    alt: "Alla Vostra Piccola grazing board",
    caption: "Piccola grazing board.",
    name: "Product #1",
    src: "/images/alla-vostra/piccola-product.png",
  },
  {
    alt: "Alla Vostra Sei Perfetto grazing board",
    caption: "Sei Perfetto grazing board.",
    name: "Product #2",
    src: "/images/alla-vostra/sei-perfetto-product.png",
  },
  {
    alt: "Alla Vostra Buon Natale grazing board",
    caption: "Buon Natale grazing board.",
    name: "Product #3",
    src: "/images/alla-vostra/buon-natale-product.png",
  },
];
const stickyButtonIconSamples = [
  { kind: "cart", name: "Shopping Cart" },
  { kind: "tutorial", name: "Tutorial" },
] as const;
const uiBlueprintSections = [
  { stage: "00", title: "Colors & Theming" },
  { stage: "01", title: "Typography & Spacing" },
  { stage: "02", title: "Iconography & Imagery" },
  { stage: "03", title: "Navigations" },
  { stage: "04", title: "Controls & Inputs" },
  { stage: "05", title: "Visual Hierarchy" },
];
const flowCoordinateFrame = { height: 1648, width: 862, x: 102, y: 270 };
const flowPanelRect: ProductFlowRect = {
  height: 1624,
  width: 842,
  x: 112,
  y: 294,
};
const productFlowRails: ProductFlowBox[] = [
  { height: 210, title: "Tutorial", width: 86.4, x: 122.8, y: 314 },
  { height: 210, title: "Browse", width: 86.4, x: 122.8, y: 546 },
  { height: 210, opacity: 0.86, title: "Shop", width: 86.4, x: 122.8, y: 778 },
  { height: 210, opacity: 0.76, title: "Cart", width: 86.4, x: 122.8, y: 1010 },
  { height: 210, opacity: 0.66, title: "Checkout", width: 86.4, x: 122.8, y: 1242 },
  { height: 210, opacity: 0.56, title: "Payment", width: 86.4, x: 122.8, y: 1474 },
  { height: 210, opacity: 0.48, title: "Confirmation", width: 86.4, x: 122.8, y: 1706 },
];
const productFlowNodes: ProductFlowBox[] = [
  { height: 84, title: "Step 1", width: 122.5, x: 276.8, y: 322 },
  { height: 84, title: "Step 2", width: 125.2, x: 492.4, y: 322 },
  { height: 84, title: "Step 3", width: 125.8, x: 709.1, y: 322 },
  { height: 84, title: "Step 4", width: 126.3, x: 600.4, y: 430 },
  { height: 84, title: "Step 5", width: 125.8, x: 383.6, y: 430 },
  { height: 84, title: "Home", width: 119.8, x: 225.1, y: 609 },
  { height: 84, title: "Products", width: 154.7, x: 388.6, y: 609 },
  { height: 84, title: "About Us", width: 155.3, x: 574.4, y: 609 },
  { height: 84, title: "Contact", width: 142.8, x: 762.6, y: 609 },
  { height: 84, title: "Shop", width: 112, x: 511, y: 841 },
  { height: 84, title: "Tutorial", width: 139.7, x: 271.1, y: 1073 },
  { height: 84, title: "Selection", width: 157.8, x: 502.1, y: 1073 },
  { height: 84, title: "Cart", width: 103.8, x: 769.1, y: 1073 },
  { height: 84, title: "Contact", width: 142.8, x: 244.6, y: 1305 },
  { height: 84, title: "Address", width: 146.4, x: 473.8, y: 1305 },
  { height: 84, title: "Date & Time", width: 184.9, x: 705.6, y: 1305 },
  { height: 84, title: "Payment Method", width: 238.9, x: 226, y: 1537 },
  { height: 84, title: "Details Input", width: 192.9, x: 500, y: 1537 },
  { height: 84, title: "Confirmation\nPrompt", width: 198.8, x: 740, y: 1537 },
  { height: 84, title: "Thank You\nOrder Confirmed", width: 237.7, x: 448.2, y: 1769 },
];
const productFlowConnectors: ProductFlowConnector[] = [
  { d: "M399.3 364H486.4" },
  { d: "M617.6 364H703.1" },
  { d: "M772 406V472H732.6" },
  { d: "M600.4 472H515.4" },
  { d: "M446.5 514V544H285V603" },
  { d: "M285 693V883H511" },
  { d: "M466 693V816H545V835" },
  { d: "M652 693V816H589V835" },
  { d: "M834 693V883H623" },
  { d: "M285 609V589", kind: "arrow-body" },
  { d: "M466 609V589", kind: "arrow-body" },
  { d: "M652 609V589", kind: "arrow-body" },
  { d: "M834 609V589", kind: "arrow-body" },
  { d: "M285 589H931", kind: "arrow-body" },
  { d: "M954 589V1115H878.9" },
  { d: "M567 925V1008", kind: "arrow-body" },
  { d: "M567 1008H341V1067" },
  { d: "M567 1008H581V1067" },
  { d: "M567 1008H821V1067" },
  { d: "M410.8 1115H496.1" },
  { d: "M659.9 1115H763.1" },
  { d: "M821 1157V1240H316V1302" },
  { d: "M387.4 1347H467.8" },
  { d: "M620.2 1347H699.6" },
  { d: "M798 1389V1496H345.5V1531" },
  { d: "M464.9 1579H494" },
  { d: "M692.9 1579H734" },
  { d: "M839.4 1621V1685H567V1763" },
  { d: "M204 544H930", kind: "hairline" },
  { d: "M204 776H930", kind: "hairline" },
  { d: "M204 1008H930", kind: "hairline" },
  { d: "M204 1240H930", kind: "hairline" },
  { d: "M204 1472H930", kind: "hairline" },
  { d: "M204 1704H930", kind: "hairline" },
];
const mobilePortraitQuery = "(max-width: 720px) and (orientation: portrait)";

function getFlowXPercent(x: number) {
  return ((x - flowCoordinateFrame.x) / flowCoordinateFrame.width) * 100;
}

function getFlowYPercent(y: number) {
  return ((y - flowCoordinateFrame.y) / flowCoordinateFrame.height) * 100;
}

function getFlowBoxStyle(box: ProductFlowRect): ProductFlowBoxStyle {
  return {
    "--flow-box-height": `${(box.height / flowCoordinateFrame.height) * 100}%`,
    "--flow-box-left": `${getFlowXPercent(box.x)}%`,
    "--flow-box-opacity": box.opacity ?? 1,
    "--flow-box-top": `${getFlowYPercent(box.y)}%`,
    "--flow-box-width": `${(box.width / flowCoordinateFrame.width) * 100}%`,
  };
}

function getFlowConnectorSegments(d: string): ProductFlowConnectorSegment[] {
  const tokens = d.match(/[A-Z]|-?\d+(?:\.\d+)?/g) ?? [];
  const segments: ProductFlowConnectorSegment[] = [];
  let command = "";
  let current: ProductFlowPoint = { x: 0, y: 0 };
  let index = 0;

  const readNumber = () => Number(tokens[index++]);

  while (index < tokens.length) {
    const token = tokens[index++];

    if (/^[A-Z]$/.test(token)) {
      command = token;
    } else {
      index -= 1;
    }

    if (command === "M") {
      current = { x: readNumber(), y: readNumber() };
    }

    if (command === "H") {
      const next = { x: readNumber(), y: current.y };
      segments.push({ axis: "horizontal", from: current, to: next });
      current = next;
    }

    if (command === "V") {
      const next = { x: current.x, y: readNumber() };
      segments.push({ axis: "vertical", from: current, to: next });
      current = next;
    }
  }

  return segments;
}

function getFlowConnectorSegmentStyle(
  segment: ProductFlowConnectorSegment,
): ProductFlowConnectorSegmentStyle {
  if (segment.axis === "horizontal") {
    return {
      "--flow-connector-left": `${getFlowXPercent(
        Math.min(segment.from.x, segment.to.x),
      )}%`,
      "--flow-connector-length": `${
        (Math.abs(segment.to.x - segment.from.x) / flowCoordinateFrame.width) *
        100
      }%`,
      "--flow-connector-top": `${getFlowYPercent(segment.from.y)}%`,
    };
  }

  return {
    "--flow-connector-left": `${getFlowXPercent(segment.from.x)}%`,
    "--flow-connector-length": `${
      (Math.abs(segment.to.y - segment.from.y) / flowCoordinateFrame.height) *
      100
    }%`,
    "--flow-connector-top": `${getFlowYPercent(
      Math.min(segment.from.y, segment.to.y),
    )}%`,
  };
}

function getFlowConnectorArrowDirection(segment: ProductFlowConnectorSegment) {
  if (segment.axis === "horizontal") {
    return segment.to.x >= segment.from.x ? "right" : "left";
  }

  return segment.to.y >= segment.from.y ? "down" : "up";
}

function getFlowConnectorArrowStyle(
  segment: ProductFlowConnectorSegment,
): ProductFlowArrowStyle {
  return {
    "--flow-arrow-left": `${getFlowXPercent(segment.to.x)}%`,
    "--flow-arrow-top": `${getFlowYPercent(segment.to.y)}%`,
  };
}

function useIsMobilePortrait() {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobilePortraitQuery);
    const handleChange = () => setIsMobilePortrait(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isMobilePortrait;
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="section-heading">
      <p>{kicker}</p>
      <h2>{title}</h2>
    </div>
  );
}

function ProductFlowDiagramTable() {
  return (
    <figure
      aria-label="Alla Vostra product flow diagram"
      className="flow-primary-visual flow-chart-mockup flow-chart-table-mockup"
    >
      <div className="flow-table-frame">
        <div className="flow-diagram-background-plane" aria-hidden>
          <span
            className="flow-diagram-panel-plane"
            style={getFlowBoxStyle(flowPanelRect)}
          />
        </div>

        <div className="flow-diagram-coordinate-plane" aria-hidden>
          <div className="flow-diagram-connector-layer">
            {productFlowConnectors.flatMap((connector) =>
              getFlowConnectorSegments(connector.d).map((segment, index) => (
                <span
                  className={`flow-diagram-connector-segment flow-diagram-connector-segment-${segment.axis} flow-diagram-connector-segment-${
                    connector.kind ?? "arrow"
                  }`}
                  key={`${connector.d}-${index}`}
                  style={getFlowConnectorSegmentStyle(segment)}
                />
              )),
            )}
            {productFlowConnectors.map((connector) => {
              const segments = getFlowConnectorSegments(connector.d);
              const finalSegment = segments.at(-1);

              if (!finalSegment || connector.kind) {
                return null;
              }

              const direction = getFlowConnectorArrowDirection(finalSegment);

              return (
                <span
                  className={`flow-diagram-arrowhead flow-diagram-arrowhead-${direction}`}
                  key={`${connector.d}-arrowhead`}
                  style={getFlowConnectorArrowStyle(finalSegment)}
                />
              );
            })}
          </div>
          {productFlowRails.map((rail) => (
            <span
              className="flow-diagram-rail"
              key={rail.title}
              style={getFlowBoxStyle(rail)}
            >
              <span>{rail.title}</span>
            </span>
          ))}
          {productFlowNodes.map((node) => (
            <span
              className="flow-diagram-node"
              key={`${node.title}-${node.x}-${node.y}`}
              style={getFlowBoxStyle(node)}
            >
              {node.title.split("\n").map((line) => (
                <span className="flow-diagram-node-line" key={line}>
                  {line}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}

function PlaceholderScreen({
  label,
  step,
}: {
  label: "Small" | "Large";
  step: string;
}) {
  const aspect = label === "Small" ? "standard" : "tall";

  return (
    <figure
      aria-label={`${step} ${label} screenshot placeholder`}
      className={`flow-screen flow-screen-compact flow-screen-${aspect}`}
    >
      <span className="flow-screen-label">{label}</span>
      <div className="flow-image-frame flow-placeholder-frame">
        <span>Screenshot pending</span>
      </div>
      <figcaption>{`${step} ${label} placeholder.`}</figcaption>
    </figure>
  );
}

function ColorSwatchScreen({
  label,
  swatch,
  tone,
}: {
  label: "Small" | "Large";
  swatch: FlowSwatch;
  tone: string;
}) {
  const aspect = label === "Small" ? "standard" : "tall";

  return (
    <figure
      aria-label={`${label} device frame showing ${swatch.hex}`}
      className={`flow-screen flow-screen-compact flow-screen-${aspect} flow-screen-swatch`}
    >
      <span className="flow-screen-label">{swatch.name}</span>
      <div
        className="flow-image-frame flow-placeholder-frame flow-swatch-frame"
        style={
          {
            "--flow-swatch-color": swatch.hex,
            "--flow-swatch-text": swatch.text,
          } as FlowSwatchStyle
        }
      >
        <span>{swatch.hex}</span>
      </div>
      <figcaption>{`${swatch.hex} recurring ${tone} shade.`}</figcaption>
    </figure>
  );
}

function FontSampleScreen({
  label,
  sample,
}: {
  label: "Small" | "Large";
  sample: FlowFontSample;
}) {
  const aspect = label === "Small" ? "standard" : "tall";

  return (
    <figure
      aria-label={`${label} device frame showing ${sample.name}`}
      className={`flow-screen flow-screen-compact flow-screen-${aspect} flow-screen-swatch flow-screen-font-sample`}
    >
      <span className="flow-screen-label">{sample.name}</span>
      <div className="flow-image-frame flow-placeholder-frame flow-font-frame">
        <span className={sample.className}>{sample.text}</span>
      </div>
      <figcaption>{`${sample.name} font sample.`}</figcaption>
    </figure>
  );
}

function OriginalArtScreen({ sample }: { sample: FlowArtSample }) {
  return (
    <figure
      aria-label={`${sample.name} original art device frame`}
      className="flow-screen flow-screen-compact flow-screen-standard flow-screen-swatch flow-original-art-screen"
    >
      <span className="flow-screen-label">{sample.name}</span>
      <div className="flow-image-frame flow-placeholder-frame flow-original-art-frame">
        <Image
          alt={sample.alt}
          draggable={false}
          fill
          sizes="152px"
          src={sample.src}
        />
      </div>
      <figcaption>{`${sample.name} original art.`}</figcaption>
    </figure>
  );
}

function OriginalArtScreens() {
  return (
    <div className="flow-original-art-grid">
      {originalArtSamples.map((sample) => (
        <OriginalArtScreen key={sample.name} sample={sample} />
      ))}
    </div>
  );
}

function OriginalPhotographyScreen({ sample }: { sample: FlowArtSample }) {
  return (
    <figure
      aria-label={`${sample.name} original photography device frame`}
      className="flow-screen flow-screen-compact flow-screen-standard flow-screen-swatch flow-original-photo-screen"
    >
      <span className="flow-screen-label">{sample.name}</span>
      <div className="flow-image-frame flow-placeholder-frame flow-original-photo-frame">
        <Image
          alt={sample.alt}
          draggable={false}
          fill
          sizes="152px"
          src={sample.src}
        />
      </div>
      <figcaption>
        {sample.caption ?? `${sample.name} original photography.`}
      </figcaption>
    </figure>
  );
}

function HeroCompositionScreen({ label }: { label: "Small" | "Large" }) {
  const aspect = label === "Small" ? "standard" : "tall";
  const screenClassName = [
    "flow-screen",
    "flow-screen-compact",
    `flow-screen-${aspect}`,
    "flow-hero-composition-screen",
    `flow-hero-composition-screen-${label.toLowerCase()}`,
  ].join(" ");

  return (
    <figure
      aria-label={`Alla Vostra app header hero composition ${label}`}
      className={screenClassName}
    >
      <span className="flow-screen-label">{label}</span>
      <div className="flow-image-frame flow-hero-composition-frame">
        <Image
          alt="Alla Vostra header background"
          className="flow-hero-composition-background"
          draggable={false}
          fill
          sizes="152px"
          src="/images/alla-vostra/header-background-no-cheeseboard.png"
        />
        <Image
          alt="Alla Vostra cheeseboard header overlay"
          className="flow-hero-composition-cheeseboard"
          draggable={false}
          height={250}
          src="/images/alla-vostra/cheeseboard-products-overlay.png"
          width={405}
        />
      </div>
      <figcaption>{`Android ${label} app header hero composition.`}</figcaption>
    </figure>
  );
}

function HeroCompositionScreens() {
  return (
    <div className="flow-hero-composition-grid">
      <HeroCompositionScreen label="Small" />
      <HeroCompositionScreen label="Large" />
    </div>
  );
}

function StickyButtonIcon({
  kind,
}: {
  kind: (typeof stickyButtonIconSamples)[number]["kind"];
}) {
  if (kind === "cart") {
    return (
      <div
        aria-hidden
        className="flow-sticky-button flow-sticky-button-cart"
      >
        <svg fill="none" viewBox="0 0 24 24">
          <path
            d="M4.25 5.25H6.5L8.35 15.1H17.2L19.45 8.3H7.15"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.15"
          />
          <path
            d="M9.15 18.35H17.35"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="2.15"
          />
          <circle cx="9.85" cy="20.1" fill="#FFFFFF" r="1.05" />
          <circle cx="16.75" cy="20.1" fill="#FFFFFF" r="1.05" />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="flow-sticky-button flow-sticky-button-tutorial"
    >
      <svg fill="none" viewBox="0 0 40 40">
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="flowStickyQuestionMarkGradient"
            x1="20"
            x2="20"
            y1="4"
            y2="36"
          >
            <stop offset="0" stopColor="#FFC878" />
            <stop offset="0.52" stopColor="#f7b967" />
            <stop offset="1" stopColor="#D9953F" />
          </linearGradient>
        </defs>
        <text
          fill="url(#flowStickyQuestionMarkGradient)"
          fontFamily="Alla Vostra TT Fors, Inter, sans-serif"
          fontSize="38"
          fontWeight="900"
          stroke="#111111"
          strokeWidth="0.38"
          textAnchor="middle"
          x="20"
          y="34"
        >
          ?
        </text>
      </svg>
    </div>
  );
}

function StickyButtonIconScreen({
  sample,
}: {
  sample: (typeof stickyButtonIconSamples)[number];
}) {
  return (
    <figure
      aria-label={`${sample.name} sticky button icon device frame`}
      className="flow-screen flow-screen-compact flow-screen-standard flow-screen-swatch flow-sticky-icon-screen"
    >
      <span className="flow-screen-label">{sample.name}</span>
      <div className="flow-image-frame flow-sticky-icon-frame">
        <div aria-hidden className="flow-sticky-button-shadow" />
        <StickyButtonIcon kind={sample.kind} />
      </div>
      <figcaption>{`${sample.name} sticky button icon.`}</figcaption>
    </figure>
  );
}

function StickyButtonIconScreens() {
  return (
    <div className="flow-sticky-icon-grid">
      {stickyButtonIconSamples.map((sample) => (
        <StickyButtonIconScreen key={sample.name} sample={sample} />
      ))}
    </div>
  );
}

function OriginalPhotographyScreens() {
  return (
    <div className="flow-original-photo-grid">
      {originalPhotographySamples.map((sample) => (
        <OriginalPhotographyScreen key={sample.name} sample={sample} />
      ))}
    </div>
  );
}

function PlaceholderStage({
  copy,
  renderStepScreens,
  sectionLabel = "Stage",
  stage,
  steps = placeholderSteps,
  stepTitles = {},
  title,
}: {
  copy: string;
  renderStepScreens?: (step: string) => ReactNode;
  sectionLabel?: "Category" | "Stage";
  stage: string;
  steps?: string[];
  stepTitles?: Record<string, string>;
  title: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobilePortrait = useIsMobilePortrait();
  const placeholderScreenshotsId = useId();
  const visibleStepCount = isMobilePortrait ? 1 : 2;
  const visibleSteps = steps.slice(0, visibleStepCount);
  const extraSteps = steps.slice(visibleStepCount);

  return (
    <div className="flow-capture-group">
      <div className="flow-group-header">
        <span>
          {sectionLabel} {stage}
        </span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>

      <div>
        <div className="flow-capture-grid">
          {visibleSteps.map((step) => (
            <div className="flow-screen-stack" key={step}>
              <h4>{stepTitles[step] ?? step}</h4>
              <div className="flow-screen-stack-captures">
                {renderStepScreens?.(step) ?? (
                  <>
                    <PlaceholderScreen label="Small" step={step} />
                    <PlaceholderScreen label="Large" step={step} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {extraSteps.length > 0 ? (
          <div className="flow-browse-toggle-row">
            <button
              aria-controls={placeholderScreenshotsId}
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
        ) : null}

        {extraSteps.length > 0 ? (
          <div
            aria-hidden={!isExpanded}
            className={`flow-browse-extra${isExpanded ? " is-open" : ""}`}
            id={placeholderScreenshotsId}
          >
            <div className="flow-capture-grid">
              {extraSteps.map((step) => (
                <div className="flow-screen-stack" key={step}>
                  <h4>{stepTitles[step] ?? step}</h4>
                  <div className="flow-screen-stack-captures">
                    {renderStepScreens?.(step) ?? (
                      <>
                        <PlaceholderScreen label="Small" step={step} />
                        <PlaceholderScreen label="Large" step={step} />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ProductFlowSwitcher({
  launchScreen,
  screenshotGroups,
}: {
  launchScreen: FlowScreen;
  screenshotGroups: ScreenshotGroup[];
}) {
  const [activeView, setActiveView] = useState<FlowView>("ux");
  const isUiBlueprint = activeView === "ui";

  return (
    <>
      <nav
        aria-label="Alla Vostra product flow navigation"
        className="product-flow-nav"
      >
        <button
          aria-pressed={isUiBlueprint}
          className={`button ${
            isUiBlueprint ? "button-primary" : "button-secondary"
          }`}
          onClick={() => setActiveView("ui")}
          type="button"
        >
          UI Foundations
        </button>
        <button
          aria-pressed={!isUiBlueprint}
          className={`button ${
            isUiBlueprint ? "button-secondary" : "button-primary"
          }`}
          onClick={() => setActiveView("ux")}
          type="button"
        >
          UX Product Flow
        </button>
      </nav>

      <SectionHeading
        kicker={isUiBlueprint ? "UI Foundations" : "UX Product Flow"}
        title={isUiBlueprint ? "UI Foundations" : "UX Product Flow"}
      />

      <div
        className="flow-layout flow-layout-single"
        id={isUiBlueprint ? "ui-foundations" : "ux-product-flow"}
      >
        {isUiBlueprint ? (
          <figure
            className={`flow-primary-visual flow-screen flow-screen-main flow-screen-${launchScreen.aspect}`}
          >
            <div className="flow-image-frame">
              <Image
                alt={launchScreen.title}
                draggable={false}
                fill
                priority
                sizes="(max-width: 720px) 72vw, 444px"
                src={launchScreen.src}
              />
            </div>
            <figcaption>{launchScreen.caption}</figcaption>
          </figure>
        ) : (
          <ProductFlowDiagramTable />
        )}
      </div>

      {isUiBlueprint ? (
        <div className="flow-capture-groups">
          {uiBlueprintSections.map((section) => (
            <PlaceholderStage
              copy={`This UI Foundations category will outline the ${section.title} system.`}
              key={section.stage}
              renderStepScreens={
                section.title === "Colors & Theming"
                  ? (step) => {
                      const group = colorsAndThemingSwatchGroups[step];

                      return group ? (
                        <>
                          <ColorSwatchScreen
                            label="Small"
                            swatch={group.swatches[0]}
                            tone={group.tone}
                          />
                          <ColorSwatchScreen
                            label="Large"
                            swatch={group.swatches[1]}
                            tone={group.tone}
                          />
                        </>
                      ) : undefined;
                    }
                  : section.title === "Typography & Spacing"
                    ? (step) =>
                        step === "Step 1" ? (
                          <>
                            <FontSampleScreen
                              label="Small"
                              sample={typographyFontSamples[0]}
                            />
                            <FontSampleScreen
                              label="Large"
                              sample={typographyFontSamples[1]}
                            />
                          </>
                        ) : undefined
                    : section.title === "Iconography & Imagery"
                      ? (step) =>
                          step === "Step 1" ? (
                            <OriginalArtScreens />
                          ) : step === "Step 2" ? (
                            <OriginalPhotographyScreens />
                          ) : step === "Step 3" ? (
                            <HeroCompositionScreens />
                          ) : step === "Step 4" ? (
                            <StickyButtonIconScreens />
                          ) : undefined
                      : undefined
              }
              sectionLabel="Category"
              stage={section.stage}
              steps={
                section.title === "Colors & Theming"
                  ? Object.keys(colorsAndThemingSwatchGroups)
                  : section.title === "Typography & Spacing"
                    ? typographyAndSpacingSteps
                    : section.title === "Iconography & Imagery"
                      ? iconographyAndImagerySteps
                  : undefined
              }
              stepTitles={
                section.title === "Colors & Theming"
                  ? colorsAndThemingStepTitles
                  : section.title === "Typography & Spacing"
                    ? typographyAndSpacingStepTitles
                    : section.title === "Iconography & Imagery"
                      ? iconographyAndImageryStepTitles
                  : undefined
              }
              title={section.title}
            />
          ))}
        </div>
      ) : (
        <div className="flow-capture-groups">
          <PlaceholderStage
            copy="This tutorial stage will outline the guided first-use walkthrough."
            stage="0"
            title="Tutorial"
          />

          {screenshotGroups.map((group, index) => (
            <div className="flow-capture-group" key={group.title}>
              <div className="flow-group-header">
                <span>Stage {String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
              </div>

              <ExpandableFlowStacks
                collapsedLabel="Show More"
                expandedLabel="Show Less"
                initialStackCount={
                  group.title === "Browse" || group.title === "Checkout"
                    ? 2
                    : group.stacks.length
                }
                mobilePortraitInitialStackCount={1}
                stacks={group.stacks}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
