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
          variant="normal"
          sx={{
            mb: [4, 5],
            mt: [3, 4],
            maxWidth: "600px",
            textAlign: ["center", "left"],
          }}
        >
          {error ? (
            error
          ) : (
            <>
              File.video was a product demo built to demonstrate a video hosting
              service powered by Filecoin and Livepeer. While the demo is no
              longer being maintained, the code remains open sourced.
              <Link href="/faq" passHref>
                <A sx={{ mt: 3, display: "block", color: "primary" }}>
                  Learn More About the Demo →
                </A>
              </Link>
            </>
          )}
        </Text>
        {/* <UploadForm error={error} setError={setError} /> */}
      </ViewportHeightBox>
    </Layout>
  );
}
