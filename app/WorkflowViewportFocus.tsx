"use client";

import { useEffect } from "react";

const workflowCardSelector =
  "#workflow .aboutdev-timeline-item--without-proof";

export function WorkflowViewportFocus() {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(workflowCardSelector),
    );

    if (!cards.length) {
      return;
    }

    let frame = 0;
    let hoveredCard: HTMLElement | null = null;
    let hoveredPoint: HTMLElement | null = null;
    let scrollTarget: HTMLElement | null = null;
    let scrollReleaseTimer = 0;

    const setFocusedCard = (focusedCard: HTMLElement | null) => {
      cards.forEach((card) => {
        const isFocused = card === focusedCard;
        card.classList.toggle("is-workflow-focused", isFocused);

        const points = Array.from(
          card.querySelectorAll<HTMLElement>(".aboutdev-timeline-points > li"),
        );
        const focusedPoint =
          isFocused && hoveredPoint && card.contains(hoveredPoint)
            ? hoveredPoint
            : isFocused
              ? points[0]
              : null;

        points.forEach((point) => {
          point.classList.toggle(
            "is-workflow-point-focused",
            point === focusedPoint,
          );
        });
      });
    };

    const getViewportFocusedCard = () => {
      const viewportCenter = window.innerHeight / 2;
      const measuredCards = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const transform = window.getComputedStyle(card).transform;
        const translatedY =
          transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;

        return {
          card,
          rect: {
            bottom: rect.bottom - translatedY,
            top: rect.top - translatedY,
          },
        };
      });
      const firstCard = measuredCards[0];
      const lastCard = measuredCards[measuredCards.length - 1];

      if (
        viewportCenter < firstCard.rect.top ||
        viewportCenter > lastCard.rect.bottom
      ) {
        return null;
      }

      return measuredCards
        .sort(
          (a, b) =>
            Math.abs((a.rect.top + a.rect.bottom) / 2 - viewportCenter) -
            Math.abs((b.rect.top + b.rect.bottom) / 2 - viewportCenter),
        )[0]?.card;
    };

    const updateFocusedCard = () => {
      frame = 0;
      setFocusedCard(
        scrollTarget ?? hoveredCard ?? getViewportFocusedCard() ?? null,
      );
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateFocusedCard);
      }
    };

    const releaseScrollTarget = () => {
      if (!scrollTarget) {
        return;
      }
      window.clearTimeout(scrollReleaseTimer);
      scrollReleaseTimer = window.setTimeout(() => {
        scrollTarget = null;
        updateFocusedCard();
      }, 140);
    };

    const cardListeners = cards.map((card) => {
      const handlePointerEnter = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          return;
        }
        hoveredCard = card;
        updateFocusedCard();
      };
      const handlePointerLeave = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          return;
        }
        if (hoveredCard === card) {
          hoveredCard = null;
        }
        updateFocusedCard();
      };
      const handleClick = (event: MouseEvent) => {
        if (
          event.target instanceof Element &&
          event.target.closest(
            "button, a, input, select, textarea, [role='button']",
          )
        ) {
          return;
        }

        scrollTarget = card;
        setFocusedCard(card);
        card.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "center",
        });
        releaseScrollTarget();
      };

      card.addEventListener("pointerenter", handlePointerEnter);
      card.addEventListener("pointerleave", handlePointerLeave);
      card.addEventListener("click", handleClick);

      return { card, handleClick, handlePointerEnter, handlePointerLeave };
    });

    const pointListeners = cards.flatMap((card) =>
      Array.from(
        card.querySelectorAll<HTMLElement>(".aboutdev-timeline-points > li"),
      ).map((point) => {
        const handlePointerEnter = (event: PointerEvent) => {
          if (event.pointerType === "touch") {
            return;
          }
          hoveredPoint = point;
          updateFocusedCard();
        };
        const handlePointerLeave = (event: PointerEvent) => {
          if (event.pointerType === "touch") {
            return;
          }
          if (hoveredPoint === point) {
            hoveredPoint = null;
          }
          updateFocusedCard();
        };

        point.addEventListener("pointerenter", handlePointerEnter);
        point.addEventListener("pointerleave", handlePointerLeave);

        return { handlePointerEnter, handlePointerLeave, point };
      }),
    );

    updateFocusedCard();
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", releaseScrollTarget, { passive: true });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    cards.forEach((card) => resizeObserver.observe(card));

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.clearTimeout(scrollReleaseTimer);

      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", releaseScrollTarget);
      resizeObserver.disconnect();
      cardListeners.forEach(
        ({ card, handleClick, handlePointerEnter, handlePointerLeave }) => {
          card.removeEventListener("pointerenter", handlePointerEnter);
          card.removeEventListener("pointerleave", handlePointerLeave);
          card.removeEventListener("click", handleClick);
          card.classList.remove("is-workflow-focused");
        },
      );
      pointListeners.forEach(
        ({ handlePointerEnter, handlePointerLeave, point }) => {
          point.removeEventListener("pointerenter", handlePointerEnter);
          point.removeEventListener("pointerleave", handlePointerLeave);
          point.classList.remove("is-workflow-point-focused");
        },
      );
    };
  }, []);

  return null;
}
