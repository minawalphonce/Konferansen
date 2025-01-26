import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { BoxProps, createRestyleComponent, createVariant, VariantProps } from '@shopify/restyle';

import { Theme } from '../theme';

const variant = createVariant<Theme, "buttonVariants", "variant">({
    property: 'variant',
    themeKey: 'buttonVariants'
});

export type ButtonProps = VariantProps<Theme, "buttonVariants", "variant"> & BoxProps<Theme> & TouchableOpacityProps;
export const Button = createRestyleComponent<ButtonProps, Theme>([variant], TouchableOpacity);