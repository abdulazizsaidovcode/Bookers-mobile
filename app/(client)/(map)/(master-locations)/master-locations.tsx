import React, { useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { useFocusEffect } from 'expo-router';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import { mapCustomStyle } from '@/type/map/map';
import { useMapStore } from '@/helpers/state_managment/map/map';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MasterLocations = () => {
    const { userLocation, setUserLocation } = useGetMeeStore();
    const { mapData, setMapData } = useMapStore();

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
                    <NavigationMenu name='Beauty Wave' />
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
            <View style={{ position: 'absolute', bottom: 0, padding: 20, width: '100%' }}>
                <ClientCard imageUrl='../../../assets/imges/logo.png' feedbackCount={3} name='few' masterType='few' orders={3} clients={2} address='ferwfw' />
            </View>
        </SafeAreaView>
    );
};

export default MasterLocations;

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
    }
});
