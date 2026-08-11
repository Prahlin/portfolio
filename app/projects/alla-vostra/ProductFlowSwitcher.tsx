"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

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
  name: string;
  src: string;
};

type FlowActionSample = FlowArtSample & {
  caption: string;
};

type ProductFlowNavStyle = CSSProperties & {
  "--product-flow-nav-fixed-left": string;
  "--product-flow-nav-fixed-width": string;
  "--product-flow-nav-measured-height": string;
};

type VisualHierarchyBraceTone = "dark" | "light";
type VisualHierarchySectionLineCallout = {
  label: string;
  top: string;
};
type VisualHierarchyBraceStack = {
  ariaLabel?: string;
  bracePath?: string;
  braceTipTop: string;
  overlayLines?: string[];
  pathOffsetY?: number;
  tone?: VisualHierarchyBraceTone;
};

const visualHierarchyBracePath =
  "M57 34 C31 35 25 58 25 104 L25 306 C25 330 18 342 12 350 L3 360 L12 370 C18 378 25 390 25 414 L25 616 C25 662 31 685 57 686";

const visualHierarchyCompressedBracePath =
  "M57 34 C31 35 25 58 25 104 L25 143 C25 167 18 179 12 187 L3 197 L12 207 C18 215 25 227 25 251 L25 290 C25 336 31 359 57 360";

const visualHierarchyTenBracePath =
  "M57 34 C31 34.1 25 36.3 25 41 L25 58.5 C25 62.1 18 63.9 12 65.1 C8.8 65.7 8.8 67.5 12 68.1 C18 69.3 25 71.1 25 74.7 L25 92.2 C25 96.9 31 99.1 57 99.2";

const visualHierarchyNinetyBracePath =
  "M57 34 C31 35 25 58 25 104 L25 273.4 C25 297.4 18 309.4 12 317.4 L3 327.4 L12 337.4 C18 345.4 25 357.4 25 381.4 L25 550.8 C25 596.8 31 619.8 57 620.8";

const visualHierarchyBraceTipTop = "50%";
const visualHierarchyCompressedBraceTipTop = "27.36%";
const visualHierarchySupportingElementsBraceTipTop = "72.64%";
const visualHierarchyCompressedBracePathOffsetY = 326;
const visualHierarchyTenBraceTipTop = "9.25%";
const visualHierarchyNinetyBraceTipTop = "54.53%";
const visualHierarchyNinetyBracePathOffsetY = 65.2;

const visualHierarchySectionLineCallouts: VisualHierarchySectionLineCallout[] = [
  { label: "APP HEADER", top: "7.65%" },
  { label: "NAV BAR", top: "17.62%" },
  { label: "HERO", top: "37.04%" },
];

const visualHierarchyViewingAreaLineCallouts: VisualHierarchySectionLineCallout[] = [
  ...visualHierarchySectionLineCallouts,
  { label: "MAIN CONTENT", top: "70.39%" },
  { label: "SHOPPING CART", top: "91.05%" },
];

const visualHierarchyStepThreeLineCallouts: VisualHierarchySectionLineCallout[] = [
  { label: "TOOLBAR", top: "2.87%" },
  { label: "NAV BAR", top: "7.76%" },
  { label: "MAIN CONTENT", top: "49.92%" },
  { label: "SHOPPING CART", top: "90.87%" },
];

const visualHierarchySupportingElementsBraceStacks: VisualHierarchyBraceStack[] =
  [
    {
      bracePath: visualHierarchyCompressedBracePath,
      braceTipTop: visualHierarchySupportingElementsBraceTipTop,
      overlayLines: ["Supporting", "Elements"],
      pathOffsetY: visualHierarchyCompressedBracePathOffsetY,
    },
  ];

const visualHierarchyStepFourBraceStacks: VisualHierarchyBraceStack[] = [
  {
    bracePath: visualHierarchyTenBracePath,
    braceTipTop: visualHierarchyTenBraceTipTop,
    overlayLines: ["Supporting", "Elements"],
    tone: "light",
  },
  {
    bracePath: visualHierarchyNinetyBracePath,
    braceTipTop: visualHierarchyNinetyBraceTipTop,
    overlayLines: ["Focal", "Point"],
    pathOffsetY: visualHierarchyNinetyBracePathOffsetY,
    tone: "light",
  },
];

