import { initializeApp } from "firebase/app";
import { getFirestore, query, where, collection, onSnapshot, getDocs, doc, getDoc, QuerySnapshot, DocumentSnapshot, setDoc } from "firebase/firestore";

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

const login = async (phoneNumber: string, pin: number) => {
    const collectionRef = collection(firestore, "Members");
    const queryRef = query(collectionRef, where("Phone", "==", phoneNumber), where("Pin", "==", pin));
    const docsSnap = await getDocs(queryRef);
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

const schedule = (callback: (data: QuerySnapshot) => void) => {
    const ref = collection(firestore, "Schedule");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
        callback(snapshot);
    });
    return unsubscribe;
};

const profile = (id: string, callback: (data: DocumentSnapshot) => void) => {
    const ref = doc(firestore, "Members", id)
    const unsubscribe = onSnapshot(ref, (snapshot) => {
        callback(snapshot);
    });
    return unsubscribe;
}

const group = (groupId: number, callback: (data: QuerySnapshot) => void) => {
    const collectionRef = collection(firestore, "Members");
    const queryRef = query(collectionRef, where("GroupId", "==", groupId));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        callback(snapshot);
    });
    return unsubscribe;
}

const myMemory = (
    phone: string,
    callback: (items: { memoryId: string }[]) => void
) => {
    const collRef = collection(firestore, "MemoryLog");
    const queryRef = query(collRef, where("phone", "==", phone));
    const unsb = onSnapshot(queryRef, (snapshot) => {
        callback(snapshot.docs.map(item => item.data() as { memoryId: string }));
    });
    return unsb;
}

const memberScoreCalculator = (phone: string, callback: (amount: number) => void) => {
    const collRef = collection(firestore, "MembersScoreLog");
    const queryRef = query(collRef, where("phone", "==", phone));
    const unsb = onSnapshot(queryRef, (snapshot) => {
        callback(snapshot.docs.reduce((total, doc) => total + doc.data().value, 0));
    });
    return unsb;
}

const groupsScoreCalculator = (callback: (values: Record<string, number>) => void) => {
    const collRef = collection(firestore, "GroupsScoreLog");
    const unsb = onSnapshot(collRef, (snapshot) => {
        callback(snapshot.docs.reduce((totals, doc) => {
            const { groupId, value } = doc.data();
            totals[groupId] = (totals[groupId] || 0) + value;
            return totals;
        }, {} as Record<string, number>));
    });
    return unsb;
}

const publishNotificationToken = async (phoneNumber: string, token: string) => {
    const docRef = doc(firestore, "Tokens", phoneNumber);
    await setDoc(docRef, {
        Phone: phoneNumber,
        ExpoToken: token
    });
}

const downloadTaraneem = async () => {
    const collRef = collection(firestore, "Taraneem");
    const docs = await getDocs(collRef);
    return docs.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            image: data.image,
            name: data.name,
            downloadLink: data.downloadLink,
            formatedText: Object.entries(data.formatedText).reduce((obj, [lang, arr]) => {
                obj[lang] = JSON.parse(arr as any);
                return obj;
            }, {} as any)
        }
    })
}

export {
    login,
    schedule,
    profile,
    group,
    myMemory,
    memberScoreCalculator,
    groupsScoreCalculator,
    downloadTaraneem,
    publishNotificationToken,
}