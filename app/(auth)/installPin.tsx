import { router, useNavigation } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(auth)/installPin'>;


const InstallPin: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const inputs = useRef<TextInput[]>([]);

    useEffect(() => {
        const getStoredOtp = async () => {
            try {
                const storedOtp = await AsyncStorage.getItem('otp');
                if (storedOtp) {
                    setOtp(storedOtp.split(''));
                }
            } catch (error) {
                console.log('Failed to load OTP from storage', error);
            }
        };

        getStoredOtp();
    }, []);

    const handlePaste = async () => {
        const text = await Clipboard.getString();
        if (text.length === 4 && /^\d{4}$/.test(text)) {
            const otpArray = text.split('');
            setOtp(otpArray);
            inputs.current[3].focus();
        } else {
            Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP.');
        }
    };

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

    const isButtonEnabled = otp.every((digit) => digit.length > 0);

    const handleContinue = async () => {
        try {
            await AsyncStorage.setItem('otp', otp.join(''));
            // Handle the continue action (navigate to the next page)
            navigation.navigate('(auth)/checkPin');
        } catch (error) {
            console.log('Failed to save OTP to storage', error);
        }
    };

    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Text style={styles.label}>{t("set_pin_code")}</Text>
                    <View style={styles.inputContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                value={digit}
                                onChangeText={(text) => handleChangeText(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                ref={(ref) => (inputs.current[index] = ref!)}
                                maxLength={1}
                                keyboardType="numeric"
                                onFocus={() => handlePaste()}
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
                        onPress={handleContinue}
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

export default InstallPin;
