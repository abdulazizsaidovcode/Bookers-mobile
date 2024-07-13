import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import TabLayout from './(tabs)/_layout';
import MyServices from './(standart)/(services)/(myServices)/myServices';
import * as SecureStore from 'expo-secure-store';
import Auth from './(auth)/auth';
import CheckPinOnCome from './(checkPassword)/checkPassword';

const Index: React.FC = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const value = await SecureStore.getItemAsync('number');
                
                if (value === null) {
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkFirstLaunch();
    }, []);

    if (isFirstLaunch === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={"#9C0A35"} />
            </View>
        );
    }

    return isFirstLaunch ? <Auth /> : <CheckPinOnCome />;
};

export default Index;