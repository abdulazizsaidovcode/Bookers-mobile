import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { FontAwesome5 } from '@expo/vector-icons';
import Buttons from '@/components/(buttons)/button';
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationMenu from '@/components/navigation/navigation-menu';

const PhoneNumberInput: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);
    const phoneInput = useRef<PhoneInput>(null);

    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
        setIsValid(text.length === 9);
    };

    const handleLoginPress = () => {
        if (isValid) {
            console.log('Login Pressed');
            console.log(phoneNumber);
        } else {
            console.log('Invalid phone number');
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: 16 }}>
                <StatusBar barStyle="dark-content" backgroundColor={`black`} />
                <NavigationMenu name='' deleteIcon={false} key={1} />
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Ваш номер телефона</Text>
                    <Text style={styles.subTitle}>Мы отправили вам SMS с кодом подтверждения.</Text>
                </View>
                <StatusBar barStyle="dark-content" />
                <View style={styles.phoneNumber}>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode="UZ"
                        onChangeText={handlePhoneNumberChange}
                        placeholder="Номер телефона"
                        containerStyle={styles.phoneInputContainer}
                        textContainerStyle={styles.phoneInputTextContainer}
                        autoFocus
                    />
                    {!isValid && (
                        <Text style={styles.errorText}>Пожалуйста, введите корректный номер телефона</Text>
                    )}
                </View>
                <View style={{ marginVertical: 20, width: '100%' }}>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={.7} onPress={() => console.log('Login with Google')}>
                        <FontAwesome5 name="google" size={24} color="white" />
                        <Text style={styles.socialButtonText}>Войти через Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} activeOpacity={.7} onPress={() => console.log('Login with Facebook')}>
                        <FontAwesome5 name="facebook" size={24} color="white" />
                        <Text style={styles.socialButtonText}>Войти через Facebook</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ marginVertical: 20 }}>
                <Buttons
                    title='next'
                    onPress={handleLoginPress}
                    isDisebled={isValid}
                    backgroundColor={!isValid ? 'gray' : '#9C0A35'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        padding: 16,
        paddingTop: 0
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: 'white',
        fontSize: 26,
        letterSpacing: 1,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subTitle: {
        color: '#828282',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 18
    },
    phoneNumber: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    phoneInputContainer: {
        backgroundColor: '#4B4B64',
        borderColor: '#9C0A35',
        borderBottomWidth: 1,
        width: '100%',
    },
    phoneInputTextContainer: {
        backgroundColor: '#4B4B64',
        paddingVertical: 10,
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
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        justifyContent: 'center',
    },
    socialButtonText: {
        color: '#9C0A35',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '700',
        letterSpacing: 1
    },
});

export default PhoneNumberInput;
