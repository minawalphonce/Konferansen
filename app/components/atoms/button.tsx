import { TouchableOpacityProps } from "react-native";
import { LayoutProps, OpacityProps, PositionProps, SpacingProps, VariantProps, VisibleProps, composeRestyleFunctions, createVariant, useRestyle } from "@shopify/restyle";
import { Text } from "./text";
import { Theme, useAppTheme } from "../../theme";
import { ReactNode } from "react";
import { PressableBox } from "./pressable-box";

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
    },
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
    },
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
    },
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
    }
}


export type ButtonProps =
    TouchableOpacityProps &
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
    const theme = useAppTheme();
    return (
        <PressableBox flexDirection="row" gap="md" {...rest} {...variantsMap[variant].box}>
            {prefix}
            <Text textAlign="center" {...variantsMap[variant].text}>
                {children}
            </Text>
            {suffix}
        </PressableBox>)
}