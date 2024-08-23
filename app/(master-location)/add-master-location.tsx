import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, MapPressEvent, Region } from 'react-native-maps';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Explanations from '@/components/(explanations)/explanations';
import LocationInput from '../locationInput';
import { mapCustomStyle } from '@/type/map/map';
import tw from 'tailwind-react-native-classnames';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import Textarea from '@/components/select/textarea';
import Buttons from '@/components/(buttons)/button';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AddMasterLocation: React.FC = () => {
    const [markerPosition, setMarkerPosition] = useState<Region | null>(null);
    const { userLocation, setUserLocation } = useGetMeeStore()

    useEffect(() => {
        getUserLocation(setUserLocation)
    }, [])

    const handleMapPress = (e: MapPressEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavigationMenu name='Мой адрес работы' />
                <View>
                    <Explanations text='Настройте локацию своего рабочего места' />
                    <View style={{ marginTop: 10, flexDirection: 'column', gap: 10 }}>
                        <LocationInput
                            placeholder='Введите название салона красоты'
                            labalVisible
                            label='Название салона'
                        />
                        <View>
                            <Text style={[tw`text-gray-500 mb-2 text-md`]}>Укажите свой салон на карте</Text>
                            <View style={{ borderRadius: 20, overflow: 'hidden', height: screenHeight / 3 }}>
                                <MapView
                                    provider={PROVIDER_DEFAULT}
                                    style={styles.map}
                                    // customMapStyle={mapCustomStyle}
                                    onPress={handleMapPress}
                                    showsUserLocation
                                    initialRegion={{
                                        latitude: userLocation.coords.latitude, // Default initial region
                                        longitude: userLocation.coords.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                >
                                    {markerPosition && (
                                        <Marker
                                            coordinate={markerPosition}
                                            title='Мое рабочее место'
                                            description='Выбранное местоположение'
                                        />
                                    )}
                                </MapView>
                            </View>
                        </View>
                        <View>
                            <Text style={[tw`text-gray-500 mb-2 text-md`]}>Адрес</Text>
                            <Textarea value='' />
                        </View>
                        <LocationInput
                            labalVisible
                            label='Ориентир'
                        />
                    </View>
                </View>
            </ScrollView>
            <View>
                <Buttons
                    title={`Сохранить`}
                    // onPress={saveAlbum}
                    // isDisebled={!(images.length === 0 || !albumName)}
                />
            </View>
        </SafeAreaView>
    );
};

export default AddMasterLocation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
        position: 'relative'
    },
    map: {
        width: screenWidth * 1.05,
        height: screenHeight / 2,
    },
});
