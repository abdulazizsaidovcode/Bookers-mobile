import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, View, StatusBar } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import registerStory from '@/helpers/state_managment/auth/register';
import { checkCode } from '@/helpers/api-function/register/registrFC';
import { useTranslation } from 'react-i18next';

const OtpInputExample = () => {
    const { phoneNumber, code, otp, setOtp, otpErr, setOtpErr } = registerStory()
    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={{ marginTop: 32 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#21212E" />
                <NavigationMenu name="" deleteIcon={false} key={1} />
            </SafeAreaView>
            <View style={styles.content}>
                <Text style={styles.title}>{t("Confirmation_Number")}</Text>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                <Text style={styles.subTitle}>{t("sms_code")}</Text>
                <OTPTextInput
                    inputCount={4}
                    handleTextChange={(text) => setOtp(text)}
                    containerStyle={styles.otpContainer}
                    textInputStyle={styles.otpInput}
                    tintColor='green'
                />
                <Text style={styles.code}>{code}</Text>
            </View>

            <View style={styles.buttonWrapper}>
                <Buttons title={t("Confirm")} onPress={() => {
                    checkCode(phoneNumber, otp, setOtpErr)
                }} />
            </View>
        </SafeAreaView>
    );
};

export default OtpInputExample;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    header: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 16,
    },
    iconWrapper: {
        backgroundColor: '#ff0078',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 10,
        color: '#ffffff',
    },
    phoneNumber: {
        fontSize: 18,
        marginBottom: 10,
        color: '#ffffff',
    },
    subTitle: {
        color: '#828282',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    otpContainer: {
        width: '80%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#4B4B64',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 24,
    },
    buttonWrapper: {
        padding: 16,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    code: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    }
});