/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useState, useRef, useCallback } from "react";
import canvasEffect from "./effect";

const ParticlesBackground = ({ error = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectControls = useRef<{
    setError: () => void;
    clearError: () => void;
    onUnmount: () => void;
    onResize: () => void;
  }>();

  const handleResize = useCallback(() => {
    if (canvasRef.current && effectControls.current) {
      const { innerWidth, innerHeight } = window;
      canvasRef.current.width = innerWidth;
      canvasRef.current.height = innerHeight;
      effectControls.current.onResize();
    }
  }, [effectControls, canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const { innerWidth, innerHeight } = window;
    canvasRef.current.width = innerWidth;
    canvasRef.current.height = innerHeight;
    const controls = canvasEffect();
    effectControls.current = controls;
    window.addEventListener("resize", handleResize);
    return () => {
      controls.onUnmount();
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);

  useEffect(() => {
    if (error) effectControls.current?.setError();
    else effectControls.current?.clearError();
  }, [error, effectControls]);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      sx={{ position: "absolute", right: 0 }}
    />
  );
};

export default ParticlesBackground;
