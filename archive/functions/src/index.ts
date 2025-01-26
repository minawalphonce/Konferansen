import { onCall } from "firebase-functions/v2/https";
import { sendNotifications as handler } from "./send-notifications";

export const sendNotifications = onCall({ cors: true }, async (request) => {
    const { topic, title, body } = request.data;
    await handler(topic, title, body);
});
