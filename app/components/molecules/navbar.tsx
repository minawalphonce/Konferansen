import { useRouter } from "expo-router";
import { Box } from "../atoms/box"
import { Logo } from "../atoms/logo"
import { PressableBox } from "../atoms/pressable-box";
import { Icon, IconProps } from "../atoms/icon";
import { Text } from "../atoms/text";

export type NavbarProps = {
    title?: string,
    showLogo?: boolean,
    showBack?: boolean
    actions?: { icon: IconProps["name"], onPress: () => void }[]
}

export const Navbar = ({ title, showBack = false, showLogo = false, actions = [] }: NavbarProps) => {
    const router = useRouter();
    return (
        <Box flexDirection="row" columnGap="xl" paddingVertical="lg" justifyContent="flex-start" alignContent="center">
            {showBack && <PressableBox onPress={() => router.back()} justifyContent="center">
                <Icon name="arrow-left" size="m" color="primary.80" />
            </PressableBox>}
            {showLogo && <Logo height={32} width={32} />}
            {title && <Box justifyContent="center" alignContent="center" flex={1} >
                <Text variant="h5" fontWeight="heavy" >
                    {title}
                </Text>
            </Box>}
            {actions.map((action, key) => {
                return (
                    <PressableBox key={key} backgroundColor="primary.10" justifyContent="center" alignItems="center" borderRadius="xl" aspectRatio={1} onPress={action.onPress}>
                        <Icon name={action.icon} size="m" color="primary.80" />
                    </PressableBox>
                );
            })}

        </Box>
    )
}