import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarComponent from '@/components/calendar/MainCalendar';
import ServicesCategory from '@/components/services/servicesCatgegory';

const WorkDays = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.title}>График работы с</Text>
                    <CalendarComponent />
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>График работы с</Text>
                    <ServicesCategory title='Понедельник' isRadioButton />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WorkDays;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    section: {
        height: 400,
    },
    title: {
        fontSize: 23,
        color: 'white',
        marginBottom: 10,
        paddingHorizontal: 15,
    },
});
