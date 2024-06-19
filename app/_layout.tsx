import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';
import Auth from './(auth)/auth';
import TabLayout from './(tabs)/_layout';
import ChatDetails from './(chat)/(communicatie)/chatDetails';
import MyServices from './(standart)/services/myServices/myServices';
import Notification from './(profile)/(notification)';
import Expenses from './(profile)/(Expenses)';
import ExpensesDetail from './(profile)/(Expenses)/(component)/(detail)/expenseDetail';
import SessionDetail from './(profile)/(sessionhistory)/components/SessionDetail/SessionDetail';
import SessionHistory from './(profile)/(sessionhistory)/sessionHistory';
const Stack = createNativeStackNavigator();

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName='Index'>
        <Stack.Screen name="index" component={Index} options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} />
        <Stack.Screen name="(chat)/(communicatie)/chatDetails" component={ChatDetails} options={{ title: 'Chat Detail' }} />
        <Stack.Screen name="(standart)/(services)/MyServices" component={MyServices} options={{ title: 'Services' }} />
        <Stack.Screen name="(profile)/(notification)/index" component={Notification} options={{ title: 'Services' }} />

          {/* expenses  rasxod */}
        <Stack.Screen name="(profile)/(Expenses)/index" component={Expenses} options={{ title: 'Services' }} />
        <Stack.Screen name="(profile)/(Expenses)/(component)/(detail)/expenseDetail" component={ExpensesDetail} options={{ title: 'Services' }} />

        {/*  */}
        <Stack.Screen name="(profile)/(sessionhistory)/sessionHistory" component={SessionHistory} options={{ title: 'Отменённые записи' }} />

      </Stack.Navigator>
    </ThemeProvider>
  );
}