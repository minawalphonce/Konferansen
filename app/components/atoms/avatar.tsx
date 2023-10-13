import { Theme } from "../../theme";
import { Box, BoxProps } from "./box";
import { Icon, IconProps } from "./icon";
import { Text, TextProps } from "./text";

export type AvatarIconProps = BoxProps & {
    name: IconProps["name"],
    variant?: keyof Theme["colors"],
    color?: keyof Theme["colors"],
}

export const AvatarIcon = ({ name, variant = "primary", color = "neutral.white", ...rest }: AvatarIconProps) => {
    return (<Box
        backgroundColor={variant}
        width={60}
        aspectRatio={1}
        justifyContent="center"
        alignItems="center"
        borderRadius="circle"
        shadowColor={variant}
        shadowOffset={{
            width: 0,
            height: 2,
        }}
        shadowOpacity={0.3}
        shadowRadius={2.54}
        elevation={5}
        {...rest} >
        <Icon name={name} size="l" color={color} />
    </Box >)
}

export type AvatarImageProps = BoxProps & {

}

export const AvatarImage = () => {

}

export type AvatarTextProps = BoxProps & {
    textVariant?: TextProps["variant"],
    variant?: keyof Theme["colors"],
    fontWeight?: keyof Theme["fontWeight"],
    text: string
}

export const AvatarText = ({ text, fontWeight, textVariant, variant = "primary", ...rest }: AvatarTextProps) => {
    return (<Box
        backgroundColor={variant}
        width={60}
        aspectRatio={1}
        justifyContent="center"
        alignItems="center"
        borderRadius="circle"
        shadowColor={variant}
        shadowOffset={{
            width: 0,
            height: 2,
        }}
        shadowOpacity={0.3}
        shadowRadius={2.54}
        elevation={5}
        {...rest} >
        <Text variant={textVariant} fontWeight={fontWeight} color="neutral.white">
            {text}
        </Text>
    </Box >)
}