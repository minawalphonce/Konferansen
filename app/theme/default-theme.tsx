import { createTheme } from "@shopify/restyle";
import { Theme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
const FONT_NAME = undefined //"SourceSansPro"

export const defaultTheme = createTheme({
    breakpoints: {
        phone: 0
    },
    colors: {
        primary: "#2972FE",
        "primary.100": "#2972FE",
        "primary.10": "rgba(41, 114, 254, 0.10)",

        seconday: "#FFB800",
        "seconday.100": "#FFB800",

        tertiary1: "#6D5FFD",
        "tertiary1.100": "#6D5FFD",

        tertiary2: "#FF1843",
        "tertiary2.100": "#FF1843",

        black: "#09101D",

        "action.primary.default": "#2972FE",
        "action.primary.inverted": "#FFFFFF",

        //#region [status]

        "status.success": "#23A757",
        "status.successBG": "#EDF9F0",

        "status.warning": "#B95000",
        "status.warningBG": "#FFF4EC",

        "status.error": "#DA1414",
        "status.errorBG": "#FEEFEF",

        "status.info": "#2E5AAC",
        "status.infoBG": "#EEF2FA",

        //#endregion

        "neutral.neutral8": "#EBEEF2",
        "neutral.black": "#09101D",
        "neutral.white": "#FFFFFF"
    },
    spacing: {
        none: 0,
        xs: 4,
        sm: 6,
        md: 8,
        lg: 12,
        xl: 24,
        "2xl": 32,
        "3xl": 64,
        "-xs": -4,
        "-sm": -6,
        "-md": -8,
        "-lg": -12,
        "-xl": -24,
        "-2xl": -32,
        "-3xl": -64
    },
    fontWeight: {
        heavy: 600,
        regular: 400,
        light: 300
    },
    borderRadii: {
        none: 0,
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 12,
        "2xl": 16,
        "3xl": 24,
        circle: 10000
    },
    zIndices: {
        none: 0,
        back: -10,
        backward: -999,
        front: 10,
        forward: 999
    },
    iconSizes: {
        s: 16,
        m: 24,
        l: 32,
        xl: 64
    },
    textVariants: {
        defaults: {
            //paragraph base
            fontFamily: FONT_NAME,
            fontSize: 16,
            fontStyle: "normal"
        },
        displayLarge: {
            fontFamily: FONT_NAME,
            fontSize: 41,
            fontStyle: "normal"
        },
        displaySmall: {
            fontFamily: FONT_NAME,
            fontSize: 36,
            fontStyle: "normal"
        },
        h1: {
            fontFamily: FONT_NAME,
            fontSize: 32,
            fontStyle: "normal"
        },
        h2: {
            fontFamily: FONT_NAME,
            fontSize: 29,
            fontStyle: "normal"
        },
        h3: {
            fontFamily: FONT_NAME,
            fontSize: 26,
            fontStyle: "normal"
        },
        h4: {
            fontFamily: FONT_NAME,
            fontSize: 23,
            fontStyle: "normal"
        },
        h5: {
            fontFamily: FONT_NAME,
            fontSize: 20,
            fontStyle: "normal"
        },
        h6: {
            fontFamily: FONT_NAME,
            fontSize: 18,
            fontStyle: "normal"
        },
        paragraphLarge: {
            fontFamily: FONT_NAME,
            fontSize: 20,
            fontStyle: "normal"
        },
        paragraphBase: {
            fontFamily: FONT_NAME,
            fontSize: 16,
            fontStyle: "normal"
        },
        paragraphSmall: {
            fontFamily: FONT_NAME,
            fontSize: 13,
            fontStyle: "normal"
        },
        paragraphXsmall: {
            fontFamily: FONT_NAME,
            fontSize: 11,
            fontStyle: "normal"
        },
        paragraphTiny: {
            fontFamily: FONT_NAME,
            fontSize: 9,
            fontStyle: "normal"
        },
        smallCaps: {
            fontFamily: FONT_NAME,
            fontSize: 14,
            fontStyle: "normal",
            textTransform: "capitalize"
        },
        buttonLarge: {
            fontFamily: FONT_NAME,
            fontSize: 18,
            fontStyle: "normal"
        },
        buttonMedium: {
            fontFamily: FONT_NAME,
            fontSize: 16,
            fontStyle: "normal"
        },
        buttonSmall: {
            fontFamily: FONT_NAME,
            fontSize: 14,
            fontStyle: "normal"
        },
        linkLarge: {
            fontFamily: FONT_NAME,
            fontSize: 20,
            fontStyle: "normal"
        },
        linkMedium: {
            fontFamily: FONT_NAME,
            fontSize: 16,
            fontStyle: "normal"
        },
        linkSmall: {
            fontFamily: FONT_NAME,
            fontSize: 14,
            fontStyle: "normal"
        }
    },
    textInputVariants: {
        defaults: {
            borderWidth: 2,
            borderColor: "neutral.neutral8",
            paddingHorizontal: "xl",
            paddingVertical: "lg",
            borderRadius: "circle",
            color: "neutral.black"
        },

        active: {
            borderWidth: 2,
            borderColor: "action.primary.default",
            paddingHorizontal: "xl",
            paddingVertical: "lg",
            borderRadius: "circle",
            color: "neutral.black"
        },
        error: {
            borderWidth: 2,
            borderColor: "status.error",
            paddingHorizontal: "xl",
            paddingVertical: "lg",
            borderRadius: "circle",
            color: "neutral.black"
        },
        info: {
            borderWidth: 2,
            borderColor: "status.info",
            paddingHorizontal: "xl",
            paddingVertical: "lg",
            borderRadius: "circle",
            color: "neutral.black"
        },
        success: {
            borderWidth: 2,
            borderColor: "status.success",
            paddingHorizontal: "xl",
            paddingVertical: "lg",
            borderRadius: "circle",
            color: "neutral.black"
        },
        warning: {
            borderWidth: 2,
            borderColor: "status.warning",
            paddingHorizontal: "xl",
            paddingVertical: "lg",
            borderRadius: "circle",
            color: "neutral.black"
        },
        disabled: {
            borderWidth: 2,
            borderColor: "neutral.neutral8",
            paddingHorizontal: "xl",
            paddingVertical: "lg",
            borderRadius: "circle",
            color: "neutral.black",
            opacity: 0.5
        }
    },
    messageVariants: {
        defaults: {
            borderWidth: 0,
            backgroundColor: "neutral.white",
            paddingHorizontal: "xl",
            paddingVertical: "sm",
            borderRadius: "circle",
            color: "neutral.black"
        },

        error: {
            borderWidth: 0,
            borderColor: "status.error",
            backgroundColor: "status.errorBG",
            color: "status.error",
            paddingHorizontal: "xl",
            paddingVertical: "sm",
            borderRadius: "circle",
        },
        info: {
            borderWidth: 0,
            backgroundColor: "status.infoBG",
            color: "status.info",
            paddingHorizontal: "xl",
            paddingVertical: "sm",
            borderRadius: "circle",
        },
        success: {
            borderWidth: 0,
            backgroundColor: "status.successBG",
            color: "status.success",
            paddingHorizontal: "xl",
            paddingVertical: "sm",
            borderRadius: "circle",
        },
        warning: {
            borderWidth: 0,
            backgroundColor: "status.warningBG",
            color: "status.warning",
            paddingHorizontal: "xl",
            paddingVertical: "sm",
            borderRadius: "circle"
        }
    }
});

export const navigationTheme: Theme = {
    dark: false,
    colors: {
        ...NavigationDefaultTheme.colors,
        background: defaultTheme.colors["neutral.white"]
    }
}