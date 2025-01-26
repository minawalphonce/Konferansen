import React from "react"
import type { NavigationRoute, ParamListBase } from "@react-navigation/native"
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { FadeInLeft, FadeOutRight } from "react-native-reanimated";

import { useAppTheme } from "../theme"
import { Box } from "../atoms/box";
import { TouchableBox } from "../atoms/touchable-box"

const TAB_BAR_HEIGHT = 65

function splitIntoGroups<T>(array: Array<T>, numberOfGroups: number) {
    const result = Array.from<T[]>({ length: numberOfGroups });
    result.fill([] as T[]);
    const groupSize = Math.ceil(array.length / numberOfGroups);

    for (let i = 0; i < numberOfGroups; i++) {
        const start = i * groupSize;
        const end = start + groupSize;
        result[i] = array.slice(start, end);
    }

    return result;
}

function ButtonGroup({
    group,
    offset,
    index,
    onPress,
    descriptors,
}: {
    group: Array<NavigationRoute<ParamListBase, string>>
    offset: number,
    index: number
    onPress: (route: NavigationRoute<ParamListBase, string>, groupIndex: number) => void
    descriptors: BottomTabBarProps["descriptors"]
}) {
    const theme = useAppTheme()
    return (
        <Box flexDirection="row" gap="s">
            {group.map((route, gIndex) => {
                const isFocused = index === gIndex + offset
                const descriptor = descriptors[route.key]
                return (
                    <TouchableBox
                        key={route.key}
                        onPress={() => onPress(route, gIndex + offset)}>
                        <MotiView
                            animate={{
                                backgroundColor: isFocused
                                    ? theme.colors.primary
                                    : theme.colors.textInverse
                            }}
                            style={{
                                borderRadius: theme.borderRadii.l,
                                padding: theme.spacing.s,
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            {descriptor.options.tabBarIcon?.({
                                color: isFocused ? theme.colors.textInverse : theme.colors.textLight,
                                size: 28,
                                focused: isFocused,
                            })}
                        </MotiView>
                    </TouchableBox>
                )
            })}
        </Box>
    )
}

function ButtonTab() {

}

function ActionButton() {
    const theme = useAppTheme();
    return (<Box
        height={TAB_BAR_HEIGHT * 1.1}
        aspectRatio={1}
        borderRadius="xl"
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
        style={{
            marginBottom: TAB_BAR_HEIGHT / 2,
        }}
    >
        <TouchableBox
            position="absolute"
            borderRadius="xl"
            shadowColor="text"
            shadowOffset={{ width: 0, height: -2 }}
            shadowOpacity={0.05}
            shadowRadius={8}
            elevation={5}
            backgroundColor="primary"
            padding="m">
            <Feather
                name="radio"
                size={28}
                color={theme.colors.textInverse} />
        </TouchableBox>
    </Box>);
}

export const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const groups = splitIntoGroups(state.routes, 2)

    const onPress = (route: NavigationRoute<ParamListBase, string>, index: number) => {
        const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
        })

        if (!event.defaultPrevented) {
            navigation.navigate(route.name)
        }
    }

    return (
        <Box position="absolute" bottom={25} left={25} right={25} height={TAB_BAR_HEIGHT} paddingBottom="m">
            <Box
                backgroundColor="cardBackground"
                borderRadius="xl"
                borderTopLeftRadius="xl"
                borderTopRightRadius="xl"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
                gap="xl"
                height={TAB_BAR_HEIGHT}
                shadowColor="text"
                shadowOffset={{ width: 0, height: -2 }}
                shadowOpacity={0.05}
                shadowRadius={8}
                elevation={5}
            >
                <ButtonGroup
                    group={groups[0]}
                    onPress={onPress}
                    offset={0}
                    index={state.index}
                    descriptors={descriptors}
                />
                <ActionButton />
                <ButtonGroup
                    group={groups[1]}
                    onPress={onPress}
                    offset={groups[0].length}
                    index={state.index}
                    descriptors={descriptors}
                />
            </Box>
        </Box>
    )
}