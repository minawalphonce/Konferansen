import { createText, TextProps as RestyledTextProps } from '@shopify/restyle';
import { Theme } from '../theme';

export type TextProps = RestyledTextProps<Theme>;
export const Text = createText<Theme>();