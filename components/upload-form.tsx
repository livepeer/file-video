/** @jsx jsx */
import { Button, Box, jsx } from "theme-ui";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import * as UpChunk from "@mux/upchunk";
import useSwr from "swr";
import ErrorMessage from "./error-message";
import LoadingDots from "./loading-dots";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const UploadForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  const { data, error } = useSwr(
    () => (isPreparing ? `/api/upload/${uploadId}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  const upload = data && data.upload;

  useEffect(() => {
    if (upload && upload.asset_id) {
      let options = {
        pathname: `/asset/${upload.asset_id}`,
        scroll: false,
      };
      Router.push(options);
    }
  }, [upload]);

  if (error) return <ErrorMessage message="Error fetching api" />;
  if (data && data.error) return <ErrorMessage message={data.error} />;

  const createUpload = async () => {
    try {
      // TODO: replace this api with the livepeer/filecoin gateway api
      return fetch("/api/upload", {
        method: "POST",
      })
        .then((res) => res.json())
        .then(({ id, url }) => {
          setUploadId(id);
          return url;
        });
    } catch (e) {
      console.error("Error in createUpload", e);
      setErrorMessage("Error creating upload");
    }
  };

  const startUpload = () => {
    setIsUploading(true);
    const upload = UpChunk.createUpload({
      endpoint: createUpload,
      file: inputRef.current.files[0],
    });

    upload.on("error", (err) => {
      setErrorMessage(err.detail);
    });

    upload.on("progress", (progress) => {
      setProgress(Math.floor(progress.detail));
    });

    upload.on("success", () => {
      setIsPreparing(true);
    });
  };

  if (errorMessage) return <ErrorMessage message={errorMessage} />;

  return (
    <Box sx={{ display: "flex", justifyContent: ["center", "flex-start"] }}>
      <label>
        <Button
          type="button"
          sx={{ fontSize: "18px" }}
          onClick={() => inputRef.current.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <span sx={{ mr: 4 }}>
                Uploading {progress ? `${progress}%` : ""}
              </span>
              <LoadingDots />
            </>
          ) : (
            "Upload a video file"
          )}
        </Button>
        <input
          sx={{ display: "none" }}
          type="file"
          onChange={startUpload}
          ref={inputRef}
        />
      </label>
    </Box>
  );
};

export default UploadForm;
