import { Box, BoxProps } from "theme-ui";
import { footerHeight, navHeight } from "lib/constants";

const ViewportHeightBox = ({ sx, ...moreProps }: BoxProps) => (
  <Box
    sx={{
      ...sx,
      minHeight: `calc(100vh - ${footerHeight} - ${navHeight})`,
      ...(navHeight > footerHeight
        ? { pb: `calc(32px + ${navHeight} - ${footerHeight})`, pt: "32px" }
        : { pt: `calc(32px + ${footerHeight} - ${navHeight})`, pb: "32px" }),
    }}
    {...moreProps}
  />
);

export default ViewportHeightBox;
