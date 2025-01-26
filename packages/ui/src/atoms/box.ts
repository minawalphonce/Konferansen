import { ViewProps } from "react-native";
import { createBox, BoxProps as RestyledBoxProps } from '@shopify/restyle';
import Animated from "react-native-reanimated";

import { Theme } from '../theme';

export type BoxProps = RestyledBoxProps<Theme> & ViewProps;

export const Box = createBox<Theme>();
export const AnimatedBox = Animated.createAnimatedComponent(Box);