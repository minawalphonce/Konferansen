import { BackgroundColorProps, BorderProps, LayoutProps, OpacityProps, PositionProps, RestyleFunctionContainer, ShadowProps, SpacingProps, VisibleProps, backgroundColor, border, createRestyleComponent, layout, opacity, position, shadow, spacing, visible } from "@shopify/restyle";
import { Image as RNImage, ImageProps as RNImageProps } from "react-native"
import { Theme } from "../../theme";

export type ImageProps =
    LayoutProps<Theme> &
    PositionProps<Theme> &
    OpacityProps<Theme> &
    VisibleProps<Theme> &
    SpacingProps<Theme> &
    BorderProps<Theme> &
    ShadowProps<Theme> &
    BackgroundColorProps<Theme> & RNImageProps

const imageRestyleFunctions = [
    layout,
    position,
    opacity,
    visible,
    spacing,
    border,
    shadow,
    backgroundColor
];

export const Image = createRestyleComponent<ImageProps, Theme>(
    imageRestyleFunctions as RestyleFunctionContainer<ImageProps, Theme>[],
    RNImage);