import { Box, SxStyleProp } from "theme-ui";
import AccordionItem, { AccordionItemProps } from "./item";
import { useState } from "react";

type Props = {
  items: AccordionItemProps[];
  pushSx?: SxStyleProp;
};

export default function Accordion({ items, pushSx }: Props) {
  const [currentlyToggled, setCurrentlyToggled] = useState<string>();

  return (
    <Box sx={pushSx}>
      {items.map((item) => (
        <AccordionItem
          key={`accordion-item-${item.heading}`}
          currentlyToggled={currentlyToggled}
          setCurrentlyToggled={setCurrentlyToggled}
          {...item}
        />
      ))}
    </Box>
  );
}
