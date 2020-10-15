import { ThemeProvider } from "theme-ui";
import theme from "lib/theme";
import "css/global.css";
import 'video.js/dist/video-js.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
