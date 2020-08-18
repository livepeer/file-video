import UploadForm from "../components/upload-form";
import Layout from "../components/layout";
import { Heading, Text } from "theme-ui";
import ViewportHeightBox from "components/viewport-height-box";

export default function HomePage() {
  return (
    <Layout>
      <ViewportHeightBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Heading variant="heading.1" sx={{ textAlign: ["center", "left"] }}>
          Decentralized Video
          <br />
          hosting for everyone.
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
          file.video is the easiest way to upload, edit, and share video. It’s
          free to use and there’s no signup required.
        </Text>
        <UploadForm />
      </ViewportHeightBox>
    </Layout>
  );
}
