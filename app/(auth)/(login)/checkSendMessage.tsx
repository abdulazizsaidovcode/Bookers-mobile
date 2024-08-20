import { authLogin, checkCode } from '@/helpers/api-function/register/registrFC';
import registerStory from '@/helpers/state_managment/auth/register';
import isRegister from '@/helpers/state_managment/isRegister/isRegister';
import { RootStackParamList } from '@/type/root';
import { NavigationProp } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-simple-toast';

import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    TextInputKeyPressEventData,
    NativeSyntheticEvent,
    Text,
    TouchableOpacity,
} from 'react-native';
import { langstore } from '@/helpers/state_managment/lang/lang';
import LoadingButtons from '@/components/(buttons)/loadingButton';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(auth)/checkSendMessage'>;


const OtpInputExample: React.FC = () => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const inputs = useRef<TextInput[]>([]);
    const { code, phoneNumber, otpValue, setOtpValue } = registerStory()
    const [response, setRespone] = useState<null | boolean>(null);
    const [pending, setPending] = useState(false);
    const { isRegtered } = isRegister()
    const navigation = useNavigation<any>();
    const [roles, setRoles] = useState<string | null>(null);
    const [number, setNumber] = useState('');
    const [isCheck, setischeck] = useState(false)
    const { setRole } = registerStory()

    const { t } = useTranslation();

    useEffect(() => {
        setIsDisabled(otpValue.some(digit => digit === ''));
    }, [otpValue]);

    const handlePaste = (event: any) => {
        if (response == false || response == null) {
            setischeck(true)
        }
        const text = event.nativeEvent.text;
        if (text.length === 4 && /^\d{4}$/.test(text)) {
            const otpArray = text.split('');
            setOtpValue(otpArray);
            inputs.current[3].focus();
        } else {
            Alert.alert('Noto\'g\'ri OTP', 'Iltimos, to\'g\'ri 4-raqamli OTP kiriting.');
        }
    };

    const handleChangeText = (text: string, index: number) => {
        setischeck(false)
        if (/^\d*$/.test(text)) {
            const newOtp = [...otpValue];
            newOtp[index] = text;
            setOtpValue(newOtp);
            if (text && index < 3) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otpValue[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        console.log('a');
        let a = otpValue.filter((item) => item !== '')
        
        const handlePress = async () => {
            setPending(true)
            if (a.length == 4) {
                if (isRegtered) {
                    await checkCode(phoneNumber, otpValue.map((value) => value).join(''), setRespone, isRegtered, setischeck);
                    setTimeout(() => {
                        setPending(false)
                    }, 700)
                } else {
                    await authLogin(number ? number : phoneNumber, otpValue.map((value) => value).join(''), setRespone, setRoles, setischeck)
                    setTimeout(() => {
                        setPending(false)
                    }, 700)
                }
            }

        }
        handlePress()
    }, [otpValue])




    useEffect(() => {
        setNumber(number)
    }, [phoneNumber])

    useEffect(() => {

        console.log(isCheck);
        console.log('asdf');

        async function finishwork() {
            if (roles) setRole(roles)
            setPending(false)

            if (response) {
                let parol = await SecureStore.getItemAsync('password')

                if (isRegtered) {
                    navigation.navigate("(auth)/(register)/(greetings)/greetingFirst");
                    setRespone(null);
                    setPending(false)
                    setischeck(false)
                    setOtpValue(['', '', '', ''])
                } else {
                    if (parol !== null) {
                        if (roles == 'ROLE_MASTER') {
                            navigation.navigate('(tabs)/(master)');
                            setRespone(null);
                            setPending(false)
                            setischeck(false)
                            setOtpValue(['', '', '', ''])
                        } else if (roles == 'ROLE_CLIENT') {
                            navigation.navigate('(tabs)/(client)');
                            setRespone(null);
                            setPending(false)
                            setischeck(false)
                            setOtpValue(['', '', '', ''])
                        }
                    } else {
                        navigation.navigate("(auth)/(setPinCode)/installPin");
                        setRespone(null);
                        setPending(false)
                        setischeck(false)
                        setOtpValue(['', '', '', ''])
                    }
                }
                // setRespone(null);
            }
        }

        finishwork()
    }, [response])

    useFocusEffect(useCallback(() => {
        if (code) {
            Toast.show(`${code}`, Toast.LONG)
        }
    }, [code]))


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{t("Confirmation_Number")}</Text>
                    <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                    <Text style={styles.instruction}>{t("we_sent_you_sms_with_code")}</Text>
                </View>
                <View style={styles.otpContainer}>
                    {otpValue.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={isCheck ? styles.inputFocused : styles.input}
                            value={digit}
                            onChangeText={(text) => handleChangeText(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            ref={(ref) => (inputs.current[index] = ref!)}
                            maxLength={1}
                            keyboardType="numeric"
                            onPaste={handlePaste}
                        />
                    ))}
                </View>
                {isCheck && <Text style={{ color: '#FB0A0A', marginTop: 20 }}>Неверный код подтверждения</Text>}
                <View style={styles.buttonContainer}>
                    {/* {!pending ?
                    <TouchableOpacity
                        style={[styles.button, isDisabled && styles.disabledButton]}
                        disabled={isDisabled}
                        // onPress={handlePress}
                    >
                        <Text style={styles.buttonText}>{t("Confirm")}</Text>
                    </TouchableOpacity>
                    :
                    <LoadingButtons
                        title={t("Confirm")}
                        backgroundColor={'#9C0A35'}
                    />
                } */}

                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        alignItems: 'center',
        padding: 20,
    },
    textContainer: {
        marginTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    phoneNumber: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 15,
        marginTop: 50,
    },
    instruction: {
        fontSize: 16,
        color: '#828282',
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    otpContainer: {
        flexDirection: 'row',
        marginTop: 70

    },
    input: {
        borderWidth: 1,
        borderColor: '#4B4B64',
        backgroundColor: '#2e2e3a',
        borderRadius: 8,
        width: 62,
        height: 62,
        margin: 10,
        textAlign: 'center',
        fontSize: 24,
        color: '#fff',
    },  
    inputFocused: {
        borderWidth: 1,
        borderColor: '#FB0A0A',
        backgroundColor: '#2e2e3a',
        borderRadius: 8,
        width: 62,
        height: 62,
        margin: 10,
        textAlign: 'center',
        fontSize: 24,
        color: '#fff',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#9C0A35',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#a1a1a1',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    code: {
        color: '#fff',
        fontSize: 24,
    }
});

export default OtpInputExample;