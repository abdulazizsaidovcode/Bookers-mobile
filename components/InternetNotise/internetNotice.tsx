import { Dimensions, Image, StyleSheet, View, Animated, Text } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Buttons from '../(buttons)/button';
import Toast from 'react-native-simple-toast'
import * as Updates from 'expo-updates';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const InternetNotice = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected)
        });

        return () => unsubscribe();
    }, [])

    useEffect(() => {
        if (!isConnected) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isConnected]);

    const handleRetry = async () => {
        NetInfo.fetch().then(async state => {
            setIsConnected(state.isConnected);
            if (state.isConnected) {
                try {
                    await Updates.reloadAsync();
                } catch (e) {
                    console.error(e);
                }
            } else  alert('Пожалуйста, проверьте свой Интернет',   )
        });
    };

    return (
        <Animated.View style={[styles.offlineContainer, { transform: [{ translateY: slideAnim }] }]}>
            <Image style={{ width: 200, height: 200, borderRadius: 50 }} source={require('../../assets/images/dinosaur.jpg')} />
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Произошла ошибка при подключении к Интеру.</Text>
            <View style={{ marginTop: 20, paddingHorizontal: 10, width: '100%' }}>
                <Buttons onPress={handleRetry} backgroundColor='white' textColor='#9C0A35' title='Повторить попытку' />
            </View>
        </Animated.View>
    );
};

export default InternetNotice;

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#9C0A35',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight,
        zIndex: 1,
    },
});
