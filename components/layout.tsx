/** @jsx jsx */
import { jsx, Container, NavLink, Flex, Link as A, Text, Box } from "theme-ui";
import Head from "next/head";
import Link from "next/link";
import Logo from "./logos/file-video";
import LivepeerLogo from "./logos/livepeer";
import FilecoinLogo from "./logos/filecoin";
import GitHubLogo from "./logos/github";
import { footerHeight, navHeight } from "lib/constants";
import { useState, useCallback, useEffect } from "react";
import ParticlesBackground from "./particles-background";

interface Props {
  metaTitle?: string;
  metaDescription?: string;
  image?: string;
  children?: React.ReactNode;
  loadTwitterWidget?: boolean;
  url?: string;
  withParticlesBackground?: boolean;
  error?: boolean;
}

Layout.defaultProps = {
  metaTitle: "file.video",
  metaDescription: "Decentralized Video hosting for everyone.",
  url: "https://file.video",
  image: "https://file.video/OG.png",
};

export default function Layout({
  metaTitle = "",
  metaDescription = "",
  image = "",
  children,
  loadTwitterWidget = false,
  url,
  withParticlesBackground,
  error,
}: Props) {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const { scrollTop } = document.documentElement;
    if (scrollTop > 0) setHasScrolled(true);
    else setHasScrolled(false);
  }, []);

  useEffect(() => {
    handleScroll();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ bg: "background", minHeight: "100vh" }}>
      {withParticlesBackground && <ParticlesBackground error={error} />}
      <Head>
        <title>file.video</title>
        <link rel="icon" href="/favicon.png" />
        {metaTitle && <meta property="og:title" content={metaTitle} />}
        {metaTitle && <meta property="twitter:title" content={metaTitle} />}
        {metaDescription && (
          <meta property="og:description" content={metaDescription} />
        )}
        {metaDescription && (
          <meta property="twitter:description" content={metaDescription} />
        )}
        {url && <meta property="og:url" content={url} />}
        {image && <meta property="og:image" content={image} />}
        {image && (
          <meta property="twitter:card" content="summary_large_image" />
        )}
        {image && <meta property="twitter:image" content={image} />}
        {loadTwitterWidget && (
          <script
            type="text/javascript"
            async
            src="https://platform.twitter.com/widgets.js"
          ></script>
        )}
      </Head>
      <header
        sx={{
          width: "100%",
          height: navHeight,
          position: "sticky",
          top: 0,
          bg: hasScrolled ? "rgba(0,0,0,.5)" : "rgba(0,0,0,0)",
          backdropFilter: hasScrolled ? "saturate(180%) blur(5px)" : undefined,
          zIndex: "header",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 4,
          }}
        >
          <Logo />
          <Flex sx={{ alignItems: "center" }}>
            <Link href="/about" passHref>
              <NavLink sx={{ mr: 4 }}>About</NavLink>
            </Link>
            <Link href="/faq" passHref>
              <NavLink>FAQ</NavLink>
            </Link>
            <A
              href="https://github.com/livepeer/file-video"
              target="_blank"
              rel="noopener"
              sx={{ display: ["flex", "none"], alignItems: "center", ml: 4 }}
            >
              <GitHubLogo id="nav" />
            </A>
          </Flex>
        </Container>
      </header>
      <Container sx={{ zIndex: "general", position: "relative" }}>
        <main>{children}</main>
        <footer
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: ["center", "space-between"],
            py: 3,
            height: footerHeight,
          }}
        >
          <Text sx={{ display: "flex", alignItems: "center" }} variant="small">
            Powered by
            <A
              href="https://livepeer.org"
              target="_blank"
              rel="noopener"
              sx={{ ml: "12px", display: "flex", alignItems: "center" }}
            >
              <LivepeerLogo pushSx={{ mr: 2 }} />
              Livepeer
            </A>
            &nbsp;&
            <A
              href="https://filecoin.io"
              target="_blank"
              rel="noopener"
              sx={{ ml: "12px", display: "flex", alignItems: "center" }}
            >
              <FilecoinLogo pushSx={{ mr: 2 }} />
              Filecoin
            </A>
          </Text>
          <Text variant="small">
            <A
              href="https://github.com/livepeer/file-video"
              target="_blank"
              rel="noopener"
              sx={{ display: ["none", "flex"], alignItems: "center" }}
            >
              <GitHubLogo pushSx={{ mr: 2 }} /> github.com/livepeer/file-video
            </A>
          </Text>
        </footer>
      </Container>
    </Box>
  );
}
