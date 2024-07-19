import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Buttons from '@/components/(buttons)/button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(client)/(map)/(recent-masters)/recent-masters'>;

const services = [
    { id: '1', label: 'Здоровье и красота волос' },
    { id: '2', label: 'Ногтевой сервис' },
    { id: '3', label: 'Ресницы и брови' },
    { id: '4', label: 'Уход за телом' },
    { id: '5', label: 'Уход за лицом' },
];

const RecentMastersByCategory = () => {
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const handlePress = (id: string) => {
        setCategoryId(prev => prev === id ? null : id); 
    };

    console.log(categoryId);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ height: screenHeight / 7 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <AntDesign name="close" size={24} color="white" onPress={() => navigation.goBack()} />
                            <Text style={{ fontSize: 20, color: 'white' }}>По услуги</Text>
                        </View>
                        <View>
                            <Buttons title='Сбросить' />
                        </View>
                    </View>
                </View>
                <View style={styles.servicesContainer}>
                    {services.map((service) => (
                        <TouchableOpacity key={service.id} activeOpacity={0.7} style={styles.serviceItem}>
                            <Text style={styles.serviceText}>{service.label}</Text>
                            <Pressable
                                onPress={() => handlePress(service.id)}
                                style={[
                                    styles.checkbox,
                                    categoryId === service.id
                                        ? { backgroundColor: "#9C0A35" }
                                        : { backgroundColor: "#B9B9C9", borderWidth: 2, borderColor: "gray" }
                                ]}
                            >
                                {categoryId === service.id && (
                                    <Ionicons name="checkmark" size={18} color="white" style={styles.checkmark} />
                                )}
                            </Pressable>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RecentMastersByCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        position: 'relative',
    },
    servicesContainer: {
        paddingHorizontal: 10,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B9B9C9',
        borderRadius: 8,
        padding: 15,
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    serviceText: {
        color: 'black',
        marginLeft: 10,
        fontSize: 16,
    },
    checkbox: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginRight: 10,
    },
    checkmark: {
        fontWeight: 'bold',
    },
});
