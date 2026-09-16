"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Never actually changes after mount, so there's nothing to subscribe to —
// this only exists to give useSyncExternalStore a client/server split.
const noSubscription = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Theme is only known client-side — avoid rendering the wrong icon (or a
  // mismatch warning) before hydration settles. useSyncExternalStore gives
  // the server snapshot (false) on first paint and the client one (true)
  // right after, without the extra setState-in-effect render cascade the
  // same "mounted" flag caused when it lived in useState + useEffect.
  const mounted = useSyncExternalStore(noSubscription, () => true, () => false);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 100,
        width: "44px",
        height: "44px",
        borderRadius: "9999px",
        border: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--background) 85%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--foreground)",
        transition: "transform 200ms, box-shadow 200ms",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
