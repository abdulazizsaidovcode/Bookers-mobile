import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { FontAwesome5 } from '@expo/vector-icons';
import Buttons from '@/components/(buttons)/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { register_page } from '@/helpers/api';

const PhoneNumberInput: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);
    const phoneInput = useRef<PhoneInput>(null);


    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
        setIsValid(phoneInput.current?.isValidNumber(text) ?? false);
    };
    const { t } = useTranslation();


    // API 
    const registerFunction = () => {
        const sentData = {
            phoneNumber: phoneNumber
        }
        localStorage.setItem('phone', phoneNumber)
        axios.post(`${register_page}sendCode?purpose=true`, sentData)
            .then(res => {
                console.log(res.data); // Javobni konsolga chiqarish
                Alert.alert("Response", res.data.body);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: 16 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#21212E" />
                <NavigationMenu name="" deleteIcon={false} key={1} />
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{t("phone_number")}</Text>
                    <Text style={styles.subTitle}>{t("sms_code")}</Text>
                </View>
                <StatusBar barStyle="dark-content" />
                <View style={styles.phoneNumber}>
                    <View style={styles.phoneInputWrapper}>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode="UZ"
                            layout="first"
                            onChangeFormattedText={handlePhoneNumberChange}
                            placeholder={t("phone_number_label")}
                            containerStyle={styles.phoneInputContainer}
                            textContainerStyle={styles.phoneInputTextContainer}
                            textInputStyle={styles.phoneInputText}
                            codeTextStyle={styles.phoneInputCodeText}
                            flagButtonStyle={styles.flagButton}
                            textInputProps={{
                                placeholderTextColor: '#FFFFFF'
                            }}
                            withDarkTheme
                            autoFocus
                        />
                    </View>
                    {!isValid && (
                        <Text style={styles.errorText}>{t("invalid_phone_number")}</Text>
                    )}
                </View>
                <View style={{ marginVertical: 20, width: '100%' }}>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={() => console.log('Login with Google')}>
                        <Image source={require('../../assets/images/auth/google.png')} />
                        <Text style={styles.socialButtonText}>{t('login_google')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={() => console.log('Login with Facebook')}>
                        <Image source={require('../../assets/images/auth/facebook.png')} />
                        <Text style={styles.socialButtonText}>{t("login_facebook")}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ marginVertical: 20 }}>
                <Buttons
                    title={t("login")}
                    onPress={() => {
                        router.push('(auth)/otp_input')
                        registerFunction()
                    }}
                    backgroundColor={'#9C0A35'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
        paddingTop: 0,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 1,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        color: '#828282',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 18,
    },
    phoneNumber: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        // borderColor: '#9C0A35',
        borderWidth: 1,
        // borderRadius: 10,
        backgroundColor: '#4B4B64',
    },
    phoneInputContainer: {
        width: '100%',
        height: 60,
        borderRadius: 20,
    },
    phoneInputTextContainer: {
        backgroundColor: '#4B4B64',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
    },
    phoneInputText: {
        color: '#fff',
        fontSize: 18,
    },
    phoneInputCodeText: {
        color: '#fff',
        fontSize: 18,
    },
    flagButton: {
        borderRightColor: '#9C0A35',
        borderRightWidth: 1,
        backgroundColor: '#4B4B64',
        paddingHorizontal: 10,
    },
    errorText: {
        color: '#FF0000',
        marginTop: 5,
    },
    loginButton: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#828282',
        width: '100%',
        justifyContent: 'center',
    },
    socialButtonText: {
        color: '#9C0A35',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
});

export default PhoneNumberInput;
