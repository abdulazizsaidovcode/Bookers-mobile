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
import Notification from './(profile)/(notification)';
import GraficWork from './(work-grafic)/workGrafic';
import WorkMain from './(work-grafic)/workMain';
import WorkDays from './(work-grafic)/workDays';
import MyServices from './(standart)/(services)/(myServices)/myServices';
import Expenses from './(profile)/(Expenses)';
import ExpensesDetail from './(profile)/(Expenses)/(component)/(detail)/expenseDetail';
import SessionHistory from './(profile)/(sessionhistory)/sessionHistory';
import ServesGender from './(standart)/(services)/(gender)/servesGender';

import Category from './(standart)/(services)/(category)/category';
import Upcomingentries from './(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries';
import PastEntries from './(profile)/(sessionhistory)/components/Pastentries/Pastentries';
import Canceledentries from './(profile)/(sessionhistory)/components/Canceledentries/Canceledentries';
import Settings from './(profile)/(settings)';
import { StompProvider, } from '@/context/StompContext';
import Expertise from './(standart)/(services)/(expertise)/expertise';
import ServiceStyle from './(standart)/(services)/serviceStyle/serviceStyle';
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
      <StompProvider>

        {/* <ChatProvider> */}
        <Stack.Navigator initialRouteName='index'>
          <Stack.Screen name="index" component={Index} options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/auth" component={Auth} options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} />
          <Stack.Screen name="(chat)/(communicatie)/chatDetails" component={ChatDetails} options={{ title: 'Chat Detail' }} />
          <Stack.Screen name="(profile)/(notification)/index" component={Notification} options={{ title: 'Services' }} />
          <Stack.Screen name="(work-grafic)/workGrafic" component={GraficWork} options={{ title: 'Services' }} />
          <Stack.Screen name="(work-grafic)/workMain" component={WorkMain} options={{ headerShown: false }} />
          <Stack.Screen name="(work-grafic)/workDays" component={WorkDays} options={{ headerShown: false }} />

          {/* expenses  rasxod */}
          <Stack.Screen name="(profile)/(Expenses)/index" component={Expenses} options={{ title: 'Services' }} />
          <Stack.Screen name="(profile)/(Expenses)/(component)/(detail)/expenseDetail" component={ExpensesDetail} options={{ title: 'Services' }} />
          <Stack.Screen name="(standart)/(services)/(myServices)/myServices" component={MyServices} options={{ headerShown: false }} />
          <Stack.Screen name="(standart)/(services)/(gender)/servesGender" component={ServesGender} options={{ headerShown: false }} />
          <Stack.Screen name="(standart)/(services)/(category)/category" component={Category} options={{ headerShown: false }} />
          <Stack.Screen name="(standart)/(services)/(expertise)/expertise" component={Expertise} options={{ headerShown: false }} />
          <Stack.Screen name="(standart)/(services)/serviceStyle/serviceStyle" component={ServiceStyle} options={{ headerShown: false }} />

          {/*  */}
          <Stack.Screen name="(profile)/(sessionhistory)/sessionHistory" component={SessionHistory} options={{ title: 'Отменённые записи' }} />
          <Stack.Screen name="(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries" component={Upcomingentries} options={{ title: 'Отменённые записи' }} />
          <Stack.Screen name="(profile)/(sessionhistory)/components/Pastentries/Pastentries" component={PastEntries} options={{ title: 'Отменённые записи' }} />
          <Stack.Screen name="(profile)/(sessionhistory)/components/Canceledentries/Canceledentries" component={Canceledentries} options={{ title: 'Отменённые записи' }} />
          {/* settings update */}
          <Stack.Screen name="(settings)/settings" component={Settings} options={{ headerShown: false }} />
        </Stack.Navigator>
      </StompProvider>
    </ThemeProvider >
  );
}