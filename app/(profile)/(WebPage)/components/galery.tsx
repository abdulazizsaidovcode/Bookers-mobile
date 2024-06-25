import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const galleryData = [
    { image: 'https://picsum.photos/200/300', description: 'Капсульное наращивание волос' },
    { image: 'https://picsum.photos/200/301', description: 'Капсульное наращивание волос' },
    { image: 'https://picsum.photos/200/302', description: 'Капсульное наращивание волос' }
];

const Gallery: React.FC = () => {
    return (
        <ScrollView style={styles.contentContainer}>
            {galleryData.map((item, index) => (
                <View key={index} style={styles.galleryItem}>
                    <Image source={{ uri: item.image }} style={styles.galleryImage} />
                    <Text style={styles.galleryDescription}>{item.description}</Text>
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
    galleryItem: {
        marginBottom: 16,
    },
    galleryImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    galleryDescription: {
        color: '#ccc',
    },
});

export default Gallery;
