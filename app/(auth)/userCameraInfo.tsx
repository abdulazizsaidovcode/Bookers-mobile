import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router';
import ProfileImgUpload from '@/components/profile-img-upload';
import registerStory from '@/helpers/state_managment/auth/register';
import Buttons from '@/components/(buttons)/button';
import clientStore from '@/helpers/state_managment/client/clientStore';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/address-book'>;


const UserCameraInfo = () => {
    const { setImg } = registerStory()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const { setAttachmentID, attachmentID } = clientStore();
    const [checkUpload, setCheckUpload] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleSkip = () => {
        setImg(null)
        navigation.navigate('(auth)/installPin');
    };

    const handleContinue = () => {
        navigation.navigate('(auth)/installPin');
    };
    useEffect(() => {
        if (attachmentID) {
            setCheckUpload(true)
        } else {
            setCheckUpload(false)
        }
    }, [attachmentID, setAttachmentID])
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressIndicator} />
                    <View style={styles.progressSegment} />
                    <View style={styles.progressSegment1} />
                    <View style={styles.progressSegment2} />
                </View>
                <Text style={styles.label}>{t("add_your_photo")}</Text>
                <Text style={styles.description}>{t("do_not_wish_to_add_photo")}</Text>
                <ProfileImgUpload />
            </View>

            <View style={styles.bottomSection}>

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>{t("skip")}</Text>
                </TouchableOpacity>


                <Buttons isDisebled={checkUpload} title={t("Continue")} onPress={handleContinue} />
            </View>

        </View>
    )
}

export default UserCameraInfo

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