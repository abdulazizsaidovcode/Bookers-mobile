import React, {useEffect, useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {
    Ionicons,
    FontAwesome6,
    FontAwesome5, MaterialCommunityIcons, Feather, MaterialIcons
} from "@expo/vector-icons";
import TabOneScreen from "./main";
import Finance from "./finance";
import ScheduleScreen from "./schedule";
import {StyleSheet, View} from "react-native";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import StandardMain from "@/app/(standart)/client/standard-main";

const Tab = createBottomTabNavigator();

function MasterTabLayout() {
    const {number} = numberSettingStore();
    const [hasAllNumbers, setHasAllNumbers] = useState<boolean>(false);

    useEffect(() => {
        if (number && number.length > 1) {
            const res = removeDuplicatesAndSort(number)
            const result = containsAllNumbers(res)
            setHasAllNumbers(result)
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
                    tabBarInactiveTintColor: "#828282",
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
                    component={TabOneScreen}
                    options={{
                        title: "Главная",
                        tabBarIcon: ({color, focused}) => (focused
                                ? <MaterialIcons name="home" size={34} color={color} />
                                : <MaterialCommunityIcons name="home-outline" size={34} color={color}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="schedule"
                    component={ScheduleScreen}
                    options={{
                        title: "Расписание",
                        tabBarIcon: ({color, focused, size}) => focused
                            ? <Ionicons name="calendar-clear" size={size} color={color}/>
                            : <FontAwesome6 name="calendar" size={size} color={color}/>
                    }}
                />
                <Tab.Screen
                    name="finance"
                    component={Finance}
                    options={{
                        title: "Финансы",
                        tabBarIcon: ({color, focused, size}) => (
                            <Ionicons name={focused ? 'pie-chart' : `pie-chart-outline`} size={size} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="client"
                    component={StandardMain}
                    options={{
                        title: "Клиенты",
                        tabBarIcon: ({color, focused, size}) => (focused
                                ? <FontAwesome5 name="users" size={size} color={color}/>
                                : <Feather name="users" size={size} color={color}/>
                        ),
                    }}
                />
            </Tab.Navigator>
            {(!hasAllNumbers) &&
                <View style={styles.container}></View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#21212e91',
    },
})

export default MasterTabLayout
