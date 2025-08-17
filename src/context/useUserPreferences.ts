import { createContext, useContext } from "react";

export type Language = "en" | "br";
export type Theme = "light" | "dark";

export type UserPreferences = {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  prefersReducedMotion: boolean;
};

export const UserPreferencesContext = createContext<UserPreferences | undefined>(
  undefined
);

export function useUserPreferences() {
  const ctx = useContext(UserPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useUserPreferences must be used inside UserPreferencesProvider"
    );
  }
  return ctx;
}