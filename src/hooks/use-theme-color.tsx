import { createContext, useContext, useEffect, useState } from "react";

export type ThemeColor = "green" | "blue" | "purple" | "orange" | "pink" | "red";

interface ThemeColorState {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorState | undefined>(undefined);

const colorThemes = {
  green: {
    light: { primary: "120 61% 34%", accent: "120 61% 34%", ring: "120 61% 34%" },
    dark: { primary: "120 61% 40%", accent: "120 61% 40%", ring: "120 61% 40%" }
  },
  blue: {
    light: { primary: "210 100% 45%", accent: "210 100% 45%", ring: "210 100% 45%" },
    dark: { primary: "210 100% 50%", accent: "210 100% 50%", ring: "210 100% 50%" }
  },
  purple: {
    light: { primary: "270 70% 45%", accent: "270 70% 45%", ring: "270 70% 45%" },
    dark: { primary: "270 70% 50%", accent: "270 70% 50%", ring: "270 70% 50%" }
  },
  orange: {
    light: { primary: "30 100% 45%", accent: "30 100% 45%", ring: "30 100% 45%" },
    dark: { primary: "30 100% 50%", accent: "30 100% 50%", ring: "30 100% 50%" }
  },
  pink: {
    light: { primary: "330 70% 50%", accent: "330 70% 50%", ring: "330 70% 50%" },
    dark: { primary: "330 70% 55%", accent: "330 70% 55%", ring: "330 70% 55%" }
  },
  red: {
    light: { primary: "0 72% 51%", accent: "0 72% 51%", ring: "0 72% 51%" },
    dark: { primary: "0 72% 51%", accent: "0 72% 51%", ring: "0 72% 51%" }
  }
};

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    const stored = localStorage.getItem("theme-color") as ThemeColor;
    return (stored && colorThemes[stored]) ? stored : "green";
  });

  const applyTheme = (color: ThemeColor) => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const theme = isDark ? colorThemes[color].dark : colorThemes[color].light;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--ring", theme.ring);
    root.style.setProperty("--sidebar-primary", theme.primary);
    root.style.setProperty("--sidebar-ring", theme.ring);
  };

  useEffect(() => {
    applyTheme(themeColor);
  }, [themeColor]);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem("theme-color", color);
    applyTheme(color);
  };

  // Listen for class changes on html element to re-apply correct HSL values when switching light/dark
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          applyTheme(themeColor);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [themeColor]);

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (context === undefined) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider");
  }
  return context;
}
