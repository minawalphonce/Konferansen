import { Image, ImageProps } from "./image";
const logoImage = require("../../assets/images/logo.png");

export type LogoProps = Omit<ImageProps, "source">;

export const Logo = (props: LogoProps) => <Image source={logoImage} {...props} />