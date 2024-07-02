import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';
import CardItem from '../CardItem';
import { useScheduleBookedStore } from '@/helpers/state_managment/schedule/schedule';
import { getBookedSchedule } from '@/helpers/api-function/schedule/schedule';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';


const AvailableAccordion: React.FC = () => {

    const { calendarDate } = graficWorkStore();
    const { schedule, setSchedule } = useScheduleBookedStore();

    useEffect(() => {
        getBookedSchedule(calendarDate, setSchedule)
        console.log(schedule);

    }, [calendarDate]);

    return (
        <List.Accordion
            title="Забронированное время"
            titleStyle={styles.title}
            style={styles.accordionContainer}
            theme={{ colors: { background: 'transparent' } }}
        >
            <View style={styles.accordionContent}>
                {schedule && schedule.length > 0 ? schedule.map((item, index) => (
                    <CardItem
                        key={index}
                        name={item.clientName}
                        phone={item.phoneNumber}
                        attachmentId={item.attachmentId}
                        service={item.serviceName}
                        price={item.price}
                        startTime={item.startTime}
                        endTime={item.finishTime}
                    />
                )) :
                    <Text style={styles.placeholderText}>заказанных нет</Text>
                }
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
        paddingLeft: 0
    },
    placeholderText: {
      color: 'gray',
  },
});

export default AvailableAccordion;
