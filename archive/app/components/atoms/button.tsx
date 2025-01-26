import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { BackgroundColorProps, LayoutProps, OpacityProps, PositionProps, SpacingProps, VisibleProps } from "@shopify/restyle";

import { Text, TextProps } from "./text";
import { PressableBox, PressableBoxProps } from "./pressable-box";
import { Theme } from "../../theme";

type VariantStruct = { box: Partial<PressableBoxProps>, text: Partial<TextProps> };

const variantsMap = {
    filled: {
        box: {
            borderRadius: "lg",
            backgroundColor: "action.primary.default",
            paddingVertical: "lg",
            paddingHorizontal: "xl",
            justifyContent: "center",
            alignContent: "center"
        },
        text: {
            color: "action.primary.inverted",
            variant: "buttonLarge",
            fontWeight: "heavy"
        }
    } as VariantStruct,
    ghost: {
        box: {
            borderRadius: "lg",
            borderWidth: 2,
            borderColor: "action.primary.default",
            paddingVertical: "lg",
            paddingHorizontal: "xl",
            justifyContent: "center",
            alignContent: "center"
        },
        text: {
            color: "action.primary.default",
            variant: "buttonLarge",
            fontWeight: "heavy"
        }
    } as VariantStruct,
    borderless: {
        box: {
            borderWidth: 0,
            paddingVertical: "lg",
            paddingHorizontal: "xl",
            justifyContent: "center",
            alignContent: "center"
        },
        text: {
            color: "action.primary.default",
            variant: "buttonLarge",
            fontWeight: "heavy"
        }
    } as VariantStruct,
    round: {
        box: {
            borderRadius: "circle",
            backgroundColor: "action.primary.default",
            paddingVertical: "lg",
            paddingHorizontal: "xl",
            justifyContent: "center",
            alignContent: "center"
        },
        text: {
            color: "action.primary.inverted",
            variant: "buttonLarge",
            fontWeight: "heavy"
        }
    } as VariantStruct
}


export type ButtonProps =
    TouchableOpacityProps &
    BackgroundColorProps<Theme> &
    OpacityProps<Theme> &
    VisibleProps<Theme> &
    LayoutProps<Theme> &
    SpacingProps<Theme> &
    PositionProps<Theme> &
    {
        onPress?: () => void,
        suffix?: ReactNode,
        prefix?: ReactNode,
        variant?: keyof typeof variantsMap,
        //size?: "large" | "medium" | "small"
    }

export const Button = ({ children, suffix, prefix, variant = "filled", ...rest }: ButtonProps) => {
    return (
        <PressableBox flexDirection="row" gap="md" {...variantsMap[variant].box} {...rest}>
            {prefix}
            <Text textAlign="center" {...variantsMap[variant].text}>
                {children}
            </Text>
            {suffix}
        </PressableBox>)
}