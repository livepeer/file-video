/** @jsx jsx */
import { Link as A, jsx, IconButton } from "theme-ui";
import { useEffect, useRef, useCallback, useState } from "react";
import Hls from "hls.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiCopy, FiCheck } from "react-icons/fi";

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed"; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  navigator.clipboard.writeText(text);
}

export default function VideoPlayer({ src, poster }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    let hls;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // This will run in safari, where HLS is supported natively
      video.src = src;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, videoRef]);

  const handleCopy = useCallback(() => {
    copyTextToClipboard(`${window.location.origin}${router.asPath}`);
    setCopied(true);
  }, [router]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div
      sx={{ textAlign: "center", maxWidth: "100%", width: "100%", mx: "auto" }}
    >
      <video
        ref={videoRef}
        poster={poster}
        sx={{
          borderRadius: "lg",
          width: "100%",
          "&:focus": { outline: "none" },
        }}
      />
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: [3, 4],
        }}
      >
        <Link href={router.pathname} as={router.asPath} passHref>
          <A
            variant="accent"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {window.location.origin}{router.asPath}
          </A>
        </Link>
        <IconButton
          sx={{ fontSize: 4, minWidth: "36px", ml: 2 }}
          onClick={handleCopy}
        >
          {copied ? <FiCheck /> : <FiCopy />}
        </IconButton>
      </div>
    </div>
  );
}
