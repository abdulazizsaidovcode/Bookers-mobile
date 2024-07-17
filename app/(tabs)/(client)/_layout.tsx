// TabLayout.tsx
import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {
    Ionicons,
    FontAwesome5
} from "@expo/vector-icons";
import HomeScreen from "./main";
import ChatScreen from "./chat";
import {TabBarIcon} from "../../../components/navigation/TabBarIcon";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import Uslugi from "@/app/(client)/(uslugi)/uslugi";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

function ClientTabLayout() {
    const {number, setNumber} = numberSettingStore();

    useEffect(() => {
        if (number.length > 1) {
            const res = removeDuplicatesAndSort(number)
            const result = containsAllNumbers(res)
        }
    }, [number]);

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

    return (
        <>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarActiveTintColor: "#9C0A35",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#21212E",
                        paddingBottom: 10,
                        paddingTop: 5,
                        height: 70
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen
                    name="main"
                    component={HomeScreen}
                    options={{
                        title: "Главная",
                        tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>,
                    }}
                />
                <Tab.Screen
                    name="uslugi"
                    component={Uslugi}
                    options={{
                        title: "Услуги",
                        tabBarIcon: ({color}) => (
                            <FontAwesome5 name="user" size={24} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="chat"
                    component={ChatScreen}
                    options={{
                        title: "Чат",
                        tabBarIcon: ({color}) => (
                            <Ionicons name="chatbubble-outline" size={24} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="profile"
                    component={ProfileScreen}
                    options={{
                        title: "Профиль",
                        tabBarIcon: ({color}) => (
                            <FontAwesome5 name="user" size={24} color={color}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
}

export default ClientTabLayout
