import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import FlashMessage, { showMessage } from "react-native-flash-message";
import * as Device from 'expo-device';
import * as ExpoNotifications from 'expo-notifications';
import Constants from 'expo-constants';
import { publishNotificationToken } from '../services';
import { useAppStoreState } from '../store';
import * as Sentry from 'sentry-expo';

ExpoNotifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        ExpoNotifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: ExpoNotifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await ExpoNotifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await ExpoNotifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Sentry.Native.captureMessage('Failed to get push token for push notification!');
            return;
        }
        token = await ExpoNotifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig!.extra!.eas.projectId,
        });
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export const Notifications = () => {
    const me = useAppStoreState(state => state.me);
    const notificationListener = useRef<ExpoNotifications.Subscription>();
    useEffect(() => {
        try {
            if (me) {
                registerForPushNotificationsAsync().then(async token => {
                    if (token)
                        await publishNotificationToken(me.phone, token.data);
                });

                notificationListener.current = ExpoNotifications.addNotificationReceivedListener(notification => {
                    showMessage({
                        "message": String(notification.request.content.title),
                        "description": String(notification.request.content.body),
                        type: "info",
                    });
                });
                return () => {
                    if (notificationListener.current)
                        ExpoNotifications.removeNotificationSubscription(notificationListener.current);
                };
            }
        } catch (ex) {
            Sentry.Native.captureException(ex);
        }
    }, [me]);

    return <FlashMessage position="top" />
}
