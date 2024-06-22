import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';
import NavigationMenu from '@/components/navigation/navigation-menu';
import CalendarGraffic from './calendar';

const WorkDays = () => {
    const items = [
        { id: 1, name: 'Понедельник' },
        { id: 2, name: 'Вторник' },
        { id: 3, name: 'Среда' },
        { id: 4, name: 'Четверг' },
        { id: 5, name: 'Пятница' },
        { id: 6, name: 'Суббота' },
        { id: 7, name: 'Воскресенье' },
    ]

    return (
        <SafeAreaView style={styles.container}>
             <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
             <NavigationMenu name={`График работы`}/>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.title}>График работы с</Text>
                    <CalendarGraffic/>
                </View>
                <View style={styles.fullHeightSection}>
                    <Text style={styles.title}>Выберите рабочие дни в неделю</Text>
                    <View style={styles.categoriesContainer}>
                        {items.map((item, index) => (
                            <ServicesCategory key={index} title={item.name} />
                        ))}
                    </View>
                    <View style={{ padding: 10 }}>
                        <Buttons title='Продолжить' onPress={() => router.push('(free)/(work-grafic)/workGrafic')} />
                    </View>
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
        height: 430,
        display: "flex",
        gap: 20
    },
    fullHeightSection: {
        flex: 1,
        marginTop: 10
    },
    title: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 15,
    },
    categoriesContainer: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        gap: 5,
        paddingVertical: 10
    },
});
