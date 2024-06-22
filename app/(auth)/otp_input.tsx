import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, Button } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
const OtpInputExample = () => {
    const [otp, setOtp] = useState('');
    const handleSubmit = () => {
        Alert.alert('OTP Submitted', `OTP: ${otp}`);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Подтверждение номера</Text>
            <Text style={styles.phoneNumber}>+998942939449</Text>
            <Text style={styles.subTitle}>Мы отправили вам SMS с кодом подтверждения.</Text>
            <OTPTextInput
                inputCount={4} // <<== Bu yerda 4 ga o'zgartirildi
                handleTextChange={(text) => setOtp(text)}
                containerStyle={styles.otpContainer}
                textInputStyle={styles.otpInput}
                tintColor="#03DAC6"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </SafeAreaView>
    );
};
export default OtpInputExample;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 20,
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
        lineHeight: 18,
        marginBottom: 20,
    },
    otpContainer: {
        width: '80%',
        height: 100,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
});