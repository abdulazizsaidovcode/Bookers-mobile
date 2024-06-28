import { checkCode } from '@/helpers/api-function/register/registrFC';
import registerStory from '@/helpers/state_managment/auth/register';
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, TextInputKeyPressEventData, NativeSyntheticEvent, Text, TouchableOpacity } from 'react-native';

const OtpInputExample: React.FC = () => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const inputs = useRef<TextInput[]>([]);
    const { code, phoneNumber, otpValue, setOtpValue } = registerStory()



    useEffect(() => {
        setIsDisabled(otpValue.some(digit => digit === ''));
        console.log('Current OTP Value:', otpValue.join(''));
    }, [otpValue]);

    const handlePaste = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
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
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Tasdiqlash raqami</Text>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                <Text style={styles.instruction}>Biz SMS orqali sizga tasdiqlash kodini yubordik.</Text>
            </View>
            <View style={styles.otpContainer}>
                {otpValue.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={digit}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        ref={(ref) => (inputs.current[index] = ref!)}
                        maxLength={1}
                        keyboardType="numeric"
                        onPaste={handlePaste}
                    />
                ))}
                <Text style={styles.code}>{code}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, isDisabled && styles.disabledButton]}
                    disabled={isDisabled}
                    onPress={() => {
                        checkCode(phoneNumber, `${otpValue.map((value) => value).join('')}`);
                        // console.log('Final OTP Value:', `${otpValue.map((value) => value).join('')}`)
                    }}
                >
                    <Text style={styles.buttonText}>Tasdiqlash</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    textContainer: {
        marginTop: 120,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    phoneNumber: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    instruction: {
        fontSize: 14,
        color: '#a1a1a1',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#4e4e50',
        backgroundColor: '#2e2e3a',
        borderRadius: 8,
        width: 50,
        height: 50,
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
