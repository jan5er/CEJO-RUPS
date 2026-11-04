import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "layout:side";
const DEFAULTS = { width: 380, split: 0.5, collapsed: false };

export const SIDE_MIN_WIDTH = 260;
export const STAGE_MIN_WIDTH = 340;
export const SPLIT_MIN = 0.15;
export const SPLIT_MAX = 0.85;

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function readLayout() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return DEFAULTS;
  }
}

export function useSideLayout() {
  const [layout, setLayout] = useState(readLayout);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    } catch {}
  }, [layout]);

  const update = useCallback(
    (patch) => setLayout((current) => ({ ...current, ...patch })),
    [],
  );

  return [layout, update];
}

export function dragPointer(event, onMove) {
  if (event.button !== 0) return;
  event.preventDefault();
  const { body } = document;
  body.classList.add("resizing");
  body.style.cursor = getComputedStyle(event.currentTarget).cursor;

  const stop = () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", stop);
    window.removeEventListener("pointercancel", stop);
    body.classList.remove("resizing");
    body.style.cursor = "";
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", stop);
  window.addEventListener("pointercancel", stop);
}
