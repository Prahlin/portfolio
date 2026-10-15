"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type CoreBelief = {
  text: string;
  title: string;
  tone: string;
};

type CoreBeliefsOrbitProps = {
  principles: readonly CoreBelief[];
};

type OrbitStyle = CSSProperties & {
  "--beliefs-counter-rotation": string;
  "--beliefs-rotation": string;
};

const CORE_BELIEF_ORBIT_POINTS = [
  { x: 495, y: 109.01 },
  { x: 805.07, y: 334.34 },
  { x: 686.57, y: 698.7 },
  { x: 303.44, y: 698.7 },
  { x: 184.93, y: 334.34 },
] as const;

const CORE_BELIEF_FORMATION_CENTER = { x: 495, y: 435 } as const;
const CORE_BELIEF_CONTRAIL_SCALE = 1.5;

const CORE_BELIEF_CONTRAILS = CORE_BELIEF_ORBIT_POINTS.flatMap(
  (point, index) => {
    const nextPoint =
      CORE_BELIEF_ORBIT_POINTS[
        (index + 1) % CORE_BELIEF_ORBIT_POINTS.length
      ];
    const deltaX = nextPoint.x - point.x;
    const deltaY = nextPoint.y - point.y;
    const distance = Math.hypot(deltaX, deltaY);
    const directionX = deltaX / distance;
    const directionY = deltaY / distance;
    const normalX = -directionY;
    const normalY = directionX;
    const bubbleClearance = 154;
    const midpointX = (point.x + nextPoint.x) / 2;
    const midpointY = (point.y + nextPoint.y) / 2;
    const formationCenterX = CORE_BELIEF_FORMATION_CENTER.x;
    const formationCenterY = CORE_BELIEF_FORMATION_CENTER.y;
    const outwardX = midpointX - formationCenterX;
    const outwardY = midpointY - formationCenterY;
    const outwardDistance = Math.hypot(outwardX, outwardY);
    const curveDepth = 78;

    return [-4, 4].map((offset) => {
      const startX =
        point.x + directionX * bubbleClearance + normalX * offset;
      const startY =
        point.y + directionY * bubbleClearance + normalY * offset;
      const endX =
        nextPoint.x - directionX * bubbleClearance + normalX * offset;
      const endY =
        nextPoint.y - directionY * bubbleClearance + normalY * offset;
      const controlX =
        midpointX +
        (outwardX / outwardDistance) * curveDepth +
        normalX * offset;
      const controlY =
        midpointY +
        (outwardY / outwardDistance) * curveDepth +
        normalY * offset;

      const scaleXFromCenter = (x: number) =>
        formationCenterX +
        (x - formationCenterX) * CORE_BELIEF_CONTRAIL_SCALE;
      const scaleYFromCenter = (y: number) =>
        formationCenterY +
        (y - formationCenterY) * CORE_BELIEF_CONTRAIL_SCALE;

      return {
        d: `M ${scaleXFromCenter(startX).toFixed(2)} ${scaleYFromCenter(startY).toFixed(2)} Q ${scaleXFromCenter(controlX).toFixed(2)} ${scaleYFromCenter(controlY).toFixed(2)} ${scaleXFromCenter(endX).toFixed(2)} ${scaleYFromCenter(endY).toFixed(2)}`,
        key: `${index}-${offset}`,
      };
    });
  },
);

