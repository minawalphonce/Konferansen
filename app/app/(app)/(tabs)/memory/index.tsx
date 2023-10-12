import { FlatList } from "react-native";
import { Navbar, Screen, Text } from "../../../../components";
import { useAppStoreState } from "../../../../store";


export const MemoryScreen = () => {
    const memory = useAppStoreState(state => state.memory);
    return (
        <Screen>
            <Navbar title="Memory" showLogo />
            <FlatList
                data={memory}
                renderItem={(data) => null} />
        </Screen>);
}

export default MemoryScreen;