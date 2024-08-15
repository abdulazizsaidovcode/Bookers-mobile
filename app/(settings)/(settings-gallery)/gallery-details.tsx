import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useRoute } from '@react-navigation/native';
import { addPhoto, delPhoto, editMainPhoto, editName, fetchFullData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { getFile } from '@/helpers/api';
import CenteredModal from '@/components/(modals)/modal-centered';
import Buttons from '@/components/(buttons)/button';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import BottomModal from '@/components/(modals)/modal-bottom';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-simple-toast';
import { EditMainPhoto } from '@/type/gallery/gallery';
import LoadingButtons from '@/components/(buttons)/loadingButton';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const GalleryDetails: React.FC = () => {
    const route = useRoute();
    const { id } = route.params as { id: number };
    const { fullData, setFullData, setData, booleanState, setBooleanState } = useGalleryStore();
    const [name, setName] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [text, setText] = useState<string | null>(null)
    const [selectedMainImages, setSelectedMainImages] = useState<EditMainPhoto[]>([]);
    const { setIsLoading } = useGalleryStore()

    useEffect(() => {
        fetchFullData(id, setFullData);
    }, [id, setFullData]);

    useEffect(() => {
        if (booleanState.selectAll) {
            setSelectedImages(fullData.resGalleryAttachments.map(item => item.attachmentStatus === 'CANCELED' ? '' : item.attachmentId));
        } else {
            setSelectedImages([]);
        }
    }, [booleanState.selectAll, fullData.resGalleryAttachments]);

    useEffect(() => {
        const updatedMainImages = fullData.resGalleryAttachments
            .map(item => item.attachmentStatus === 'APPROVED' && ({
                attachmentId: item.attachmentId,
                main: selectedImages.includes(item.attachmentId)
            }))
            .filter(Boolean) as EditMainPhoto[];
        setSelectedMainImages(updatedMainImages);
    }, [selectedImages, fullData.resGalleryAttachments]);

    const toggleModal = () => {
        setName(fullData.albumName);
        setBooleanState({ ...booleanState, isOpen: !booleanState.isOpen });
    };

    const toggleTextModal = (text: string | null) => {
        setBooleanState({ ...booleanState, textModal: !booleanState.textModal })
        setText(text)
    }

    const spliceText = (text: string | null) => {
        if (text === null) return null;

        const isLongText = text.length > 25;
        const displayText = isLongText ? text.slice(0, 25) : text;

        return (
            <Pressable onPress={() => toggleTextModal(text)} style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{isLongText ? displayText + '...' : displayText}</Text>
            </Pressable>
        );
    };

    const toggleAllModal = () => {
        if (selectedImages.length === 0) {
            Toast.show('Сначала, выберите фотографии', Toast.LONG);
        } else {
            setBooleanState({ ...booleanState, isAllOpen: !booleanState.isAllOpen });
        }
    };

    const handleConfirm = () => {
        editName(id, setFullData, name, toggleModal, setData, setBooleanState, booleanState, setIsLoading);
    };

    const handleDeleteMode = () => {
        setBooleanState({ ...booleanState, isDeleteMode: !booleanState.isDeleteMode, selectAll: false });
        setSelectedImages([]);
    };

    const handleImageSelect = (imageId: string) => {
        setSelectedImages(prev => prev.includes(imageId)
            ? prev.filter(id => id !== imageId)
            : [...prev, imageId]
        );
    };
    console.log('isDeleteMode', booleanState.isDeleteMode);
    console.log('selectAll', booleanState.selectAll);

    const handleDelete = () => {
        setBooleanState({ ...booleanState, isDeleteMode: false, selectAll: false });
        delPhoto(id, selectedImages, setFullData, setData, () => {
            toggleAllModal();
            setBooleanState({ ...booleanState, isDeleteMode: false, selectAll: false, isAllOpen: false }); // Ensure isDeleteMode is set to false
        }, setIsLoading);
        setSelectedImages([]);
    };


    const requestPermissions = async (type: 'camera' | 'gallery') => {
        const { status } = type === 'camera'
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status === 'granted';
    };

    const pickImage = async (from: 'camera' | 'gallery') => {
        const hasPermission = await requestPermissions(from);
        if (!hasPermission) return;

        const result = from === 'camera'
            ? await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            })
            : await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 1
            });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const newImages = result.assets.map(asset => asset.uri);
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const toggleShowMain = () => setBooleanState({ ...booleanState, showMainSwitch: !booleanState.showMainSwitch, isLoading: false });
    const toggleBottomModal = () => setBooleanState({ ...booleanState, isBottomModalOpen: !booleanState.isBottomModalOpen });

    const pickFromImagePicker = (from: 'camera' | 'gallery') => {
        pickImage(from);
        toggleBottomModal();
    };

    const handleSave = (type: 'photo' | 'mainPhoto') => {
        if (type === 'photo') {
            const formData = new FormData();
            images.forEach((item, index) => {
                formData.append('photos', {
                    uri: item,
                    type: 'image/jpeg',
                    name: `photos[${index}].image`,
                } as any);
            });
            addPhoto(id, formData, setFullData, setImages, setBooleanState, booleanState);
        } else {
            editMainPhoto(setFullData, setData, id, selectedMainImages, toggleShowMain, setBooleanState, booleanState, setIsLoading)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar style="light" />
                {booleanState.isDeleteMode ? (<View style={styles.deleteModeBar}>
                    <View style={styles.deleteModeLeft}>
                        <AntDesign onPress={handleDeleteMode} name="close" size={24} color="white" />
                        <Text style={styles.deleteModeText}>{selectedImages.length}</Text>
                        <TouchableOpacity style={styles.selectAllButton} onPress={() => setBooleanState({ ...booleanState, selectAll: !booleanState.selectAll })}>
                            <MaterialIcons name={booleanState.selectAll ? "check-box" : "check-box-outline-blank"} size={24}
                                color="#9C0A35" />
                        </TouchableOpacity>
                        <Text style={styles.deleteModeText}>выделить все</Text>
                    </View>
                    <TouchableOpacity onPress={toggleAllModal}>
                        <MaterialIcons name="delete" size={24} color="white" />
                    </TouchableOpacity>
                </View>) : (<NavigationMenu
                    all={true}
                    name=''
                    editOnPress={toggleModal}
                    delOnPress={booleanState.showMainSwitch ? () => { } : handleDeleteMode}
                    addOnPress={toggleBottomModal}
                />)}
                <View style={styles.content}>
                    <Text style={styles.title}>{fullData.albumName}</Text>
                    <View style={styles.imagesContainer}>
                        {images.length === 0 && fullData.resGalleryAttachments.length <= 0 ? (
                            <Text style={styles.noImagesText}>В этой галерее нет фотографий</Text>
                        ) : fullData.resGalleryAttachments.map((albumItem, albumIndex) => (
                            <View key={albumIndex} style={styles.imageWrapper}>
                                {albumItem.attachmentStatus === 'CANCELED' ? null : booleanState.isDeleteMode && (
                                    <TouchableOpacity style={styles.checkIcon}
                                        onPress={() => handleImageSelect(albumItem.attachmentId)}>
                                        <MaterialIcons
                                            name={selectedImages.includes(albumItem.attachmentId) ? "check-box" : "check-box-outline-blank"}
                                            size={24} color="#9C0A35" />
                                    </TouchableOpacity>
                                )}
                                {albumItem.attachmentStatus === 'CANCELED' || albumItem.attachmentStatus === 'NEW' ? null : booleanState.showMainSwitch && (
                                    <TouchableOpacity
                                        style={styles.checkIcon}
                                        onPress={() => handleImageSelect(albumItem.attachmentId)}
                                        disabled={selectedMainImages.some(image => image.attachmentId === albumItem.attachmentId && image.main)}
                                    >
                                        <MaterialIcons
                                            name={selectedMainImages.some(image => image.attachmentId === albumItem.attachmentId && image.main === true) ? "check-box" : 'check-box-outline-blank'}
                                            size={26} color="#9C0A35" />
                                    </TouchableOpacity>
                                )}
                                <Pressable onLongPress={booleanState.isDeleteMode ? () => { } : albumItem.attachmentStatus === 'NEW' || albumItem.attachmentStatus === 'CANCELED' ? null : toggleShowMain} style={styles.imageWrapper}>
                                    <Image style={styles.image} source={{ uri: getFile + albumItem.attachmentId }} />
                                    {!booleanState.isDeleteMode && albumItem.attachmentStatus === 'NEW' && <View style={{
                                        position: 'absolute',
                                        width: 15,
                                        borderRadius: 50,
                                        height: 15,
                                        backgroundColor: '#F29339',
                                        top: 0,
                                        right: 0,
                                        margin: 7
                                    }}></View>}
                                    {albumItem.attachmentStatus === 'CANCELED' && <View style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'black',
                                        opacity: 0.8,
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 14.5,
                                    }}>
                                        {spliceText(albumItem.message)}
                                    </View>}
                                </Pressable>
                            </View>
                        ))}
                        {images.map((item, index) => (
                            <Image key={index} style={styles.image} source={{ uri: item }} />
                        ))}
                    </View>
                </View>
                <CenteredModal
                    toggleModal={toggleModal}
                    isModal={booleanState.isOpen}
                    btnWhiteText="Отмена"
                    btnRedText="Подтверждать"
                    isFullBtn={true}
                    onConfirm={handleConfirm}
                >
                    <View>
                        <Text style={styles.modalTitle}>Переименовать</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder='Enter edited name'
                            style={styles.textInput}
                        />
                    </View>
                </CenteredModal>
                <CenteredModal
                    toggleModal={toggleAllModal}
                    isModal={booleanState.isAllOpen}
                    btnWhiteText="Отмена"
                    btnRedText="Подтверждать"
                    isFullBtn={true}
                    onConfirm={handleDelete}
                >
                    <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="delete" size={100} color="#9C0A35" />
                        <Text style={styles.modalContentText}>
                            {selectedImages.length === fullData.resGalleryAttachments.length
                                ? 'Вы уверены, что хотите удалить все фото альбома?'
                                : 'Вы уверены, что хотите удалить фото?'}
                        </Text>
                    </View>
                </CenteredModal>
                <BottomModal isBottomModal={booleanState.isBottomModalOpen} toggleBottomModal={toggleBottomModal}>
                    <View style={styles.bottomModalContent}>
                        <TouchableOpacity onPress={() => pickFromImagePicker('camera')}>
                            <Text style={styles.bottomModalText}>Сделать снимок</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pickFromImagePicker('gallery')}>
                            <Text style={styles.bottomModalText}>Выбрать из галереи</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleBottomModal}>
                            <Text style={styles.bottomModalCancelText}>Отмена</Text>
                        </TouchableOpacity>
                    </View>
                </BottomModal>
                <BottomModal isBottomModal={booleanState.textModal} toggleBottomModal={() => toggleTextModal(text)}>
                    <View>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{text}</Text>
                    </View>
                </BottomModal>
            </ScrollView>
            <View style={{ position: 'absolute', width: '100%', bottom: 0, padding: 10 }}>
                {images.length !== 0 && (booleanState.isLoading ? <LoadingButtons title='Сохраfнить' /> : <Buttons title='Сохранить' onPress={() => handleSave('photo')} />)}
                {booleanState.showMainSwitch && (booleanState.isLoading ? <LoadingButtons title='Сохранить' /> : <Buttons title='Сохранить' onPress={() => handleSave('mainPhoto')} />)}
            </View>
        </SafeAreaView>
    );
};

export default GalleryDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
        position: 'relative'
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    mainCheckIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    imageWrapper: {
        position: 'relative',
    },
    image: {
        width: width / 3 - 17,
        height: height / 7,
        borderRadius: 15,
    },
    checkIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    textInput: {
        width: 290,
        height: 37,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 5,
        color: 'white',
        backgroundColor: '#4b4b64',
    },
    deleteModeBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#21212e',
    },
    deleteModeLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteModeText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 5,
    },
    selectAllButton: {
        marginLeft: 20,
    },
    noImagesText: {
        color: 'white',
        fontSize: 15,
    },
    bottomModalContent: {
        padding: 20,
        alignItems: 'center',
    },
    bottomModalText: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 10,
    },
    bottomModalCancelText: {
        fontSize: 18,
        color: 'red',
        marginVertical: 10,
    },
    modalContentText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});