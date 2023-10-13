import { FlatList } from "react-native";
import { Box, Item, Navbar, ProfilePicture, Screen, Text } from "../../../../components";
import { Group, useAppStoreState } from "../../../../store";

const ListItem = ({ profile, name }: Group["members"][0]) => {
    const me = useAppStoreState(state => state.me);
    return (
        <Item flexDirection="row" alignItems="center">
            <ProfilePicture pictureUrl={profile} name={name} width={64} aspectRatio={1} borderRadius="circle" />
            <Text>{name}</Text>
            {me?.name === name && <Text>(You)</Text>}
        </Item>)
}

const GroupScreen = () => {
    const group = useAppStoreState(state => state.group);
    return (<Screen>
        <Navbar title={`Your Group (${group?.color.toUpperCase()})`} showBack />
        {group ? <FlatList
            showsVerticalScrollIndicator={false}
            data={group.members}
            keyExtractor={item => item.name}
            renderItem={(item) => <ListItem {...item.item} />}
        /> : null}
    </Screen>)
}


export default GroupScreen;