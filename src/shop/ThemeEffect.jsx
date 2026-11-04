import { useEffect } from "react";
import { equippedItem, useProgress } from "./progress";

export default function ThemeEffect() {
  const progress = useProgress();
  const ac = equippedItem(progress, "theme")?.colors?.ac;

  useEffect(() => {
    const root = document.documentElement;
    if (ac) root.style.setProperty("--ac", ac);
    return () => root.style.removeProperty("--ac");
  }, [ac]);

  return null;
}
