import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import Buttons from '@/components/(buttons)/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useTranslation } from 'react-i18next';
import registerStory from '@/helpers/state_managment/auth/register';
import { checkNumberFunction } from '@/helpers/api-function/register/registrFC';
import isRegister from '@/helpers/state_managment/isRegister/isRegister'
import LoadingButtons from '@/components/(buttons)/loadingButton';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneNumberInput: React.FC = () => {
    const route = useRoute()
    const { phoneNumber, setPhoneNumber, setIsValid, isValid, setCode, code } = registerStory()
    const phoneInput = useRef<PhoneInput>(null);
    const { setIsRegtered } = isRegister()
    const [status, setStatus] = useState<boolean>(false);
    const { t } = useTranslation();
    const [pending, setPending] = useState(false);
    const [isVisibleValid, setIsVisibleValid] = useState<boolean>(false)
    const navigation = useNavigation<any>()
    const [isChecked, setIsChecked] = useState(false);


    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);

        setIsValid(phoneInput.current?.isValidNumber(text) ?? false);
    };

    useFocusEffect(
        useCallback(() => {
            setIsRegtered(status);
        }, [status])
    )

    useEffect(() => {
        if (phoneNumber.length == 13) {
            if (isValid) {
                setPending(true)
                checkNumberFunction(phoneNumber, setCode, setPending, setStatus)
            } else {
                setIsVisibleValid(true)
                setPending(false)
            }
        }
    }, [phoneNumber])

    console.log(code);


    useFocusEffect(
        useCallback(() => {
            setPhoneNumber('')
        }, [])
    )


    const handlePress = () => {
        if(status == true){
            setIsChecked(!isChecked);
        }
    };



    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: 16 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#21212E" />
                <NavigationMenu name='' deleteIcon={false} key={1} />
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
                    {!isValid && isVisibleValid && phoneNumber.length == 13 && (
                        <Text style={styles.errorText}>Неверный код подтверждения</Text>
                    )}
                    {/* {!isVisibleValid && (
                        <Text style={styles.errorText}>Валидация 9 та символ га бўлиш керак</Text>
                    )} */}
                </View>

                {/*  -- ---- -- - - -- for new version --- - - - - - -- - - -  */}
                {/* <View style={{ marginVertical: 20, width: '100%' }}>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                        <Image source={require('../../../assets/images/auth/google.png')} />
                        <Text style={styles.socialButtonText}>{t('login_google')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                        <Image source={require('../../../assets/images/auth/facebook.png')} />
                        <Text style={styles.socialButtonText}>{t("login_facebook")}</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
            <View style={{ marginVertical: 20 }}>
                {status == true && <View style={styles.containerIn}>
                    <Pressable style={styles.checkboxContainer} onPress={handlePress}>
                        <View style={{ backgroundColor: !isChecked ? '#21212E' : '#9C0A35', borderRadius: 2, borderWidth: 1, borderColor: isChecked ? '#9C0A35' : '#828282' }}>
                            <Feather
                                name={isChecked ? 'check' : 'radio'}
                                size={20}
                                color={isChecked ? '#fff' : '#21212E'}
                            />
                        </View>
                        <View style={{ marginLeft: 16 }}>
                            <Text style={[styles.text]}>Я подтверждаю что ознакомился с условиями</Text>
                            <Pressable
                                onPress={() => navigation.navigate('(auth)/(offer)/offer')}
                            >
                                <Text style={styles.link}>публичной оферты лицензионного соглашения политики конфиденциальности</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </View>
                }
                {!pending ?
                    (code && phoneNumber.length == 13 &&
                        <Buttons
                            isDisebled={status !== true || isChecked}
                            title={status !== true ? "Войти" : "Регистрация"}
                            onPress={() => {

                                setPending(true)
                                AsyncStorage.setItem('Agrement', 'true')
                                navigation.navigate('(auth)/(login)/checkSendMessage')
                            }}
                            backgroundColor={'#9C0A35'}
                        />)
                    :
                    <LoadingButtons
                        title={""}
                        backgroundColor={'#9C0A35'}
                    />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        paddingHorizontal: 16,
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
        borderRadius: 10,
    },
    phoneInputContainer: {
        width: '100%',
        height: 60,
        borderRadius: 20,
        backgroundColor: '#21212E'
    },
    phoneInputTextContainer: {
        backgroundColor: '#4B4B64',
        borderRadius: 10,
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
        backgroundColor: '#4B4B64',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    errorText: {
        color: '#FB0A0A',
        marginTop: 20,
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

    containerIn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginBottom: 30
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#828282',
        fontSize: 14,
    },
    textChecked: {
        color: '#ffffff',
    },
    link: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: '#828282',
    },
});

export default PhoneNumberInput;
