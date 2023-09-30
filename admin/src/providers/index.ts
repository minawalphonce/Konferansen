import {
    FirebaseDataProvider,
    FirebaseAuthProvider,
    RAFirebaseOptions
} from "react-admin-firebase";
import { TranslationMessages } from "react-admin";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import polyglot18nProvider from "ra-i18n-polyglot";
import en from "./en";
import sv from "./sv";

const firebaseConfig = {
    apiKey: "AIzaSyBQte9kRegyfmoF4ch5ZVwk7M9WoOwlsXY",
    authDomain: "konferensen-platform.firebaseapp.com",
    projectId: "konferensen-platform",
    storageBucket: "konferensen-platform.appspot.com",
    messagingSenderId: "71813695116",
    appId: "1:71813695116:web:3c8a6e32962848bed35da9",
    measurementId: "G-WST80ZJCH9"
};

const firebaseApp = initializeApp(firebaseConfig);

// All options are optional
const options: RAFirebaseOptions = {
    // Enable logging of react-admin-firebase
    logging: true,
    // Authentication persistence, defaults to 'session', options are 'session' | 'local' | 'none'
    persistence: "local",
    app: firebaseApp
}

const translations: Record<string, TranslationMessages> = { en, sv }

export const i18nProvider = polyglot18nProvider(locale => translations[locale], "en", [
    { locale: "en", name: "English" },
    { locale: "sv", name: "Svenska" }
])

export const dataProvider = FirebaseDataProvider(firebaseConfig, options);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);