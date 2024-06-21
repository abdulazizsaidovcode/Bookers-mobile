import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { TabBarIcon } from "../../components/navigation/TabBarIcon";
import TabOneScreen from "./main";
import TabTwoScreen from "./two";
import ChatScreen from "./chat";
import Finance from "./finance";
import tw from "tailwind-react-native-classnames";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: useClientOnlyValue(false, true),
			}}
		>
			<Tab.Screen
				name="main"
				component={TabOneScreen}
				options={{
					title: "Главная",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerRight: () => (
						<View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
							<Ionicons name="notifications" size={24} color="white" style={{ marginRight: 16 }} />
							<Ionicons name="share-social-outline" size={24} color="white" style={{ marginRight: 16 }}  />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="two"
				component={TabTwoScreen}
				options={{
					title: "Tab Two",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
			<Tab.Screen
				name="finance"
				component={Finance}
				options={{
					title: "Finance",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="finance" size={24} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="chat"
				component={ChatScreen}
				options={{
					title: "Chat",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							style={tw`mb-3`}
							name={focused ? "chatbubble" : "chatbubble-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="profile"
				component={ProfileScreen}
				options={{
					title: "profile",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							style={tw`mb-3`}
							name={focused ? "chatbubble" : "chatbubble-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
