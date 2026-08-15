"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const PREVIEW_SCALE = 1.5;
const PREVIEW_MARGIN = 12;
const PREVIEW_SELECTOR =
  "img[data-screenshot-preview], [data-screenshot-preview-scope] img";
const PREVIEW_RADIUS_SELECTOR =
  ".flow-image-frame, .av-device-screen, .phone-screen.has-image, .tablet-screen";
const PREVIEW_SOURCE_SELECTOR = "[data-screenshot-preview-src]";
const PREVIEW_COMPOSITION_SELECTOR = "[data-screenshot-preview-composition]";
const PREVIEW_SCOPE_SELECTOR = "[data-screenshot-preview-scope]";
const PREVIEW_GROUP_SELECTOR = ".flow-screen";
const PREVIEW_GROUP_LABEL_SELECTOR = ".flow-screen-label";
const CLIPPING_OVERFLOW_VALUES = new Set(["auto", "clip", "hidden", "scroll"]);
const HIDDEN_OPACITY_THRESHOLD = 0.01;

type ScreenshotPreviewBase = {
  borderBottomLeftRadius: string;
  borderBottomRightRadius: string;
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  height: number;
  left: number;
  sourceHeight: number;
  sourceWidth: number;
  top: number;
  width: number;
};

type ScreenshotImagePreview = ScreenshotPreviewBase & {
  kind: "image";
  objectFit: CSSProperties["objectFit"];
  objectPosition: string;
  src: string;
};

type ScreenshotElementPreview = ScreenshotPreviewBase & {
  element: HTMLElement;
  kind: "element";
};

type ScreenshotPreview = ScreenshotImagePreview | ScreenshotElementPreview;

type PreviewPoint = {
  clientX: number;
  clientY: number;
};

type PreviewTarget = HTMLElement | HTMLImageElement;

type VisibleRect = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

type PreviewRect = VisibleRect & {
  height: number;
  width: number;
};

function pointIsInsideRect(
  point: PreviewPoint,
  rect: DOMRect | ClientRect | VisibleRect,
) {
  return (
    point.clientX >= rect.left &&
    point.clientX <= rect.right &&
    point.clientY >= rect.top &&
    point.clientY <= rect.bottom
  );
}

function getVisibleElementRect(element: Element) {
  const rect = element.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    return null;
  }

  let bottom = Math.min(rect.bottom, window.innerHeight);
  let left = Math.max(rect.left, 0);
  let right = Math.min(rect.right, window.innerWidth);
  let top = Math.max(rect.top, 0);
  let current: Element | null = element;

  while (current) {
    const computed = window.getComputedStyle(current);

    if (
      current.hasAttribute("hidden") ||
      current.getAttribute("aria-hidden") === "true" ||
      computed.display === "none" ||
      computed.visibility === "hidden" ||
      computed.visibility === "collapse" ||
      Number(computed.opacity) <= HIDDEN_OPACITY_THRESHOLD
    ) {
      return null;
    }

    const clipsX = CLIPPING_OVERFLOW_VALUES.has(computed.overflowX);
    const clipsY = CLIPPING_OVERFLOW_VALUES.has(computed.overflowY);

    if (clipsX || clipsY) {
      const currentRect = current.getBoundingClientRect();

      if (clipsX) {
        left = Math.max(left, currentRect.left);
        right = Math.min(right, currentRect.right);
      }

      if (clipsY) {
        top = Math.max(top, currentRect.top);
        bottom = Math.min(bottom, currentRect.bottom);
      }
    }

    if (right <= left || bottom <= top) {
      return null;
    }

    current = current.parentElement;
  }

  return { bottom, left, right, top };
}

function elementIsTopmostAtPoint(element: Element, point: PreviewPoint) {
  return document
    .elementsFromPoint(point.clientX, point.clientY)
    .some(
      (hitElement) =>
        hitElement === element || element.contains(hitElement),
    );
}

function elementContainsVisiblePoint(element: Element, point: PreviewPoint) {
  const visibleRect = getVisibleElementRect(element);

  if (!visibleRect) {
    return false;
  }

  return (
    pointIsInsideRect(point, visibleRect) &&
    elementIsTopmostAtPoint(element, point)
  );
}

