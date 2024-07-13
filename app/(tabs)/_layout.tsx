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
import TabOneScreen from "./main";
import ChatScreen from "./chat";
import Finance from "./finance";
import ProfileScreen from "./profile";
import ScheduleScreen from "./schedule";
import { TabBarIcon } from "../../components/navigation/TabBarIcon";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { getMee } from "@/helpers/token";
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "expo-router";


const Tab = createBottomTabNavigator();

function TabLayout() {
  const colorScheme = useColorScheme();
  const { getme, setGetMee } = graficWorkStore();
  const [tariff, setTariff] = useState(null);
  const [isCreate, setIsCreate] = useState<boolean | null | any>(false)


  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const value = await SecureStore.getItemAsync('isCreate');
          setIsCreate(value);

          // Assuming getMee function returns data to setGetMeeData
          const meeData = await getMee(setGetMee); // Adjust according to your getMee function
          setGetMee(meeData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [isCreate])
  );

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
          component={TabOneScreen}
          options={{
            title: "Главная",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tab.Screen
          name="schedule"
          component={ScheduleScreen}
          options={{
            title: "Расписание",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="calendar" size={24} color={color} />
            ),
          }}
        />
        {tariff === "standard" && (
          <Tab.Screen
            name="finance"
            component={Finance}
            options={{
              title: "Финансы",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="finance" size={24} color={color} />
              ),
            }}
          />
        )}
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
      {(isCreate === 'false') &&
        <View style={styles.container}></View>
      }
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

export default TabLayout
