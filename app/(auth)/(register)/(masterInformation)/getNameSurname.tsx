import Buttons from '@/components/(buttons)/button';
import LoadingButtons from '@/components/(buttons)/loadingButton';
import registerStory from '@/helpers/state_managment/auth/register';
import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const UserInfo: React.FC = () => {
    const { firstName, setFirstName, lastName, setLastName, firstNameError, setFirstNameError, lastNameError, setLastNameError, nickname, setNickname } = registerStory();
    const { t } = useTranslation();
    const navigate = useNavigation<any>();

    const validateName = (name: string): boolean => {
        const nameRegEx = /^[a-zA-Zа-яА-ЯёЁ\s]{2,30}$/;
        return nameRegEx.test(name);
    };

    const [pending, setPending] = React.useState(false);

    const handleFirstNameChange = (name: string): void => {
        setFirstName(name);
        if (!validateName(name)) {
            setFirstNameError(t("name_length_and_characters"));
        } else {
            setFirstNameError('');
        }
    };

    const handleLastNameChange = (name: string): void => {
        setLastName(name);
        if (!validateName(name)) {
            setLastNameError(t("surname_length_and_characters"));
        } else {
            setLastNameError('');
        }
    };
    const handleSkip = () => {
        setPending(true);
        // Nickname ni bo'sh qilib belgilash
        setNickname('');
        // Navigate to the next page
        navigate.navigate('(auth)/(register)/(masterInformation)/getPhoto');
        setPending(false);
    };

    const isButtonEnabled = firstName.length > 0 && lastName.length > 0 && firstNameError === '' && lastNameError === '';

    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={styles.topSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressIndicator} />
                    <View style={styles.progressSegment} />
                </View>
                <Text style={styles.label}>{t("your_first_and_last_name")}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t("first_name")}
                    placeholderTextColor="#8A8A8A"
                    value={firstName}
                    onChangeText={handleFirstNameChange}
                />
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder={t("last_name")}
                    placeholderTextColor="#8A8A8A"
                    value={lastName}
                    onChangeText={handleLastNameChange}
                />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder={t("nickname")}
                    placeholderTextColor="#8A8A8A"
                    value={nickname}
                    onChangeText={setNickname}
                />
            </ScrollView>
            <View style={styles.bottomSection}>
                {nickname.length === 0 && lastName.length === 0 && firstName.length === 0 ? (
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipButtonText}>{t("skip")}</Text>
                    </TouchableOpacity>
                ) : null}
                {!pending ?
                    <Buttons title={t("Continue")}
                        isDisebled={!!isButtonEnabled}
                        onPress={() => {
                            setPending(true);
                            navigate.navigate('(auth)/(register)/(masterInformation)/getPhoto');
                            setPending(false);
                        }}
                    /> :
                    <LoadingButtons
                        title={t("Continue")}
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
        padding: 20,
        justifyContent: 'space-between',
    },
    topSection: {
        flex: 1,
    },
    progressBar: {
        flexDirection: 'row',
        height: 5,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 100,

    },
    progressIndicator: {
        flex: 1,
        backgroundColor: '#9C0A35',
        borderRadius: 5,
    },
    progressSegment: {
        flex: 1,
        backgroundColor: '#8A8A8A',
        marginLeft: 5,
        borderRadius: 5,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    input: {
        height: 55,
        borderColor: '#4B4B64',
        backgroundColor: '#4B4B64',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF',
    },
    bottomSection: {
        justifyContent: 'flex-end',
        backgroundColor: '#21212E',
        paddingTop: 15
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    errorText: {
        color: '#FF0000',
        marginTop: 5,
    },
    skipButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    skipButtonText: {
        color: '#9C0A35',
        fontSize: 16,
    },
});

export default UserInfo;
