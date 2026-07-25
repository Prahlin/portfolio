"use client";

import { useLayoutEffect, useRef, useState } from "react";

type ExpandablePrincipleCopyProps = {
  label: string;
  paragraphs: string[];
};

function getGridColumnCount(grid: HTMLElement) {
  const columns = getComputedStyle(grid).gridTemplateColumns
    .split(" ")
    .filter(Boolean);

  return Math.max(1, columns.length);
}

function getPartialRowCardCountBefore(
  cards: HTMLElement[],
  expandedCard: HTMLElement,
  columnCount: number,
) {
  let partialRowCardCount = 0;

  for (const card of cards) {
    if (card === expandedCard) {
      break;
    }

    if (card.classList.contains("uiux-principle-card-expanded")) {
      partialRowCardCount = 0;
      continue;
    }

    partialRowCardCount = (partialRowCardCount + 1) % columnCount;
  }

  return partialRowCardCount;
}

function syncExpandedCardGridOrder(grid: HTMLElement) {
  const cards = Array.from(grid.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const columnCount = getGridColumnCount(grid);
  const hasExpandedCard = cards.some((card) =>
    card.classList.contains("uiux-principle-card-expanded"),
  );

  if (!hasExpandedCard || columnCount <= 1) {
    cards.forEach((card) => {
      card.style.removeProperty("order");
    });
    return;
  }

  cards.forEach((card, index) => {
    card.dataset.gridSourceIndex ??= String(index);
  });

  const originalOrder = [...cards].sort(
    (first, second) =>
      Number(first.dataset.gridSourceIndex) -
      Number(second.dataset.gridSourceIndex),
  );
  const desiredOrder = [...originalOrder];
  const expandedCards = originalOrder.filter((card) =>
    card.classList.contains("uiux-principle-card-expanded"),
  );

  expandedCards.forEach((expandedCard) => {
    const expandedIndex = desiredOrder.indexOf(expandedCard);
    const partialRowCardCount = getPartialRowCardCountBefore(
      desiredOrder,
      expandedCard,
      columnCount,
    );

    if (partialRowCardCount === 0) {
      return;
    }

    const moveStartIndex = expandedIndex - partialRowCardCount;
    const movedCards = desiredOrder.splice(moveStartIndex, partialRowCardCount);
    const shiftedExpandedIndex = desiredOrder.indexOf(expandedCard);

    desiredOrder.splice(shiftedExpandedIndex + 1, 0, ...movedCards);
  });

  desiredOrder.forEach((card, index) => {
    card.style.order = String(index);
  });
}

export function ExpandablePrincipleCopy({
  label,
  paragraphs,
}: ExpandablePrincipleCopyProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const previewText = paragraphs.join("\n");

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const measure = measureRef.current;

    if (!shell || !measure) {
      return;
    }

    const updateCollapseState = () => {
      const styles = getComputedStyle(measure);
      const lineHeight = Number.parseFloat(styles.lineHeight);
      const eightLineHeight =
        (Number.isFinite(lineHeight) ? lineHeight : measure.offsetHeight) * 8;
      const nextShouldCollapse = measure.scrollHeight > eightLineHeight + 1;

      setShouldCollapse(nextShouldCollapse);

      if (!nextShouldCollapse) {
        setIsExpanded(false);
      }
    };

    updateCollapseState();

    const resizeObserver = new ResizeObserver(updateCollapseState);
    resizeObserver.observe(shell);

    window.addEventListener("resize", updateCollapseState);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCollapseState);
    };
  }, [previewText]);

  useLayoutEffect(() => {
    const card = shellRef.current?.closest(".uiux-principle-card");
    const grid = card?.closest<HTMLElement>(".case-grid");

    if (!card || !grid) {
      return;
    }

    card.classList.toggle("uiux-principle-card-expanded", isExpanded);
    syncExpandedCardGridOrder(grid);

    const syncGridOrder = () => {
      syncExpandedCardGridOrder(grid);
    };

    window.addEventListener("resize", syncGridOrder);

    return () => {
      card.classList.remove("uiux-principle-card-expanded");
      window.removeEventListener("resize", syncGridOrder);
      syncExpandedCardGridOrder(grid);
    };
  }, [isExpanded]);

  return (
    <div className="uiux-principle-long-copy-shell" ref={shellRef}>
      <p
        className="uiux-principle-long-copy-measure"
        ref={measureRef}
        aria-hidden="true"
      >
        {previewText}
      </p>
      {shouldCollapse && !isExpanded ? (
        <p className="uiux-principle-long-copy-preview" aria-label={label}>
          {previewText}
        </p>
      ) : (
        <div className="uiux-principle-long-copy" aria-label={label}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
      {shouldCollapse && !isExpanded ? (
        <p className="uiux-principle-read-more-line">
          <span aria-hidden="true">. . . </span>
          <button
            className="uiux-principle-read-more"
            onClick={() => setIsExpanded(true)}
            type="button"
          >
            [read more]
          </button>
        </p>
      ) : null}
    </div>
  );
}