function isPreviewElementVisible(element: Element, point?: PreviewPoint) {
  const visibleRect = getVisibleElementRect(element);

  if (!visibleRect) {
    return false;
  }

  return point
    ? pointIsInsideRect(point, visibleRect) &&
        elementIsTopmostAtPoint(element, point)
    : true;
}

function getPreviewGroupArea(group: HTMLElement) {
  const label = group.querySelector<HTMLElement>(PREVIEW_GROUP_LABEL_SELECTOR);
  const frame = group.querySelector<HTMLElement>(PREVIEW_RADIUS_SELECTOR);

  if (!label || !frame) {
    return null;
  }

  return { frame, label };
}

function getPreviewGroupTarget(
  target: Element,
  point?: PreviewPoint,
): HTMLElement | null {
  const group = target.closest<HTMLElement>(PREVIEW_GROUP_SELECTOR);

  if (!group || !group.closest(PREVIEW_SCOPE_SELECTOR)) {
    return null;
  }

  const previewArea = getPreviewGroupArea(group);

  if (!previewArea || !isPreviewElementVisible(group, point)) {
    return null;
  }

  if (!point) {
    return group;
  }

  if (
    elementContainsVisiblePoint(previewArea.label, point) ||
    elementContainsVisiblePoint(previewArea.frame, point)
  ) {
    return group;
  }

  return null;
}

function findPreviewImage(
  images: HTMLImageElement[],
  point?: PreviewPoint,
) {
  if (images.length === 0) {
    return null;
  }

  if (!point) {
    return images.find((image) => isPreviewElementVisible(image)) ?? null;
  }

  return (
    images.find((image) => elementContainsVisiblePoint(image, point)) ?? null
  );
}

function findPreviewSourceElement(
  elements: HTMLElement[],
  point?: PreviewPoint,
) {
  if (elements.length === 0) {
    return null;
  }

  if (!point) {
    return (
      elements.find((element) => isPreviewElementVisible(element)) ?? null
    );
  }

  return (
    elements.find((element) => elementContainsVisiblePoint(element, point)) ??
    null
  );
}

function getPreviewTarget(
  target: EventTarget | null,
  point?: PreviewPoint,
): PreviewTarget | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const compositionTarget = target.closest<HTMLElement>(
    PREVIEW_COMPOSITION_SELECTOR,
  );

  if (compositionTarget && isPreviewElementVisible(compositionTarget, point)) {
    return compositionTarget;
  }

  const groupTarget = getPreviewGroupTarget(target, point);

  if (groupTarget) {
    return groupTarget;
  }

  const directPreviewSource = target.closest<HTMLElement>(
    PREVIEW_SOURCE_SELECTOR,
  );

  if (
    directPreviewSource &&
    isPreviewElementVisible(directPreviewSource, point)
  ) {
    return directPreviewSource;
  }

  const directTarget = target.closest<HTMLImageElement>(PREVIEW_SELECTOR);

  if (directTarget && isPreviewElementVisible(directTarget, point)) {
    return directTarget;
  }

  const imageContainer = target.closest<HTMLElement>(PREVIEW_RADIUS_SELECTOR);

  if (imageContainer) {
    if (
      imageContainer.matches(PREVIEW_SOURCE_SELECTOR) &&
      isPreviewElementVisible(imageContainer, point)
    ) {
      return imageContainer;
    }

    const containerImages = Array.from(
      imageContainer.querySelectorAll<HTMLImageElement>("img"),
    ).filter((image) => image.matches(PREVIEW_SELECTOR));
    const containerTarget = findPreviewImage(containerImages, point);

    if (containerTarget) {
      return containerTarget;
    }

    if (
      point &&
      imageContainer.closest(PREVIEW_SCOPE_SELECTOR) &&
      elementContainsVisiblePoint(imageContainer, point)
    ) {
      return imageContainer;
    }
  }

  const previewScope = target.closest<HTMLElement>(PREVIEW_SCOPE_SELECTOR);

  if (!previewScope) {
    return null;
  }

  const scopedPreviewSource = findPreviewSourceElement(
    Array.from(
      previewScope.querySelectorAll<HTMLElement>(PREVIEW_SOURCE_SELECTOR),
    ),
    point,
  );

  if (scopedPreviewSource) {
    return scopedPreviewSource;
  }

  return findPreviewImage(
    Array.from(
      previewScope.querySelectorAll<HTMLImageElement>("img"),
    ).filter((image) => image.matches(PREVIEW_SELECTOR)),
    point,
  );
}

