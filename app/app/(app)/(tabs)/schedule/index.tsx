import { SectionList } from "react-native"
import { groupBy, map, sortBy } from "lodash";
import { format, isWithinInterval } from "date-fns"

import { Screen, Navbar, Text, Box, AvatarText, AvatarTextProps, Item } from "../../../../components";
import { ScheduleItem, useAppStoreState } from "../../../../store";

const variantsList: AvatarTextProps["variant"][] = ["primary", "seconday", "tertiary1", "tertiary2"];

const ListItem = ({ from, to, details, index }: ScheduleItem & { index: number }) => {
    const variant = variantsList[index % 4];
    const isCurrent = isWithinInterval(Date.now(), {
        start: from.getTime(),
        end: to.getTime()
    });
    return (
        <Item borderWidth={isCurrent ? 1 : 0}>
            <AvatarText variant={variant} textVariant="paragraphBase" fontWeight="heavy" text={format(from, "HH:mm")} />
            <Box flexDirection="column" gap="sm">
                <Text variant="paragraphBase" fontWeight="heavy">
                    {details}
                </Text>
                <Text variant="paragraphSmall" fontWeight="regular" color="neutral.neutral4">
                    {format(from, "HH:mm")} - {format(to, "HH:mm")}
                </Text>
            </Box>
        </Item>)
}

export const ScheduleScreen = () => {
    const schedule = useAppStoreState(state => state.schedule);
    if (schedule.length <= 0)
        return;
    const soredDates = sortBy(schedule, s => s.from);
    const days = map(groupBy(soredDates, s => format(s.from, "EEEE")), (data, day) => ({
        day,
        data
    }))

    return (<Screen>
        <Navbar title="Schedule" showLogo />
        <SectionList
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
            sections={days}
            keyExtractor={s => s.id}
            renderSectionHeader={h => <Text fontWeight="heavy" variant="h5">{h.section.day}</Text>}
            renderItem={(data) => <ListItem {...data.item} index={data.index} />} />
    </Screen>);
}

export default ScheduleScreen;