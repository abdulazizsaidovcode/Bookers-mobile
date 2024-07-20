import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { useFocusEffect } from 'expo-router';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import Slider from '@react-native-community/slider';
import { mapCustomStyle } from '@/type/map/map';
import Buttons from '@/components/(buttons)/button';
import { AntDesign, Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { getTopMasters } from '@/helpers/api-function/masters';
import useTopMastersStore, { Master } from '@/helpers/state_managment/masters';
import { getFile } from '@/helpers/api';
import { fetchMetroStations } from '@/helpers/api-function/map/map';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(client)/(map)/(recent-masters)/recent-masters'>;

const haversineDistance = (userLat: number, userLon: number, salonLat: number, salonLon: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (salonLat - userLat) * (Math.PI / 180);
    const dLon = (salonLon - userLon) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(userLat * (Math.PI / 180)) * Math.cos(salonLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};


const RecentMasters = () => {
    const { userLocation, setUserLocation } = useGetMeeStore();
    const [value, setValue] = useState(5.1);
    const [circleValue, setCircleValue] = useState(0);
    const [showByDistance, setShowByDistance] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<Master | null>(null);
    const { masters } = useTopMastersStore();
    const [metroStations, setMetroStations] = useState<any>([]);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    useFocusEffect(
        useCallback(() => {
            getUserLocation(setUserLocation);
            return () => { };
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            getTopMasters();
            return () => { };
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            fetchMetroStations(userLocation.coords.latitude, userLocation.coords.longitude, setMetroStations);
            return () => { };
        }, [userLocation])
    )

    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', metroStations);

    const toggleShowByDistance = () => setShowByDistance(!showByDistance);
    const handleReset = () => setValue(5.1);
    const handleMarkerPress = (marker: Master) => {
        setSelectedMarker(marker);
    };

    const handleValueChange = (newValue: number) => {
        setValue(newValue);
    };



    if (!userLocation.coords) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={"#888"} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    {showByDistance ? (
                        <View style={{ height: screenHeight / 7, paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', gap: 15 }}>
                                    <AntDesign name="close" size={24} color="white" onPress={toggleShowByDistance} />
                                    <Text style={{ fontSize: 20, color: 'white' }}>По расстоянию</Text>
                                </View>
                                <View style={{ width: screenWidth / 3 }}>
                                    <Buttons title='Сбросить' onPress={handleReset} />
                                </View>
                            </View>
                        </View>
                    ) : (
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
                        </View>
                    )}

                </View>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapCustomStyle}
                        zoomControlEnabled
                        zoomTapEnabled
                        loadingEnabled
                        showsUserLocation
                        style={styles.map}
                        onPress={selectedMarker ? () => setSelectedMarker(null) : () => { }}
                        initialRegion={{
                            latitude: userLocation.coords.latitude,
                            longitude: userLocation.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {masters.map((item, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: item.lat ? item.lat : 0,
                                    longitude: item.lng ? item.lng : 0,
                                }}
                                title={item.salonName ? item.salonName : ''}
                                description={item.fullName ? item.fullName : ''}
                                onPress={() => handleMarkerPress(item)}
                            />
                        ))}
                        {circleValue.toFixed(1).toString() !== '5.1' ? (
                            <Circle
                                center={{
                                    latitude: userLocation.coords.latitude,
                                    longitude: userLocation.coords.longitude,
                                }}
                                radius={circleValue * 1000}
                                strokeColor="rgba(255, 0, 0, 0.5)"
                                fillColor="rgba(255, 0, 0, 0.2)"
                            />
                        ) : null}
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
                            minimumValue={0.25}
                            maximumValue={5.1}
                            step={0.1}
                            value={value}
                            onValueChange={handleValueChange}
                            minimumTrackTintColor="#8B1A1A"
                            maximumTrackTintColor="#fff"
                            thumbTintColor="#8B1A1A"
                        />
                    </View>
                    <View style={styles.distanceLabels}>
                        <Text style={styles.labelText}>250 м</Text>
                        <Text style={styles.labelText}>Все</Text>
                    </View>
                    <Buttons
                        title="Показать результаты"
                        onPress={() => {
                            setCircleValue(value);
                            toggleShowByDistance()
                        }}
                    />
                </View>
            )}
            {selectedMarker && (
                <View style={{ padding: 10, position: 'absolute', bottom: 0, width: '100%' }}>
                    <View style={styles.detailView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View>
                                <Image style={{ width: screenWidth / 6, height: screenHeight / 12.5, borderRadius: 50 }} source={selectedMarker.attachmentId === null ? require('../../../../assets/images/defaultImg.jpeg') : getFile + selectedMarker.attachmentId} />
                            </View>
                            <View>
                                <Text style={styles.detailTitle}>{selectedMarker.salonName}</Text>
                                <Text style={styles.detailDescription}>{selectedMarker.fullName}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.detailTitle}>{selectedMarker.district && selectedMarker.street ? `${selectedMarker.district}, ${selectedMarker.street}` : 'Адрес салона не настроен'}</Text>
                        </View>
                        <View style={styles.infoDetails}>
                            <View style={styles.infoRow}>
                                <Feather name="send" size={24} color="#9C0A35" />
                                <Text style={styles.infoText}>{`${haversineDistance(userLocation.coords.latitude, userLocation.coords.longitude, selectedMarker.lat === null ? 0 : selectedMarker.lat, selectedMarker.lng === null ? 0 : selectedMarker.lng).toFixed(1)} km от вас`}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.metroIcon}>M</Text>
                                <Text style={styles.metroText}>Гафур Гуляма</Text>
                                <Text style={styles.metroDistance}>0.5 км от станции</Text>
                            </View>
                            <View style={styles.separator} />

                            <Pressable style={styles.routeButton}>
                                <Text style={styles.routeText}>Построить маршрут</Text>
                                <AntDesign name="right" size={20} color="#9C0A35" />
                            </Pressable>
                        </View>
                    </View>
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
    separator: {
        borderWidth: 0.5,
        borderColor: 'white',
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        justifyContent: 'center',
    },
    routeButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    routeText: {
        color: '#9C0A35',
        fontFamily: 'bold',
        fontSize: 17,
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
        paddingHorizontal: 10,
        marginTop: 10,
    },
    labelText: {
        color: '#fff',
        fontSize: 14,
    },
    detailView: {
        width: '100%',
        backgroundColor: '#21212E',
        padding: 20,
        borderRadius: 20,
    },
    detailTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailDescription: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 10,
    },
    infoDetails: {
        marginTop: 10,
        gap: 5,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    infoText: {
        color: 'white',
    },
    metroIcon: {
        color: '#9C0A35',
        fontSize: 24,
    },
    metroText: {
        color: 'white',
        fontFamily: 'bold',
        fontSize: 15,
    },
    metroDistance: {
        color: '#828282',
    },
});