/** @jsx jsx */
import { jsx, SxStyleProp } from "theme-ui";

const LivepeerLogo = ({ pushSx }: { pushSx?: SxStyleProp }) => (
  <svg
    sx={{ display: "inline-block", width: "24px", ...pushSx }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M-2.09815e-07 19.2L0 24L4.8 24L4.8 19.2L-2.09815e-07 19.2ZM-6.29444e-07 9.6L-4.19629e-07 14.4L4.8 14.4L4.8 9.6L-6.29444e-07 9.6ZM19.2 9.6L19.2 14.4L24 14.4L24 9.6L19.2 9.6ZM-8.39259e-07 4.8L-1.04907e-06 0L4.8 -2.09815e-07L4.8 4.8L-8.39259e-07 4.8ZM9.6 9.6L9.6 4.8L14.4 4.8L14.4 9.6L9.6 9.6ZM9.6 14.4L9.6 19.2L14.4 19.2L14.4 14.4L9.6 14.4Z"
      fill="url(#livepeer-logo-paint0_linear)"
    />
    <defs>
      <linearGradient
        id="livepeer-logo-paint0_linear"
        x1="11.9869"
        y1="23.9996"
        x2="11.987"
        y2="-1.61679e-06"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00A55F" />
        <stop offset="1" stopColor="#4CF1AC" />
      </linearGradient>
    </defs>
  </svg>
);

export default LivepeerLogo;
