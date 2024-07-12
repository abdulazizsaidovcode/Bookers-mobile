import {TouchableOpacity, Image, Text, StyleSheet, View, TouchableWithoutFeedback, Alert} from 'react-native';
import React, {useState, useEffect} from "react";
import * as ImagePicker from 'expo-image-picker';
import CenteredModal from "@/components/(modals)/modal-centered";
import tw from "tailwind-react-native-classnames";
import BottomModal from "@/components/(modals)/modal-bottom";
import {MaterialIcons} from '@expo/vector-icons';
import axios from "axios";
import {getFile, postFileId} from "@/helpers/api";
import clientStore from "@/helpers/state_managment/client/clientStore";
import Toast from "react-native-simple-toast";
import {getConfigImg} from "@/app/(tabs)/main";

const ProfileImgUpload = ({attachmentID}: { attachmentID?: string | null }) => {
    const {setAttachmentID} = clientStore();
    const [image, setImage] = useState<string | null>(null);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isDeleteImgModal, setIsDeleteImgModal] = useState<boolean>(false);

    useEffect(() => {
        if (attachmentID) setImage(`${getFile}${attachmentID}`)
    }, []);

    const openModal = () => setIsModal(!isModal);
    const openDeleteModal = () => setIsDeleteImgModal(!isDeleteImgModal);

    // ======================= gallery dan img yuklash uchun functions =======================
    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Kamera ruyxati kerak!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0]);
        }
    };

    // ======================= camera dan img upload un functions =======================
    const takePhoto = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Kamera ruxsati kerak!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0]);
        }
    };

    // ======================= image delete un function =======================
    const deletePhoto = () => {
        setImage(null);
        setAttachmentID('')
        openDeleteModal();
    }

    const uploadImage = async (val: any) => {
        if (!val) return;

        const formData = new FormData();
        let files: any = {
            uri: val.uri,
            name: val.fileName,
            type: val.mimeType
        }
        formData.append('file', files);

        try {
            const config = await getConfigImg()
            const response = await axios.post(postFileId, formData, config);
            if (response.data.success) {
                Toast.show('Success', Toast.LONG)
                setAttachmentID(response.data.body)
            } else Toast.show(response.data.message, Toast.LONG)
        } catch (err) {
            console.error('error:', err);
            Toast.show(`error`, Toast.LONG)
        }
    };

    return (
        <>
            {/* =================== profile image =================== */}
            <View style={[tw`justify-center items-center`]}>
                <View style={tw`bg-transparent text-center relative`}>
                    <TouchableOpacity style={styles.imageContainer} onPress={openModal} activeOpacity={.8}>
                        {image ? (
                            <Image source={{uri: image}} style={styles.profileImage}/>
                        ) : (
                            <Image source={require('../assets/avatar.png')} style={[styles.profileImage]}/>
                        )}
                    </TouchableOpacity>
                    {!image && (
                        <View
                            style={[
                                tw`w-11 h-11 rounded-full items-center justify-center absolute bottom-7 right-1 border-4`,
                                {backgroundColor: "#9c0935", borderColor: "#21212E"},
                            ]}
                        >
                            <MaterialIcons name="edit" size={24} color="white"/>
                        </View>
                    )}
                </View>
            </View>

            {/* ======================= img modal component ============================ */}
            <BottomModal
                key={1}
                isBottomModal={isModal}
                toggleBottomModal={openModal}
            >
                <>
                    <View style={[tw`w-full pb-2`, {borderBottomWidth: 2, borderBottomColor: '#828282'}]}
                          key={`profile image upload bottom modal`}>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => {
                                takePhoto();
                                openModal();
                            }}>
                            <Text style={tw`text-white text-lg mb-3 font-bold tracking-wide`}>Сделать снимок</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => {
                                pickImage();
                                openModal();
                            }}>
                            <Text style={tw`text-white text-lg mb-3 font-bold tracking-wide`}>Выбрать из галереи</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.7}
                            onPress={() => {
                                if (image) {
                                    openDeleteModal();
                                    openModal();
                                }
                            }}
                            disabled={!image}
                        >
                            <Text
                                style={[tw`text-lg mb-3 font-bold tracking-wide`, {color: !image ? '#58454a' : '#9C0A35'}]}>
                                Удалить фотографию
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback onPress={openModal}>
                        <Text style={[tw`text-lg font-bold tracking-wide mt-3`, {color: '#9C0A35'}]}>
                            Отмена
                        </Text>
                    </TouchableWithoutFeedback>
                </>
            </BottomModal>

            {/* ======================= delete img modal ================================== */}
            <CenteredModal
                btnRedText='Да'
                btnWhiteText='Отмена'
                isFullBtn={true}
                isModal={isDeleteImgModal}
                toggleModal={openDeleteModal}
                onConfirm={deletePhoto}
            >
                <View style={tw`items-center justify-center`} key={`profile image upload center modal`}>
                    <MaterialIcons name="delete" size={100} color="#9C0A35"/>
                    <Text style={[tw`text-white text-base mt-1 text-center`, {opacity: .8}]}>
                        Вы хотите удалить фотографию?
                    </Text>
                </View>
            </CenteredModal>
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        color: '#ffffff',
    },
});

export default ProfileImgUpload;
