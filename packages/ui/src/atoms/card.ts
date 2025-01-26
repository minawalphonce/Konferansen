import { createRestyleComponent, createVariant, VariantProps } from "@shopify/restyle";

import { Box, BoxProps } from "./box";
import { Theme } from "../theme";

const variant = createVariant<Theme, "cardVariants", "variant">({
    property: 'variant',
    themeKey: 'cardVariants'
});


export type CardProps = VariantProps<Theme, 'cardVariants', "variant"> & BoxProps;
export const Card = createRestyleComponent<CardProps, Theme>([variant], Box);
