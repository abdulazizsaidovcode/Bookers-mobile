import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import BottomModal from '@/components/(modals)/modal-bottom';

const PickImageTariff = () => {
  
  const { height } = Dimensions.get('window');
  const [images, setImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Kamera ruxsati kerak!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
    setModalVisible(false);
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Media kutubxonasiga ruxsat kerak!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
    setModalVisible(false);
  };

  const deleteSelectedImages = () => {
    setImages([]);
  }

  return (
    <View style={tw`p-3`}>
      <Text style={tw`text-gray-500 text-xl mb-2`}>Фото услуги</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        <View style={[tw`p-4 h-50 border bg-gray-500 rounded-xl`, { backgroundColor: '#4B4B64' }]}>
          <View style={tw`flex flex-row justify-center items-center p-6 h-40`}>
            <AntDesign name="pluscircleo" size={24} color="black" />
            <Text style={tw`ml-2`}>Добавить фото</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={tw`mt-4`}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={tw`w-full h-40 rounded mb-4`}
          />
        ))}
      </View>

      {images.length > 0 && (
        <TouchableOpacity
          style={tw`mt-4 p-2 bg-red-500 rounded`}
          onPress={deleteSelectedImages}
        >
          <Text style={tw`text-white text-center`}>Удалить все фото</Text>
        </TouchableOpacity>
      )}

      <BottomModal
        isBottomModal={modalVisible}
        toggleBottomModal={() => setModalVisible(false)}
        children={
          <View style={[tw`w-full mt-3`, { maxHeight: 400 }]}>
            <View >
              <TouchableOpacity onPress={pickImageFromCamera}>
                <Text style={tw`text-xl text-white`}>Сделать фото</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={pickImageFromGallery}>
                <Text>Выбрать из галереи</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => setModalVisible(false)}>
                <Text>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PickImageTariff;
