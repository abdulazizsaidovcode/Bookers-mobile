import React from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import { mapCustomStyle } from '@/type/map/map';
import { useMapStore } from '@/helpers/state_managment/map/map';
import moment from 'moment';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MasterLocations = () => {
    const { mapData } = useMapStore();

    if (!mapData) {
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
                    <NavigationMenu name={mapData.salonName ? mapData.salonName : ''} />
                </View>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapCustomStyle}
                        style={styles.map}
                        initialRegion={{
                            latitude: mapData.lat ? mapData.lat : 0,
                            longitude: mapData.lng ? mapData.lng : 0,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: mapData.lat ? mapData.lat : 0,
                                longitude: mapData.lng ? mapData.lng : 0,
                            }}
                            title={mapData.fullName}
                            description={mapData.fullName}
                        />
                    </MapView>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, padding: 20, width: '100%' }}>
                <ClientCard
                    imageUrl={mapData.attachmentId}
                    zaps={moment().format("YYYY-MM-DD") === mapData.nextEntryDate ? "Сегодня" : moment(mapData.nextEntryDate).format("dd, DD MMM")}
                    feedbackCount={mapData.feedbackCount}
                    name={mapData.fullName}
                    masterType={mapData.genderName === "MALE" ? "Мужской мастер" : mapData.genderName === "FEMALE" ? "Женский мастер" : "Не найдено"}
                    orders={mapData.orderCount}
                    clients={mapData.clientCount}
                    address={`${mapData.district}, ${mapData.street}`}
                    mapStyle={true}
                />
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
