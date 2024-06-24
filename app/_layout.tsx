import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Index from "./index";
import Auth from "./(auth)/auth";
import TabLayout from "./(tabs)/_layout";
import ChatDetails from "./(chat)/(communicatie)/chatDetails";
import Notification from "./(profile)/(notification)";
import GraficWork from "./(free)/(work-grafic)/workGrafic";
import WorkMain from "./(free)/(work-grafic)/workMain";
import WorkDays from "./(free)/(work-grafic)/workDays";
import MyServices from "./(standart)/(services)/(myServices)/myServices";
import Expenses from "./(profile)/(Expenses)";
import ExpensesDetail from "./(profile)/(Expenses)/(component)/(detail)/expenseDetail";
import SessionHistory from "./(profile)/(sessionhistory)/sessionHistory";
import ServesGender from "./(standart)/(services)/(gender)/servesGender";
import Category from "./(standart)/(services)/(category)/category";
import Upcomingentries from "./(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries";
import PastEntries from "./(profile)/(sessionhistory)/components/Pastentries/Pastentries";
import Canceledentries from "./(profile)/(sessionhistory)/components/Canceledentries/Canceledentries";
import SettingsLocation from "./(settings)/(settings-location)/settings-locations";
import SettingsLocationMain from "./(settings)/(settings-location)/settings-locations-main";
import SettingsGallery from "./(settings)/(settings-gallery)/settings-gallery";
import Settings from "./(profile)/(settings)";
import { StompProvider } from "@/context/StompContext";
import Expertise from "./(standart)/(services)/(expertise)/expertise";
import ServiceStyle from "./(standart)/(services)/serviceStyle/serviceStyle";
import SettingsGalleryMain from "./(settings)/(settings-gallery)/settings-gallery-main";
import PhoneNumberInput from "./(auth)/number-create";
import MainClient from "@/app/(free)/(client)/main";
import OtpInput from "./(auth)/otp_input";
import CreatingClient from "./(free)/(client)/creating-client";
import MainClientList from "./(free)/(client)/client-list";
import AddressBook from "./(free)/(client)/address-book";
import Process from "./(standart)/(services)/(process)/process";
import AuthPage1 from "./(auth)/authPage1";
import AuthPage2 from "./(auth)/authPage2";
import AuthPage3 from "./(auth)/authPage3";
import MasterorClient from "./(auth)/masterORclient";
import TariffsPage from "./(profile)/(tariff)/tariff";
import Location from "./(location)/Location";
import LocationData from "./(location)/(location-data)/LocationData";
import Welcome from "./(welcome)/Welcome";
import ResponseLocation from "./(location)/(response-location)/ResponseLocation";

const Stack = createNativeStackNavigator();

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StompProvider>
        <MenuProvider>
          <Stack.Navigator initialRouteName="index">
            <Stack.Screen
              name="index"
              component={Index}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/number-create"
              component={PhoneNumberInput}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/otp_input"
              component={OtpInput}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/authPage1"
              component={AuthPage1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/authPage2"
              component={AuthPage2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/authPage3"
              component={AuthPage3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/masterORclient"
              component={MasterorClient}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(tabs)"
              component={TabLayout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(chat)/(communicatie)/chatDetails"
              component={ChatDetails}
              options={{ title: "Chat Detail", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(notification)/index"
              component={Notification}
              options={{ title: "Services", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic)/workGrafic"
              component={GraficWork}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic)/workMain"
              component={WorkMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(work-grafic)/workDays"
              component={WorkDays}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/(settings-location)/settings-locations-main"
              component={SettingsLocationMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/(settings-location)/settings-locations"
              component={SettingsLocation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/(settings-gallery)/settings-gallery-main"
              component={SettingsGalleryMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(settings)/(settings-gallery)/settings-gallery"
              component={SettingsGallery}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(Expenses)/index"
              component={Expenses}
              options={{ title: "Services", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(Expenses)/(component)/(detail)/expenseDetail"
              component={ExpensesDetail}
              options={{ title: "Services", headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(process)/process"
              component={Process}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(myServices)/myServices"
              component={MyServices}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(gender)/servesGender"
              component={ServesGender}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(category)/category"
              component={Category}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/(expertise)/expertise"
              component={Expertise}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(standart)/(services)/serviceStyle/serviceStyle"
              component={ServiceStyle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(sessionhistory)/sessionHistory"
              component={SessionHistory}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries"
              component={Upcomingentries}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(sessionhistory)/components/Pastentries/Pastentries"
              component={PastEntries}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(sessionhistory)/components/Canceledentries/Canceledentries"
              component={Canceledentries}
              options={{ title: "Отменённые записи", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/main"
              component={MainClient}
              options={{ title: "Client", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/address-book"
              component={AddressBook}
              options={{ title: "Client-book", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/client-list"
              component={MainClientList}
              options={{ title: "Client-list", headerShown: false }}
            />
            <Stack.Screen
              name="(free)/(client)/creating-client"
              component={CreatingClient}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(location)/Location"
              component={Location}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(location)/(location-data)/LocationData"
              component={LocationData}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/(tariff)/tariff"
              component={TariffsPage}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(welcome)/Welcome"
              component={Welcome}
              options={{ title: "CreatingClient", headerShown: false }}
            />
            <Stack.Screen
              name="(location)/(response-location)/ResponseLocation"
              component={ResponseLocation}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </MenuProvider>
      </StompProvider>
    </ThemeProvider>
  );
}
