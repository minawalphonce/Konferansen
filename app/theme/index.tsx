import { PropsWithChildren } from "react";
import { useTheme, ThemeProvider } from "@shopify/restyle";
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

import { defaultTheme, navigationTheme } from "./default-theme";

export * from "./fontWeight-restyleFunc";
export type Theme = typeof defaultTheme;
export const AppThemeProvider = ({ children }: Omit<PropsWithChildren, "theme">) => {

    return (<ThemeProvider theme={defaultTheme}>
        <NavigationThemeProvider value={navigationTheme}>
            {children}
        </NavigationThemeProvider>
    </ThemeProvider>);
}
export const useAppTheme = useTheme<Theme>;
