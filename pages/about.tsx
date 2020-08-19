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
          <Text variant="large" sx={{ mb: 4 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cras
            ornare turpis in nec tortor cursus pulvinar ultricies. Sed rhoncus
            lacus non amet vestibulum tortor pellentesque aliquet. Praesent ac
            quis scelerisque tincidunt nec. Maecenas consectetur vitae magna
            volutpat tellus, vulputate. Maecenas vitae nullam mattis eu porta
            eget. Ipsum, sit dui turpis vestibulum pellentesque. Netus
            scelerisque ut morbi faucibus viverra malesuada libero.
          </Text>
          <Text variant="large">
            Made with {"<3"} by <A variant="accent">basement.studio</A> &{" "}
            <A variant="accent">Build Labs</A>
          </Text>
        </div>
      </ViewportHeightBox>
    </Layout>
  );
}
