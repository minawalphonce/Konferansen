import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

async function collectPushNotificationTokens(topic: "1" | "2" | "3" | "4" | "5" | "6" | "all") {
    const fs = admin.firestore();
    if (topic === "all") {
        const tokens = await fs.collection("Tokens").select("ExpoToken").get();
        return tokens.docs.map(t => t.data().ExpoToken);
    }
    else {
        const phoneNumberRes = await fs.collection("Members").where("GroupId", "==", parseInt(topic)).select("Phone").get();
        const phones = phoneNumberRes.docs.map(i => i.data().Phone as string);
        if (phones.length <= 0) {
            return [];
        }
        const tokens = await fs.collection("Tokens").where("Phone", "in", phones).select("ExpoToken").get();
        return tokens.docs.map(t => t.data().ExpoToken);
    }
}

function createMessages(tokens: string[], title: string, body: string) {
    // Create the messages that you want to send to clients
    let messages: ExpoPushMessage[] = [];
    for (let pushToken of tokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
            logger.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
            to: pushToken,
            sound: 'default',
            title,
            body
        });
    }

    return messages;
}

async function sendMessages(expo: Expo, messages: ExpoPushMessage[]) {
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            logger.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
            logger.error(error);
        }
    }
}

export async function sendNotifications(topic: "1" | "2" | "3" | "4" | "5" | "6" | "all", title: string, body: string) {
    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    const tokens = await collectPushNotificationTokens(topic);
    if (tokens.length) {
        const messages = createMessages(tokens, title, body);
        await sendMessages(expo, messages);
    }
}