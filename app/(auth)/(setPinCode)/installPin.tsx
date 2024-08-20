import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import LoadingButtons from '@/components/(buttons)/loadingButton';
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(auth)/(setPinCode)/installPin'>;


const InstallPin: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const inputs = useRef<TextInput[]>([]);
    const [pending, setPending] = useState(false);

    useFocusEffect(
        useCallback(() => {
            async function checkOtp() {
                // 1. otp qiymatini log bilan chiqarish
                console.log(otp, '1 - Initial OTP state');

                // 2. OTP qiymatlarini filtrlash, bo'sh bo'lmagan qiymatlarni olish
                const filteredOtp = otp.filter(item => item !== '');

                // 3. Agar 4 ta qiymat kiritilgan bo'lsa, OTP ni tozalash
                if (filteredOtp.length === 4) {
                    console.log('All OTP digits filled, clearing...');
                    // setTimeoutni await qilishga hojat yo'q, chunki u singdiriladi.
                    setTimeout(() => {
                        setOtp(['', '', '', '']);
                        console.log('OTP cleared');
                    }, 100);
                }

                // 4. Filtrlangan qiymatni log bilan chiqarish
                console.log(filteredOtp, '3 - Filtered OTP state');
            }

            // 5. Funktsiyani chaqirish
            checkOtp();

            // 6. useFocusEffectdan tozalash funksiyasini qaytarish
            return () => {
                console.log('Cleaning up useFocusEffect...');
            };
        }, [otp]) // otp holatini kuzatib borish
    );
      

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
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) inputs.current[index - 1].focus();
    };

    const isButtonEnabled = otp.every((digit) => digit.length > 0);
    useEffect(() => {
        const handleContinue = async () => {
            console.log(otp, 9);

            let aa = await otp.filter((item) => item !== "")
            console.log(otp, 10);
            if (aa.length == 4) {
                setPending(true)
                try {
                    await AsyncStorage.setItem('otp', otp.join(''));
                    navigation.navigate('(auth)/(setPinCode)/checkInstalledPin');
                    setPending(false)
                    setOtp(['', '', '', ''])
                } catch (error) {
                    setPending(false)
                    console.log('Failed to save OTP to storage', error);
                }
            }

        };
        handleContinue()

    }, [otp])


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
                                value={digit ? "*" : ""}
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
                {/* <View style={styles.bottomSection}>
                    {!pending ?
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
                        :
                        <LoadingButtons
                            title={t("Continue")}
                        />
                    }

                </View> */}
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
        width: 62,
        height: 62,
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
