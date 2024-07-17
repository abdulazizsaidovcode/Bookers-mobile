import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { registerClient, registerMaster } from '@/helpers/api-function/register/registrFC';
import registerStory from '@/helpers/state_managment/auth/register';
import { useNavigation } from '@react-navigation/native';
import { authStorage } from "@/constants/storage";
import { useFocusEffect } from 'expo-router';
import { langstore } from '@/helpers/state_managment/lang/lang';
import { Alert } from "react-native";
import Toast from "react-native-simple-toast";
import * as SecureStore from 'expo-secure-store';
import { getConfig } from '@/app/(tabs)/(master)/main';

const CheckPin: React.FC = () => {
    const { firstName, lastName, nickname, phoneNumber } = registerStory()
    const { language } = langstore()
    const { role } = registerStory()

    const inputs = useRef<TextInput[]>([]);
    
    const { t } = useTranslation();
    const navigation = useNavigation<any>();

    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [storedOtp, setStoredOtp] = useState<any>(null);
    const [token, setToken] = useState<any | null>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [tokenData, setTokenData] = useState<string | null>('');
    const [isLogin, setIslogin] = useState<any>(false);


    const isButtonEnabled = otp.every((digit) => digit.length > 0);
    const enteredOtp = otp.join('');

    useFocusEffect(
        useCallback(() => {
            const getStoredOtp = async () => {
                try {
                    const otp = await AsyncStorage.getItem('otp');
                    const token = await getConfig()
                    console.log(token);

                    setToken(token)
                    setStoredOtp(otp);
                } catch (error) {
                    console.log('Failed to load OTP from storage', error);
                }
            };

            getStoredOtp();
        }, [])
    )

    useEffect(() => {
        if (tokenData) {
            authStorage(tokenData)
            handleContinue()
        }
    }, [tokenData]);

    useEffect(() => {
        if (enteredOtp === storedOtp) {
            setIsCorrect(true);
            if (isLogin) {
                if (role === 'ROLE_MASTER') {
                    navigation.navigate('(tabs)/(master)')
                } else if (role === 'ROLE_CLIENT') {
                    navigation.navigate('(tabs)/(client)')
                }
            }
        } else {
            setIsCorrect(false);
        }
    }, [isLogin])

    const handleChangeText = (text: string, index: number) => {
        if (/^\d*$/.test(text)) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            if (text && index < 3) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    // ----------- REGISTER ----------------- //
    const handleContinue = async () => {
        if (enteredOtp === storedOtp) {
            setIsCorrect(true);
            if (role === 'ROLE_MASTER') {
                navigation.navigate('(tabs)/(master)')
            } else if (role === 'ROLE_CLIENT') {
                navigation.navigate('(tabs)/(client)')
            }
        } else {
            setIsCorrect(false);
        }
    };

    // ----------- PIN install ----------------- //
    const installPinCode = () => {
        if (enteredOtp === storedOtp) {
            Toast.show("пин-код установлен", Toast.SHORT);
            SecureStore.setItemAsync('password', enteredOtp)
            setIslogin(true)
            console.log(role);

            if (role === 'ROLE_MASTER') {
                navigation.navigate('(tabs)/(master)')
            } else if (role === 'ROLE_CLIENT') {
                navigation.navigate('(tabs)/(client)')
            }
        } else {
            setIsCorrect(false);
            Toast.show("неверный пин-код", Toast.SHORT);
        }
    }

    // ----------- REGISTER ----------------- //
    const register = () => {
        if (role === 'ROLE_MASTER') {
            registerMaster({
                firstName: firstName,
                lastName: lastName,
                nickname: nickname,
                phoneNumber: phoneNumber,
                role: role,
                setData: setTokenData,
                password: enteredOtp,
                language: language,
            })
        } else {
            registerClient({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                setData: setTokenData,
                password: enteredOtp,
                language: language,
            })
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Text style={styles.label}>{t('Подтвердите ПИН код')}</Text>
                    <View style={styles.inputContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={[
                                    styles.input,
                                    isCorrect === false && styles.inputError,
                                    isCorrect === true && styles.inputSuccess,
                                ]}
                                value={digit}
                                onChangeText={(text) => handleChangeText(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                ref={(ref) => (inputs.current[index] = ref!)}
                                maxLength={1}
                                keyboardType="numeric"
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: isButtonEnabled ? '#9C0A35' : '#828282' },
                        ]}
                        onPress={() => {
                            if (!token) {
                                register()
                            } else {
                                installPinCode()
                            }
                        }}
                        disabled={!isButtonEnabled}
                    >
                        <Text style={[
                            styles.buttonText,
                            { color: isButtonEnabled ? '#FFF' : '#FFF' }
                        ]}>
                            {t("Continue")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#21212E',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 50,
    },
    topSection: {
        alignItems: 'center',
        marginTop: 50,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4B4B64',
        backgroundColor: '#4B4B64',
        borderRadius: 10,
        width: 50,
        height: 50,
        margin: 4,
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF',
    },
    inputError: {
        borderColor: 'red',
    },
    inputSuccess: {
        borderColor: 'green',
    },
    bottomSection: {
        padding: 20,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 100,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
    },
});

export default CheckPin;
