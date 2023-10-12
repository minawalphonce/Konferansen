import { Tabs } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { Box, PressableBox, Text, Icon, IconProps } from "../../../components";


const appTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <Box
            flexDirection="row"
            justifyContent="space-between"
            borderColor="neutral.neutral8"
            backgroundColor="neutral.white"
            borderWidth={2}
            paddingBottom="2xl"
            paddingTop="xl"
            paddingHorizontal="2xl"
            borderTopLeftRadius="3xl"
            borderTopRightRadius="3xl"
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    (options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name) as string;

                const icon = options.tabBarIcon || tabBarIcon("xing-square");
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true, params: undefined });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <PressableBox
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        backgroundColor="primary.10"
                        borderRadius="xl"
                    >
                        <Box paddingHorizontal="lg" paddingVertical="md" flexDirection="row" alignItems="center">
                            {/* @ts-expect-error */}
                            {icon()}
                            {isFocused && <Text variant="buttonSmall" fontWeight="heavy" color="primary.100" padding="xs">
                                {label}
                            </Text>}
                        </Box>
                    </PressableBox>
                );
            })}
        </Box>)
}

const tabBarIcon = (name: IconProps["name"]) => {
    return () => <Icon name={name} color="primary.100" size="m" />
}

export default function TabLayout() {
    return (
        <Tabs initialRouteName="home" screenOptions={{ headerShown: false }} tabBar={appTabBar}>
            <Tabs.Screen name="(home)" options={{
                title: "Home",
                tabBarIcon: tabBarIcon("home")
            }} />
            <Tabs.Screen name="schedule" options={{
                title: "Schedule",
                tabBarIcon: tabBarIcon("calendar")
            }} />
            <Tabs.Screen name="taraneem" options={{
                title: "Taraneem",
                tabBarIcon: tabBarIcon("headphones")
            }} />
            <Tabs.Screen name="memory" options={{
                title: "Memory",
                tabBarIcon: tabBarIcon("bookmark")
            }} />
        </Tabs>
    );
}