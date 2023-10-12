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

const login = async (phoneNumber: string, code: string) => {
    const docRef = doc(firestore, "Members", code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data() as any;
        if (data.Phone === phoneNumber) {
            return {
                success: true,
                data
            }
        }
        else {
            return {
                "success": false,
                "message": "invalid_phone"
            }
        }
    }
    else {
        return {
            "success": false,
            "message": "invalid_code"
        }
    }
    // const membersCol = collection(firestore, "Members");
    // const q = query(membersCol,
    //     where("Phone", "==", phoneNumber),
    // )
    // const docs = await getDocs(q);
    // if (docs.size > 0) {

    // }
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