import React from 'react';
import Buttons from "@/components/(buttons)/button";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import GalleryDetails from './(settings)/(settings-gallery)/gallery-details';
import SettingsGalleryMain from './(settings)/(settings-gallery)/settings-gallery-main';


type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-locations-main'>;

const Index: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    return <SettingsGalleryMain/>
}
export default Index;