import { Redirect, Stack } from 'expo-router';
import { useAppStoreState } from '../../store';

export default function AppLayout() {
    const isAuthenticated = useAppStoreState(state => state.me !== null);

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!isAuthenticated) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/slider" />;
    }

    // This layout can be deferred because it's not the root layout.
    return <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
}