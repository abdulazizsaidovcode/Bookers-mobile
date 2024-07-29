import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { registerClient, registerMaster } from '@/helpers/api-function/register/registrFC';
import registerStory from '@/helpers/state_managment/auth/register';
import { useNavigation } from '@react-navigation/native';
import { authStorage, getClientOrMaster } from "@/constants/storage";
import { useFocusEffect } from 'expo-router';
import { langstore } from '@/helpers/state_managment/lang/lang';
import Toast from "react-native-simple-toast";
import * as SecureStore from 'expo-secure-store';
import { getConfig } from '@/app/(tabs)/(master)/main';
import LoadingButtons from '@/components/(buttons)/loadingButton';

const CheckPin: React.FC = () => {
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        nickname,
        setNickname,
        phoneNumber,
        setPhoneNumber,
        role,
        setRole,
        img,
        setImg
    } = registerStory()
    const { language } = langstore()

    const inputs = useRef<TextInput[]>([]);

    const { t } = useTranslation();
    const navigation = useNavigation<any>();

    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [storedOtp, setStoredOtp] = useState<any>(null);
    const [token, setToken] = useState<any | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(true);
    const [tokenData, setTokenData] = useState<string | null>('');
    const [isLogin, setIslogin] = useState<any>(false);
    const [pending, setPending] = useState(false);
    const [numbers, setNumbers] = useState<any | null>(null);

    const isButtonEnabled = otp.every((digit) => digit.length > 0);
    let enteredOtp = otp.join('');

    useFocusEffect(
        useCallback(() => {
            const getStoredOtp = async () => {
                try {
                    const otp = await AsyncStorage.getItem('otp');
                    const number = await SecureStore.deleteItemAsync("number");
                    const token = await getConfig()
                    console.log(number, 'er');

                    setNumbers(number)
                    setToken(token)
                    
                    setStoredOtp(otp);
                } catch (error) {
                    console.log('Failed to load OTP from storage', error);
                }
            };

            getStoredOtp();
            getClientOrMaster(setRole)
        }, [])
    )

    useEffect(() => {
        if (tokenData) {
            authStorage(tokenData)
            handleContinue()

            // input values tozalash uchun
            setImg(null)
            setLastName('')
            setFirstName('')
            setPhoneNumber('')
            setNickname('')
        }
    }, [tokenData]);

    useEffect(() => {
        if (enteredOtp === storedOtp) {
            setIsCorrect(true);
            if (isLogin) {
                if (role === 'ROLE_MASTER') {
                    navigation.navigate('(tabs)/(master)')
                    enteredOtp = ''
                }
                else if (role === 'ROLE_CLIENT') {
                    navigation.navigate('(tabs)/(client)')
                    enteredOtp = ''
                }
            }
        } else setIsCorrect(false)
    }, [isLogin])

    const handleChangeText = (text: string, index: number) => {
        if (/^\d*$/.test(text)) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            if (text && index < 3) inputs.current[index + 1].focus()
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) inputs.current[index - 1].focus()
    };

    // ----------- REGISTER ----------------- //
    const handleContinue = async () => {
        if (enteredOtp === storedOtp) {
            setIsCorrect(true);

            if (role === 'ROLE_MASTER') {
                navigation.navigate('(tabs)/(master)')
                setPending(false)
                enteredOtp = ''
            }
            else if (role === 'ROLE_CLIENT') {
                navigation.navigate('(tabs)/(client)')
                setPending(false)
                enteredOtp = ''
            }
        } else setIsCorrect(false)
    };

    // ----------- PIN install ----------------- //
    const installPinCode = () => {
        if (enteredOtp === storedOtp) {
            Toast.show("пин-код установлен", Toast.SHORT);
            SecureStore.setItemAsync('password', enteredOtp)
            if (phoneNumber) {
                SecureStore.setItemAsync('number', phoneNumber)
            } else {
                Toast.show("телефон не найден", Toast.SHORT);
            }

            if (role === 'ROLE_MASTER') {
                navigation.navigate('(tabs)/(master)')
                setPending(false)
            }
            else if (role === 'ROLE_CLIENT') {
                navigation.navigate('(tabs)/(client)')
                setPending(false)
            } else {
                Toast.show("karioche role yuq", Toast.SHORT);
            }
        } else {
            setIsCorrect(false);
            Toast.show("неверный пин-код", Toast.SHORT);
            setPending(false)
        }
    }

    // ----------- REGISTER ----------------- //
    const register = () => {
        if (enteredOtp === storedOtp) {
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
                    img
                })
            } else {
                registerClient({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    setData: setTokenData,
                    password: enteredOtp,
                    language: language,
                    img
                })
            }
        } else {
            setIsCorrect(false);
            setPending(false)
            Toast.show("неверный пин-код", Toast.SHORT);
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
                                    isCorrect == true ? styles.inputSuccess : styles.inputError,
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
                    {!pending ?
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: isButtonEnabled ? '#9C0A35' : '#828282' },
                            ]}
                            onPress={() => {
                                setPending(true)
                                if (!token) register()
                                else installPinCode()
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
                        :
                        <LoadingButtons
                            title={t("Continue")}
                        />
                    }

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