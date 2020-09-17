/** @jsx jsx */
import { jsx, Heading, Text, Link as A } from "theme-ui";
import Layout from "components/layout";
import ViewportHeightBox from "components/viewport-height-box";
import Link from "next/link";
import Accordion from "components/accordion";
import { AccordionItemProps } from "components/accordion/item";

const faqs: AccordionItemProps[] = [
  {
    heading: "The most popular question",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cras ornare turpis in nec tortor cursus pulvinar ultricies. Sed rhoncus lacus non amet vestibulum tortor pellentesque aliquet. Praesent ac quis scelerisque tincidunt nec. Maecenas consectetur vitae magna volutpat tellus, vulputate. Maecenas vitae nullam mattis eu porta eget. Ipsum, sit dui turpis vestibulum pellentesque. Netus scelerisque ut morbi faucibus viverra malesuada libero.",
  },
  {
    heading: "The most popular question 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cras ornare turpis in nec tortor cursus pulvinar ultricies. Sed rhoncus lacus non amet vestibulum tortor pellentesque aliquet. Praesent ac quis scelerisque tincidunt nec. Maecenas consectetur vitae magna volutpat tellus, vulputate. Maecenas vitae nullam mattis eu porta eget. Ipsum, sit dui turpis vestibulum pellentesque. Netus scelerisque ut morbi faucibus viverra malesuada libero.",
  },
  {
    heading: "The most popular question 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cras ornare turpis in nec tortor cursus pulvinar ultricies. Sed rhoncus lacus non amet vestibulum tortor pellentesque aliquet. Praesent ac quis scelerisque tincidunt nec. Maecenas consectetur vitae magna volutpat tellus, vulputate. Maecenas vitae nullam mattis eu porta eget. Ipsum, sit dui turpis vestibulum pellentesque. Netus scelerisque ut morbi faucibus viverra malesuada libero.",
  },
  {
    heading: "The most popular question 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cras ornare turpis in nec tortor cursus pulvinar ultricies. Sed rhoncus lacus non amet vestibulum tortor pellentesque aliquet. Praesent ac quis scelerisque tincidunt nec. Maecenas consectetur vitae magna volutpat tellus, vulputate. Maecenas vitae nullam mattis eu porta eget. Ipsum, sit dui turpis vestibulum pellentesque. Netus scelerisque ut morbi faucibus viverra malesuada libero.",
  },
  {
    heading: "The most popular question 5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cras ornare turpis in nec tortor cursus pulvinar ultricies. Sed rhoncus lacus non amet vestibulum tortor pellentesque aliquet. Praesent ac quis scelerisque tincidunt nec. Maecenas consectetur vitae magna volutpat tellus, vulputate. Maecenas vitae nullam mattis eu porta eget. Ipsum, sit dui turpis vestibulum pellentesque. Netus scelerisque ut morbi faucibus viverra malesuada libero.",
  },
  {
    heading: "The most popular question 6",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cras ornare turpis in nec tortor cursus pulvinar ultricies. Sed rhoncus lacus non amet vestibulum tortor pellentesque aliquet. Praesent ac quis scelerisque tincidunt nec. Maecenas consectetur vitae magna volutpat tellus, vulputate. Maecenas vitae nullam mattis eu porta eget. Ipsum, sit dui turpis vestibulum pellentesque. Netus scelerisque ut morbi faucibus viverra malesuada libero.",
  },
];

export default function FaqPage() {
  return (
    <Layout>
      <ViewportHeightBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Heading variant="heading.2" sx={{ textAlign: "center", mb: 4 }}>
          Frequently Asked <br />
          Questions
        </Heading>
        <div sx={{ maxWidth: "530px", textAlign: "center" }}>
          <Text variant="normal" sx={{ mb: 4 }}>
            Everything you need to know about file.video.
            <br />
            You can go{" "}
            <Link href="/" passHref>
              <A variant="accent">back home</A>
            </Link>{" "}
            to start uploading videos.
          </Text>
          <Accordion items={faqs} />
        </div>
      </ViewportHeightBox>
    </Layout>
  );
}
