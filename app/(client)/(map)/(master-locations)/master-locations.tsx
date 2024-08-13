import React, { useCallback } from 'react';
import { ActivityIndicator, Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import { mapCustomStyle } from '@/type/map/map';
import { useMapStore } from '@/helpers/state_managment/map/map';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { fetchMasterLocation } from '@/helpers/api-function/map/map';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MasterLocations = () => {
    const navigation = useNavigation<any>()
    const { mapData, setMapData } = useMapStore();
    const route = useRoute();
    const { setClientData } = ClientStory()
    const { id } = route.params as { id: string | number }

    useFocusEffect(
        useCallback(() => {
            fetchMasterLocation(id, setMapData)
        }, [])
    )
    const categoryNames = mapData.categoryNames ? mapData.categoryNames.join(', ') : '';

    if (!mapData && !id) {
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
                    <NavigationMenu name={mapData.salonName ? mapData.salonName : 'Не найдено'} />
                </View>
                <View>
                    <MapView
                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
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
                            title={mapData.salonName ? mapData.salonName : 'Не найдено'}
                            description={categoryNames ? categoryNames : 'Не найдено'}
                        />
                    </MapView>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, padding: 20, width: '100%' }}>
                <ClientCard
                    imageUrl={mapData.attachmentId}
                    zaps={moment().format("YYYY-MM-DD") === mapData.nextEntryDate ? "Сегодня" : moment(mapData.nextEntryDate).format("dd, DD MMM")}
                    feedbackCount={mapData.orderCount}
                    name={mapData.firstName}
                    masterType={mapData.gender === "MALE" ? "Мужской мастер" : mapData.gender === "FEMALE" ? "Женский мастер" : "Не найдено"}
                    orders={mapData.orderCount}
                    clients={mapData.clientCount}
                    address={`${mapData.district}, ${mapData.street}`}
                    mapStyle={true}
                    onPress={() => {
                        setClientData(mapData)
                        navigation.navigate('(client)/(uslugi)/(masterInformation)/masterInformation')
                    }}
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
