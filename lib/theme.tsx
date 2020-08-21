const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
  sizes: {
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
  },
  colors: {
    text: "#fff",
    background: "#000",
    transparent: "transparent",
    muted: "#2B2B2B",
    primary: "#00EB88",
    gray: "#999999",
  },
  fonts: {
    body:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    special:
      '"TT Firs Neue", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    mono: "'Roboto Mono', monospace",
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
  letterSpacings: {
    heading: "-0.05em",
    default: "0em",
  },
  lineHeights: {
    heading: 0.9,
    body: 1.6,
  },
  breakpoints: ["690px", "832px", "1024px", "1280px"],
  radii: {
    none: "0",
    sm: "0.125rem",
    default: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "50%",
  },
  shadows: {},
  zIndices: {
    header: 1000,
    dropdown: 90,
    general: 10,
    behind: -1,
  },
  // VARIANTS
  layout: {
    container: {
      mx: "auto",
      px: [3, 4, 5],
    },
    flexCenter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    centerAbsolute: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
  text: {
    normal: {
      fontFamily: "body",
      fontSize: ["16px", "18px"],
      fontWeight: 400,
      lineHeight: "body",
    },
    small: {
      fontFamily: "body",
      fontSize: ["14px", "16px"],
      fontWeight: 400,
      lineHeight: "body",
    },
    heading: {
      1: {
        fontFamily: "special",
        fontSize: ["48px", "64px", null, null, "88px"],
        fontWeight: 800,
        letterSpacing: "heading",
        lineHeight: [1, "heading"],
        textAlign: "left",
      },
      2: {
        fontFamily: "special",
        fontSize: ["32px", "48px", null, null, "72px"],
        fontWeight: 800,
        letterSpacing: "heading",
        lineHeight: 0.95,
        textAlign: "left",
      },
    },
  },
  buttons: {
    primary: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "default",
      bg: "primary",
      color: "background",
      py: 2,
      px: 4,
      height: 12,
      variant: "text.default",
      fontWeight: 600,
      transition: "background .15s",
      "&:hover": {
        bg: "#66F3B8",
      },
      "&:focus": {
        boxShadow: "0 0 0 4px rgba(0, 235, 136, .5)",
        outline: "none",
      },
      "&:disabled": {
        cursor: "default",
        "&:hover": {
          bg: "primary",
        },
      },
    },
    icon: {
      p: 2,
      borderRadius: "md",
      height: "auto",
      width: "auto",
    },
  },
  links: {
    nav: {
      color: "text",
      transition: ".15s color",
      textTransform: "uppercase",
      fontSize: 1,
      "&:hover": {
        color: "primary",
      },
    },
    accent: {
      color: "primary",
      fontWeight: 600,
      textDecoration: "underline",
      ":hover": {
        opacity: 0.8,
        color: "primary",
      },
    },
  },
  // STYLES
  styles: {
    root: {
      fontFamily: "body",
      color: "text",
      bg: "background",
    },
    a: {
      color: "text",
      ":hover": {
        color: "primary",
      },
    },
  },
};

export default theme;
