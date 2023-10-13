import { ScrollView, FlatList } from "react-native";
import { Link } from "expo-router";
import { format, isWithinInterval } from "date-fns";

import { Button, Icon, ProfilePicture, Navbar, Screen, Box, Text, Image, AvatarIcon, ProfileCard, Item, AvatarText } from "../../../../components";
import { MyProfile, useAppStoreActions, useAppStoreState } from "../../../../store";
import images from "../../../../assets/images";

const MeBox = ({ profile, groupColorText, building, room, name, churche }: MyProfile) => {
    const canShowChurcheIcon = Object.keys(images.churches).includes(churche);
    return (
        <Box flexDirection="row" borderColor="neutral.neutral8" borderWidth={1} borderRadius="2xl">
            <ProfilePicture name={name} pictureUrl={profile} width={100} borderTopLeftRadius="2xl" borderBottomLeftRadius="2xl" />
            <Box flex={1} paddingHorizontal="xl" paddingVertical="md">
                <Box justifyContent="center" flex={1}>
                    <Box paddingBottom="md">
                        <Text variant="paragraphLarge" fontWeight="heavy">{name}</Text>
                    </Box>
                    {groupColorText && <Text variant="paragraphSmall" fontWeight="heavy">
                        Group {' '}
                        <Text variant="paragraphSmall" fontWeight="light">{groupColorText}</Text>
                    </Text>}
                    {building && <Text variant="paragraphSmall" fontWeight="heavy">
                        Room {' '}
                        <Text variant="paragraphSmall" fontWeight="light">{building} {room}</Text>
                    </Text>}
                </Box>
            </Box>
            {canShowChurcheIcon && <Box justifyContent="center" paddingRight="xs">
                <Box aspectRatio={1} width={50} backgroundColor="primary.10" borderRadius="xl" justifyContent="center">
                    <Image source={images.churches[churche as keyof typeof images.churches]} flex={1} aspectRatio={1} resizeMode="contain" />
                </Box>
            </Box>}
        </Box>)
}

const ScoreBox = ({ }) => {
    return (<Box width="100%"
        justifyContent="space-around"
        padding="lg"
        borderColor="primary"
        borderWidth={1}
        borderRadius="lg"
        flexDirection="row">
        <Box gap="md" alignItems="center">
            <AvatarIcon name="users" variant="primary.10" color="primary" />
            <Text color="primary" fontWeight="heavy" variant="paragraphBase">1000</Text>
            <Text variant="paragraphSmall">Group Score</Text>
        </Box>
        <Box gap="md" alignItems="center">
            <AvatarIcon name="user" variant="primary.10" color="primary" />
            <Text color="primary" fontWeight="heavy" variant="paragraphBase">100</Text>
            <Text variant="paragraphSmall">Your Score</Text>
        </Box>
    </Box>)
}

const GroupBox = () => {
    const group = useAppStoreState(state => state.group)!;
    const me = useAppStoreState(state => state.me)!;
    const members = group.members.filter(m => m.name !== me?.name);
    return (
        <Box gap="md">
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Text variant="h5">
                    the {group.color} team
                </Text>
                <Link href="/(app)/(tabs)/(home)/group">
                    <Text variant="paragraphBase" fontWeight="heavy" color="primary">
                        See All
                    </Text>
                </Link>
            </Box>
            <Box>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16 }}
                    horizontal={true}
                    data={members}
                    keyExtractor={item => item.name}
                    renderItem={(item) => <ProfileCard pictureUrl={item.item.profile} name={item.item.name} />}
                />
            </Box>
        </Box>)
}

const UpcommingBox = () => {
    const currentItem = useAppStoreState(state => state.schedule?.find(item => isWithinInterval(Date.now(), {
        start: item.from,
        end: item.to
    })));
    //const currentItem = useAppStoreState(state => state.schedule[0]);
    return (
        <Box paddingBottom="3xl">
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Text variant="h5">
                    Up Next
                </Text>
                <Link href="/(app)/(tabs)/schedule">
                    <Text variant="paragraphBase" fontWeight="heavy" color="primary">
                        See All
                    </Text>
                </Link>
            </Box>
            {currentItem && <Item>
                <AvatarText variant="seconday" textVariant="paragraphBase" fontWeight="heavy" text={format(currentItem.from, "HH:mm")} />
                <Box flexDirection="column" gap="sm">
                    <Text variant="paragraphBase" fontWeight="heavy">
                        {currentItem.details}
                    </Text>
                    <Text variant="paragraphSmall" fontWeight="regular" color="neutral.neutral4">
                        {format(currentItem.from, "HH:mm")} - {format(currentItem.to, "HH:mm")}
                    </Text>
                </Box>
            </Item>}
        </Box>)
}

export const HomeScreen = () => {
    const me = useAppStoreState(state => state.me);
    const [logout] = useAppStoreActions(state => [state.logout]);
    if (me)
        return (
            <Screen>
                <Navbar title={me?.name} showLogo />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box rowGap="2xl">
                        <MeBox {...me} />
                        <ScoreBox />
                        <GroupBox />
                        <UpcommingBox />
                        <Button variant="filled"
                            backgroundColor="status.warning"
                            suffix={<Icon name="sign-out" color="neutral.white" />}
                            onPress={() => logout()}>
                            Logout
                        </Button>
                    </Box>
                </ScrollView>
            </Screen>
        );

    return null;
}

export default HomeScreen;