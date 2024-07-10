import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { fetchData } from '@/helpers/api-function/gallery/settings-gallery';
import webPageStore from '@/helpers/state_managment/wepPage/wepPage';
import { getUser } from '@/helpers/api-function/getMe/getMee';
import { getCategoryF, getGaleriya, getspecialization } from '@/helpers/api-function/wepPage/wepPage';
import GalleryStandart from './components/galery';
import ServicesStandart from './components/Services';

const WebPageStandart: React.FC = () => {
    const {setGaleriya, setGetMee, setCategory, setspecialization, getme} = webPageStore()
    const [activeTab, setActiveTab] = useState('services');
    useEffect(() => {
        getGaleriya(setGaleriya)
        getUser(setGetMee)
        getCategoryF(setCategory)
        getspecialization(setspecialization, getme && getme.id ? getme.id : null)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='https:/...' />

            <View style={styles.tabsContainer}>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'services' && styles.activeTab]} onPress={() => setActiveTab('services')}>
                    <Text style={styles.tabButtonText}>Услуги</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'gallery' && styles.activeTab]} onPress={() => setActiveTab('gallery')}>
                    <Text style={styles.tabButtonText}>Галерея</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'services' ? <ServicesStandart /> : <GalleryStandart />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#21212E',
        paddingVertical: 8,
        gap: 8,
        paddingHorizontal: 16,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    activeTab: {
        backgroundColor: '#9c0935',
    },
    tabButtonText: {
        color: '#fff',
    },
});

export default WebPageStandart;
