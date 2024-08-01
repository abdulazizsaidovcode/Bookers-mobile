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
const galll = [{"attachmentId": "08c63dec-7dce-49f8-a4a4-c132cedb6f6c", "attachmentStatus": "APPROVED", "main": true, "message": null, "newStatus": false}, {"attachmentId": "2ec36278-a1dc-4924-af57-8d4737fa3a7b", "attachmentStatus": "APPROVED", "main": true, 
  "message": null, "newStatus": false}, {"attachmentId": "afad3f0a-9894-4a40-b8bd-53490bcabb80", "attachmentStatus": "APPROVED", "main": true, "message": null, "newStatus": false}, {"attachmentId": "afad3f0a-9894-4a40-b8bd-53490bcabb80", "attachmentStatus": "APPROVED", "main": true, "message": null, "newStatus": false},{"attachmentId": "afad3f0a-9894-4a40-b8bd-53490bcabb80", "attachmentStatus": "APPROVED", "main": true, "message": null, "newStatus": false},{"attachmentId": "afad3f0a-9894-4a40-b8bd-53490bcabb80", "attachmentStatus": "APPROVED", "main": false, "message": null, "newStatus": false}]

const Gallery: React.FC = () => {
  const { setGaleriyaDetail } = webPageStore();
  const { masterGallery } = ClientStory();
  const navigation = useNavigation<any>();

  const renderRows = (attachments: any[]) => {
    let filteredAttachments = galll.filter(
      (attachment) => attachment.main
    );

    if (filteredAttachments.length !== 0) {
      // If there are no main attachments, use the first 4 attachments instead
      filteredAttachments = galll.slice(0, 4);
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
      {masterGallery && masterGallery.length > 0 ? (
        <View style={styles.galleryWrapper}>
          {masterGallery.map(
            (item: any) =>
              item.resGalleryAttachments &&
              item.resGalleryAttachments.length > 0 && (
                <>
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
                </>
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
