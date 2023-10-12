import { initializeApp } from "firebase/app";
import { getFirestore, query, where, collection, onSnapshot, getDocs, doc, getDoc, QuerySnapshot } from "firebase/firestore";

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
            data
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
    subscriptions.push(unsubscribe);
};

const unsubscribe = () => {
    subscriptions.forEach(x => x());
    subscriptions.splice(0);
}

// const group = async () => {
//     const ref = collection(firestore, "Schedule");
//     const unsubscribe = onSnapshot(ref, (snapshot) => {
//         callback();
//     });
//     subscriptions.push(unsubscribe);
// }

// const me = async () => {
//     const ref = collection(firestore, "Schedule");
//     const unsubscribe = onSnapshot(ref, (snapshot) => {
//         callback();
//     });
//     subscriptions.push(unsubscribe);
// }

export {
    login,
    schedule,
    unsubscribe
}