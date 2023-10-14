import { router } from "expo-router";
import { Box, Screen, Text, Image, IconProps, Icon } from "../components";
import AppIntroSlider from 'react-native-app-intro-slider';
import { Theme } from "../theme";

const slides: { key: number, title: string, icon: IconProps["name"], backgroundColor: keyof Theme["colors"] }[] = [
    {
        key: 1,
        title: 'Follow Your Score',
        icon: "trophy",
        backgroundColor: "primary"
    },
    {
        key: 2,
        title: 'Follow Your Schedule',
        icon: "calendar",
        backgroundColor: "seconday"
    },
    {
        key: 3,
        title: 'Participate in the taraneem',
        icon: "music",
        backgroundColor: "tertiary1"
    },
    {
        key: 4,
        title: 'Track you Progress',
        icon: "braille",
        backgroundColor: "tertiary2"
    }
];

const renderItem = ({ item }: { item: (typeof slides)[0] }) => {
    return (
        <Box backgroundColor={item.backgroundColor} flex={1} gap="3xl" justifyContent="center" alignItems="center">
            <Text color="neutral.white" variant="h1" fontWeight="heavy" >{item.title}</Text>
            <Icon color="neutral.white" name={item.icon} size="2xl" />
        </Box>
    );
}

const SliderScreen = () => {
    return <Screen px="none" fullScreen>
        <AppIntroSlider
            renderItem={renderItem}
            keyExtractor={item => String(item.key)}
            data={slides}
            onDone={() => router.push("/login")} />
    </Screen>
}


export default SliderScreen;