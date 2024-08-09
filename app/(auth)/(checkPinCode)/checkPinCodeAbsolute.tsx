import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';

const CheckPinCode: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [storedOtp, setStoredOtp] = useState<string | null>(null);
    const inputs = useRef<TextInput[]>([]);
    const isButtonEnabled = otp.every((digit) => digit.length > 0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { t } = useTranslation();


    useEffect(() => {
        const getStoredOtp = async () => {
            try {
                const storedPin = await SecureStore.getItemAsync('password');
                setStoredOtp(storedPin);
            } catch (error) {
                console.log('Failed to load stored PIN from SecureStore', error);
            }
        };

        getStoredOtp();
    }, []);
    

    console.log(storedOtp);
    

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

    const handleContinue = () => {
        const enteredOtp = otp.join('');
        if (enteredOtp === storedOtp) {
            setIsCorrect(true);
            onSuccess();  // Parol to'g'ri bo'lsa onSuccess chaqiriladi va bu oyna yo'qoladi
        } else {
            setIsCorrect(false);
            alert('Notog`ri PIN kod');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.label}>PIN kodni kiriting</Text>
                <View style={styles.inputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={[
                                styles.input,
                                isCorrect === false && styles.inputError,
                                isCorrect === true && styles.inputSuccess,
                            ]}
                            value={digit ? "*" : ""}
                            onChangeText={(text) => handleChangeText(text, index)}
                            ref={(ref) => (inputs.current[index] = ref!)}
                            maxLength={1}
                            keyboardType="numeric"
                        />
                    ))}
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: isButtonEnabled ? '#9C0A35' : '#828282' },
                        ]}
                        onPress={() => {
                            handleContinue()
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21212E',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 100,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
    },
    bottomSection: {
        padding: 20,
    },
    
});

export default CheckPinCode;
