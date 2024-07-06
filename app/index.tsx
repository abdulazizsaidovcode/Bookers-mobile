import React from 'react';
import Buttons from "@/components/(buttons)/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { router } from 'expo-router';
import RemindAboutAppointment from './(notifications)/(pages)/remind-about-appointment';
import TabLayout from './(tabs)/_layout';




type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'index'>;

const Index: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    return (
       <TabLayout/>
    )
}
export default Index;