/** @jsx jsx */
import { Button, Box, jsx } from "theme-ui";
import { useEffect, useRef, useState, useMemo } from "react";
import Router from "next/router";
import * as UpChunk from "@mux/upchunk";
import useSwr from "swr";
import LoadingDots from "./loading-dots";

const acceptedFileTypes = ["video/mp4"];

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
  const inputRef = useRef<HTMLInputElement>(null);

  const [upload, setUpload] = useState<any>();

  const { data } = useSwr(
    () => (isPreparing ? `/api/upload/${uploadId}` : null),
    fetcher,
    {
      refreshInterval: 5000,
      onError: (err) => {
        setError(err?.message ?? "Error creating upload");
      },
    }
  );

  useEffect(() => {
    if (data?.upload?.asset_id) {
      setUpload(data.upload);
      setIsPreparing(false);
    }
  }, [data]);

  const { data: assetData } = useSwr(
    () => (upload?.asset_id ? `/api/asset/${upload.asset_id}` : null),
    fetcher,
    {
      refreshInterval: 3000,
      onError: (err) => {
        setError(err?.message ?? "Error creating upload");
      },
    }
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
      const res = await fetch("/api/upload", {
        method: "POST",
      });
      const { id, url } = await res.json();
      setUploadId(id);
      return url;
    } catch (e) {
      console.error("Error in createUpload", e);
      setError(e?.message ?? "Error creating upload");
    }
  };

  const startUpload = () => {
    setError(undefined);
    setIsUploading(true);
    setProgress(0);

    const file = inputRef.current.files[0];
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`File type ${file.type} not supported`);
      return;
    }
    const upload = UpChunk.createUpload({
      file,
      endpoint: createUpload,
    });

    upload.on("error", (err) => {
      setError(err?.detail?.message ?? "Error creating upload");
    });

    upload.on("progress", (progress) => {
      setProgress(Math.floor(progress.detail));
    });

    upload.on("success", () => {
      setIsPreparing(true);
    });
  };

  useEffect(() => {
    if (error) {
      setIsUploading(false);
      setIsPreparing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [inputRef, error]);

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
