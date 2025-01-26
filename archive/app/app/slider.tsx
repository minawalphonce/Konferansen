import { router } from "expo-router";
import { Box, Screen, Text, Image, IconProps, Icon } from "../components";
import AppIntroSlider from 'react-native-app-intro-slider';
import { Theme } from "../theme";
import { useTranslate } from "react-polyglot";

const slides: { key: number, title: string, icon: IconProps["name"], backgroundColor: keyof Theme["colors"] }[] = [
    {
        key: 1,
        title: 'slider.title1',
        icon: "trophy",
        backgroundColor: "primary"
    },
    {
        key: 2,
        title: 'slider.title2',
        icon: "calendar",
        backgroundColor: "seconday"
    },
    {
        key: 3,
        title: 'slider.title3',
        icon: "music",
        backgroundColor: "tertiary1"
    },
    {
        key: 4,
        title: 'slider.title4',
        icon: "braille",
        backgroundColor: "tertiary2"
    }
];


const Slide = ({ item }: { item: (typeof slides)[0] }) => {
    const translate = useTranslate();
    return (
        <Box backgroundColor={item.backgroundColor} flex={1} gap="3xl" justifyContent="center" alignItems="center">
            <Text color="neutral.white" variant="h1" fontWeight="heavy" >{translate(item.title)}</Text>
            <Icon color="neutral.white" name={item.icon} size="2xl" />
        </Box>
    );
}

const renderItem = (props: any) => <Slide {...props} />


const SliderScreen = () => {
    const translate = useTranslate();
    return <Screen px="none" fullScreen>
        <AppIntroSlider
            nextLabel={translate("slider.next")}
            prevLabel={translate("slider.prev")}
            doneLabel={translate("slider.done")}
            renderItem={renderItem}
            keyExtractor={item => String(item.key)}
            data={slides}
            onDone={() => router.push("/login")} />
    </Screen>
}


export default SliderScreen;