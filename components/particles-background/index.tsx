/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState } from "react";
import canvasEffect from "./effect";

const ParticlesBackground = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;
    setIsInitialized(true);
    canvasEffect();
  }, [isInitialized]);

  return (
    <canvas
      id="particles-canvas"
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
      }}
    />
  );
};

export default ParticlesBackground;
