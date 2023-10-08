import { type FC, type PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, BoxProps } from "./box";

export type ScreenProps = BoxProps;

export const Screen: FC<ScreenProps> = (props: ScreenProps) => {
    return <SafeAreaView style={{ flex: 1 }}>
        <Box px="xl" flex={1} {...props} />
    </SafeAreaView>
}