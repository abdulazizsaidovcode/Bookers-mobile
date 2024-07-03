import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Services from './components/Services';
import Gallery from './components/galery';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { fetchData } from '@/helpers/api-function/gallery/settings-gallery';
import webPageStore from '@/helpers/state_managment/wepPage/wepPage';
import { getUser } from '@/helpers/api-function/getMe/getMee';
import { fetchServices } from '@/helpers/api-function/client/client';

const WebPage: React.FC = () => {
    const {setGaleriya, setGetMee, setServise} = webPageStore()
    const [activeTab, setActiveTab] = useState('services');
    useEffect(() => {
        fetchData(setGaleriya)
        getUser(setGetMee)
        fetchServices(setServise)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='https://bookers/link/natali...' />

            <View style={styles.tabsContainer}>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'services' && styles.activeTab]} onPress={() => setActiveTab('services')}>
                    <Text style={styles.tabButtonText}>Услуги</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'gallery' && styles.activeTab]} onPress={() => setActiveTab('gallery')}>
                    <Text style={styles.tabButtonText}>Галерея</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'services' ? <Services /> : <Gallery />}
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

export default WebPage;
