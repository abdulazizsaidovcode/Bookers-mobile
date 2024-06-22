// TabLayout.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from "@/components/useColorScheme";
import TabOneScreen from "./main";
import TabTwoScreen from "./two";
import ChatScreen from "./chat";
import Finance from "./finance";
import ProfileScreen from "./profile";
import ScheduleScreen from "./schedule";
import Colors from "@/constants/Colors";
import { TabBarIcon } from "../../components/navigation/TabBarIcon";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#9c0935',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#2b2b2b',
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'main') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'calendar' : 'calendar';
          } else if (route.name === 'finance') {
            iconName = focused ? 'finance' : 'finance';
          } else if (route.name === 'chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'body' : 'body-outline';
          }

          if (route.name === 'finance') {
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
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
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: "Расписание",
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tab.Screen
        name="finance"
        component={Finance}
        options={{
          title: "Финансы",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="finance" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          title: "Чат",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => <Ionicons name="body-outline" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
