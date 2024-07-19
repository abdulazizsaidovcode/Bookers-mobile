import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { useFocusEffect } from 'expo-router';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import { useCommunitySlider } from '@/helpers/state_managment/communitySlider/communitySliderStore';
import Slider from '@react-native-community/slider';
import { mapCustomStyle } from '@/type/map/map';
import Buttons from '@/components/(buttons)/button';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(client)/(map)/(recent-masters)/recent-masters'>;


const RecentMasters = () => {
    const { userLocation, setUserLocation } = useGetMeeStore();
    const { value, setValue } = useCommunitySlider();
    const [showByDistance, setShowByDistance] = useState(false);
    const navigation = useNavigation<SettingsScreenNavigationProp>();


    useFocusEffect(
        useCallback(() => {
            getUserLocation(setUserLocation);
            return () => { };
        }, [setUserLocation])
    );

    const toggleShowByDistance = () => setShowByDistance(!showByDistance);

    const data = [
        { lat: 37.78825, lon: -122.4324 },
        { lat: 36.78825, lon: -121.4324 },
    ];

    if (!userLocation || !userLocation.coords) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    {showByDistance ?
                        <View style={{ height: screenHeight / 7 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', gap: 15 }}>
                                    <AntDesign name="close" size={24} color="white" onPress={toggleShowByDistance} />
                                    <Text style={{ fontSize: 20, color: 'white' }}>По расстоянию</Text>
                                </View>
                                <View>
                                    <Buttons title='Сбросить' />
                                </View>
                            </View>
                        </View> :
                        <View>
                            <NavigationMenu name="На карте" />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity activeOpacity={0.7} style={[styles.button, { width: '48%' }]} onPress={toggleShowByDistance}>
                                    <Text style={styles.buttonText}>по расстоянию</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} style={[styles.button, { width: '48%' }]} onPress={() => navigation.navigate('(client)/(map)/(recent-masters)/recent-masters-by-category')}>
                                    <Text style={styles.buttonText}>по услугам</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}

                </View>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapCustomStyle}
                        style={styles.map}
                        initialRegion={{
                            latitude: userLocation.coords.latitude,
                            longitude: userLocation.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {data.map((item, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: item.lat,
                                    longitude: item.lon,
                                }}
                                title="Marker Title"
                                description="Marker Description"
                            />
                        ))}
                    </MapView>
                </View>
            </ScrollView>
            {showByDistance && (
                <View style={styles.sliderWrapper}>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.value}>
                            {value === 0 ? '0' : value.toFixed(1) === '5.1' ? 'Не важно' : value.toFixed(1)}
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={5.1}
                            step={0.1}
                            value={5.1}
                            onValueChange={setValue}
                            minimumTrackTintColor="#8B1A1A"
                            maximumTrackTintColor="#fff"
                            thumbTintColor="#8B1A1A"
                        />
                    </View>
                    <View style={styles.distanceLabels}>
                        <Text style={styles.labelText}>250 м</Text>
                        <Text style={styles.labelText}>Все</Text>
                    </View>
                    <Buttons title="Показать результаты" isDisebled={value.toFixed(1).toString() !== '5.1'} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default RecentMasters;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        position: 'relative',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        justifyContent: 'center',
    },
    sliderWrapper: {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight / 4,
        backgroundColor: '#21212E',
        bottom: 0,
        padding: 17.5,
    },
    sliderContainer: {
        backgroundColor: '#fff',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: screenWidth / 1.1,
        alignItems: 'center',
        marginTop: 30,
        position: 'relative',
        height: screenHeight / 20,
    },
    value: {
        fontSize: 16,
        color: '#8B1A1A',
        textAlign: 'center',
        width: '100%',
        borderRadius: 5,
    },
    slider: {
        width: screenWidth / 1.03,
        position: 'absolute',
        bottom: -7.5,
    },
    map: {
        width: screenWidth,
        height: screenHeight / 1.17,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight / 1.17,
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#4B4B64',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        width: '48%',
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
    },
    distanceLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    labelText: {
        color: 'white',
    },
});
