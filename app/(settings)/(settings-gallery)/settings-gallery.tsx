import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableWithoutFeedback, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addData, fetchData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import NavigationMenu from '@/components/navigation/navigation-menu';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SettingsGallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [mainImageIndices, setMainImageIndices] = useState<number[]>([]);
  const [selectedImageIndices, setSelectedImageIndices] = useState<number[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);
  const [showMainSwitch, setShowMainSwitch] = useState<boolean>(false);
  const [albumName, setAlbumName] = useState<string>('');
  const navigation = useNavigation()

  const { setData } = useGalleryStore();

  const mainPhotos = mainImageIndices.length > 0 ? mainImageIndices.map(index => images[index]).slice(0, 4) : [];

  const pickImageFromCamera = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const pickImageFromGallery = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    setShowMainSwitch(false);
    setSelectedImageIndices([]);
  };

  const toggleMainShow = () => {
    setShowMainSwitch(!showMainSwitch);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter(i => i !== index);
      } else if (prevIndices.length < 4) {
        return [...prevIndices, index];
      } else {
        return prevIndices;
      }
    });
  };

  const handleMainImageSelect = (index: number) => {
    setMainImageIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter(i => i !== index);
      } else if (prevIndices.length < 4) {
        return [...prevIndices, index];
      } else {
        return prevIndices;
      }
    });
  };

  const deleteSelectedImages = () => {
    if (selectedImageIndices.length > 0) {
      const updatedImages = images.filter((_, index) => !selectedImageIndices.includes(index));
      setImages(updatedImages);
      setSelectedImageIndices([]);
      setMainImageIndices([]);
      setShowCheckboxes(false);
      setShowMainSwitch(false);
    }
  };

  const saveAlbum = async () => {
    if (albumName && images.length > 0) {
      const formData = new FormData();
      const remainingImages = images.filter((_, index) => !mainImageIndices.includes(index));
      setImages(remainingImages);
      remainingImages.forEach((image, index) => {
        formData.append('photos', {
          uri: image,
          name: `photos[${index}].jpg`,
          type: 'image/jpeg',
        } as any);
      });

      mainPhotos.forEach((image, index) => {
        formData.append('mainPhotos', {
          uri: image,
          name: `mainPhotos[${index}].jpg`,
          type: 'image/jpeg',
        } as any);
      });

      addData(formData, albumName, setData, setImages, setAlbumName, setMainImageIndices, navigation.goBack());
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <NavigationMenu name='Создать альбом' deleteIcon toggleModal={toggleCheckboxes} />
        </View>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <View style={{ padding: 10, height: screenHeight / 1.20 }}>
            <Text style={styles.title}>Фото галерея</Text>
            <View style={{ marginTop: 10 }}>
              <LocationInput placeholder='Название альбома' value={albumName} labalVisible={true} onChangeText={setAlbumName} />
            </View>
            {images.length !== 0 ? !showMainSwitch ? <Text style={{ color: 'white', fontSize: 12, padding: 5 }}>Нажмите и удерживайте рамки, чтобы выбрать основное изображение.</Text> : '' : ''}
            {images && (
              <>
                {images.length !== 0 ? showMainSwitch && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18, padding: 5, width: 200 }}>Выберите основные фотографии</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <AntDesign name="close" size={24} color="white" onPress={() => {
                        toggleMainShow()
                        setMainImageIndices([])
                      }} />
                      <Feather name="check" size={24} color="white" onPress={toggleMainShow} />
                    </View>
                  </View>
                ) : ''}
                <View style={styles.imageRow}>
                  {images.map((image, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onLongPress={toggleMainShow}
                      onPress={() => showCheckboxes && handleImageSelect(index)}
                    >
                      <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                        {showCheckboxes && (
                          <View style={styles.checkIcon}>
                            <MaterialIcons
                              name={selectedImageIndices.includes(index) ? "check-box" : "check-box-outline-blank"}
                              size={26} color={selectedImageIndices.includes(index) ? "#9C0A35" : '#fff'} />
                          </View>
                        )}
                        {showMainSwitch && (
                          <TouchableWithoutFeedback onPress={() => handleMainImageSelect(index)}>
                            <View style={styles.mainCheckIcon}>
                              <MaterialIcons
                                name={mainImageIndices.includes(index) ? "check-box" : "check-box-outline-blank"}
                                size={26} color={mainImageIndices.includes(index) ? "#9C0A35" : '#fff'} />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
                {showCheckboxes && (
                  <View style={styles.switchContainer}>
                    <View style={{ width: "50%" }}>
                      <Buttons title="Удалить выбранные" textSize={15} onPress={deleteSelectedImages} />
                    </View>
                    <View style={{ width: "50%" }}>
                      <Buttons title="Назад" backgroundColor='white' textColor='#9C0A35' textSize={15}
                        onPress={() => {
                          setShowCheckboxes(false);
                          setSelectedImageIndices([]);
                          setShowMainSwitch(false);
                        }}
                      />
                    </View>
                  </View>
                )}
              </>
            )}
            <View style={{ marginTop: 10 }}>
              <View style={{ width: 200 }}>
                <Buttons
                  icon={<Feather name="upload-cloud" size={20} color="white" />} title={` Загрузить фото`}
                  onPress={pickImageFromGallery}
                />
              </View>
              <View style={{ width: 180, marginTop: 10 }}>
                <Buttons
                  icon={<Ionicons name="camera-outline" size={20} color="white" />} title={` Сделать фото`}
                  onPress={pickImageFromCamera}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Buttons
            title={`Сохранить`}
            onPress={saveAlbum}
            isDisebled={!(images.length === 0 || !albumName || mainPhotos.length === 0)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212e',
  },
  title: {
    color: 'white',
    fontSize: 27,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    margin: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth / 3 - 25,
    height: screenHeight / 7,
    borderRadius: 15,
  },
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  mainCheckIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  switchLabel: {
    color: 'white',
    marginRight: 10,
  },
  mainSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  mainSwitchLabel: {
    color: 'white',
    marginRight: 10,
    fontSize: 16,
  },
});