import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, CheckBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useRoute } from '@react-navigation/native';
import { delPhoto, editName, fetchFullData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { getFile } from '@/helpers/api';
import CenteredModal from '@/components/(modals)/modal-centered';
import Buttons from '@/components/(buttons)/button';

const GalleryDetails: React.FC = () => {
  const route = useRoute();
  const { fullData, setFullData } = useGalleryStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { id } = route.params as { id: number };

  useEffect(() => {
    fetchFullData(id, setFullData);
  }, [id, setFullData]);

  const toggleModal = () => {
    setName(fullData.albumName);
    setIsOpen(!isOpen);
  };

  const handleConfirm = () => {
    editName(id, setFullData, name, toggleModal);
  };

  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedImages([]);
  };

  const handleImageSelect = (imageId: number) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDelete = () => {
    setIsDeleteMode(false);
    delPhoto(id, selectedImages, setFullData)
    setSelectedImages([]);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <NavigationMenu all={true} name='' editOnPress={toggleModal} delOnPress={handleDeleteMode} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{fullData.albumName}</Text>
          <View style={styles.imagesContainer}>
            {fullData.resGalleryAttachments.map((albumItem, albumIndex) => (
              <View key={albumIndex} style={styles.imageWrapper}>
                {isDeleteMode && (
                  <CheckBox
                    value={selectedImages.includes(albumItem.attachmentId)}
                    onValueChange={() => handleImageSelect(albumItem.attachmentId)}
                    style={styles.checkbox}
                  />
                )}
                <Image
                  style={styles.image}
                  source={{ uri: getFile + albumItem.attachmentId }}
                />
              </View>
            ))}
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
        {isDeleteMode && (
          <Buttons title='Delete Selected' onPress={handleDelete} />
        )}
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
    width: 110,
    height: 110,
    borderRadius: 15
  },
  checkbox: {
    position: 'absolute',
    top: 5,
    left: 5,
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
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
