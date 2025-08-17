import { useUserPreferences } from "../context/useUserPreferences";
import { ThemeToggle } from "./ThemeToggle";
import { useLenis } from "lenis/react";

export const NavMenu: React.FC = () => {
  const lenis = useLenis();
  const { lang, setLang, prefersReducedMotion } = useUserPreferences();

  const toggleLang = () => {
    setLang(lang === "br" ? "en" : "br");
  };

  const scrollToTop = () => {
    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      lenis?.scrollTo(0, { duration: 1.2 });
    }
  };

  return (
    <nav className="fixed left-1 top-0 flex font-fira gap-2 z-[999] text-text">
      <ThemeToggle />
      <button
        onClick={toggleLang}
        className="px-2 py-1 rounded-md backdrop-blur-sm text-text/60 hover:text-text/100 cursor-pointer"
      >
        <span className={lang === "br" ? "opacity-90" : "opacity-30"}>BR</span>
        <span className="px-1">|</span>
        <span className={lang === "en" ? "opacity-90" : "opacity-30"}>EN</span>
      </button>
      <button
        onClick={scrollToTop}
        className="px-2 py-1 rounded-md backdrop-blur-sm text-text/60 hover:text-text/100 cursor-pointer"
      >
        ↑
      </button>
    </nav>
  );
};