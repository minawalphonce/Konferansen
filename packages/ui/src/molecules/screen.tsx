import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Box, BoxProps } from "../atoms/box";
import { useAppTheme, Theme } from "../theme";


export type ScreenProps = {
    fullScreen?: boolean,
    scrollable?: boolean,
    customHeader?: React.ReactNode,
    screenBackground?: keyof Theme["colors"],
    edges?: Array<"top" | "bottom" | "left" | "right">,
} & BoxProps;

const ScrollableKeyboardAvoidBox = ({ customHeader, screenBackground = "mainBackground", ...props }: ScreenProps) => {
    const theme = useAppTheme();
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            {customHeader ? customHeader : null}
            <ScrollView style={{ backgroundColor: theme.colors[screenBackground] }} contentContainerStyle={{ paddingBottom: theme.spacing["xxl"] }} automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false}>
                <Box {...props} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export function Screen({
    fullScreen = false,
    scrollable = false,
    edges = undefined,
    customHeader,
    ...rest
}: ScreenProps) {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={edges || (fullScreen ? [] : ["top"])}>
            {scrollable
                ? <ScrollableKeyboardAvoidBox customHeader={customHeader} {...rest} />
                : (
                    <>
                        {customHeader}
                        <Box flex={1} backgroundColor={rest.screenBackground} {...rest} />
                    </>
                )
            }
        </SafeAreaView>
    );
}
