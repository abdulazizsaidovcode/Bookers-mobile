import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import CardItem from '../CardItem';

const bookedItems = [
    {
        name: 'Гузаль Шерматова',
        phone: '+998 93 123-45-67',
        service: 'Стрижка, укладка',
        price: '350 000 сум',
        startTime: '08:00',
        endTime: '08:30',
    },
    {
        name: 'Гузаль Шерматова',
        phone: '+998 93 123-45-67',
        service: 'Стрижка, укладка',
        price: '350 000 сум',
        startTime: '09:00',
        endTime: '09:30',
    },
];

const AvailableAccordion: React.FC = () => {
    return (
        <List.Accordion
            title="Забронированное время"
            titleStyle={styles.title}
            style={styles.accordionContainer}
            theme={{ colors: { background: 'transparent' } }}
        >
            <View style={styles.accordionContent}>
                {bookedItems.map((item, index) => (
                    <CardItem
                        key={index}
                        name={item.name}
                        phone={item.phone}
                        service={item.service}
                        price={item.price}
                        startTime={item.startTime}
                        endTime={item.endTime}
                    />
                ))}
            </View>
        </List.Accordion>
    );
};

const styles = StyleSheet.create({
    accordionContainer: {
        backgroundColor: 'transparent',
    },
    title: {
        color: '#fff',
    },
    accordionContent: {
        // padding: 10,
        paddingLeft: 0
    },
});

export default AvailableAccordion;
