import { ThemeProvider } from "theme-ui";
import theme from "lib/theme";
import "css/global.css";
import 'video.js/dist/video-js.css';
import * as gtag from "../lib/gtag"
import { useEffect } from "react"
import Router from "next/router"

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    Router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
