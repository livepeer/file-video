import UploadForm from "../components/upload-form";
import Layout from "../components/layout";
import { Heading, Text, Link as A } from "theme-ui";
import ViewportHeightBox from "components/viewport-height-box";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [error, setError] = useState<string>();
  return (
    <Layout error={!!error} withParticlesBackground>
      <ViewportHeightBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <Heading
          variant="heading.1"
          sx={{ textAlign: ["center", "left"], maxWidth: "1112px" }}>
          {error
            ? "Something went wrong, please try again."
            : "Decentralized Video hosting for everyone."}
        </Heading>
        <Text
          variant="normal"
          sx={{
            mb: [4, 5],
            mt: [3, 4],
            maxWidth: "600px",
            textAlign: ["center", "left"],
          }}>
          {error ? (
            error
          ) : (
            <>
              file.video is an experiment in decentralized video hosting powered
              by Livepeer and Filecoin. It’s free to use and there’s no signup
              required.{" "}
              <Link href="/faq" passHref>
                <A sx={{ display: "block", color: "primary" }}>Learn More →</A>
              </Link>
            </>
          )}
        </Text>
        <UploadForm error={error} setError={setError} />
        <Text sx={{ textAlign: ["center", "left", "left"], fontSize: 12, mt: 2 }}>
          30mb max file size. MP4 files only.
        </Text>
      </ViewportHeightBox>
    </Layout>
  );
}
