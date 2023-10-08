import { Text as RNText, TextProps as RNTextProps } from "react-native";
import type { ColorProps, OpacityProps, RestyleFunctionContainer, SpacingProps, TextShadowProps, TypographyProps, VariantProps, VisibleProps } from "@shopify/restyle";
import { color, createRestyleComponent, createVariant, opacity, spacing, spacingShorthand, textShadow, typography, visible } from "@shopify/restyle";

import { FontWeightProps, Theme, fontWeight } from "../../theme";

export type TextProps =
    RNTextProps &
    ColorProps<Theme> &
    OpacityProps<Theme> &
    VisibleProps<Theme> &
    Omit<TypographyProps<Theme>, "fontWeight"> &
    SpacingProps<Theme> &
    TextShadowProps<Theme> &
    FontWeightProps<Theme> &
    VariantProps<Theme, 'textVariants'>;

const textRestyleFunctions = [
    color,
    opacity,
    visible,
    spacing,
    spacingShorthand,
    textShadow,
    fontWeight,
    typography,
    createVariant({ themeKey: 'textVariants' }),
];

export const Text = createRestyleComponent<TextProps, Theme>(
    textRestyleFunctions as RestyleFunctionContainer<TextProps, Theme>[],
    RNText);