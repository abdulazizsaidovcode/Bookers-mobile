import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { TabBarIcon } from '../../components/navigation/TabBarIcon';
import TabOneScreen from '.';
import TabTwoScreen from './two';
import ChatScreen from './chat';
import Finance from './finance';
import tw from 'tailwind-react-native-classnames';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tab.Screen
        name="index"
        component={TabOneScreen}
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tab.Screen
        name="two"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tab.Screen
        name="finance"
        component={Finance}
        options={{
          title: 'Finance',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="finance" size={24} color={color} />,
        }}
      />
        <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              style={tw`mb-3`}
              name={focused ? 'chatbubble' : 'chatbubble-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
