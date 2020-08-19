/** @jsx jsx */
import { jsx, Container, NavLink, Flex, Link as A, Text } from "theme-ui";
import Head from "next/head";
import Link from "next/link";
import Logo from "./logos/file-video";
import LivepeerLogo from "./logos/livepeer";
import FilecoinLogo from "./logos/filecoin";
import GitHubLogo from "./logos/github";
import { footerHeight, navHeight } from "lib/constants";

interface Props {
  metaTitle?: string;
  metaDescription?: string;
  image?: string;
  children?: React.ReactNode;
  loadTwitterWidget?: boolean;
  url?: string;
}

Layout.defaultProps = {
  metaTitle: "file.video",
  metaDescription:
    "Decentralized live video streaming, built on the Ethereum blockchain. Livepeer is live on Ethereum mainnet.",
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
}: Props) {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Head>
        <title>Livepeer + Filecoin</title>
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 4,
          width: "100%",
          height: navHeight,
          position: "sticky",
          top: 0,
          bg: "rgba(0,0,0,.5)",
          backdropFilter: "saturate(180%) blur(5px)",
          zIndex: "header",
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
      </header>
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
        <Text sx={{ display: "flex", alignItems: "center" }} variant="normal">
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
        <Text variant="normal">
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
  );
}
