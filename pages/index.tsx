import UploadForm from "../components/upload-form";
import Layout from "../components/layout";
import { Heading, Text } from "theme-ui";
import ViewportHeightBox from "components/viewport-height-box";
import { useState } from "react";

export default function HomePage() {
  const [error, setError] = useState<string>();
  return (
    <Layout>
      <ViewportHeightBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Heading
          variant="heading.1"
          sx={{ textAlign: ["center", "left"], maxWidth: "1112px" }}
        >
          {error
            ? "Something went wrong, please try again."
            : "Decentralized Video hosting for everyone."}
        </Heading>
        <Text
          variant="large"
          sx={{
            mb: [4, 5],
            mt: [3, 4],
            maxWidth: "587px",
            textAlign: ["center", "left"],
          }}
        >
          {error ? (
            error
          ) : (
            <>
              file.video is the easiest way to upload, edit, and share video.
              It’s free to use and there’s no signup required.
            </>
          )}
        </Text>
        <UploadForm error={error} setError={setError} />
      </ViewportHeightBox>
    </Layout>
  );
}
