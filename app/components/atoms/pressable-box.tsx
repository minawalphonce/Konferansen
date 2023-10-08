import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { BackgroundColorProps, BorderProps, LayoutProps, OpacityProps, PositionProps, RestyleFunctionContainer, ShadowProps, SpacingProps, VisibleProps, backgroundColor, border, createRestyleComponent, layout, opacity, position, shadow, spacing, visible } from "@shopify/restyle";

import { Theme } from "../../theme";

export type PressableBoxProps =
    TouchableOpacityProps &
    BackgroundColorProps<Theme> &
    OpacityProps<Theme> &
    VisibleProps<Theme> &
    LayoutProps<Theme> &
    SpacingProps<Theme> &
    BorderProps<Theme> &
    ShadowProps<Theme> &
    PositionProps<Theme>;

export const pressableBoxRestyleFunctions = [
    backgroundColor,
    opacity,
    visible,
    layout,
    spacing,
    border,
    shadow,
    position,
];

export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
    pressableBoxRestyleFunctions as RestyleFunctionContainer<PressableBoxProps, Theme>[],
    TouchableOpacity);