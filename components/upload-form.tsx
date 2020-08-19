/** @jsx jsx */
import { Button, Box, jsx } from "theme-ui";
import { useEffect, useRef, useState, useMemo } from "react";
import Router from "next/router";
import * as UpChunk from "@mux/upchunk";
import useSwr from "swr";
import LoadingDots from "./loading-dots";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

type Props = {
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const UploadForm = ({ error, setError }: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const [progress, setProgress] = useState(null);
  const inputRef = useRef(null);

  const [upload, setUpload] = useState<any>();

  const { data, error: uploadError } = useSwr(
    () => (isPreparing ? `/api/upload/${uploadId}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    if (data?.upload?.asset_id) {
      setUpload(data.upload);
      setIsPreparing(false);
    }
  }, [data]);

  const { data: assetData, error: assetError } = useSwr(
    () => (upload?.asset_id ? `/api/asset/${upload.asset_id}` : null),
    fetcher,
    { refreshInterval: 3000 }
  );

  const asset = useMemo(() => assetData?.asset, [assetData]);

  useEffect(() => {
    if (asset?.playback_id && asset.status === "ready") {
      Router.push("/v/[id]", `/v/${asset.playback_id}`);
    }
  }, [asset]);

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
      setError("Error creating upload");
    }
  };

  const startUpload = () => {
    setIsUploading(true);
    const upload = UpChunk.createUpload({
      endpoint: createUpload,
      file: inputRef.current.files[0],
    });

    upload.on("error", (err) => {
      setError(err.detail);
    });

    upload.on("progress", (progress) => {
      setProgress(Math.floor(progress.detail));
    });

    upload.on("success", () => {
      setIsPreparing(true);
    });
  };

  useEffect(() => {
    // TODO handle these errors
    if (error) {
      setIsUploading(false);
      setIsPreparing(false);
    }
  }, [uploadError, assetError, error]);

  return (
    <Box sx={{ display: "flex", justifyContent: ["center", "flex-start"] }}>
      <label>
        <Button
          type="button"
          sx={{
            fontSize: "18px",
            minWidth: isUploading ? "270px" : undefined,
            display: "inline-flex",
            justifyContent: "space-between",
          }}
          onClick={() => inputRef.current.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <span sx={{ mr: 4 }}>
                {upload?.asset_id
                  ? "Finishing up"
                  : `Uploading ${progress ?? "0"}%`}
              </span>
              <LoadingDots />
            </>
          ) : (
            <>{error ? "Try again" : "Upload a video file"}</>
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
