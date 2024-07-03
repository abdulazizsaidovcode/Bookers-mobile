import React from 'react';
import Buttons from "@/components/(buttons)/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import tw from "tailwind-react-native-classnames";



type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'index'>;

const Index: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    return (
    
        <SafeAreaView style={[tw`flex-1 items-center justify-center px-5`, { backgroundColor: '#21212E' }]}>
            <StatusBar barStyle="light-content" backgroundColor={`#21212E`} />
            <Buttons title={`Go page`} onPress={() => navigation.navigate('(tabs)')} />
            <View style={tw`mb-5`}></View>
            <Buttons title={`Go Login page`} onPress={() => navigation.navigate('(auth)/auth')} />
            <View style={tw`mb-5`}></View>
            <Buttons title={`Go Welcome page`} onPress={() => navigation.navigate('(welcome)/Welcome')} />
        </SafeAreaView>
    )
}
export default Index;