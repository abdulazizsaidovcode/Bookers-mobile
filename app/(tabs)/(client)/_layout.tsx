// TabLayout.tsx
import React, { useCallback, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
  FontAwesome5
} from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";
import HomeScreen from "./main";
import ChatScreen from "./chat";
import { TabBarIcon } from "../../../components/navigation/TabBarIcon";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { StyleSheet, View } from "react-native";
import clientStore from "@/helpers/state_managment/client/clientStore";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import { handleRefresh } from "@/constants/refresh";
import Uslugi from "@/app/(client)/(uslugi)/uslugi";
// import ProfilePage from "@/app/(client)/(profile)/profile";
import ProfileScreen from "./profile";



const Tab = createBottomTabNavigator();

function ClientTabLayout() {
  const colorScheme = useColorScheme();
  const { getme, setGetMee } = graficWorkStore();
  const [tariff, setTariff] = useState(null);
  const [isCreate, setIsCreate] = useState<boolean | null | any>(false)
  const { refreshing, setRefreshing } = clientStore()
  const { number, setNumber } = numberSettingStore();
  const [hasAllNumbers, setHasAllNumbers] = useState<boolean>(false);





  useEffect(() => {
    if (number.length > 1) {
      const res = removeDuplicatesAndSort(number)
      const result = containsAllNumbers(res)
      setHasAllNumbers(result)
    }
  }, [number]);

  const onRefresh = useCallback(() => {
    handleRefresh(setRefreshing);
  }, [setRefreshing]);

  const removeDuplicatesAndSort = (array: number[]): number[] => {
    const seen = new Map<number, boolean>();
    const result: number[] = [];

    for (const value of array) {
      if (!seen.has(value)) {
        seen.set(value, true);
        result.push(value);
      }
    }

    result.sort((a, b) => a - b);
    return result;
  };

  const containsAllNumbers = (array: number[]): boolean => {
    const requiredNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    return requiredNumbers.every(num => array.includes(num));
  };

  useEffect(() => {
    if (getme) {
      setTariff(getme.tariff);
    }
  }, [getme]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#9C0A35",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#21212E",
          },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "main") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Schedule") {
              iconName = focused ? "calendar" : "calendar";
            } else if (route.name === "(location)/Location") {
              iconName = focused ? "map" : "map";
            } else if (route.name === "finance") {
              iconName = focused ? "finance" : "finance";
            } else if (route.name === "chat") {
              iconName = focused ? "chatbubble" : "chatbubble-outline";
            } else if (route.name === "profile") {
              iconName = focused ? "body" : "body-outline";
            }

            if (route.name === "finance") {
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            } else {
              return <FontAwesome name={iconName} size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen
          name="main"
          component={HomeScreen}
          options={{
            title: "Главная",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tab.Screen
          name="uslugi"
          component={Uslugi}
          options={{
            title: "Услуги",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="chat"
          component={ChatScreen}
          options={{
            title: "Чат",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            title: "Профиль",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
        
      </Tab.Navigator> 
      {/* {(!hasAllNumbers) &&
        <View style={styles.container}></View>
      } */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 49.5,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#21212e91',
  },
})

export default ClientTabLayout
