import { ViewProps } from "react-native";
import { createBox, BoxProps as SRBoxProps } from "@shopify/restyle";

import { Theme } from "../../theme";

export type BoxProps = ViewProps & SRBoxProps<Theme>;
export const Box = createBox<Theme, BoxProps>();