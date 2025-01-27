import { ScrollView, FlatList } from "react-native";
import { Link } from "expo-router";
import { format, isAfter } from "date-fns";

import { Message, Button, Icon, ProfilePicture, Navbar, Screen, Box, Text, Image, AvatarIcon, ProfileCard, Item, AvatarText } from "../../../../components";
import { MyProfile, useAppStoreActions, useAppStoreState } from "../../../../store";
import images from "../../../../assets/images";
import { useTranslate } from "react-polyglot";

const MeBox = ({ profile, groupColorText, building, room, name, churche }: MyProfile) => {
    const canShowChurcheIcon = Object.keys(images.churches).includes(churche);
    const translate = useTranslate();
    return (
        <Box flexDirection="row" borderColor="neutral.neutral8" borderWidth={1} borderRadius="2xl">
            <ProfilePicture name={name} pictureUrl={profile} width={100} borderTopLeftRadius="2xl" borderBottomLeftRadius="2xl" />
            <Box flex={1} paddingHorizontal="xl" paddingVertical="md">
                <Box justifyContent="center" flex={1}>
                    <Box paddingBottom="md">
                        <Text variant="paragraphBase" fontWeight="heavy">{name}</Text>
                    </Box>
                    {groupColorText && <Text variant="paragraphSmall" fontWeight="heavy">
                        {translate("tabs.home.index.groupLabel")} {' '}
                        <Text variant="paragraphSmall" fontWeight="light">{groupColorText}</Text>
                    </Text>}
                    {building && <Text variant="paragraphSmall" fontWeight="heavy">
                        {translate("tabs.home.index.roomLabel")} {' '}
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

const ScoreBox = ({ groupId }: MyProfile) => {
    const groupScore = useAppStoreState(state => state.groupScores)[String(groupId)];
    const myScrore = useAppStoreState(state => state.myScore);
    const translate = useTranslate();
    return (<Box width="100%"
        justifyContent="space-around"
        padding="lg"
        borderColor="primary"
        borderWidth={1}
        borderRadius="lg"
        flexDirection="row">
        <Box gap="md" alignItems="center">
            <AvatarIcon name="users" variant="primary.10" color="primary" />
            <Text color="primary" fontWeight="heavy" variant="paragraphBase">{groupScore || 0}</Text>
            <Text variant="paragraphSmall">{translate("tabs.home.index.groupScoreLabel")}</Text>
        </Box>
        <Box gap="md" alignItems="center">
            <AvatarIcon name="user" variant="primary.10" color="primary" />
            <Text color="primary" fontWeight="heavy" variant="paragraphBase">{myScrore || 0}</Text>
            <Text variant="paragraphSmall">{translate("tabs.home.index.yourScoreLabel")}</Text>
        </Box>
    </Box>)
}

const EmptyGroup = () => {
    const translate = useTranslate();
    return (
        <Box>
            <Message variant="info" margin="lg" >
                {translate("tabs.home.index.emptyGroupText")}
            </Message>
        </Box>
    );
}

const GroupBox = () => {
    const translate = useTranslate();
    const group = useAppStoreState(state => state.group)!;
    const me = useAppStoreState(state => state.me)!;
    const members = group.members.filter(m => m.name !== me?.name);
    return (
        <Box gap="md">
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Text variant="h5">
                    {translate("tabs.home.index.groupsTitle", { color: group.color })}
                </Text>
                <Link href="/(app)/(tabs)/(home)/group">
                    <Text variant="paragraphBase" fontWeight="heavy" color="primary">
                        {translate("tabs.home.index.seeAllLabel")}
                    </Text>
                </Link>
            </Box>
            <Box>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16 }}
                    ListEmptyComponent={<EmptyGroup />}
                    horizontal={true}
                    data={members}
                    keyExtractor={item => item.name}
                    renderItem={(item) => <ProfileCard pictureUrl={item.item.profile} name={item.item.name} />}
                />
            </Box>
        </Box>)
}

const UpcommingBox = () => {
    const translate = useTranslate();
    const currentItem = useAppStoreState(state =>
        state.schedule?.sort((a, b) => (a.from as any) - (b.from as any))
            .filter(d => isAfter(d.from, new Date()))[0]);
    return (
        <Box paddingBottom="3xl">
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Text variant="h5">
                    {translate("tabs.home.index.upNextLabel")}
                </Text>
                <Link href="/(app)/(tabs)/schedule">
                    <Text variant="paragraphBase" fontWeight="heavy" color="primary">
                        {translate("tabs.home.index.seeScheduleLabel")}
                    </Text>
                </Link>
            </Box>
            {currentItem ? <Item>
                <AvatarText variant="seconday" textVariant="paragraphBase" fontWeight="heavy" text={format(currentItem.from, "HH:mm")} />
                <Box flexDirection="column" gap="sm">
                    <Text variant="paragraphBase" fontWeight="heavy">
                        {currentItem.details}
                    </Text>
                    <Text variant="paragraphSmall" fontWeight="regular" color="neutral.neutral4">
                        {format(currentItem.from, "EEEE")}  {format(currentItem.from, "HH:mm")} - {format(currentItem.to, "HH:mm")}
                    </Text>
                </Box>
            </Item> :
                <Message variant="info" margin="lg">
                    {translate("tabs.home.index.endSchedule")}
                </Message>
            }
        </Box>)
}

const LogoutButton = () => {
    const translate = useTranslate();
    const [logout] = useAppStoreActions(state => [state.logout]);
    return (<Button variant="filled"
        backgroundColor="status.warning"
        suffix={<Icon name="sign-out" color="neutral.white" />}
        onPress={() => logout()}>
        {translate("tabs.home.index.logoutButton")}
    </Button>)
}

export const HomeScreen = () => {
    const me = useAppStoreState(state => state.me);
    if (me)
        return (
            <Screen>
                <Navbar title={me?.name} showLogo />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box rowGap="2xl">
                        <MeBox {...me} />
                        <ScoreBox {...me} />
                        <GroupBox />
                        <UpcommingBox />
                        <LogoutButton />
                    </Box>
                </ScrollView >
            </Screen >
        );

    return null;
}

export default HomeScreen;