import { createTheme } from '@shopify/restyle';

const palette = {
    red: '#FF0000',
    redLight: '#FF3333',
    redDark: '#CC0000',
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F5F5F5',
    gray100: '#E5E5E5',
    gray200: '#CCCCCC',
    gray300: '#B3B3B3',
    gray400: '#999999',
    gray500: '#808080',
    gray600: '#666666',
    gray700: '#4D4D4D',
    gray800: '#333333',
    gray900: '#1A1A1A',
};

const theme = createTheme({
    colors: {
        mainBackground: palette.gray50,
        cardBackground: palette.white,
        primary: palette.red,
        primaryLight: palette.redLight,
        primaryDark: palette.redDark,
        text: palette.gray800,
        textLight: palette.gray600,
        textInverse: palette.white,
        border: palette.gray200,
        error: palette.red,
        transparent: "transparent"
    },
    spacing: {
        none: 0,
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadii: {
        xs: 4,
        s: 8,
        m: 12,
        l: 16,
        xl: 24,
        xxl: 32,
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
    textVariants: {
        defaults: {
            color: 'text',
            fontSize: 16,
        },
        header: {
            fontFamily: 'System',
            fontWeight: 'bold',
            fontSize: 32,
            color: 'textInverse',
        },
        subheader: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 16,
            color: 'textInverse',
        },
        body: {
            fontFamily: 'System',
            fontSize: 16,
            color: 'text',
        },
        bodyLight: {
            fontFamily: 'System',
            fontSize: 16,
            color: 'textLight',
        },
        caption: {
            fontFamily: 'System',
            fontSize: 12,
            color: 'textLight',
        },
        button: {
            fontFamily: 'System',
            fontSize: 14,
            fontWeight: '600',
            color: 'textInverse',
        },
    },
    cardVariants: {
        defaults: {
            backgroundColor: 'cardBackground',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
        },
        primary: {
            backgroundColor: 'cardBackground',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
            borderRadius: 'm',
        },
        secondary: {
            backgroundColor: 'cardBackground',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 1,
            borderRadius: 's',
        },
    },
    buttonVariants: {
        defaults: {
            backgroundColor: 'primary',
            borderRadius: 'm',
            padding: 'm',
        },
        primary: {
            backgroundColor: 'primary',
            borderRadius: 'm',
            padding: 'm',
        },
        secondary: {
            backgroundColor: 'cardBackground',
            borderRadius: 'm',
            padding: 'm',
            borderWidth: 1,
            borderColor: 'primary',
        },
        outline: {
            backgroundColor: 'transparent',
            borderRadius: 'm',
            padding: 'm',
            borderWidth: 1,
            borderColor: 'border',
        },
    },
});

export type Theme = typeof theme;
export default theme;