function getBoundingPreviewRect(element: Element): PreviewRect {
  const rect = element.getBoundingClientRect();

  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
  };
}

function getPreviewSourceRect(target: PreviewTarget): PreviewRect | null {
  if (
    target instanceof HTMLElement &&
    target.matches(PREVIEW_GROUP_SELECTOR)
  ) {
    const previewArea = getPreviewGroupArea(target);

    if (!previewArea) {
      return null;
    }

    const labelRect = previewArea.label.getBoundingClientRect();
    const frameRect = previewArea.frame.getBoundingClientRect();
    const bottom = Math.max(labelRect.bottom, frameRect.bottom);
    const left = Math.min(labelRect.left, frameRect.left);
    const right = Math.max(labelRect.right, frameRect.right);
    const top = Math.min(labelRect.top, frameRect.top);

    return {
      bottom,
      height: bottom - top,
      left,
      right,
      top,
      width: right - left,
    };
  }

  return getBoundingPreviewRect(target);
}

function clampPosition(position: number, size: number, viewportSize: number) {
  if (size >= viewportSize - PREVIEW_MARGIN * 2) {
    return (viewportSize - size) / 2;
  }

  return Math.min(
    Math.max(PREVIEW_MARGIN, position),
    viewportSize - size - PREVIEW_MARGIN,
  );
}

function buildPreview(target: PreviewTarget): ScreenshotPreview | null {
  const rect = getPreviewSourceRect(target);

  if (
    !rect ||
    rect.width <= 0 ||
    rect.height <= 0 ||
    !isPreviewElementVisible(target)
  ) {
    return null;
  }

  const computed = window.getComputedStyle(target);
  const radiusSource =
    target.closest<HTMLElement>(PREVIEW_RADIUS_SELECTOR) ?? target;
  const radiusComputed = window.getComputedStyle(radiusSource);
  const width = rect.width * PREVIEW_SCALE;
  const height = rect.height * PREVIEW_SCALE;
  const left = clampPosition(
    rect.left + rect.width / 2 - width / 2,
    width,
    window.innerWidth,
  );
  const top = clampPosition(
    rect.top + rect.height / 2 - height / 2,
    height,
    window.innerHeight,
  );
  const previewBase = {
    borderBottomLeftRadius: radiusComputed.borderBottomLeftRadius,
    borderBottomRightRadius: radiusComputed.borderBottomRightRadius,
    borderTopLeftRadius: radiusComputed.borderTopLeftRadius,
    borderTopRightRadius: radiusComputed.borderTopRightRadius,
    height,
    left,
    sourceHeight: rect.height,
    sourceWidth: rect.width,
    top,
    width,
  };

  const previewSrc =
    target instanceof HTMLImageElement
      ? target.currentSrc || target.src
      : target.dataset.screenshotPreviewSrc;

  if (previewSrc) {
    return {
      ...previewBase,
      kind: "image",
      objectFit: (computed.objectFit ||
        "contain") as CSSProperties["objectFit"],
      objectPosition: computed.objectPosition || "center",
      src: previewSrc,
    };
  }

  return {
    ...previewBase,
    element: target,
    kind: "element",
  };
}

