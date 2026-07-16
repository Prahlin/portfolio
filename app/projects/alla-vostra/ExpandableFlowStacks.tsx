"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useId, useState } from "react";

type CaptureAspect = "standard" | "tall";

type FlowScreen = {
  aspect: CaptureAspect;
  caption: string;
  label: "Small" | "Large";
  src: string;
  title: string;
};

type FlowScreenStack = {
  screens: FlowScreen[];
  title: string;
};

type ExpandableFlowStacksProps = {
  collapsedLabel: string;
  expandedLabel: string;
  initialStackCount: number;
  mobilePortraitInitialStackCount?: number;
  stacks: FlowScreenStack[];
};

const mobilePortraitQuery = "(max-width: 720px) and (orientation: portrait)";

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

function FlowStack({ stack }: { stack: FlowScreenStack }) {
  return (
    <div className="flow-screen-stack">
      <h4>{stack.title}</h4>
      <div className="flow-screen-stack-captures">
        {stack.screens.map((screen) => (
          <figure
            className={`flow-screen flow-screen-compact flow-screen-${screen.aspect}`}
            key={screen.src}
          >
            <span className="flow-screen-label">{screen.label}</span>
            <div className="flow-image-frame">
              <Image
                alt={screen.title}
                data-screenshot-preview
                fill
                sizes="(max-width: 720px) 38vw, 152px"
                src={screen.src}
              />
            </div>
            <figcaption>{screen.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ExpandableFlowStacks({
  collapsedLabel,
  expandedLabel,
  initialStackCount,
  mobilePortraitInitialStackCount,
  stacks,
}: ExpandableFlowStacksProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobilePortrait = useIsMobilePortrait();
  const extraStacksId = useId();
  const visibleStackCount =
    isMobilePortrait && mobilePortraitInitialStackCount !== undefined
      ? mobilePortraitInitialStackCount
      : initialStackCount;
  const visibleStacks = stacks.slice(0, visibleStackCount);
  const extraStacks = stacks.slice(visibleStackCount);

  return (
    <>
      <div className="flow-capture-grid">
        {visibleStacks.map((stack) => (
          <FlowStack key={stack.title} stack={stack} />
        ))}
      </div>

      {extraStacks.length > 0 ? (
        <>
          <div className="flow-browse-toggle-row">
            <button
              aria-controls={extraStacksId}
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
              {isExpanded ? expandedLabel : collapsedLabel}
            </button>
          </div>

          <div
            aria-hidden={!isExpanded}
            className={`flow-browse-extra${isExpanded ? " is-open" : ""}`}
            id={extraStacksId}
          >
            <div className="flow-capture-grid">
              {extraStacks.map((stack) => (
                <FlowStack key={stack.title} stack={stack} />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
