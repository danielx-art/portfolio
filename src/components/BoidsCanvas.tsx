import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { initBoids } from "../animations/boids-animation";
import { useUserPreferences } from "../context/useUserPreferences";


export default function BoidsCanvas() {
  const velocityRef = useRef(0);
  const lenis = useLenis();
  const { theme } = useUserPreferences();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ velocity }: { velocity: number }) => {
      velocityRef.current = velocity;
    };

    lenis.on("scroll", onScroll);

    const cleanupBoids = initBoids(() => velocityRef.current);

    return () => {
      lenis.off("scroll", onScroll);
      cleanupBoids();
    };
  }, [lenis, theme]);

  return (
    <div
      id="canvas-container"
      className="absolute -z-10 top-0 left-0 w-full h-[90dvh]"
    >
      {/*here canvas will be added*/}
    </div>
  );
}