export function ScreenshotPreviewLayer() {
  const activeTargetRef = useRef<PreviewTarget | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const elementPreviewHostRef = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = useState<ScreenshotPreview | null>(null);

  useEffect(() => {
    function showPreview(target: PreviewTarget) {
      const nextPreview = buildPreview(target);

      if (!nextPreview) {
        return;
      }

      activeTargetRef.current = target;
      setPreview(nextPreview);
    }

    function hidePreview() {
      activeTargetRef.current = null;
      activePointerIdRef.current = null;
      setPreview(null);
    }

    function handlePointerOver(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        return;
      }

      const target = getPreviewTarget(event.target, event);

      if (!target) {
        return;
      }

      showPreview(target);
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        return;
      }

      const target = getPreviewTarget(event.target, event);
      const activeTarget = activeTargetRef.current;

      if (!target) {
        if (activeTarget) {
          hidePreview();
        }

        return;
      }

      if (target !== activeTarget) {
        showPreview(target);
      }
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        return;
      }

      const activeTarget = activeTargetRef.current;

      if (!activeTarget) {
        return;
      }

      const eventTarget = getPreviewTarget(event.target, event);

      if (eventTarget === activeTarget) {
        hidePreview();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse") {
        return;
      }

      const target = getPreviewTarget(event.target, event);

      if (!target) {
        return;
      }

      activePointerIdRef.current = event.pointerId;
      showPreview(target);
    }

    function handlePointerRelease(event: PointerEvent) {
      if (
        activePointerIdRef.current === null ||
        activePointerIdRef.current === event.pointerId
      ) {
        hidePreview();
      }
    }

    function handlePointerCancel(event: PointerEvent) {
      if (event.pointerType === "touch") {
        return;
      }

      handlePointerRelease(event);
    }

    function handleTouchEnd(event: TouchEvent) {
      if (activePointerIdRef.current !== null && event.touches.length === 0) {
        hidePreview();
      }
    }

    function handleScroll() {
      if (activePointerIdRef.current !== null) {
        return;
      }

      hidePreview();
    }

    function handleContextMenu(event: MouseEvent) {
      if (getPreviewTarget(event.target, event)) {
        event.preventDefault();
      }
    }

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointermove", handlePointerMove, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", handlePointerRelease, true);
    document.addEventListener("pointercancel", handlePointerCancel, true);
    document.addEventListener("touchend", handleTouchEnd, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("blur", hidePreview);
    window.addEventListener("resize", hidePreview);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointermove", handlePointerMove, true);
      document.removeEventListener("pointerout", handlePointerOut, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", handlePointerRelease, true);
      document.removeEventListener("pointercancel", handlePointerCancel, true);
      document.removeEventListener("touchend", handleTouchEnd, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("blur", hidePreview);
      window.removeEventListener("resize", hidePreview);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    const elementPreviewHost = elementPreviewHostRef.current;

    if (!elementPreviewHost || preview?.kind !== "element") {
      return undefined;
    }

    const clone = preview.element.cloneNode(true) as HTMLElement;

    clone.classList.add("screenshot-preview-element-clone");
    clone.setAttribute("aria-hidden", "true");
    clone.style.height = `${preview.sourceHeight}px`;
    clone.style.maxHeight = "none";
    clone.style.maxWidth = "none";
    clone.style.pointerEvents = "none";
    clone.style.transform = `scale(${PREVIEW_SCALE})`;
    clone.style.transformOrigin = "top left";
    clone.style.width = `${preview.sourceWidth}px`;

    elementPreviewHost.replaceChildren(clone);

    return () => {
      elementPreviewHost.replaceChildren();
    };
  }, [preview]);

  if (!preview) {
    return null;
  }

  return (
    <div className="screenshot-preview-layer" aria-hidden="true">
      {preview.kind === "image" ? (
        <img
          alt=""
          className="screenshot-preview-popover"
          src={preview.src}
          style={{
            borderBottomLeftRadius: preview.borderBottomLeftRadius,
            borderBottomRightRadius: preview.borderBottomRightRadius,
            borderTopLeftRadius: preview.borderTopLeftRadius,
            borderTopRightRadius: preview.borderTopRightRadius,
            height: `${preview.height}px`,
            left: `${preview.left}px`,
            objectFit: preview.objectFit,
            objectPosition: preview.objectPosition,
            top: `${preview.top}px`,
            width: `${preview.width}px`,
          }}
        />
      ) : (
        <div
          className="screenshot-preview-popover screenshot-preview-element-popover"
          ref={elementPreviewHostRef}
          style={{
            borderBottomLeftRadius: preview.borderBottomLeftRadius,
            borderBottomRightRadius: preview.borderBottomRightRadius,
            borderTopLeftRadius: preview.borderTopLeftRadius,
            borderTopRightRadius: preview.borderTopRightRadius,
            height: `${preview.height}px`,
            left: `${preview.left}px`,
            top: `${preview.top}px`,
            width: `${preview.width}px`,
          }}
        />
      )}
    </div>
  );
}
