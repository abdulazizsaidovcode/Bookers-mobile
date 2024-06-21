import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Pressable, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-locations-main'>;

const SettingsLocationMain: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Pressable onLongPress={() => Alert.alert('salom')}></Pressable>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('(settings)/(settings-location)/settings-locations')}>
                    <View style={styles.card}>
                        <View >
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Entypo name="location" size={24} color="#9C0A35" />
                                <Text style={styles.cardText}>Адрес работы</Text>
                            </View>
                            <View>
                                <Text style={styles.daysText}>Адрес работы не настроен!</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsLocationMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    pressable: {
        padding: 10,
        marginTop: 20,
    },
    card: {
        backgroundColor: '#b9b9c9',
        borderRadius: 15,
        marginBottom: 15,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    icon: {
        width: 24,
        height: 24,
    },
    cardText: {
        color: 'black',
        fontSize: 20,
        marginBottom: 5,
    },
    daysText: {
        color: '#000',
        fontSize: 14,
    },
    timeText: {
        color: '#ffffff',
        fontSize: 16,
    },
});
