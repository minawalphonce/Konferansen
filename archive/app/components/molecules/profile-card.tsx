import { Box } from "../atoms/box"
import { ProfilePicture } from "../atoms/profile"
import { Text } from "../atoms/text"

export type ProfileCardProps = {
    pictureUrl?: string,
    name: string

}

export const ProfileCard = ({ pictureUrl, name }: ProfileCardProps) => {
    return (
        <Box borderColor="neutral.neutral8" borderRadius="xl" borderWidth={1}>
            <Box width={100} aspectRatio={1}>
                <ProfilePicture pictureUrl={pictureUrl} name={name} borderTopLeftRadius="xl" borderTopRightRadius="xl" />
            </Box>
            <Box alignItems="center" paddingVertical="md" width={100}>
                <Text variant="paragraphSmall" fontWeight="heavy">{name}</Text>
            </Box>
        </Box>)
}