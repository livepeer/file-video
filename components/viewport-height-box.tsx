import { Box, BoxProps } from "theme-ui";
import { footerHeight, navHeight } from "lib/constants";

const ViewportHeightBox = ({ sx, ...moreProps }: BoxProps) => (
  <Box
    sx={{
      ...sx,
      minHeight: `calc(100vh - ${footerHeight} - ${navHeight})`,
      ...(navHeight > footerHeight
        ? { pb: `calc(${navHeight} - ${footerHeight})` }
        : { pt: `calc(${footerHeight} - ${navHeight})` }),
    }}
    {...moreProps}
  />
);

export default ViewportHeightBox;
