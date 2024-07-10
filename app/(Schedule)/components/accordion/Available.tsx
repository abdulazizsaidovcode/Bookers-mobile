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
        <View style={styles.cont}>
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
                            startTime={item.startTime.slice(0,5)}
                            endTime={item.finishTime.slice(0,5)}
                        />
                    )) :
                        <Text style={styles.placeholderText}>заказанных нет</Text>
                    }
                </View>
            </List.Accordion>
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#21212E',
    },

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
