import { getFile } from "@/helpers/api";
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import webPageStore from "@/helpers/state_managment/wepPage/wepPage";
import { useNavigation } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
const halfWidth = width / 2;
const isSmallDevice = width < 375;
const placeholderImage = "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

const Gallery: React.FC = () => {
  const { galeriya, setGaleriyaDetail } = webPageStore();
  const navigation = useNavigation<any>();

  const renderRows = (attachments: any[]) => {
    let filteredAttachments = attachments

    if (filteredAttachments.length !== 0) {
      // If there are no main attachments, use the first 4 attachments instead
      filteredAttachments = attachments.slice(0, 4);
    } // Limit to 4 images

    const rows: any[] = [];
    for (let i = 0; i < filteredAttachments.length; i += 2) {
      const rowItems = filteredAttachments
        .slice(i, i + 2)
        .map((attachment: any, index: number) => (
          <Image
            key={index}
            source={{ uri: getFile + attachment.attachmentId }}
            style={styles.image}
          />
        ));

      // Add placeholder images to fill the row to 2 items
      while (rowItems.length < 2) {
        rowItems.push(
          <Image
            key={`placeholder-${rowItems.length}`}
            source={{ uri: placeholderImage }}
            style={styles.image}
          />
        );
      }

      rows.push(
        <View style={styles.imageRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={styles.contentContainer}>
      {galeriya && galeriya.length > 0 ? (
        <View style={styles.galleryWrapper}>
          {galeriya.map(
            (item: any) =>
              item.resGalleryAttachments &&
              item.resGalleryAttachments.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setGaleriyaDetail(item);
                    navigation.navigate(
                      "(profile)/(WebPage)/components/galleryDetail"
                    );
                  }}
                  activeOpacity={0.7}
                  key={item.id}
                  style={styles.galleryContainer}
                >
                  {renderRows(item.resGalleryAttachments)}
                  <Text style={styles.caption}>{item.albumName}</Text>
                </TouchableOpacity>
                
              )
          )}
        </View>
      ) : (
        <Text style={styles.noDataText}>No gallery data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },
  galleryWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  galleryContainer: {
    width: halfWidth - 20,
    alignItems: "center",
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  image: {
    width: isSmallDevice ? 140 : (halfWidth - 40) / 2 - 10,
    height: isSmallDevice ? 140 : (halfWidth - 40) / 2 - 10,
    borderRadius: 10,
    margin: 5,
  },
  caption: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  noDataText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});

export default Gallery;
