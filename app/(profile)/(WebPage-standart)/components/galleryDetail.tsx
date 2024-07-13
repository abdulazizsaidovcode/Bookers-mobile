import NavigationMenu from "@/components/navigation/navigation-menu";
import { getFile } from "@/helpers/api";
import webPageStore from "@/helpers/state_managment/wepPage/wepPage";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

const GalleryDetailEdit: React.FC = () => {
  const { galeriyaDetail } = webPageStore();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImagePress = (attachment: any) => {
    setSelectedImage(attachment);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // galeriyaDetail o'zgaruvchisi faqat bitta obyektni o'z ichiga oladi
  const item = galeriyaDetail; // Boshqa ma'lumotlar yo'q bo'lgan holda, birinchi elementni olish

  const renderRows = (attachments: any[]) => {
    let filteredAttachments = attachments.filter(
      (attachment) => attachment.main === true || attachment.main === false
    );

    if (filteredAttachments.length === 0) {
      // If there are no main attachments, use the first 4 attachments instead
      filteredAttachments = attachments.slice(0, 4);
    }

    const rows: JSX.Element[] = [];
    for (let i = 0; i < filteredAttachments.length; i += 3) {
      const rowItems = filteredAttachments
        .slice(i, i + 3)
        .map((attachment: any, index: number) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(attachment)}>
            <Image
              source={{ uri: getFile + attachment.attachmentId }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ));
      rows.push(
        <View style={styles.imageRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationMenu name='https://bookers/link/natali...' />
      <ScrollView style={styles.contentContainer}>
        {item && item.resGalleryAttachments && item.resGalleryAttachments.length > 0 ? (
          <View style={styles.galleryContainer} key={item.id}>
            <Text style={styles.caption}>{item.albumName}</Text>
            {renderRows(item.resGalleryAttachments)}
          </View>
        ) : (
          <Text style={styles.noDataText}>No gallery data available</Text>
        )}

        {/* Modal to display full screen image */}
        <Modal
          visible={selectedImage !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <Image
                source={{ uri: selectedImage ? getFile + selectedImage.attachmentId : '' }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },
  container: {
    flex: 1,
    backgroundColor: '#21212E',
  },
  galleryContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
    justifyContent: "space-between", // Rasmlar orasida o'rtacha bo'lishi uchun
  },
  image: {
    width: isSmallDevice ? 100 : (width - 64) / 3 - 10, // Har bir rasmni to'liq ekranda ko'rsatish uchun o'lchamlar
    height: isSmallDevice ? 100 : (width - 64) / 3 - 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  caption: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  noDataText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: "90%",
    height: "90%",
  },
});

export default GalleryDetailEdit;
