import { type FC, type PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, BoxProps } from "./box";

export type ScreenProps = BoxProps & {
    fullScreen?: boolean
}

export const Screen: FC<ScreenProps> = ({ fullScreen = false, ...props }: ScreenProps) => {
    return <SafeAreaView style={{ flex: 1 }} edges={fullScreen ? [] : undefined} >
        <Box px="xl" flex={1} {...props} />
    </SafeAreaView>
}