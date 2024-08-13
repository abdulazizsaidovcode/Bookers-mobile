import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import ProfileImgUpload from '@/components/profile-img-upload';
import registerStory from '@/helpers/state_managment/auth/register';
import Buttons from '@/components/(buttons)/button';
import clientStore from '@/helpers/state_managment/client/clientStore';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import LoadingButtons from '@/components/(buttons)/loadingButton';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/address-book'>;

const ClientCameraInfo = () => {
    const { setImg } = registerStory()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const { setAttachmentID, attachmentID } = clientStore();
    const [checkUpload, setCheckUpload] = useState<boolean>(false);
    const { t } = useTranslation();
    const [pending, setPending] = useState<boolean>(false);

    const handleSkip = () => {
        setImg(null)
        navigation.navigate('(auth)/(setPinCode)/installPin');
    };

    const handleContinue = () => {
        setPending(true)
        navigation.navigate('(auth)/(setPinCode)/installPin')
        setPending(false)
    }

    useEffect(() => {
        if (attachmentID) {
            setCheckUpload(true)
            setImg(attachmentID)
        } else setCheckUpload(false)
    }, [attachmentID, setAttachmentID])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <View style={styles.topSection}>
                    <View style={styles.progressBar}>
                        <View style={styles.progressIndicator} />
                        <View style={styles.progressSegment1} />
                    </View>
                    <Text style={styles.label}>{t("add_your_photo")}</Text>
                    <Text style={styles.description}>{t("do_not_wish_to_add_photo")}</Text>
                    <ProfileImgUpload registerProfileImg={`registerProfileImg`} />
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipButtonText}>{t("skip")}</Text>
                    </TouchableOpacity>
                    {!pending ?
                        <Buttons isDisebled={checkUpload} title={t("Continue")} onPress={handleContinue} />
                        :
                        <LoadingButtons title={t("Continue")} />
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ClientCameraInfo

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
    description: {
        color: '#828282',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 18,
        marginTop: 10,
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
        backgroundColor: '#9C0A35',
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
        backgroundColor: '#9C0A35',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});