export function CoreBeliefsOrbit({ principles }: CoreBeliefsOrbitProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contrailPulseId, setContrailPulseId] = useState(0);
  const [isOrbitAnimating, setIsOrbitAnimating] = useState(false);
  const [portraitActiveIndex, setPortraitActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [usesStackedLayout, setUsesStackedLayout] = useState(false);
  const orbitAnimationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const principleRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const stackedLayoutQuery = window.matchMedia(
      "(max-width: 560px), (max-aspect-ratio: 3 / 5)",
    );
    const updateLayoutMode = () =>
      setUsesStackedLayout(stackedLayoutQuery.matches);

    updateLayoutMode();
    stackedLayoutQuery.addEventListener("change", updateLayoutMode);

    return () =>
      stackedLayoutQuery.removeEventListener("change", updateLayoutMode);
  }, []);

  useEffect(() => {
    if (!usesStackedLayout) {
      return;
    }

    let frame = 0;
    const updateMostVisiblePrinciple = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        principleRefs.current.forEach((principle, index) => {
          if (!principle) {
            return;
          }

          const bounds = principle.getBoundingClientRect();
          const distance = Math.abs(
            bounds.top + bounds.height / 2 - viewportCenter,
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setPortraitActiveIndex(closestIndex);
      });
    };

    updateMostVisiblePrinciple();
    window.addEventListener("resize", updateMostVisiblePrinciple);
    window.addEventListener("scroll", updateMostVisiblePrinciple, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateMostVisiblePrinciple);
      window.removeEventListener("scroll", updateMostVisiblePrinciple);
    };
  }, [principles.length, usesStackedLayout]);

  useEffect(
    () => () => {
      if (orbitAnimationTimerRef.current) {
        clearTimeout(orbitAnimationTimerRef.current);
      }
    },
    [],
  );

  const rotateToPrinciple = (index: number) => {
    if (index === activeIndex || principles.length < 2) {
      return;
    }

    const relativeIndex =
      (index - activeIndex + principles.length) % principles.length;
    const degreesPerPrinciple = 360 / principles.length;
    const isOnRight = relativeIndex <= Math.floor(principles.length / 2);
    const turn = isOnRight
      ? -relativeIndex * degreesPerPrinciple
      : (principles.length - relativeIndex) * degreesPerPrinciple;

    if (orbitAnimationTimerRef.current) {
      clearTimeout(orbitAnimationTimerRef.current);
    }

    setIsOrbitAnimating(true);
    setContrailPulseId((currentPulseId) => currentPulseId + 1);
    orbitAnimationTimerRef.current = setTimeout(() => {
      setIsOrbitAnimating(false);
      orbitAnimationTimerRef.current = null;
    }, 900);
    setRotation((currentRotation) => currentRotation + turn);
    setActiveIndex(index);
  };

  const orbitStyle: OrbitStyle = {
    "--beliefs-counter-rotation": `${-rotation}deg`,
    "--beliefs-rotation": `${rotation}deg`,
  };
  return (
    <div
      className={`aboutdev-principles-grid${
        isOrbitAnimating ? " is-orbit-animating" : ""
      }`}
      style={orbitStyle}
    >
      <div className="aboutdev-principles-orbit">
        {principles.length === CORE_BELIEF_ORBIT_POINTS.length ? (
          <svg
            aria-hidden="true"
            className="aboutdev-principles-contrails"
            data-contrail-pulse={contrailPulseId}
            key={contrailPulseId}
            preserveAspectRatio="none"
            viewBox="0 0 990 870"
          >
            {CORE_BELIEF_CONTRAILS.map((trail) => (
              <path
                className="aboutdev-principles-contrail"
                d={trail.d}
                key={trail.key}
              />
            ))}
          </svg>
        ) : null}

        {principles.map((principle, index) => {
          const isActive = usesStackedLayout
            ? index === portraitActiveIndex
            : index === activeIndex;

          return (
            <button
              aria-label={
                isActive
                  ? usesStackedLayout
                    ? `${principle.title} is the emphasized belief`
                    : `${principle.title} is the top belief`
                  : usesStackedLayout
                    ? `Emphasize ${principle.title}`
                    : `Rotate ${principle.title} to the top`
              }
              aria-pressed={isActive}
              className="aboutdev-principle"
              data-key-gradient={String(index + 1).padStart(2, "0")}
              data-tone={principle.tone}
              disabled={isActive}
              key={principle.title}
              onClick={() => {
                if (usesStackedLayout) {
                  setPortraitActiveIndex(index);
                  return;
                }

                rotateToPrinciple(index);
              }}
              ref={(element) => {
                principleRefs.current[index] = element;
              }}
              type="button"
            >
              <span className="aboutdev-principle-content">
                <span
                  className="aboutdev-principle-title"
                  data-title={principle.title}
                >
                  {principle.title}
                </span>
                <span className="aboutdev-principle-copy">{principle.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="aboutdev-principles-star" aria-hidden="true">
        <div className="aboutdev-principles-star-half aboutdev-principles-star-half--top">
          <Image
            alt=""
            className="aboutdev-principles-star-image"
            height={2048}
            src="/images/uiux/philosophy-star-rounded-stylish.png"
            width={2048}
          />
        </div>
        <div className="aboutdev-principles-star-half aboutdev-principles-star-half--bottom">
          <Image
            alt=""
            className="aboutdev-principles-star-image"
            height={2048}
            src="/images/uiux/philosophy-star-rounded-stylish.png"
            width={2048}
          />
        </div>
      </div>
    </div>
  );
}
