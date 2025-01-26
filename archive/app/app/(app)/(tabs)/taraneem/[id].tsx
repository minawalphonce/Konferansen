import { PropsWithChildren } from "react"
import { ScrollView } from "react-native"
import { useLocalSearchParams } from "expo-router"
import * as Linking from 'expo-linking';

import { Box, Navbar, Screen, Text } from "../../../../components"
import { useAppStoreState } from "../../../../store";

const Line = ({ children }: PropsWithChildren) => {
    if (Array.isArray(children)) {
        const props = children[0];
        return <Text {...props}>{children[1]}{'\n'}</Text>
    }
    else
        return <Text >{children}{'\n'}</Text>
}

const TarneemaScreen = () => {
    const { id } = useLocalSearchParams();
    const tarneema = useAppStoreState(state => state.taraneem.find(s => s.id === id));
    return (
        <Screen>
            <Navbar title={tarneema?.name} showLogo={false} showBack={true}
                actions={[{
                    "icon": "download",
                    "onPress": () => {
                        if (tarneema?.downloadLink)
                            Linking.openURL(tarneema?.downloadLink);
                    }
                }]} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box flexDirection="row" gap="xl">
                    {Object.entries(tarneema?.formatedText || {}).map(([key, lines]) => {
                        return (<Box flex={1} key={key}>
                            {lines.map((line, ndx) => <Line key={ndx}>{line as any}</Line>)}
                        </Box>)
                    })}
                </Box>
            </ScrollView>
        </Screen>)
}

export default TarneemaScreen