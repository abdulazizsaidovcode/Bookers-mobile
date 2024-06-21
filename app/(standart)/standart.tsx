import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
; // Assuming Image is imported from '@/components/Themed'
import { SafeAreaView, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Standart = () => {
    return (
        <SafeAreaView>
            <ScrollView style={tw`p-3 w-full mt-4`}>
                <View style={tw`p-3`}>
                    <Text style={tw`text-center text-2xl mt-3 text-white`}>Добро пожаловать!</Text>
                    <View style={tw`items-center mt-3`}>
                        <Image
                            style={tw``}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Standart;
