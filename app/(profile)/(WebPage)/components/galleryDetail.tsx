import { getFile } from '@/helpers/api';
import webPageStore from '@/helpers/state_managment/wepPage/wepPage';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const galleryData = [
    {
        id: 42,
        albumName: 'test',
        date: '2024-06-27',
        photos: null,
        mainPhotos: null,
        resGalleryAttachments: [
            {
                attachmentId: '29287b44-deaa-4e08-a402-e6ad9752ed84',
                main: true,
                newStatus: false
            },
            {
                attachmentId: 'eead07b9-277a-4f62-8459-d4c210dd90ea',
                main: false,
                newStatus: false
            },
            {
                attachmentId: '91d3c3ab-e7da-48b8-9733-0fe709f313fa',
                main: false,
                newStatus: false
            }
        ]
    },
    // Add more items as needed
];

const GalleryDetail: React.FC = () => {
    const { galeriya } = webPageStore();

    const renderRows = (data: typeof galleryData) => {
        const rows: any = [];
        data.forEach(item => {
            const rowItems = item.resGalleryAttachments.map((attachment, index) => (
                <Image key={index} source={{ uri: getFile + attachment.attachmentId }} style={styles.image} />
            ));
            rows.push(
                <View style={styles.imageRow} key={item.id}>
                    {rowItems}
                </View>
            );
        });
        return rows;
    };

    return (
        <ScrollView style={styles.contentContainer}>
            {galleryData.map((item, index) => (
                <View style={styles.galleryContainer} key={item.id}>
                    {renderRows([item])}
                    <Text style={styles.caption}>{item.albumName}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#21212E',
    },
    galleryContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    image: {
        width: isSmallDevice ? 75 : (width - 64) / 4 - 10,
        height: isSmallDevice ? 75 : (width - 64) / 4 - 10,
        borderRadius: 10,
        margin: 5,
    },
    caption: {
        marginTop: 10,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});

export default GalleryDetail;