const visualHierarchyAnnotationStyle: CSSProperties = {
  color: "#3c3b3a",
  display: "grid",
  fontFamily:
    '"Alla Vostra TT Fors", Inter, ui-sans-serif, system-ui, sans-serif',
  fontSize: "42px",
  fontWeight: 520,
  left: "50%",
  letterSpacing: 0,
  lineHeight: 1.06,
  pointerEvents: "none",
  position: "absolute",
  textAlign: "center",
  textShadow: "0 1px 2px rgba(255, 252, 242, 0.28)",
  top: "73.6%",
  transform: "translate(-50%, -50%)",
  whiteSpace: "nowrap",
  zIndex: 2,
};

const visualHierarchyFocalPointAnnotationStyle: CSSProperties = {
  ...visualHierarchyAnnotationStyle,
  color: "#ffffff",
  textShadow:
    "-1px 0 #111111, 0 1px #111111, 1px 0 #111111, 0 -1px #111111",
  WebkitTextStroke: "0.8px #111111",
};

const placeholderSteps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
const visualHierarchySteps = ["Step 1", "Step 2", "Step 3", "Step 4"];
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
  "Step 1": "Original Hero",
  "Step 2": "Original Photography",
  "Step 3": "Original Art",
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
    name: "Product #1",
    src: "/images/alla-vostra/piccola-product.png",
  },
  {
    alt: "Alla Vostra Sei Perfetto grazing board",
    name: "Product #2",
    src: "/images/alla-vostra/sei-perfetto-product.png",
  },
  {
    alt: "Alla Vostra Buon Natale grazing board",
    name: "Product #3",
    src: "/images/alla-vostra/buon-natale-product.png",
  },
];
const stickyButtonIconSamples = [
  { kind: "cart", name: "Shopping Cart" },
  { kind: "tutorial", name: "Tutorial" },
  { kind: "close", name: "Close" },
] as const;
const navigationActionStepTitles = {
  "Step 1": "Header CTA",
  "Step 2": "Overlay Nav",
  "Step 3": "Overlay Return",
  "Step 4": "Product Nav",
};
const navigationActionSteps = Object.keys(navigationActionStepTitles);
const navigationActionSamplesByStep: Record<string, FlowActionSample[]> = {
  "Step 1": [
    {
      alt: "Alla Vostra app header SHOP button",
      caption: "Navigate to Shop Preview Screen",
      name: "SHOP",
      src: "/images/alla-vostra/ui-assets/header-shop.png",
    },
    {
      alt: "Alla Vostra Shop preview action button",
      caption: "Begin the Shopping Process",
      name: "Shop",
      src: "/images/alla-vostra/ui-assets/shop-preview.png",
    },
  ],
  "Step 2": [
    {
      alt: "Alla Vostra bottom overlay previous button",
      caption: "Bottom overlay previous button.",
      name: "Left Nav",
      src: "/images/alla-vostra/ui-assets/overlay-nav-left.png",
    },
    {
      alt: "Alla Vostra bottom overlay next button",
      caption: "Bottom overlay next button.",
      name: "Right Nav",
      src: "/images/alla-vostra/ui-assets/overlay-nav-right.png",
    },
  ],
  "Step 3": [
    {
      alt: "Alla Vostra Products overlay return button",
      caption: "Products overlay return button.",
      name: "Products",
      src: "/images/alla-vostra/ui-assets/overlay-center-products.png",
    },
    {
      alt: "Alla Vostra Cart overlay return button",
      caption: "Cart overlay return button.",
      name: "Cart",
      src: "/images/alla-vostra/ui-assets/overlay-center-cart.png",
    },
  ],
  "Step 4": [
    {
      alt: "Alla Vostra active product navigation tab",
      caption: "Active product navigation tab.",
      name: "Active Tab",
      src: "/images/alla-vostra/ui-assets/product-tab-active.png",
    },
    {
      alt: "Alla Vostra inactive product navigation tab",
      caption: "Inactive product navigation tab.",
      name: "Inactive Tab",
      src: "/images/alla-vostra/ui-assets/product-tab-inactive.png",
    },
    {
      alt: "Alla Vostra product image previous chevron",
      caption: "Product image previous chevron.",
      name: "Image Prev",
      src: "/images/alla-vostra/ui-assets/product-image-prev.png",
    },
    {
      alt: "Alla Vostra product image next chevron",
      caption: "Product image next chevron.",
      name: "Image Next",
      src: "/images/alla-vostra/ui-assets/product-image-next.png",
    },
  ],
};
const controlsAndInputsStepTitles = {
  "Step 1": "Add (This) Item",
  "Step 2": "Edit Quantity",
  "Step 3": "Remove Item",
  "Step 4": "Add (Any) Item",
  "Step 5": "Proceed To Checkout",
};
const controlsAndInputsSteps = Object.keys(controlsAndInputsStepTitles);
const controlsAndInputsSamplesByStep: Record<string, FlowActionSample[]> = {
  "Step 1": [
    {
      alt: "Alla Vostra green ADD product button",
      caption: "High Visibility = Item Not Yet Added",
      name: "Before Added",
      src: "/images/alla-vostra/ui-assets/product-add.png",
    },
    {
      alt: "Alla Vostra low-visibility ADD product button after tap",
      caption: "Low Visibility = Item Successfully Added",
      name: "After Added",
      src: "/images/alla-vostra/ui-assets/product-add-tapped.png",
    },
  ],
  "Step 2": [
    {
      alt: "Alla Vostra quantity counter control",
      caption: "High Visibility = No Quantity Set",
      name: "Before Set",
      src: "/images/alla-vostra/ui-assets/product-counter-high-vis.png",
    },
    {
      alt: "Alla Vostra low-visibility quantity counter control at zero",
      caption: "Low Visibility = Quantity Set",
      name: "After Set",
      src: "/images/alla-vostra/ui-assets/product-counter-low-vis.png",
    },
  ],
  "Step 3": [
    {
      alt: "Alla Vostra red remove product button",
      caption: "Remove Item From Cart",
      name: "Remove Item",
      src: "/images/alla-vostra/ui-assets/cart-remove.png",
    },
  ],
  "Step 4": [
    {
      alt: "Alla Vostra cart Add items button",
      caption: "High Visibility = Few (Or No) Items Have Been Added To Cart",
      name: "Before Added",
      src: "/images/alla-vostra/ui-assets/cart-add-items.png",
    },
    {
      alt: "Alla Vostra low-visibility cart Add items button",
      caption: "Low Visibility = All Items Already Added To Cart",
      name: "After Added",
      src: "/images/alla-vostra/ui-assets/cart-add-items-low-vis.png",
    },
  ],
  "Step 5": [
    {
      alt: "Alla Vostra cart checkout button",
      caption: "High Visibility = Checkout Enabled (One Or More Items In Cart)",
      name: "Checkout Allowed",
      src: "/images/alla-vostra/ui-assets/cart-checkout.png",
    },
    {
      alt: "Alla Vostra low-visibility cart checkout button",
      caption: "Low Visibility = Checkout Disabled (No Items In Cart)",
      name: "Checkout Disallowed",
      src: "/images/alla-vostra/ui-assets/cart-checkout-low-vis.png",
    },
  ],
};
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
  height: flowCoordinateFrame.height,
  width: flowCoordinateFrame.width,
  x: flowCoordinateFrame.x,
  y: flowCoordinateFrame.y,
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
const narrowFlowQuery = "(max-width: 720px)";

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

