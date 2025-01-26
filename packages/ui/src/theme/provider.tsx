import React, { FC, PropsWithChildren, useMemo } from "react"
import { ThemeProvider as RestyledThemeProvider } from '@shopify/restyle';
import { ThemeProvider as RNThemeProvider, DefaultTheme } from "@react-navigation/native";


import theme from "./app-theme";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const rnTheme = useMemo(() => {
        // convert theme to react navigation theme
        return {
            ...DefaultTheme,
            colors: {
                primary: theme.colors.primary,
                background: theme.colors.mainBackground,
                card: theme.colors.cardBackground,
                text: theme.colors.text,
                border: theme.colors.border,
                notification: theme.colors.text
            }
        }
    }, [theme, DefaultTheme]);

    return (<RestyledThemeProvider theme={theme}>
        <RNThemeProvider value={rnTheme}>
            {children}
        </RNThemeProvider>
    </RestyledThemeProvider>);
}