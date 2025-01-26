import { createRestyleFunction, ResponsiveValue, BaseTheme } from "@shopify/restyle";
export const fontWeight = createRestyleFunction({
    property: "fontWeight",
    styleProperty: "fontWeight",
    themeKey: "fontWeight",
});

export type FontWeightProps<Theme extends BaseTheme> = {
    fontWeight?: ResponsiveValue<
        Theme['fontWeight'] extends object
        ? keyof Theme['fontWeight']
        : number,
        Theme['breakpoints']>;
};