function useIsNarrowFlowLayout() {
  const [isNarrowFlowLayout, setIsNarrowFlowLayout] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(narrowFlowQuery);
    const handleChange = () => setIsNarrowFlowLayout(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isNarrowFlowLayout;
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
              className={`flow-diagram-rail flow-diagram-rail-${rail.title.toLowerCase()}`}
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
  className = "",
  frameStyle,
  imageAlt,
  imageSrc,
  imageStyle,
  label,
  overlayStyle,
  overlayLines,
  bracePath = visualHierarchyBracePath,
  braceTipTop = visualHierarchyBraceTipTop,
  extraBraceStacks = [],
  sectionLineCallouts = visualHierarchySectionLineCallouts,
  showVisualHierarchySectionLines,
  step,
  style,
  useVisualHierarchyFramePair,
  visualHierarchyBraceTone,
}: {
  className?: string;
  frameStyle?: CSSProperties;
  imageAlt?: string;
  imageSrc?: string;
  imageStyle?: CSSProperties;
  label: "Small" | "Large";
  overlayStyle?: CSSProperties;
  overlayLines?: string[];
  bracePath?: string;
  braceTipTop?: string;
  extraBraceStacks?: VisualHierarchyBraceStack[];
  sectionLineCallouts?: VisualHierarchySectionLineCallout[];
  showVisualHierarchySectionLines?: boolean;
  step: string;
  style?: CSSProperties;
  useVisualHierarchyFramePair?: boolean;
  visualHierarchyBraceTone?: VisualHierarchyBraceTone;
}) {
  const usesVisualHierarchyFramePair =
    useVisualHierarchyFramePair || Boolean(visualHierarchyBraceTone);
  const aspect = label === "Small" ? "standard" : "tall";
  const frameClassName = [
    "flow-image-frame",
    imageSrc ? "" : "flow-placeholder-frame",
  ]
    .filter(Boolean)
    .join(" ");
  const screenClassName = [
    "flow-screen",
    "flow-screen-compact",
    `flow-screen-${aspect}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const annotationStyle = overlayStyle ?? visualHierarchyAnnotationStyle;
  const annotationElement = overlayLines ? (
    <span className="flow-visual-hierarchy-annotation" style={annotationStyle}>
      {overlayLines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  ) : null;
  const renderExternalAnnotationElement = (
    lines: string[] | undefined,
    top: string,
    key?: string,
  ) =>
    lines ? (
      <span
        className="flow-visual-hierarchy-annotation flow-visual-hierarchy-external-annotation"
        key={key}
        style={
          {
            ...annotationStyle,
            left: "auto",
            right: "calc(100% + 8px)",
            textAlign: "right",
            top,
            transform: "translateY(-50%)",
          } as CSSProperties
        }
      >
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    ) : null;
  const externalAnnotationElement = renderExternalAnnotationElement(
    overlayLines,
    braceTipTop,
  );
  const renderBraceElement = ({
    ariaLabel,
    currentBracePath,
    currentTone,
    key,
    pathOffsetY,
  }: {
    ariaLabel: string;
    currentBracePath: string;
    currentTone: VisualHierarchyBraceTone;
    key?: string;
    pathOffsetY?: number;
  }) => (
    <span
      aria-hidden="true"
      className="flow-visual-hierarchy-brace-wrap"
      key={key}
    >
      <svg
        aria-label={ariaLabel}
        className={`flow-visual-hierarchy-brace flow-visual-hierarchy-brace-${currentTone}`}
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 70 720"
      >
        <g
          transform={
            pathOffsetY ? `translate(0 ${pathOffsetY})` : undefined
          }
        >
          <path
            className="flow-visual-hierarchy-brace-path flow-visual-hierarchy-brace-outline"
            d={currentBracePath}
          />
          <path
            className="flow-visual-hierarchy-brace-path flow-visual-hierarchy-brace-line"
            d={currentBracePath}
          />
        </g>
      </svg>
    </span>
  );
  const extraBraceStackElements =
    extraBraceStacks.length > 0
      ? extraBraceStacks.flatMap((stack, index) => {
          const stackLabel =
            stack.overlayLines?.join(" ") ??
            stack.ariaLabel ??
            `Visual hierarchy brace ${index + 1}`;
          const stackKey = stackLabel.toLowerCase().replace(/\s+/g, "-");

          return [
            renderBraceElement({
              ariaLabel: stackLabel,
              currentBracePath: stack.bracePath ?? bracePath,
              currentTone: stack.tone ?? visualHierarchyBraceTone ?? "light",
              key: `${stackKey}-brace`,
              pathOffsetY: stack.pathOffsetY,
            }),
            renderExternalAnnotationElement(
              stack.overlayLines,
              stack.braceTipTop,
              `${stackKey}-label`,
            ),
          ];
        })
      : null;
  const sectionLinesElement =
    visualHierarchyBraceTone || showVisualHierarchySectionLines ? (
    <span className="flow-visual-hierarchy-section-lines">
      {sectionLineCallouts.map((callout) => (
        <span
          className="flow-visual-hierarchy-section-line"
          key={callout.label}
          style={{ "--flow-section-line-top": callout.top } as CSSProperties}
        >
          <span className="flow-visual-hierarchy-section-label">
            {callout.label}
          </span>
        </span>
      ))}
    </span>
    ) : null;
  const frameElement = (
    <div className={frameClassName} style={frameStyle}>
      {imageSrc ? (
        <Image
          alt={imageAlt ?? `${step} ${label} screenshot`}
          data-screenshot-preview
          fill
          sizes="(max-width: 720px) calc(min(84vw, 292px) + 12px), 318px"
          style={imageStyle}
          src={imageSrc}
        />
      ) : (
        <span>Screenshot pending</span>
      )}
      {visualHierarchyBraceTone ? null : annotationElement}
    </div>
  );

  return (
    <figure
      aria-label={`${step} ${label} screenshot placeholder`}
      className={screenClassName}
      style={style}
    >
      {usesVisualHierarchyFramePair ? null : (
        <span className="flow-screen-label">{label}</span>
      )}
      {usesVisualHierarchyFramePair ? (
        <div className="flow-visual-hierarchy-frame-pair">
          {frameElement}
          {visualHierarchyBraceTone ? (
            <svg
              aria-hidden="true"
              className={`flow-visual-hierarchy-brace flow-visual-hierarchy-brace-${visualHierarchyBraceTone}`}
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 70 720"
            >
              <path
                className="flow-visual-hierarchy-brace-path flow-visual-hierarchy-brace-outline"
                d={bracePath}
              />
              <path
                className="flow-visual-hierarchy-brace-path flow-visual-hierarchy-brace-line"
                d={bracePath}
              />
            </svg>
          ) : null}
          {sectionLinesElement}
          {externalAnnotationElement}
          {extraBraceStackElements}
        </div>
      ) : (
        frameElement
      )}
      <figcaption>{`${step} ${label} ${
        imageSrc ? "screenshot" : "placeholder"
      }.`}</figcaption>
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

function OriginalArtScreens({
  overflowOnly = false,
  showAll = false,
}: {
  overflowOnly?: boolean;
  showAll?: boolean;
}) {
  const samples = overflowOnly
    ? originalArtSamples.slice(2)
    : showAll
      ? originalArtSamples
      : originalArtSamples.slice(0, 2);

  if (samples.length === 0) {
    return null;
  }

  return (
    <div className="flow-original-art-grid">
      {samples.map((sample) => (
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
      <figcaption
        aria-hidden
        className="flow-original-photo-caption-spacer"
      />
    </figure>
  );
}

function HeroCompositionScreen() {
  const screenClassName = [
    "flow-screen",
    "flow-screen-compact",
    "flow-screen-swatch",
    "flow-hero-composition-screen",
  ].join(" ");

  return (
    <figure
      aria-label="Alla Vostra app header hero composition"
      className={screenClassName}
    >
      <span className="flow-screen-label">Hero</span>
      <div
        className="flow-image-frame flow-hero-composition-frame"
        data-screenshot-preview-src="/images/alla-vostra/header-hero-composition-preview.png"
      >
        <Image
          alt="Alla Vostra header background"
          className="flow-hero-composition-background"
          draggable={false}
          fill
          sizes="(max-width: 720px) calc(min(84vw, 292px) + 12px), 318px"
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
      <figcaption>Hero app header composition.</figcaption>
    </figure>
  );
}

function HeroCompositionScreens() {
  return (
    <div className="flow-hero-composition-grid">
      <HeroCompositionScreen />
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

  if (kind === "close") {
    return (
      <div
        aria-hidden
        className="flow-sticky-button flow-sticky-button-close"
      >
        <span className="flow-sticky-button-close-icon">
          <span className="flow-sticky-button-close-stroke flow-sticky-button-close-stroke-forward" />
          <span className="flow-sticky-button-close-stroke flow-sticky-button-close-stroke-back" />
        </span>
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

function getTransparentActionAssetSrc(src: string) {
  return src.replace("/ui-assets/", "/ui-assets/transparent-bgless/");
}

function ActionButtonAssetScreen({ sample }: { sample: FlowActionSample }) {
  return (
    <figure
      aria-label={`${sample.name} action button device frame`}
      className="flow-screen flow-screen-compact flow-screen-standard flow-screen-swatch flow-action-asset-screen"
    >
      <span className="flow-screen-label">{sample.name}</span>
      <div className="flow-image-frame flow-action-asset-frame">
        <Image
          alt={sample.alt}
          fill
          sizes="152px"
          src={getTransparentActionAssetSrc(sample.src)}
        />
      </div>
      <figcaption>{sample.caption}</figcaption>
    </figure>
  );
}

function ActionButtonAssetScreens({
  samples,
}: {
  samples: FlowActionSample[];
}) {
  const className = [
    "flow-action-asset-grid",
    samples.length === 3 ? "flow-action-asset-grid-three" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {samples.map((sample) => (
        <ActionButtonAssetScreen key={sample.name} sample={sample} />
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
  className,
  copy,
  renderExpandedStepScreens,
  renderStepScreens,
  rowLabels = [],
  sectionLabel = "Stage",
  stage,
  style,
  steps = placeholderSteps,
  stepTitles = {},
  title,
  visibleStepLimit,
}: {
  className?: string;
  copy: string;
  renderExpandedStepScreens?: (step: string) => ReactNode;
  renderStepScreens?: (step: string, isExpanded: boolean) => ReactNode;
  rowLabels?: string[];
  sectionLabel?: "Category" | "Stage";
  stage: string;
  style?: CSSProperties;
  steps?: string[];
  stepTitles?: Record<string, string>;
  title: string;
  visibleStepLimit?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isNarrowFlowLayout = useIsNarrowFlowLayout();
  const placeholderScreenshotsId = useId();
  const visibleStepCount = visibleStepLimit ?? (isNarrowFlowLayout ? 1 : 2);
  const visibleSteps = steps.slice(0, visibleStepCount);
  const extraSteps = steps.slice(visibleStepCount);
  const [firstExtraStep, ...remainingExtraSteps] = extraSteps;
  const expandedVisibleStepScreens = renderExpandedStepScreens
    ? visibleSteps.reduce<Array<{ screens: ReactNode; step: string }>>(
        (items, step) => {
          const screens = renderExpandedStepScreens(step);

          if (screens) {
            items.push({ screens, step });
          }

          return items;
        },
        [],
      )
    : [];

  return (
    <div
      className={["flow-capture-group", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <div className="flow-group-header">
        <span>
          {sectionLabel} {stage}
        </span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>

      <div className="flow-capture-body">
        <div className="flow-capture-grid">
          {rowLabels.map((label, index) => (
            <span
              className={`flow-visual-hierarchy-row-label flow-visual-hierarchy-row-label-${
                index + 1
              }`}
              key={label}
            >
              {label}
            </span>
          ))}
          {visibleSteps.map((step) => (
            <div className="flow-screen-stack" key={step}>
              <h4>{stepTitles[step] ?? step}</h4>
              <div className="flow-screen-stack-captures">
                {renderStepScreens?.(step, false) ?? (
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
              {firstExtraStep ? (
                <div className="flow-screen-stack" key={firstExtraStep}>
                  <h4>{stepTitles[firstExtraStep] ?? firstExtraStep}</h4>
                  <div className="flow-screen-stack-captures">
                    {renderStepScreens?.(firstExtraStep, isExpanded) ?? (
                      <>
                        <PlaceholderScreen label="Small" step={firstExtraStep} />
                        <PlaceholderScreen label="Large" step={firstExtraStep} />
                      </>
                    )}
                  </div>
                </div>
              ) : null}
              {expandedVisibleStepScreens.map(({ screens, step }) => (
                <div
                  className={`flow-screen-stack flow-screen-stack-expanded-${step
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={`expanded-${step}`}
                >
                  <h4>{stepTitles[step] ?? step}</h4>
                  <div className="flow-screen-stack-captures">{screens}</div>
                </div>
              ))}
              {remainingExtraSteps.map((step) => (
                <div className="flow-screen-stack" key={step}>
                  <h4>{stepTitles[step] ?? step}</h4>
                  <div className="flow-screen-stack-captures">
                    {renderStepScreens?.(step, isExpanded) ?? (
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
  const [productFlowScrollRequestId, setProductFlowScrollRequestId] =
    useState(0);
  const pendingProductFlowScrollRef = useRef(false);
  const productFlowNavRef = useRef<HTMLElement>(null);
  const productFlowNavWrapRef = useRef<HTMLDivElement>(null);
  const productFlowViewStartRef = useRef<HTMLDivElement>(null);
  const [isProductFlowNavPinned, setIsProductFlowNavPinned] = useState(false);
  const [productFlowNavStyle, setProductFlowNavStyle] =
    useState<ProductFlowNavStyle>({
      "--product-flow-nav-fixed-left": "0px",
      "--product-flow-nav-fixed-width": "100%",
      "--product-flow-nav-measured-height": "var(--product-flow-nav-height)",
    });
  const isUiBlueprint = activeView === "ui";

  const switchProductFlowView = (nextView: FlowView) => {
    pendingProductFlowScrollRef.current = true;
    setActiveView(nextView);
    setProductFlowScrollRequestId((currentId) => currentId + 1);
  };

  useEffect(() => {
    const nav = productFlowNavRef.current;
    const navWrap = productFlowNavWrapRef.current;

    if (!nav || !navWrap) {
      return undefined;
    }

    let frameId = 0;

    const setPinnedFromAnchor = () => {
      const navWrapRect = navWrap.getBoundingClientRect();
      const anchorTop = navWrapRect.top + window.scrollY;
      const shouldPin = window.scrollY >= anchorTop;

      setIsProductFlowNavPinned((isPinned) =>
        isPinned === shouldPin ? isPinned : shouldPin,
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

      setProductFlowNavStyle((currentStyle) =>
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
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(measureNav);
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
    if (!pendingProductFlowScrollRef.current) {
      return undefined;
    }

    let frameId = 0;
    let timeoutId = 0;

    const scrollToProductFlowViewStart = (behavior: ScrollBehavior) => {
      const viewStart = productFlowViewStartRef.current;

      if (!viewStart) {
        return;
      }

      const navHeight = productFlowNavRef.current?.offsetHeight ?? 0;
      const targetTop =
        viewStart.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        18;

      window.scrollTo({
        behavior,
        top: Math.max(0, targetTop),
      });
      pendingProductFlowScrollRef.current = false;
    };

    frameId = window.requestAnimationFrame(() => {
      frameId = window.requestAnimationFrame(() => {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const scrollBehavior: ScrollBehavior = prefersReducedMotion
          ? "instant"
          : "smooth";

        scrollToProductFlowViewStart(scrollBehavior);
        timeoutId = window.setTimeout(() => {
          scrollToProductFlowViewStart(scrollBehavior);
        }, 220);
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
  }, [activeView, productFlowScrollRequestId]);

  return (
    <>
      <div
        className={`product-flow-nav-wrap ${
          isProductFlowNavPinned ? "product-flow-nav-pinned" : ""
        }`}
        ref={productFlowNavWrapRef}
        style={productFlowNavStyle}
      >
        <nav
          aria-label="Alla Vostra product flow navigation"
          className="product-flow-nav"
          ref={productFlowNavRef}
        >
          <button
            aria-pressed={isUiBlueprint}
            className={`button ${
              isUiBlueprint ? "button-primary" : "button-secondary"
            }`}
            onClick={() => switchProductFlowView("ui")}
            type="button"
          >
            UI Foundations
          </button>
          <button
            aria-pressed={!isUiBlueprint}
            className={`button ${
              isUiBlueprint ? "button-secondary" : "button-primary"
            }`}
            onClick={() => switchProductFlowView("ux")}
            type="button"
          >
            UX Product Flow
          </button>
        </nav>
      </div>

      <div ref={productFlowViewStartRef}>
        <SectionHeading
          kicker={isUiBlueprint ? "UI Foundations" : "UX Product Flow"}
          title={isUiBlueprint ? "UI Foundations" : "UX Product Flow"}
        />
      </div>

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
              className={
                section.title === "Visual Hierarchy"
                  ? "flow-capture-group-full-row flow-capture-group-visual-hierarchy"
                  : undefined
              }
              copy={`This UI Foundations category will outline the ${section.title} system.`}
              key={section.stage}
              style={
                section.title === "Visual Hierarchy"
                  ? { gridTemplateColumns: "1fr" }
                  : undefined
              }
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
                      ? (step, isExpanded) =>
                          step === "Step 1" ? (
                            <HeroCompositionScreens />
                          ) : step === "Step 2" ? (
                            <OriginalPhotographyScreens />
                          ) : step === "Step 3" ? (
                            <OriginalArtScreens showAll={isExpanded} />
                          ) : step === "Step 4" ? (
                            <StickyButtonIconScreens />
                          ) : undefined
                    : section.title === "Navigations"
                      ? (step) => {
                          const samples = navigationActionSamplesByStep[step];

                          return samples ? (
                            <ActionButtonAssetScreens samples={samples} />
                          ) : undefined;
                        }
                    : section.title === "Controls & Inputs"
                      ? (step) => {
                          const samples = controlsAndInputsSamplesByStep[step];

                          return samples ? (
                            <ActionButtonAssetScreens samples={samples} />
                          ) : undefined;
                        }
                    : section.title === "Visual Hierarchy"
                      ? (step) => {
                          const isStartupScreenStep = step === "Step 1";
                          const isHomeScreenStep =
                            step === "Step 3" || step === "Step 4";
                          const isViewingAreaStep =
                            isStartupScreenStep || step === "Step 3";
                          const isFocalPointStep = step === "Step 2";
                          const isBracedStep =
                            isViewingAreaStep || isFocalPointStep;
                          const isMutedHomeScreenStep = step === "Step 4";

                          return (
                            <PlaceholderScreen
                              bracePath={
                                isFocalPointStep
                                  ? visualHierarchyCompressedBracePath
                                  : undefined
                              }
                              braceTipTop={
                                isFocalPointStep
                                  ? visualHierarchyCompressedBraceTipTop
                                  : undefined
                              }
                              extraBraceStacks={
                                isFocalPointStep
                                  ? visualHierarchySupportingElementsBraceStacks
                                  : isMutedHomeScreenStep
                                    ? visualHierarchyStepFourBraceStacks
                                  : undefined
                              }
                              sectionLineCallouts={
                                isHomeScreenStep
                                  ? visualHierarchyStepThreeLineCallouts
                                  : isStartupScreenStep
                                    ? visualHierarchyViewingAreaLineCallouts
                                    : undefined
                              }
                              className="flow-visual-hierarchy-frame"
                              imageAlt={
                                isHomeScreenStep
                                    ? "Alla Vostra home screen"
                                  : isStartupScreenStep || isFocalPointStep
                                    ? "Alla Vostra startup screen"
                                    : undefined
                              }
                              imageSrc={
                                isHomeScreenStep
                                  ? isMutedHomeScreenStep
                                    ? "/images/alla-vostra-home-framed-toolbar-nav-muted-no-island.png"
                                    : "/images/alla-vostra-home-framed-no-island.png"
                                  : isStartupScreenStep
                                    ? "/images/alla-vostra-hero-startup-framed-no-island.png"
                                    : isFocalPointStep
                                    ? "/images/alla-vostra-hero-startup-framed-lower-muted-no-island.png"
                                    : undefined
                              }
                              frameStyle={
                                isBracedStep || isHomeScreenStep
                                  ? {
                                      aspectRatio: "1290 / 2661",
                                      background: "transparent",
                                      border: 0,
                                      borderRadius: 0,
                                      boxShadow: "none",
                                    }
                                  : undefined
                              }
                              label={
                                isBracedStep || isHomeScreenStep
                                  ? "Large"
                                  : "Small"
                              }
                              overlayLines={
                                isViewingAreaStep
                                  ? ["Viewing", "Area"]
                                  : isFocalPointStep
                                    ? ["Focal", "Point"]
                                    : undefined
                              }
                              overlayStyle={
                                isBracedStep || isMutedHomeScreenStep
                                  ? visualHierarchyFocalPointAnnotationStyle
                                  : undefined
                              }
                              step={step}
                              showVisualHierarchySectionLines={isHomeScreenStep}
                              style={{
                                width: isBracedStep || isHomeScreenStep
                                  ? "min(100%, 444px)"
                                  : "min(100%, 228px)",
                              }}
                              useVisualHierarchyFramePair={isHomeScreenStep}
                              visualHierarchyBraceTone={
                                isBracedStep ? "light" : undefined
                              }
                            />
                          );
                        }
                      : undefined
              }
              renderExpandedStepScreens={
                section.title === "Iconography & Imagery"
                  ? (step) =>
                      step === "Step 3" ? (
                        <OriginalArtScreens overflowOnly />
                      ) : undefined
                      : undefined
              }
              rowLabels={
                section.title === "Visual Hierarchy"
                  ? ["PRE-SCROLLING", "ON-SCROLLING"]
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
                    : section.title === "Visual Hierarchy"
                      ? visualHierarchySteps
                    : section.title === "Navigations"
                      ? navigationActionSteps
                    : section.title === "Controls & Inputs"
                      ? controlsAndInputsSteps
                  : undefined
              }
              stepTitles={
                section.title === "Colors & Theming"
                  ? colorsAndThemingStepTitles
                  : section.title === "Typography & Spacing"
                    ? typographyAndSpacingStepTitles
                    : section.title === "Iconography & Imagery"
                      ? iconographyAndImageryStepTitles
                    : section.title === "Navigations"
                      ? navigationActionStepTitles
                    : section.title === "Controls & Inputs"
                      ? controlsAndInputsStepTitles
                    : undefined
              }
              title={section.title}
              visibleStepLimit={
                section.title === "Visual Hierarchy" ? 4 : undefined
              }
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
                initialStackCount={2}
                narrowInitialStackCount={1}
                stacks={group.stacks}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
