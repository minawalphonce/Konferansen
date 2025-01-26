import { FlatList } from "react-native";
import { router } from "expo-router";
import { Box, Icon, Item, Navbar, Screen, Text } from "../../../../components";
import { Memory, useAppStoreState } from "../../../../store";
import { useTranslate } from "react-polyglot";


const ListItem = ({ id, title }: Memory) => {
    const isChecked = useAppStoreState(state => state.myMemory.includes(id));
    return (
        <Item shadowColor="neutral.black" borderColor="neutral.neutral8" borderWidth={1}
            onPress={() => {
                router.push({
                    pathname: "/(app)/(tabs)/memory/[id]",
                    params: { id }
                })
            }}>
            <Box flexDirection="row" gap="sm">
                <Box>
                    <Icon name={isChecked ? "check-circle-o" : "circle-o"} color="primary" />
                </Box>
                <Box flex={2} justifyContent="center" alignItems="center">
                    <Text variant="paragraphBase" fontWeight="heavy" ellipsizeMode="tail">
                        {title}
                    </Text>
                </Box>
                <Box justifyContent="center" alignItems="center">
                    <Icon color="primary.80" name="chevron-right" />
                </Box>
            </Box>
        </Item>);
}

export const MemoryScreen = () => {
    const memory = useAppStoreState(state => state.memory);
    const translate = useTranslate();
    return (
        <Screen>
            <Navbar title={translate("tabs.memory.index.title")} showLogo />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={memory}
                keyExtractor={item => item.id}
                renderItem={(data) => <ListItem {...data.item} />} />
        </Screen>);
}

export default MemoryScreen;