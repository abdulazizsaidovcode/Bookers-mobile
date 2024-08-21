import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Buttons from '../(buttons)/button';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const BusinessCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/avatar.png')} // Replace with your comb icon URI
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Гузаль Шерматова</Text>
                    <Text style={styles.title}>King barber</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.description}>
                    Парехмехерские услуги{'\n'}
                    +998 93 171 63 80{'\n'}
                    @telegramsomename{'\n'}
                    г. Ташкент, ул. Амира Темура, 40,{'\n'}
                    ресторан Восток
                </Text>
                <Image
                    source={require('../../assets/avatar.png')} // Replace with your QR code URI
                    style={styles.qrCode}
                />
            </View>
            <View style={{ paddingVertical: 5 }}>
                <Buttons title='Скачать' backgroundColor='white' textColor='#9C0A35' bordered={true} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderColor: '#C70039',
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: screenWidth / 9.6,
        height: screenHeight / 20,
        marginRight: 10,
        objectFit: 'cover'
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    title: {
        fontSize: 16,
        color: '#C70039',
    },
    description: {
        fontSize: 12,
        marginTop: 10,
        lineHeight: 20,
        color: '#333333'
    },
    qrCode: {
        width: 80,
        height: 80,
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#C70039',
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default BusinessCard;
