import { ThemeProvider } from "theme-ui";
import theme from "lib/theme";
import "css/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
