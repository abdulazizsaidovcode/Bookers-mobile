import { getFile } from "@/helpers/api";
import webPageStore from "@/helpers/state_managment/wepPage/wepPage";
import { router, useNavigation } from "expo-router";
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
const isSmallDevice = width < 375;

const GalleryEdit: React.FC = () => {
  const { galeriya, setGaleriyaDetail } = webPageStore();
  const navigation = useNavigation<any>();

  const renderRows = (attachments: any[]) => {
    
    let filteredAttachments = attachments.filter(
      (attachment) => attachment.main
    );

    if (filteredAttachments.length === 0) {
      // If there are no main attachments, use the first 4 attachments instead
      filteredAttachments = attachments.slice(0, 4);
    }

    const rows: any[] = [];
    for (let i = 0; i < filteredAttachments.length; i += 4) {
      const rowItems = filteredAttachments
        .slice(i, i + 4)
        .map((attachment: any, index: number) => (
          <Image
            key={index}
            source={{ uri: getFile + attachment.attachmentId }}
            style={styles.image}
          />
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
    <ScrollView style={styles.contentContainer}>
      {galeriya && galeriya.length > 0 ? (
        galeriya.map(
          (item: any) =>
            item.resEditAttachments &&
            item.resGalleryAttachments.length > 0 && (
              <TouchableOpacity onPress={() => {
                setGaleriyaDetail(item)
                navigation.navigate("(profile)/(WebPage)/components/galleryDetail")
              }} activeOpacity={0.7}>
                <View style={styles.galleryContainer} key={item.id}>
                  {renderRows(item.resGalleryAttachments)}
                  <Text style={styles.caption}>{item.albumName}</Text>
                </View>
              </TouchableOpacity>
            )
        )
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
  galleryContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  image: {
    width: isSmallDevice ? 75 : (width - 64) / 4 - 10,
    height: isSmallDevice ? 75 : (width - 64) / 4 - 10,
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

export default GalleryEdit;
