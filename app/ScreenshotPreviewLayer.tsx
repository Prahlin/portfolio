"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const PREVIEW_SCALE = 1.5;
const PREVIEW_MARGIN = 12;
const PREVIEW_SELECTOR = "img[data-screenshot-preview]";
const PREVIEW_RADIUS_SELECTOR =
  ".flow-image-frame, .av-device-screen, .phone-screen.has-image, .tablet-screen";

type ScreenshotPreview = {
  borderBottomLeftRadius: string;
  borderBottomRightRadius: string;
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  height: number;
  left: number;
  objectFit: CSSProperties["objectFit"];
  objectPosition: string;
  src: string;
  top: number;
  width: number;
};

function getPreviewTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLImageElement>(PREVIEW_SELECTOR);
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

function buildPreview(target: HTMLImageElement): ScreenshotPreview | null {
  const rect = target.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
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

  return {
    borderBottomLeftRadius: radiusComputed.borderBottomLeftRadius,
    borderBottomRightRadius: radiusComputed.borderBottomRightRadius,
    borderTopLeftRadius: radiusComputed.borderTopLeftRadius,
    borderTopRightRadius: radiusComputed.borderTopRightRadius,
    height,
    left,
    objectFit: (computed.objectFit || "contain") as CSSProperties["objectFit"],
    objectPosition: computed.objectPosition || "center",
    src: target.currentSrc || target.src,
    top,
    width,
  };
}

export function ScreenshotPreviewLayer() {
  const activeTargetRef = useRef<HTMLImageElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const [preview, setPreview] = useState<ScreenshotPreview | null>(null);

  useEffect(() => {
    function showPreview(target: HTMLImageElement) {
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

      const target = getPreviewTarget(event.target);

      if (!target) {
        return;
      }

      showPreview(target);
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        return;
      }

      const activeTarget = activeTargetRef.current;

      if (!activeTarget) {
        return;
      }

      const eventTarget = getPreviewTarget(event.target);

      if (eventTarget === activeTarget) {
        hidePreview();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse") {
        return;
      }

      const target = getPreviewTarget(event.target);

      if (!target) {
        return;
      }

      event.preventDefault();
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

    function handleContextMenu(event: MouseEvent) {
      if (getPreviewTarget(event.target)) {
        event.preventDefault();
      }
    }

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", handlePointerRelease, true);
    document.addEventListener("pointercancel", handlePointerRelease, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("blur", hidePreview);
    window.addEventListener("resize", hidePreview);
    window.addEventListener("scroll", hidePreview, true);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointerout", handlePointerOut, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", handlePointerRelease, true);
      document.removeEventListener("pointercancel", handlePointerRelease, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("blur", hidePreview);
      window.removeEventListener("resize", hidePreview);
      window.removeEventListener("scroll", hidePreview, true);
    };
  }, []);

  if (!preview) {
    return null;
  }

  return (
    <div className="screenshot-preview-layer" aria-hidden="true">
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
    </div>
  );
}
