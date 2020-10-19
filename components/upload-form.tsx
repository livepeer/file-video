/** @jsx jsx */
import { Button, Box, jsx } from "theme-ui";
import { useEffect, useRef, useState, useMemo } from "react";
import Router from "next/router";
import useSwr from "swr";
import LoadingDots from "./loading-dots";

const Resumable = require("rb-resumablejs/resumable");

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
    if (data?.upload?.errors) {
      setError("Error creating upload");
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
    if (asset) {
      if (asset?.id && asset.ready == true) {
        Router.push("/v/[id]", `/v/${asset.id}`);
      } else if (asset?.id && asset.errors) {
        setError("Error streaming video");
      }
    }
  }, [asset]);

  const assetURL = process.env.DEMUX_URL + "asset";
  const username = process.env.TOKEN_ID;
  const password = process.env.TOKEN_SECRET;
  const authHeader =
    "Basic " +
    Buffer.from(`${username}:${password}`, "utf-8").toString("base64");

  const createUpload = async () => {
    try {
      const res = await fetch(assetURL, {
        method: "POST",
        headers: {
          Authorization: authHeader,
        },
      });
      const { asset_id, url } = await res.json();
      setUploadId(asset_id);
      return url;
    } catch (e) {
      setError(e?.message ?? "Error creating upload");
    }
  };

  const startUpload = () => {
    setError(undefined);
    setIsUploading(true);
    setProgress(0);

    const myfile = inputRef.current.files[0];
    if (!acceptedFileTypes.includes(myfile.type)) {
      setError(`File type ${myfile.type} not supported`);
      return;
    }

    const fileSize = myfile.size;
    if (fileSize > 30 * 1024 * 1024) {
      setError(`Please upload a file smaller than 30MB`);
      return;
    }

    createUpload().then((targetUrl) => {
      const r = new Resumable({
        target: targetUrl,
      });
      r.addFile(myfile);
      // TODO: Fallback to direct upload if Resumable.js isn't supported by the browser
      if (!r.support) {
        setError("Please use a newer browser");
      }

      r.on("fileAdded", function (file) {
        r.upload();
      });

      r.on("progress", function () {
        setProgress(Math.floor(r.progress() * 100));
      });

      r.on("fileSuccess", function (file, message) {
        setIsPreparing(true);
      });

      r.on("fileError", function (file, message) {
        setError(message ?? "Error creating upload");
      });
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
          accept={acceptedFileTypes.join(",")}
        />
      </label>
    </Box>
  );
};

export default UploadForm;
