import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NotificationCard: React.FC<{ item: any }> = ({ item }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.link}>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#B9B9C9',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        marginBottom: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
    },
    message: {
        color: '#4F4F4F',
        marginTop: 4,
    },
    time: {
        color: '#888',
        marginTop: 8,
        fontSize: 12,
    },
    link: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
});

export default NotificationCard;
