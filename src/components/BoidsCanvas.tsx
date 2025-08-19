import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { initBoids } from "../animations/boids-animation";

export default function BoidsCanvas() {
  const velocityRef = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ velocity }: { velocity: number }) => {
      velocityRef.current = velocity;
    };

    const cleanupBoids = initBoids(() => velocityRef.current);

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      cleanupBoids();
    };
  }, [lenis]);

  return (
    <div
      id="canvas-container"
      className="absolute -z-10 top-0 left-0 w-full min-h-screen"
    >
      {/*here canvas will be added*/}
    </div>
  );
}
