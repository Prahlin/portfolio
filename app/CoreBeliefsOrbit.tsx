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

export function CoreBeliefsOrbit({ principles }: CoreBeliefsOrbitProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [portraitActiveIndex, setPortraitActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [usesStackedLayout, setUsesStackedLayout] = useState(false);
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

    setRotation((currentRotation) => currentRotation + turn);
    setActiveIndex(index);
  };

  const orbitStyle: OrbitStyle = {
    "--beliefs-counter-rotation": `${-rotation}deg`,
    "--beliefs-rotation": `${rotation}deg`,
  };

  return (
    <div className="aboutdev-principles-grid" style={orbitStyle}>
      <div className="aboutdev-principles-orbit">
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
                <span className="aboutdev-principle-title">{principle.title}</span>
                <span className="aboutdev-principle-copy">{principle.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="aboutdev-principles-star" aria-hidden="true">
        <Image
          alt=""
          className="aboutdev-principles-star-image"
          height={1956}
          src="/images/aboutdev/beliefs-star4.png"
          width={2012}
        />
      </div>
    </div>
  );
}
