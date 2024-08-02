import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Buttons from '@/components/(buttons)/button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { useMapStore } from '@/helpers/state_managment/map/map';
import { useFocusEffect } from '@react-navigation/native';
import { getCategory } from '@/helpers/api-function/masters';
import useTopMastersStore from '@/helpers/state_managment/masters';
import { postClientFilter } from '@/helpers/api-function/uslugi/uslugi';
import { getFile } from '@/helpers/api';
import tw from 'tailwind-react-native-classnames';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(client)/(map)/(recent-masters)/recent-masters'>;

const RecentMastersByCategory = () => {
    const { categoryId, setCategoryId } = useMapStore();
    const { category } = useTopMastersStore();
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const handlePress = (id: string) => {
        setCategoryId((prev) => (prev === id ? null : id));
    };

    const handleReset = () => {
        setCategoryId(null);
    };

    useFocusEffect(
        useCallback(() => {
            getCategory();
            return () => { };
        }, [])
    );
    const hadleSumbit = () => {
        try {
            postClientFilter([categoryId ? categoryId : ''])
            navigation.goBack()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerLeft}>
                            <AntDesign name="close" size={24} color="white" onPress={() => navigation.goBack()} />
                            <Text style={styles.headerText}>По услуги</Text>
                        </View>
                        <View style={{ width: screenWidth / 3 }}>
                            <Buttons title='Сбросить' onPress={handleReset} isDisebled={categoryId !== null} />
                        </View>
                    </View>
                </View>
                <View style={styles.servicesContainer}>
                    {category.map((item) => (
                        <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.serviceItem}
                            onPress={() =>
                                handlePress(item.id)
                            }
                        >
                            <Image
                                source={
                                    item.attachmentId
                                        ? { uri: `${getFile}${item.attachmentId}` }
                                        : require('../../../../assets/avatar.png')
                                }
                                style={tw`w-8 h-8`}
                            />
                            <Text style={styles.serviceText}>{item.name}</Text>
                            <Pressable
                                onPress={() => handlePress(item.id)}
                                style={[
                                    styles.checkbox,
                                    categoryId === item.id
                                        ? { backgroundColor: "#9C0A35" }
                                        : { backgroundColor: "#B9B9C9", borderWidth: 2, borderColor: "gray" }
                                ]}
                            >
                                {categoryId === item.id && (
                                    <Ionicons name="checkmark" size={18} color="white" style={styles.checkmark} />
                                )}
                            </Pressable>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', padding: 10, bottom: 0, width: screenWidth }}>
                <Buttons title='Показать результаты' isDisebled={categoryId !== null} onPress={hadleSumbit} />
            </View>
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
    header: {
        height: screenHeight / 7,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 20
    },
    headerLeft: {
        flexDirection: 'row',
        gap: 15,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
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
})