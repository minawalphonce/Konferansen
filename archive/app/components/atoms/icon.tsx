import FontAwesomeIcon from "@expo/vector-icons/FontAwesome"
import { Theme, useAppTheme } from "../../theme"

export type IconProps = {
    name: keyof typeof FontAwesomeIcon["glyphMap"],
    color?: keyof Theme["colors"],
    size?: keyof Theme["iconSizes"]
}

export const Icon = ({ name, color = "black", size = "m" }: IconProps) => {
    const theme = useAppTheme();
    return <FontAwesomeIcon name={name} color={theme["colors"][color]} size={theme["iconSizes"][size]} />
}