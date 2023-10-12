import { PropsWithChildren } from "react";

import { Box, BoxProps } from "../atoms/box";
import { PressableBox } from "../atoms/pressable-box";

export type ItemProps = PropsWithChildren & BoxProps & {
    onPress?: () => any;
}

export const Item = (props: ItemProps) => {
    const COMP = props.onPress ? PressableBox : Box;
    return (<COMP
        padding="lg"
        margin="lg"
        backgroundColor="neutral.white"
        borderRadius="2xl"
        borderColor="primary"
        shadowColor="tertiary1.80"
        shadowOffset={{
            width: 0,
            height: 18,
        }}
        shadowOpacity={0.08}
        shadowRadius={20.00}
        elevation={1}
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        gap="xl"
        {...props}
    />);
}