/**
 * useHaptics — lightweight haptic feedback hook using the Web Vibration API.
 *
 * Supported on Android Chrome / Edge. Silently no-ops on iOS (Safari
 * does not expose navigator.vibrate) and desktop browsers — so it's
 * always safe to call without any guards at the call-site.
 *
 * Haptic patterns follow the mobile-touch skill guidelines:
 *   selection  →  short single tick  (10 ms)
 *   light      →  soft tap           (15 ms)
 *   medium     →  button press       (25 ms)
 *   heavy      →  confirmed action   (40 ms)
 *   success    →  double-pulse       [15, 60, 25]
 *   error      →  error shake        [30, 40, 30, 40, 30]
 */

type HapticStyle = "selection" | "light" | "medium" | "heavy" | "success" | "error";

const PATTERNS: Record<HapticStyle, number | number[]> = {
  selection: 10,
  light: 15,
  medium: 25,
  heavy: 40,
  success: [15, 60, 25],
  error: [30, 40, 30, 40, 30],
};

function canVibrate(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

export function useHaptics() {
  const trigger = (style: HapticStyle = "medium") => {
    if (!canVibrate()) return;
    try {
      navigator.vibrate(PATTERNS[style]);
    } catch {
      // Fail silently — some browsers throw on restricted contexts
    }
  };

  return { trigger };
}
