import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setEnabled(false);
      return;
    }
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity] duration-300"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, oklch(0.65 0.27 295 / 0.18), transparent 60%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
