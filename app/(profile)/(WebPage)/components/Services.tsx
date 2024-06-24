import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const servicesData = [
    {
        title: 'Женская для взрослых',
        description: 'Стрижка и укладка – это одно из важнейших вещей при создании красивого образа...',
        price: '350 000 сум',
        image: 'https://picsum.photos/200/300'
    }
];

const Services: React.FC = () => {
    return (
        <ScrollView style={styles.contentContainer}>
            <View style={styles.profileCard}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.profileImage} />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>Натали</Text>
                    <Text style={styles.profileTitle}>Женский мастер</Text>
                    <Text style={styles.profilePhone}>+998 93 525 88 02</Text>
                    <Text style={styles.profileTag}>Beauty Wave</Text>
                    <Text style={styles.profileRating}>★★★★☆</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Услуги Натали</Text>
            {servicesData.map((service, index) => (
                <View key={index} style={styles.serviceCard}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceDescription}>{service.description}</Text>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                    <Image source={{ uri: service.image }} style={styles.serviceImage} />
                    <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.moreButtonText}>Подробнее</Text>
                    </TouchableOpacity>
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
    profileCard: {
        flexDirection: 'row',
        backgroundColor: '#B9B9C9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    profileDetails: {
        justifyContent: 'center',
    },
    profileName: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileTitle: {
        color: '#555',
    },
    profilePhone: {
        color: '#555',
    },
    profileTag: {
        color: '#555',
    },
    profileRating: {
        color: '#555',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 16,
    },
    serviceCard: {
        backgroundColor: '#B9B9C9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    serviceTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    serviceDescription: {
        color: '#333',
        marginBottom: 8,
    },
    servicePrice: {
        color: '#9c0935',
        marginBottom: 8,
    },
    serviceImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    moreButton: {
        backgroundColor: '#9c0935',
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    moreButtonText: {
        color: '#fff',
    },
});

export default Services;
