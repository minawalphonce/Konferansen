import { useEffect } from 'react';
import * as Sentry from 'sentry-expo';
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

Sentry.init({
  dsn: "https://202bfa3a60cbfce561cfe194b39cc876@o4505869794410496.ingest.sentry.io/4506047068700672",
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  enableTracing: true
});


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
      <Notifications />
    </AppStoreProvider>
  );
}

export default Sentry.Native.wrap(RootLayout);