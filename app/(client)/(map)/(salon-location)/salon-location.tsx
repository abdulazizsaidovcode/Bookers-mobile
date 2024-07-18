import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { useFocusEffect } from 'expo-router';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import Feather from '@expo/vector-icons/Feather';
import { AntDesign } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const mapCustomStyle = [
  { elementType: 'geometry', stylers: [{ color: '#2B3343' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#61729A' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#FFFFFF' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry.fill', stylers: [{ color: '#394562' }] },
];

const SalonLocation = () => {
  const { userLocation, setUserLocation } = useGetMeeStore();
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserLocation(setUserLocation);
      return () => {};
    }, [setUserLocation])
  );

  const toggleVisible = () => setVisible(!visible);

  if (!userLocation || !userLocation.coords) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <NavigationMenu name="Beauty Wavy" />
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
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      </ScrollView>
      <View style={styles.infoWrapper}>
        <View style={styles.infoContainer}>
          {visible ? (
            <View>
              <Text style={styles.infoText}>Построить маршрут через</Text>
              <View style={styles.optionContainer}>
                <Text style={styles.address}>2GIS</Text>
                <Text style={styles.address}>Google Maps</Text>
                <Text style={styles.address}>Yandex Maps</Text>
              </View>
              <View style={styles.separator} />
              <Pressable onPress={toggleVisible} style={styles.cancelButton}>
                <Text style={styles.routeText}>Отмена</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <Text style={styles.address}>Мирабадский р-н, ул. Нурафшон, 32</Text>
              <View style={styles.infoDetails}>
                <View style={styles.infoRow}>
                  <Feather name="send" size={24} color="#9C0A35" />
                  <Text style={styles.infoText}>1.2 км от вас</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.metroIcon}>M</Text>
                  <Text style={styles.metroText}>Гафур Гуляма</Text>
                  <Text style={styles.metroDistance}>0.5 км от станции</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <Text style={styles.taxiText}>Вызвать такси</Text>
              <View style={styles.separator} />
              <Pressable style={styles.routeButton} onPress={toggleVisible}>
                <Text style={styles.routeText}>Построить маршрут</Text>
                <AntDesign name="right" size={20} color="#9C0A35" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SalonLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
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
  },
  infoWrapper: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#21212E',
    width: screenWidth / 1.13,
    height: screenHeight / 3.7,
    borderRadius: 20,
  },
  address: {
    fontFamily: 'bold',
    fontSize: 18,
    color: 'white',
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
  separator: {
    borderWidth: 0.5,
    borderColor: 'white',
    marginVertical: 5,
  },
  taxiText: {
    color: '#9C0A35',
    fontFamily: 'bold',
    fontSize: 17,
    paddingVertical: 3,
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
  optionContainer: {
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
