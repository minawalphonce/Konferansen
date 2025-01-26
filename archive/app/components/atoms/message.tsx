import { VariantProps, boxRestyleFunctions, createVariant, composeRestyleFunctions, useRestyle } from "@shopify/restyle";
import { Box, BoxProps } from "./box";
import { Text } from "./text";
import { Theme, useAppTheme } from "../../theme";
import { PropsWithChildren } from "react";

export type MessageProps = PropsWithChildren &
    VariantProps<Theme, 'messageVariants'>
    & BoxProps

const messagesRestyleFunctions = composeRestyleFunctions<Theme, MessageProps>([
    ...boxRestyleFunctions,
    createVariant({ themeKey: 'messageVariants' }),
]);

export const Message = ({ children, ...rest }: MessageProps) => {
    const props = useRestyle(messagesRestyleFunctions as any, rest);
    const theme = useAppTheme();
    return (
        <Box {...props}>
            {/* <Icon /> */}
            {/* @ts-expect-error */}
            <Text color={theme.messageVariants[rest.variant || "defaults"].color} >{children}</Text>
        </Box>
    )
}