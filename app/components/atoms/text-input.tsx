import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from "react-native";
import type { BackgroundColorProps, BorderProps, ColorProps, LayoutProps, OpacityProps, RestyleFunctionContainer, SpacingProps, TextShadowProps, TypographyProps, VariantProps, VisibleProps } from "@shopify/restyle";
import { backgroundColor, border, color, createRestyleComponent, createVariant, layout, opacity, spacing, spacingShorthand, textShadow, typography, visible } from "@shopify/restyle";

import { FontWeightProps, Theme, fontWeight } from "../../theme";

export type TextInputProps =
    RNTextInputProps &
    LayoutProps<Theme> &
    BorderProps<Theme> &
    ColorProps<Theme> &
    BackgroundColorProps<Theme> &
    OpacityProps<Theme> &
    VisibleProps<Theme> &
    TypographyProps<Theme> &
    SpacingProps<Theme> &
    TextShadowProps<Theme> &
    FontWeightProps<Theme> &
    VariantProps<Theme, 'textInputVariants'>;


const textInputRestyleFunctions = [
    layout,
    border,
    color,
    backgroundColor,
    opacity,
    visible,
    typography,
    spacing,
    spacingShorthand,
    textShadow,
    fontWeight,
    createVariant({ themeKey: 'textInputVariants' }),
];

export const TextInput = createRestyleComponent<TextInputProps, Theme>(
    textInputRestyleFunctions as RestyleFunctionContainer<TextInputProps, Theme>[],
    RNTextInput);