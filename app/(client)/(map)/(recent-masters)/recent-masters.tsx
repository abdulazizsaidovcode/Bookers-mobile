import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { useFocusEffect } from 'expo-router';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import ClientCard from '@/components/(cliendCard)/cliendCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const mapCustomStyle = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#2B3343" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#746855" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#242f3e" }]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d59563" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d59563" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#263c3f" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#6b9a76" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#38414e" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#212a37" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9ca5b3" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#61729A" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#1f2835" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#f3d19c" }]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{ "color": "#2f3948" }]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d59563" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#17263c" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#515c6d" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#17263c" }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#FFFFFF" }]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#394562" }]
    }
];

const RecentMasters = () => {
    const { userLocation, setUserLocation } = useGetMeeStore();

    useFocusEffect(
        useCallback(() => {
            getUserLocation(setUserLocation)
            return () => { }
        }, [])
    )

    if (!userLocation || !userLocation.coords) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.loading}>
                        <Text>Loading...</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <NavigationMenu name='На карте' />
                    <View style={{ flexDirection: 'row', gap: 10, padding: 10, justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.button, { width: '48%' }]}>
                            <Text style={styles.buttonText}>по расстоянию</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.button, { width: '48%' }]}>
                            <Text style={styles.buttonText}>по услугам</Text>
                        </TouchableOpacity>
                    </View>
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
                        <Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                            }}
                            title={"Marker Title"}
                            description={"Marker Description"}
                        />
                    </MapView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RecentMasters;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        position: 'relative'
    },
    map: {
        width: screenWidth,
        height: screenHeight / 1.17,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight / 1.17
    },
    button: {
        backgroundColor: '#4B4B64',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 17
    }
});
