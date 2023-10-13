import { initializeApp } from "firebase/app";
import { getFirestore, query, where, collection, onSnapshot, getDocs, doc, getDoc, QuerySnapshot, DocumentSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_apiKey,
    authDomain: process.env.EXPO_PUBLIC_authDomain,
    projectId: process.env.EXPO_PUBLIC_projectId,
    storageBucket: process.env.EXPO_PUBLIC_storageBucket,
    messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
    appId: process.env.EXPO_PUBLIC_appId,
    measurementId: process.env.EXPO_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const subscriptions: (() => void)[] = [];

const login = async (phoneNumber: string, pin: number) => {
    const collectionRef = collection(firestore, "Members");
    const queryRef = query(collectionRef, where("Phone", "==", phoneNumber), where("Pin", "==", pin));
    const docsSnap = await getDocs(queryRef);
    console.log("[]")
    if (docsSnap.size === 1) {
        const data = docsSnap.docs[0].data() as any;
        return {
            success: true,
            data,
            id: docsSnap.docs[0].id
        }
    }
    else {
        return {
            "success": false,
            "message": "invalid_pin"
        }
    }
}

const schedule = async (callback: (data: QuerySnapshot) => void) => {
    const ref = collection(firestore, "Schedule");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
        callback(snapshot);
    });
    return unsubscribe;
};

const profile = async (id: string, callback: (data: DocumentSnapshot) => void) => {
    const ref = doc(firestore, "Members", id)
    const unsubscribe = onSnapshot(ref, (snapshot) => {
        callback(snapshot);
    });
    return unsubscribe;
}

const group = async (groupId: number, callback: (data: QuerySnapshot) => void) => {
    const collectionRef = collection(firestore, "Members");
    const queryRef = query(collectionRef, where("GroupId", "==", groupId));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        callback(snapshot);
    });
    return unsubscribe;
}
export {
    login,
    schedule,
    profile,
    group
}