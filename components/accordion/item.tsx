import { Box, Flex, IconButton } from "theme-ui";
import { useMemo, useCallback, useRef, useState, useEffect } from "react";
import slugify from "@sindresorhus/slugify";
import { FiPlus, FiX } from "react-icons/fi";

export type AccordionItemProps = {
  heading: string;
  content: React.ReactNode;
  currentlyToggled?: string;
  setCurrentlyToggled?: React.Dispatch<React.SetStateAction<string>>;
};

export default function AccordionItem({
  heading,
  content,
  currentlyToggled,
  setCurrentlyToggled,
}: AccordionItemProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = useMemo(() => slugify(heading), [heading]);

  const [baseHeight, setBaseHeight] = useState<string>("69px");
  const [fullHeight, setFullHeight] = useState<string>();

  const resize = useCallback(() => {
    if (!headingRef.current || !contentRef.current) return;
    const baseHeight = headingRef.current.offsetHeight;
    const fullHeight = baseHeight + contentRef.current.offsetHeight;
    setBaseHeight(baseHeight + "px");
    setFullHeight(fullHeight + "px");
  }, [headingRef, contentRef]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [headingRef, contentRef]);

  const isToggled = useMemo(() => currentlyToggled === id, [
    id,
    currentlyToggled,
  ]);

  const handleClick = useCallback(() => {
    if (isToggled) setCurrentlyToggled(undefined);
    else setCurrentlyToggled(id);
  }, [setCurrentlyToggled, isToggled, id]);

  return (
    <Box
      sx={{
        height: isToggled ? fullHeight : baseHeight,
        transition: "height .15s",
        overflow: "hidden",
        willChange: "height",
        "&:last-of-type": {
          button: {
            borderBottom: "1px solid",
            borderColor: "muted",
          },
        },
      }}
    >
      <Flex
        onClick={handleClick}
        ref={headingRef}
        as="button"
        sx={{
          p: [2, 3],
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          fontWeight: 700,
          "&:focus": {
            opacity: isToggled ? 1 : 0.75,
            outline: "none",
          },
          borderTop: "1px solid",
          borderBottom: isToggled ? "1px solid" : undefined,
          borderColor: "muted",
          textAlign: "left",
          "&:hover": {
            color: "primary",
          },
        }}
      >
        {heading}
        <IconButton as="div" sx={{ fontSize: [3, 4] }}>
          {isToggled ? <FiX /> : <FiPlus />}
        </IconButton>
      </Flex>
      <Box
        sx={{
          visibility: isToggled ? "visible" : "hidden",
          p: [2, 3],
          textAlign: "left",
          fontSize: ["14px", "16px"],
          color: "gray",
        }}
        ref={contentRef}
      >
        {content}
      </Box>
    </Box>
  );
}
