import Link from "next/link";
import Layout from "../../components/layout";
import VideoPlayer from "../../components/video-player";
import Spinner from "../../components/spinner";
import { MUX_HOME_PAGE_URL } from "../../constants";
import { useRouter } from "next/router";

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
    <Layout
      metaTitle="View this video created with Livepeer + Filecoin"
      image={poster}
      loadTwitterWidget
    >
      <div className="flash-message">This video is ready for playback</div>
      <VideoPlayer src={src} poster={poster} />
      <p>
        Go{" "}
        <Link href="/">
          <a>back home</a>
        </Link>{" "}
        to upload another video.
      </p>
      <div className="about-playback">
        <p>
          Copy explaining how this video was transcoded and stored. Perhaps a
          receipt to show costs as well.
        </p>
      </div>
      <style jsx>{`
        .flash-message {
          position: absolute;
          top: 0;
          background-color: #c1dcc1;
          width: 100%;
          text-align: center;
          padding: 20px 0;
        }
        .share-button {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 40px 0;
        }
      `}</style>
    </Layout>
  );
}
