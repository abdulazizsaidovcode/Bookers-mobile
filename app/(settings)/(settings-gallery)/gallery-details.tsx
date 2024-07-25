import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useRoute } from '@react-navigation/native';
import { addPhoto, delPhoto, editMainPhoto, editName, fetchFullData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { getFile } from '@/helpers/api';
import CenteredModal from '@/components/(modals)/modal-centered';
import Buttons from '@/components/(buttons)/button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomModal from '@/components/(modals)/modal-bottom';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-simple-toast';
import { EditMainPhoto } from '@/type/gallery/gallery';
import LoadingButtons from '@/components/(buttons)/loadingButton';

const { width, height } = Dimensions.get('window');

const GalleryDetails: React.FC = () => {
    const route = useRoute();
    const { fullData, setFullData, setData } = useGalleryStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isAllOpen, setIsAllOpen] = useState(false);
    const [name, setName] = useState('');
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
    const [showMainSwitch, setShowMainSwitch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [textModal, setTextModal] = useState(false);
    const [text, setText] = useState<string | null>(null)
    const [selectedMainImages, setSelectedMainImages] = useState<EditMainPhoto[]>([]);
    const { id } = route.params as { id: number };

    useEffect(() => {
        fetchFullData(id, setFullData);
    }, [id, setFullData]);

    useEffect(() => {
        if (selectAll) {
            setSelectedImages(fullData.resGalleryAttachments.map(item => item.attachmentStatus === 'CANCELED' ? '' : item.attachmentId));
        } else {
            setSelectedImages([]);
        }
    }, [selectAll, fullData.resGalleryAttachments]);

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
        setIsOpen(!isOpen);
    };

    const toggleTextModal = (text: string | null) => {
        setTextModal((!textModal))
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
            setIsAllOpen(!isAllOpen);
        }
    };

    const handleConfirm = () => {
        editName(id, setFullData, name, toggleModal, setData, setIsLoading);
    };

    const handleDeleteMode = () => {
        setIsDeleteMode(!isDeleteMode);
        setSelectedImages([]);
        setSelectAll(false);
    };

    const handleImageSelect = (imageId: string) => {
        setSelectedImages(prev => prev.includes(imageId)
            ? prev.filter(id => id !== imageId)
            : [...prev, imageId]
        );
    };

    const handleSelectMainPhoto = (imageId: string) => {
        setSelectedImages(prev => {
            if (prev.includes(imageId)) {
                return prev.filter(id => id !== imageId);
            } else {
                return [...prev, imageId];
            }
        });
    };

    const handleDelete = () => {
        setIsDeleteMode(false);
        delPhoto(id, selectedImages, setFullData, setData, toggleAllModal);
        setSelectedImages([]);
        setSelectAll(false);
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
                aspect: [4, 3],
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

    const toggleShowMain = () => setShowMainSwitch(!showMainSwitch);
    const toggleBottomModal = () => setIsBottomModalOpen(!isBottomModalOpen);

    const addImageFromCamera = () => {
        pickImage('camera');
        toggleBottomModal();
    };

    const addImageFromGallery = () => {
        pickImage('gallery');
        toggleBottomModal();
    };

    const handleSave = () => {
        const formData = new FormData();
        images.forEach((item, index) => {
            formData.append('photos', {
                uri: item,
                type: 'image/jpeg',
                name: `photos[${index}].image`,
            } as any);
        });
        addPhoto(id, formData, setFullData, setImages, setIsLoading);
    };

    const handleSaveMainPhotos = () => editMainPhoto(setFullData, setData, id, selectedMainImages, toggleShowMain, setIsLoading)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {isDeleteMode ? (<View style={styles.deleteModeBar}>
                    <View style={styles.deleteModeLeft}>
                        <AntDesign onPress={handleDeleteMode} name="close" size={24} color="white" />
                        <Text style={styles.deleteModeText}>{selectedImages.length}</Text>
                        <TouchableOpacity style={styles.selectAllButton} onPress={() => setSelectAll(!selectAll)}>
                            <MaterialIcons name={selectAll ? "check-box" : "check-box-outline-blank"} size={24}
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
                    delOnPress={showMainSwitch ? () => { } : handleDeleteMode}
                    addOnPress={toggleBottomModal}
                />)}
                <View style={styles.content}>
                    <Text style={styles.title}>{fullData.albumName}</Text>
                    <View style={styles.imagesContainer}>
                        {fullData.resGalleryAttachments.length <= 0 ? (
                            <Text style={styles.noImagesText}>В этой галерее нет фотографий</Text>
                        ) : fullData.resGalleryAttachments.map((albumItem, albumIndex) => (
                            <View key={albumIndex} style={styles.imageWrapper}>
                                {albumItem.attachmentStatus === 'CANCELED' ? null : isDeleteMode && (
                                    <TouchableOpacity style={styles.checkIcon}
                                        onPress={() => handleImageSelect(albumItem.attachmentId)}>
                                        <MaterialIcons
                                            name={selectedImages.includes(albumItem.attachmentId) ? "check-box" : "check-box-outline-blank"}
                                            size={24} color="#9C0A35" />
                                    </TouchableOpacity>
                                )}
                                {albumItem.attachmentStatus === 'CANCELED' || albumItem.attachmentStatus === 'NEW' ? null : showMainSwitch && (
                                    <TouchableOpacity
                                        style={styles.checkIcon}
                                        onPress={() => handleSelectMainPhoto(albumItem.attachmentId)}
                                        disabled={selectedMainImages.some(image => image.attachmentId === albumItem.attachmentId && image.main)} // Disable button if already selected as main
                                    >
                                        <MaterialIcons
                                            name={selectedMainImages.some(image => image.attachmentId === albumItem.attachmentId && image.main) ? "check-box" : 'check-box-outline-blank'}
                                            size={26} color="#9C0A35" />
                                    </TouchableOpacity>
                                )}
                                <Pressable onLongPress={isDeleteMode ? () => { } : albumItem.attachmentStatus === 'NEW' || albumItem.attachmentStatus === 'CANCELED' ? null : toggleShowMain} style={styles.imageWrapper}>
                                    <Image style={styles.image} source={{ uri: getFile + albumItem.attachmentId }} />
                                    {!isDeleteMode && albumItem.attachmentStatus === 'NEW' && <View style={{
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
                    isModal={isOpen}
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
                    isModal={isAllOpen}
                    btnWhiteText="Отмена"
                    btnRedText="Подтверждать"
                    isFullBtn={true}
                    onConfirm={handleDelete}
                >
                    <Text style={styles.modalContentText}>
                        {selectedImages.length === fullData.resGalleryAttachments.length
                            ? 'Вы уверены, что хотите удалить все фото альбома?'
                            : 'Вы уверены, что хотите удалить фото?'}
                    </Text>
                </CenteredModal>
                <BottomModal isBottomModal={isBottomModalOpen} toggleBottomModal={toggleBottomModal}>
                    <View style={styles.bottomModalContent}>
                        <TouchableOpacity onPress={addImageFromCamera}>
                            <Text style={styles.bottomModalText}>Сделать снимок</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addImageFromGallery}>
                            <Text style={styles.bottomModalText}>Выбрать из галереи</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleBottomModal}>
                            <Text style={styles.bottomModalCancelText}>Отмена</Text>
                        </TouchableOpacity>
                    </View>
                </BottomModal>
                <BottomModal isBottomModal={textModal} toggleBottomModal={() => toggleTextModal(text)}>
                    <View>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{text}</Text>
                    </View>
                </BottomModal>
            </ScrollView>
            <View style={{ position: 'absolute', width: '100%', bottom: 0, padding: 10 }}>
                {images.length !== 0 && (isLoading ? <LoadingButtons title='Сохранить' /> : <Buttons title='Сохранить' onPress={showMainSwitch ? handleSaveMainPhotos : handleSave} />)}
                {showMainSwitch && (isLoading ? <LoadingButtons title='Сохранить' /> : <Buttons title='Сохранить' onPress={handleSaveMainPhotos} />)}
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