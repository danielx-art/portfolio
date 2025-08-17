import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { UserPreferencesContext, type Language, type Theme } from "./useUserPreferences";

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  // --- THEME ---
  const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved) return saved;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    }
    return "light";
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // --- LANGUAGE ---
  const getInitialLang = (): Language => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang") as Language | null;
      if (stored) return stored;
      if (navigator.language.startsWith("pt")) return "br";
    }
    return "en";
  };

  const [lang, setLangState] = useState<Language>(getInitialLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  // --- PREFERS REDUCED MOTION ---
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <UserPreferencesContext.Provider
      value={{ theme, setTheme, lang, setLang, prefersReducedMotion }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}