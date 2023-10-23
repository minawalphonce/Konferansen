import { PropsWithChildren } from "react";
import { I18n } from "react-polyglot";

import { getLocales } from 'expo-localization';
const deviceLanguage = getLocales()[0].languageCode;

import en from "./en";
import sv from "./sv";

export const TranslationProvider = ({ children }: PropsWithChildren) => {

    const phrases = deviceLanguage === "sv" ? sv : en;
    return (<I18n locale={deviceLanguage === "sv" ? "sv" : "en"} messages={phrases} children={children} />)
}