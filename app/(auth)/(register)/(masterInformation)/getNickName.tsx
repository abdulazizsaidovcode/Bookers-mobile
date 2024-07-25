import Buttons from '@/components/(buttons)/button';
import LoadingButtons from '@/components/(buttons)/loadingButton';
import registerStory from '@/helpers/state_managment/auth/register';
import clientStore from '@/helpers/state_managment/client/clientStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const getMasterNickName = () => {
    const { nickname, setNickname } = registerStory();
    const { setAttachmentID } = clientStore();
    const { t } = useTranslation()
    const handleSkip = () => {
        setPending(true);
        // Nickname ni bo'sh qilib belgilash
        setNickname('');
        // Navigate to the next page
        router.push('(auth)/(register)/(masterInformation)/getPhoto');
        setPending(false);
    };
    const [pending, setPending] = React.useState(false);


    const handleContinue = () => {
        setPending(true);
        // Navigate to the next page
        router.push('(auth)/(register)/(masterInformation)/getPhoto');
        setPending(false);
    };

    useEffect(() => {
        setAttachmentID('');
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressIndicator} />
                    <View style={styles.progressSegment} />
                    <View style={styles.progressSegment1} />
                    <View style={styles.progressSegment2} />
                </View>
                <Text style={styles.label}>{t("your_nickname")}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t("nickname")}
                    placeholderTextColor="#8A8A8A"
                    value={nickname}
                    onChangeText={setNickname}
                />
            </View>
            <View style={styles.bottomSection}>
                {nickname.length === 0 ? (
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipButtonText}>{t("skip")}</Text>
                    </TouchableOpacity>
                ) : null}
                {
                    !pending ? <Buttons
                        title={t("Continue")}
                        onPress={handleContinue}
                        isDisebled={nickname.length !== 0}
                    />
                        :
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
        marginTop: 40,
        borderRadius: 5,
    },
    progressIndicator: {
        flex: 1,
        backgroundColor: '#9C0A35',
        borderRadius: 5,
    },
    progressSegment: {
        flex: 1,
        backgroundColor: '#9C0A35',
        marginLeft: 5,
        borderRadius: 5,
    },
    progressSegment1: {
        flex: 1,
        backgroundColor: '#8A8A8A',
        marginLeft: 5,
        borderRadius: 5,
    },
    progressSegment2: {
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
        height: 50,
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
    continueButton: {
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default getMasterNickName;
