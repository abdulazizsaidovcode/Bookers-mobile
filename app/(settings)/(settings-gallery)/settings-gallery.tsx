import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Switch,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationInput from "@/components/(location)/locationInput";
import Buttons from "@/components/(buttons)/button";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useGalleryStore from "@/helpers/state_managment/gallery/settings-gallery";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addData } from "@/helpers/api-function/gallery/settings-gallery";

const { width, height } = Dimensions.get("window");

const SettingsGallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);
  const [selectedImageIndices, setSelectedImageIndices] = useState<number[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);
  const [showMainSwitch, setShowMainSwitch] = useState<boolean>(false);
  const [albumName, setAlbumName] = useState<string>("");

  const { data, setData } = useGalleryStore();

  const uploadImage = async (mode?: string) => {
    try {
      let result: ImagePicker.ImagePickerResult;
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets) {
        await saveImages(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const saveImages = async (image: string) => {
    setImages((prevImages) => [...prevImages, image]);
  };

  const saveAlbum = () => {
    const formData = new FormData();
    images.map((item) => {
      formData.append("photos", item);
    })
    formData.append("mainPhotos", null);
    addData(formData, albumName);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <NavigationMenu name="Создать альбом" deleteIcon />
        <View style={styles.content}>
          <Text style={styles.title}>Фото галерея</Text>
          <LocationInput
            placeholder="Название альбома"
            labalVisible
            onChangeText={setAlbumName}
          />
          {images.length > 0 && (
            <>
              <View style={styles.imageRow}>
                {images.map((image, index) => (
                  <TouchableWithoutFeedback key={index}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: image }} style={styles.image} />
                      {showCheckboxes && (
                        <View style={styles.checkIcon}>
                          <MaterialIcons
                            name={
                              selectedImageIndices.includes(index)
                                ? "check-circle"
                                : "radio-button-unchecked"
                            }
                            size={24}
                            color="#9C0A35"
                          />
                        </View>
                      )}
                      {showMainSwitch && (
                        <TouchableWithoutFeedback>
                          <View style={styles.mainCheckIcon}>
                            <MaterialIcons
                              name={
                                mainImageIndex === index
                                  ? "check-circle"
                                  : "radio-button-unchecked"
                              }
                              size={24}
                              color="#9C0A35"
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
              {showCheckboxes && (
                <View style={styles.switchContainer}>
                  <Buttons title="Удалить выбранные" textSize={15} />
                  <Buttons
                    title="Назад"
                    backgroundColor="white"
                    textColor="#9C0A35"
                    textSize={15}
                  />
                </View>
              )}
              {showMainSwitch && (
                <View style={styles.mainSwitchContainer}>
                  <Text style={styles.mainSwitchLabel}>
                    Сделать фото основным
                  </Text>
                  <Switch value={mainImageIndex !== null} />
                </View>
              )}
            </>
          )}
          <View style={styles.buttonContainer}>
            <Buttons
              icon={<Feather name="upload-cloud" size={20} color="white" />}
              title="Загрузить фото"
              onPress={() => uploadImage("gallery")}
            />
            <Buttons
              icon={<Ionicons name="camera-outline" size={20} color="white" />}
              title="Сделать фото"
              onPress={uploadImage}
            />
          </View>
        </View>
        <View style={styles.saveButtonContainer}>
          <Buttons title="Сохранить" onPress={saveAlbum} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
  },
  content: {
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 27,
    padding: 10,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageContainer: {
    margin: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width / 3 - 25,
    height: height / 7,
    borderRadius: 15,
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  mainCheckIcon: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  switchContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  switchLabel: {
    color: "white",
    marginRight: 10,
  },
  mainSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  mainSwitchLabel: {
    color: "white",
    marginRight: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    width: 200,
  },
  saveButtonContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
