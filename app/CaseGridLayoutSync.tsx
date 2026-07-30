"use client";

import { useLayoutEffect } from "react";

const rowSelectors = {
  description: ".case-description",
  media: ".case-miniatures",
  tags: ".case-tags",
  topline: ".case-topline",
} as const;

type RowName = keyof typeof rowSelectors | "title";
const rowNames: RowName[] = ["description", "media", "tags", "title", "topline"];

function marginBoxHeight(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const marginTop = Number.parseFloat(style.marginTop) || 0;
  const marginBottom = Number.parseFloat(style.marginBottom) || 0;

  return element.getBoundingClientRect().height + marginTop + marginBottom;
}

function titleReferenceHeight(card: HTMLElement) {
  const title = card.querySelector<HTMLElement>(".case-card-title-stack");

  if (!title) {
    return 0;
  }

  const reference =
    title.querySelector<HTMLElement>(".case-card-title-device-stack") ?? title;
  const style = window.getComputedStyle(title);
  const marginTop = Number.parseFloat(style.marginTop) || 0;
  const marginBottom = Number.parseFloat(style.marginBottom) || 0;
  const titleMarginBoxHeight =
    title.getBoundingClientRect().height + marginTop + marginBottom;
  const referenceMarginBoxHeight =
    reference.getBoundingClientRect().height + marginTop + marginBottom;

  return Math.max(referenceMarginBoxHeight, titleMarginBoxHeight);
}

export function CaseGridLayoutSync() {
  useLayoutEffect(() => {
    const grid = document.querySelector<HTMLElement>(".case-grid-featured");

    if (!grid) {
      return;
    }

    let frame = 0;

    const setRowHeight = (name: RowName, value: number) => {
      const property = `--case-featured-${name}-row`;

      if (value <= 0) {
        grid.style.removeProperty(property);
        return;
      }

      const nextValue = `${Math.ceil(value)}px`;

      if (grid.style.getPropertyValue(property) !== nextValue) {
        grid.style.setProperty(property, nextValue);
      }
    };

    const syncRows = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        rowNames.forEach((name) => {
          grid.style.removeProperty(`--case-featured-${name}-row`);
        });

        const cards = Array.from(
          grid.querySelectorAll<HTMLElement>(":scope > .case-card"),
        );
        const rowHeights = {
          description: 0,
          media: 0,
          tags: 0,
          title: 0,
          topline: 0,
        };

        cards.forEach((card) => {
          rowHeights.title = Math.max(
            rowHeights.title,
            titleReferenceHeight(card),
          );

          Object.entries(rowSelectors).forEach(([name, selector]) => {
            const rowElement = card.querySelector<HTMLElement>(selector);

            if (!rowElement) {
              return;
            }

            rowHeights[name as keyof typeof rowHeights] = Math.max(
              rowHeights[name as keyof typeof rowHeights],
              marginBoxHeight(rowElement),
            );
          });
        });

        Object.entries(rowHeights).forEach(([name, value]) => {
          setRowHeight(name as RowName, value);
        });
      });
    };

    syncRows();
    window.addEventListener("resize", syncRows);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(syncRows);

    if (resizeObserver) {
      resizeObserver.observe(grid);

      grid
        .querySelectorAll<HTMLElement>(":scope > .case-card")
        .forEach((card) => {
          resizeObserver.observe(card);
        });
    }

    if ("fonts" in document) {
      document.fonts.ready.then(syncRows).catch(() => {});
    }

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("resize", syncRows);
      resizeObserver?.disconnect();
    };
  }, []);

  return null;
}
