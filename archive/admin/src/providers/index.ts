import {
    FirebaseDataProvider,
    FirebaseAuthProvider,
    RAFirebaseOptions
} from "react-admin-firebase";
import { TranslationMessages } from "react-admin";
import { initializeApp } from "firebase/app";
import { doc, collection, getFirestore, query, where, setDoc, onSnapshot, getDocs, deleteDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import "firebase/auth";
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
]);
export const dataProvider = FirebaseDataProvider(firebaseConfig, options);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);

export const subscibeToMemory = (
    phone: string,
    callback: (items: { memoryId: string }[]) => void
) => {
    const collRef = collection(getFirestore(firebaseApp), "MemoryLog");
    const queryRef = query(collRef, where("phone", "==", phone));
    const unsb = onSnapshot(queryRef, (snapshot) => {
        callback(snapshot.docs.map(item => item.data() as { memoryId: string }));
    });
    return unsb;
}

export const updateMemory = async (phone: string, memoryId: string, createdBy: string, checked: boolean) => {
    const collRef = collection(getFirestore(firebaseApp), "MemoryLog");
    const queryRef = query(collRef, where("phone", "==", phone), where("memoryId", "==", memoryId));
    const docs = await getDocs(queryRef);

    if (docs.size >= 1 && checked) {
        return;
    }

    if (docs.size === 0 && !checked) {
        return;
    }
    //=============================

    if (checked) {
        await setDoc(doc(collRef), {
            phone,
            memoryId,
            createdBy,
            createdOn: new Date()
        });
    }
    else {
        await deleteDoc(doc(collRef, docs.docs[0].id));
    }

}

export const addMemberScore = async (phone: string, value: number, createdBy: string) => {
    const collRef = collection(getFirestore(firebaseApp), "MembersScoreLog");
    await setDoc(doc(collRef), {
        phone,
        value,
        createdBy,
        createdOn: new Date()
    });
}

export const subscibeToMemberScoreCalculator = (phone: string, callback: (amount: number) => void) => {
    const collRef = collection(getFirestore(firebaseApp), "MembersScoreLog");
    const queryRef = query(collRef, where("phone", "==", phone));
    const unsb = onSnapshot(queryRef, (snapshot) => {
        callback(snapshot.docs.reduce((total, doc) => total + doc.data().value, 0));
    });
    return unsb;
}

export const subscibeToGroupsScoreCalculator = (callback: (values: Record<string, number>) => void) => {
    const collRef = collection(getFirestore(firebaseApp), "GroupsScoreLog");
    const unsb = onSnapshot(collRef, (snapshot) => {
        callback(snapshot.docs.reduce((totals, doc) => {
            const { groupId, value } = doc.data();
            totals[groupId] = (totals[groupId] || 0) + value;
            return totals;
        }, {} as Record<string, number>));
    });
    return unsb;
}

export const addGroupScore = async (groupId: number, value: number, createdBy: string) => {
    const collRef = collection(getFirestore(firebaseApp), "GroupsScoreLog");
    await setDoc(doc(collRef), {
        groupId,
        value,
        createdBy,
        createdOn: new Date()
    });
}

const sendNotificationsProxy = httpsCallable(getFunctions(firebaseApp), "sendNotifications");
export const sendNotifications = async (topic: "all" | 1 | 2 | 3 | 4 | 5, title: string, body: string) => {
    await sendNotificationsProxy({
        topic,
        title,
        body
    });
}