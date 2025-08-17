import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { UserPreferencesProvider } from "./context/UserPreferencesProvider";
import { NavMenu } from "./components/NavMenu";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <UserPreferencesProvider>
          <NavMenu />
          <Hero />
          <Projects />
        </UserPreferencesProvider>
      </ReactLenis>
    </>
  );
}

export default App;
