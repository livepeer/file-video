/** @jsx jsx */
import { jsx, Heading, Text, Link as A } from "theme-ui";
import Layout from "components/layout";
import ViewportHeightBox from "components/viewport-height-box";

export default function AboutPage() {
  return (
    <Layout>
      <ViewportHeightBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading variant="heading.2" sx={{ textAlign: "center", mb: 4 }}>
          What is <br />
          <span sx={{ color: "primary" }}>file.video</span>?
        </Heading>
        <div sx={{ maxWidth: "530px", textAlign: "center" }}>
          <Text variant="small" sx={{ mb: 4 }}>
            File.video is an open source, decentralized and censorship-resistent video hosting solution powered by the Livepeer and Filecoin networks. 
          </Text>
          <Text variant="small">
            Made with {"<3"} by{" "}
            <A
              variant="accent"
              href="https://basement.studio"
              target="_blank"
              rel="noopener"
            >
              basement.studio
            </A>{" "}
            &{" "}
            <A
              variant="accent"
              href="https://buidllabs.io"
              target="_blank"
              rel="noopener"
            >
              Buidl Labs
            </A>
          </Text>
        </div>
      </ViewportHeightBox>
    </Layout>
  );
}
