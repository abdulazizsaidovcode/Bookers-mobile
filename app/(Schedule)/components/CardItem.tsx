import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CardItemProps {
    name: string;
    phone: string;
    service: string;
    price: number;
    startTime: string;
    endTime: string;
}

const CardItem: React.FC<CardItemProps> = ({ name, phone, service, price, startTime, endTime }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                {/* <Image source={require('./path/to/avatar.png')} style={styles.avatar} /> */}
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                    <Text style={styles.service}>{service}</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.duration}>Длительность:</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{startTime}</Text>
                    <Text style={styles.time}>{endTime}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#b9b9c9',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    phone: {
        color: '#666',
        marginTop: 5,
    },
    service: {
        borderColor: '#666',
        color: '#666',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginVertical: 5,
    },
    price: {
        color: '#9C0A35',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    duration: {
        color: '#666',
    },
    timeContainer: {
        flexDirection: 'row',
    },
    time: {
        borderColor: '#9c0935',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginLeft: 5,
        color: '#9c0A35',
    },
});

export default CardItem;
