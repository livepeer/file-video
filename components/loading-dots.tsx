/** @jsx jsx */
import { jsx } from "theme-ui";
import { keyframes } from "@emotion/core";

const blinkKeyframe = keyframes({
  "0%": { opacity: 0.2 },
  "20%": { opacity: 1 },
  "100%": { opacity: 0.2 },
});

const LoadingDots = ({ width = 2, height = 2 }) => (
  <div sx={{ display: "flex", alignItems: "center" }}>
    {[0, 1, 2].map((n, _, { length }) => (
      <span
        key={`dot-${n}`}
        sx={{
          width,
          height,
          borderRadius: "full",
          display: "inline-block",
          bg: "background",
          animation: `${blinkKeyframe} 1.4s linear infinite`,
          animationDelay: `${length - 1 - n + 0.4}s`,
          "&:not(:last-of-type)": {
            mr: 1,
          },
        }}
      />
    ))}
  </div>
);

export default LoadingDots;
