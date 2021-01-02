/** @jsx jsx */
import { jsx, Heading, Text, Link as A } from "theme-ui";
import Layout from "components/layout";
import ViewportHeightBox from "components/viewport-height-box";
import Link from "next/link";
import Accordion from "components/accordion";
import { AccordionItemProps } from "components/accordion/item";

const faqs: AccordionItemProps[] = [
  {
    heading: "How does file.video work?",
    content:
      <span>When you upload a video file to file.video, it first gets sent into the Livepeer network along with fees (settled in <a sx={{color: 'primary'}} target="_blank" href="https://ethereum.org/en/eth/">ETH</a>) where the video gets transcoded. Transcoding is the process of taking a raw video file and reformatting it so that no matter what bandwidth you have - whether 2g or 5g - and no matter what device, you're ensured the most optimal viewing experience. Once the file is transcoded, the reformatted video gets sent into the Filecoin network along with fees (settled in <a sx={{color: 'primary'}} target="_blank" href="https://filecoin.io/blog/introducing-the-filecoin-economy/">Filecoin token</a>) for storage and playback.</span>,
  },
  {
    heading: "Who pays the network fees on my behalf when I upload a video?",
    content:
      <span>Transcoding and storage fees are subsidized by <a sx={{color: 'primary'}} target="_blank" href="https://livepeer.com/team">Livepeer, Inc.</a> and <a sx={{color: 'primary'}} target="_blank" href="https://protocol.ai/">Protocol Labs</a>.</span>
  },
  {
    heading: "Who earns the subsidized fees?",
    content: " The Livepeer and Filecoin networks are made up of many different computers run by many different people and organizations. Different actors within these networks earn a portion of the transcoding and storage fees sent by file.video on your behalf."
  }
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
          </Text>
          <Accordion items={faqs} />
        </div>
      </ViewportHeightBox>
    </Layout>
  );
}
