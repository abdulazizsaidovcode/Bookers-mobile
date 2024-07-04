import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useRoute } from '@react-navigation/native';
import { delPhoto, editName, fetchFullData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { getFile } from '@/helpers/api';
import CenteredModal from '@/components/(modals)/modal-centered';
import Buttons from '@/components/(buttons)/button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomModal from '@/components/(modals)/modal-bottom';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');


const GalleryDetails: React.FC = () => {
  const route = useRoute();
  const { fullData, setFullData, setData } = useGalleryStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
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

  const handleConfirm = () => {
    editName(id, setFullData, name, toggleModal, setData);
  };

  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedImages([]);
    setSelectAll(false);
  };

  const handleImageSelect = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDelete = () => {
    setIsDeleteMode(false);
    delPhoto(id, selectedImages, setFullData, setData);
    setSelectedImages([]);
    setSelectAll(false);
  };

  const requestPermissions = async (type: 'camera' | 'gallery') => {
    const { status } = type === 'camera'
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== 'granted') {
    //   Alert.alert(`Sorry, we need ${type} permissions to make this work!`);
    //   return false;
    // }
    return true;
  };

  const pickImage = async (from: 'camera' | 'gallery') => {
    const hasPermission = await requestPermissions(from);
    if (!hasPermission) return;

    const result = from === 'camera'
      ? await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      : await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => ({ uri: asset.uri }));
      // Handle adding new images here
    }
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

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {isDeleteMode ? (
          <View style={styles.deleteModeBar}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <AntDesign onPress={handleDeleteMode} name="close" size={24} color="white" />
                <Text style={styles.deleteModeText}>{selectedImages.length}</Text>
              </View>
              <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setSelectAll(!selectAll)}>
                <MaterialIcons
                  name={selectAll ? "check-box" : "check-box-outline-blank"}
                  size={24}
                  color="#9C0A35"
                />
              </TouchableOpacity>
              <Text style={styles.deleteModeText}>выделить все</Text>
            </View>
            <View>
              <TouchableOpacity onPress={handleDeleteMode}>
                <MaterialIcons name="delete" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <NavigationMenu all={true} name='' editOnPress={toggleModal} delOnPress={handleDeleteMode} addOnPress={toggleBottomModal} />
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{fullData.albumName}</Text>
          <View style={styles.imagesContainer}>
            {fullData.resGalleryAttachments.map((albumItem, albumIndex) => (
              <View key={albumIndex} style={styles.imageWrapper}>
                {isDeleteMode && (
                  <View style={styles.checkIcon}>
                    <TouchableOpacity onPress={() => handleImageSelect(albumItem.attachmentId)}>
                      <MaterialIcons
                        name={selectedImages.includes(albumItem.attachmentId) ? "check-box" : "check-box-outline-blank"}
                        size={24} color={"#9C0A35"} />
                    </TouchableOpacity>
                  </View>
                )}
                <Image
                  style={styles.image}
                  source={{ uri: getFile + albumItem.attachmentId }}
                />
              </View>
            ))}
            {isDeleteMode && (
              <Buttons title='Delete Selected' onPress={handleDelete} />
            )}
          </View>
        </View>
        <CenteredModal
          toggleModal={toggleModal}
          isModal={isOpen}
          btnWhiteText="Cancel"
          btnRedText="Confirm"
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
  deleteModeText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
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
});
