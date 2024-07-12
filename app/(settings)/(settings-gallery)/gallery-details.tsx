import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert, Dimensions, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useRoute } from '@react-navigation/native';
import { addPhoto, delPhoto, editName, fetchFullData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { getFile } from '@/helpers/api';
import CenteredModal from '@/components/(modals)/modal-centered';
import Buttons from '@/components/(buttons)/button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomModal from '@/components/(modals)/modal-bottom';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');

const GalleryDetails: React.FC = () => {
  const route = useRoute();
  const { fullData, setFullData, setData } = useGalleryStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [name, setName] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedMainImages, setSelectedMainImages] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
  const [showMainSwitch, setShowMainSwitch] = useState<boolean>(false);
  const { id } = route.params as { id: number };

  useEffect(() => {
    fetchFullData(id, setFullData);
  }, [id, setFullData]);

  useEffect(() => {
    if (selectAll) {
      setSelectedImages(fullData.resGalleryAttachments.map(item => item.attachmentId));
    } else {
      setSelectedImages([]);
    }
  }, [selectAll, fullData.resGalleryAttachments]);

  const toggleModal = () => {
    setName(fullData.albumName);
    setIsOpen(!isOpen);
  };

  const toggleAllModal = () => {
    if (selectedImages.length === 0) {
      Toast.show('Сначала, выберите фотографии', Toast.LONG);
    } else {
      setIsAllOpen(!isAllOpen);
    }
  };

  const handleConfirm = () => {
    editName(id, setFullData, name, toggleModal, setData);
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
    // buu yerga hamma imagelarni arrni ichiga objectlar yani har bir rasmni shunday qlib ob kelish kerak {atachmentId: string boladi va bu yerga ayanan tanlanga rasmni attachmentId sini op kelish kerak,main: boolen keladi agar usha image select qilingan bolsa true aks holda false} bularni bajarish uchun alohida setSelectedMainImages, selectedMainImages ochil shundan tanlaganlarni olib kelinadi bullarni hammsini
    // MAIN PHOTOLARNI YIG'ISH UCHUN  SHU FUNCSIYADAN FOYDALAN
  }

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
      ? await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsMultipleSelection: true, quality: 1 });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const toggleMainSwitch = () => {
    setShowMainSwitch(!showMainSwitch);
  };

  const toggleBottomModal = () => {
    setIsBottomModalOpen(!isBottomModalOpen);
  };

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
    addPhoto(id, formData, setFullData, setImages);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {isDeleteMode ? (
          <View style={styles.deleteModeBar}>
            <View style={styles.deleteModeLeft}>
              <AntDesign onPress={handleDeleteMode} name="close" size={24} color="white" />
              <Text style={styles.deleteModeText}>{selectedImages.length}</Text>
              <TouchableOpacity style={styles.selectAllButton} onPress={() => setSelectAll(!selectAll)}>
                <MaterialIcons name={selectAll ? "check-box" : "check-box-outline-blank"} size={24} color="#9C0A35" />
              </TouchableOpacity>
              <Text style={styles.deleteModeText}>выделить все</Text>
            </View>
            <TouchableOpacity onPress={toggleAllModal}>
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <NavigationMenu all={true} name='' editOnPress={toggleModal} delOnPress={handleDeleteMode} addOnPress={toggleBottomModal} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{fullData.albumName}</Text>
          <View style={styles.imagesContainer}>
            {fullData.resGalleryAttachments.length <= 0 ? (
              <Text style={styles.noImagesText}>В этой галерее нет фотографий</Text>
            ) : fullData.resGalleryAttachments.map((albumItem, albumIndex) => (
              <View key={albumIndex} style={styles.imageWrapper}>
                {isDeleteMode && (
                  <TouchableOpacity style={styles.checkIcon} onPress={() => handleImageSelect(albumItem.attachmentId)}>
                    <MaterialIcons name={selectedImages.includes(albumItem.attachmentId) ? "check-box" : "check-box-outline-blank"} size={24} color="#9C0A35" />
                  </TouchableOpacity>
                )}
                {showMainSwitch && (
                  <TouchableOpacity style={styles.checkIcon}>
                    <MaterialIcons name={albumItem.main ? "check-box" : 'check-box-outline-blank'} size={26} color="#9C0A35" />
                  </TouchableOpacity>
                )}
                <Pressable onLongPress={toggleMainSwitch} style={styles.imageWrapper}>
                  <Image style={styles.image} source={{ uri: getFile + albumItem.attachmentId }} />
                </Pressable>
              </View>
            ))}
            {images.map((item, index) => (
              <Image key={index} style={styles.image} source={{ uri: item }} />
            ))}
            {images.length !== 0 && (
              <Buttons title='Сохранить' onPress={handleSave} />
            )}
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default GalleryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212e',
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