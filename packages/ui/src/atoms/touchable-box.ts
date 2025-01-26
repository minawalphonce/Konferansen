import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import { createBox, BoxProps as RestyledBoxProps } from '@shopify/restyle';

import { Theme } from '../theme';

export type TouchableBoxProps = RestyledBoxProps<Theme> & TouchableOpacityProps;

export const TouchableBox = createBox<Theme, TouchableBoxProps>(TouchableOpacity);