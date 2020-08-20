/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState } from "react";
import canvasEffect from "./effect";

const ParticlesBackground = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [viewportSize, setViewportSize] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (isInitialized) return;
    if (!viewportSize) {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
      return;
    }
    setIsInitialized(true);
    canvasEffect();
  }, [isInitialized, viewportSize]);

  return (
    <canvas
      id="particles-canvas"
      width={viewportSize?.width}
      height={viewportSize?.height}
      sx={{ position: "absolute" }}
    />
  );
};

export default ParticlesBackground;
