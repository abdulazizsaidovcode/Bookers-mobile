import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from '@/components/navigation/navigation-menu';

const sessionData = [
    { id: '1', title: 'Предстоящие записи', icon: 'calendar', count: 2, screen: '(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries' },
    { id: '2', title: 'Прошедшие записи', icon: 'history', count: 2, screen: '(profile)/(sessionhistory)/components/Pastentries/Pastentries' },
    { id: '3', title: 'Отменённые записи', icon: 'times-circle', count: 1, screen: '(profile)/(sessionhistory)/components/Canceledentries/Canceledentries' },
];

const SessionHistory: React.FC = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate(item.screen)}
        >
            <View style={styles.itemContent}>
                <FontAwesome name={item.icon} size={24} color="#E74C3C" style={styles.itemIcon} />
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemCount}>{item.count}</Text>
                <FontAwesome name="chevron-right" size={24} color="#E74C3C" style={styles.itemIcon} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='Tarifi' />
            <View style={styles.padding}>
                <Text style={styles.title}>История сеансов</Text>
                <FlatList
                    data={sessionData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
    },
    padding: {
        padding: 16
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        backgroundColor: '#B9B9C9',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        marginRight: 16,
    },
    itemText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemCount: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 16,
    },
});

export default SessionHistory;
