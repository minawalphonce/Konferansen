import { useEffect } from 'react';
import { Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useStoreRehydrated } from 'easy-peasy';

import { TranslationProvider } from "../translations";
import { AppThemeProvider } from '../theme';
import { AppStoreProvider } from '../store';
import { Firebase, Notifications } from '../components';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {

  //#region [ load dependencies ]

  const [fontsloaded, error] = useFonts({
    SourceSansPro: require('../assets/fonts/source-sans-pro.ttf'),
    ...FontAwesome.font,
  });

  const storeRehydrated = useStoreRehydrated();

  //#endregion

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsloaded && storeRehydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsloaded, storeRehydrated]);

  if (!fontsloaded || !storeRehydrated) {
    return null;
  }
  return <Slot />
}

function RootLayout() {
  //reset the state for dev
  //storage.clearAllData().then(storage.getAll);
  return (
    <AppStoreProvider>
      <TranslationProvider>
        <AppThemeProvider>
          <RootLayoutNav />
        </AppThemeProvider>
      </TranslationProvider>
      <Firebase />
      <Notifications />
    </AppStoreProvider>
  );
}

export default RootLayout;