/** @jsx jsx */
import { Heading, Text, Link as A, jsx } from "theme-ui";
import Link from "next/link";
import Layout from "../../components/layout";
import VideoPlayer from "../../components/video-player";
import Spinner from "../../components/spinner";
import { useRouter } from "next/router";
import ViewportHeightBox from "components/viewport-height-box";

export function getStaticProps({ params: { id: playbackId } }) {
  const src = `https://stream.mux.com/${playbackId}.m3u8`;
  const poster = `https://image.mux.com/${playbackId}/thumbnail.png`;

  return { props: { playbackId, src, poster } };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const Code = ({ children }) => (
  <>
    <span className="code">{children}</span>
    <style jsx>{`
      .code {
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
        color: #ff2b61;
      }
    `}</style>
  </>
);

export default function Playback({ playbackId, src, poster }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <ViewportHeightBox
        sx={{
          display: ["flex", null, null, null, "grid"],
          flexDirection: "column",
          justifyContent: "center",
          gridTemplateColumns: ["1fr", null, null, null, "1fr 1fr"],
          alignItems: "center",
        }}
      >
        <div>
          <Heading
            variant="heading.1"
            sx={{ textAlign: ["center", null, null, null, "left"] }}
          >
            This video is ready for playback
          </Heading>
          <Text
            variant="large"
            sx={{
              mb: [4, null, null, null, 5],
              mt: [3, 4],
              mx: ["auto", null, null, null, 0],
              maxWidth: "587px",
              textAlign: ["center", null, null, null, "left"],
            }}
          >
            <span sx={{ display: ["none", "inline"] }}>
              file.video is the easiest way to upload, edit, and share video.
              It’s free to use and there’s no signup required.
              <br />
              <br />
            </span>
            Go{" "}
            <Link href="/" passHref>
              <A variant="accent">back home</A>
            </Link>{" "}
            to upload another video.
          </Text>
        </div>
        <VideoPlayer src={src} poster={poster} />
      </ViewportHeightBox>
    </Layout>
  );
}
