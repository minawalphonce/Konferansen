import { random } from "lodash";
import { Box, BoxProps } from "./box";
import { Text } from "./text";
import { Theme } from "../../theme";
import { Image } from "./image";

export type ProfilePictureProps = {
    pictureUrl?: string,
    name: string
} & BoxProps

const getFirstLetters = (user: string) => {
    const firstLetters: string[] = [];
    const words = user.split(' ');

    words.map(word => firstLetters.push(word[0]));

    return firstLetters.map(firstLetter => firstLetter);
};

const colors: (keyof Theme["colors"])[] = ["primary.80", "seconday", "tertiary1.80", "tertiary2"]



export const ProfilePicture = ({ name, pictureUrl, ...rest }: ProfilePictureProps) => {
    if (pictureUrl) {
        return (<Box justifyContent='center' alignItems='center' aspectRatio={1} {...rest}>
            {/* @ts-expect-error */}
            <Image source={{ uri: pictureUrl }} flex={1} aspectRatio={1} resizeMode="cover" {...rest} />
        </Box>)
    } else {
        const varColor = colors[random(0, 3)];
        return (
            <Box backgroundColor={varColor} justifyContent='center' alignItems='center' aspectRatio={1} {...rest}>
                <Text variant="displayLarge" color="action.primary.inverted" fontWeight="heavy" >{getFirstLetters(name)}</Text>
            </Box>);
    }
}