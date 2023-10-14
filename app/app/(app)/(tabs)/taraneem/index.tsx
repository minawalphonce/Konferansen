import { FlatList } from "react-native";

import { Image, Icon, Box, Item, Navbar, Screen, Text } from "../../../../components";
import { Tarnima, useAppStoreState } from "../../../../store";

import images from "../../../../assets/images";
import { router } from "expo-router";

const ListItem = ({ id, name, image }: Tarnima) => {
    return (
        <Item shadowColor="neutral.black" borderColor="neutral.neutral8" borderWidth={1}
            onPress={() => {
                router.push({
                    pathname: "/(app)/(tabs)/taraneem/[id]",
                    params: { id }
                })
            }}>
            <Box flexDirection="row" gap="sm">
                <Box margin="-md">
                    <Image source={images[image]}
                        width={100} height={100}
                        borderTopLeftRadius="lg"
                        borderBottomLeftRadius="lg" />
                </Box>
                <Box flex={2} justifyContent="center" alignItems="center" marginLeft="lg">
                    <Text variant="paragraphBase" fontWeight="heavy" ellipsizeMode="tail">
                        {name}
                    </Text>
                </Box>
                <Box justifyContent="center" alignItems="center">
                    <Icon name="chevron-right" />
                </Box>
            </Box>
        </Item>);
}

export const TaraneemScreen = () => {
    const taraneem = useAppStoreState(state => state.taraneem);
    return (
        <Screen>
            <Navbar title="Taraneem" showLogo />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={taraneem}
                keyExtractor={s => s.id}
                renderItem={(data) => <ListItem  {...data.item} />} />
        </Screen>);
}

export default TaraneemScreen;