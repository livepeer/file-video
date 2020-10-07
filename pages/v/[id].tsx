/** @jsx jsx */
import { Heading, Text, Link as A, jsx } from "theme-ui";
import Link from "next/link";
import Layout from "../../components/layout";
import VideoPlayer from "../../components/video-player";
import Spinner from "../../components/spinner";
import { useRouter } from "next/router";
import ViewportHeightBox from "components/viewport-height-box";
import { useEffect, useState } from "react";

export async function getStaticProps({ params: { id: id } }) {
  const assetURL = process.env.DEMUX_URL + 'asset';

  const res = await fetch(assetURL + '/' + id);
  const asset = await res.json();

  const src = asset['stream_url'];
  const poster = asset['thumbnail'];

  return { props: { src, poster } };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Playback({ src, poster }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isFallback) return;
    fetch(src).then((res) => {
      if (res.status === 404) router.push("/");
      else setIsLoading(false);
    });
  }, [router]);

  if (isLoading) {
    return (
      <Layout>
        <ViewportHeightBox
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </ViewportHeightBox>
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
            variant="normal"
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
