import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { useFocusEffect } from 'expo-router';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import Feather from '@expo/vector-icons/Feather';
import { AntDesign } from '@expo/vector-icons';
import { mapCustomStyle } from '@/type/map/map';
import { useMapStore } from '@/helpers/state_managment/map/map';
import { haversineDistance } from '../(recent-masters)/recent-masters';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SalonLocation = () => {
  const { userLocation, setUserLocation } = useGetMeeStore();
  const { orderData } = useMapStore();
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserLocation(setUserLocation);
      return () => {};
    }, [setUserLocation])
  );

  const toggleVisible = () => setVisible(!visible);
  const specializations = orderData.specializations?.join(', ');

  const callTaxi = () => {
    const yandexUrl = 'yandexnavi://'; // Yandex Go URL scheme

    Linking.canOpenURL(yandexUrl)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + yandexUrl);
          const fallbackUrl = 'https://taxi.yandex.com/'; // Yandex Go web URL as fallback
          return Linking.openURL(fallbackUrl);
        } else {
          return Linking.openURL(yandexUrl);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const openGoogleMaps = () => {
    const userLat = userLocation.coords.latitude;
    const userLng = userLocation.coords.longitude;
    const destinationLat = orderData.lat ? orderData.lat : 0;
    const destinationLng = orderData.lng ? orderData.lng : 0;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;

    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  if (!userLocation || !userLocation.coords) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'#888'} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <NavigationMenu name={orderData.salonName ? orderData.salonName : 'dwefewerwfew'} />
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapCustomStyle}
          style={styles.map}
          initialRegion={{
            latitude: orderData.lat ? orderData.lat : 0,
            longitude: orderData.lng ? orderData.lng : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: orderData.lat ? orderData.lat : 0, longitude: orderData.lng ? orderData.lng : 0 }}
            title={orderData.salonName ? orderData.salonName : ''}
            description={specializations}
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
                <TouchableOpacity activeOpacity={0.8} onPress={openGoogleMaps}>
                  <Text style={styles.address}>Google Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.address}>Yandex Maps</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <Pressable onPress={toggleVisible} style={styles.cancelButton}>
                <Text style={styles.routeText}>Отмена</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <Text style={styles.address}>{orderData.address}</Text>
              <View style={styles.infoDetails}>
                <View style={styles.infoRow}>
                  <Feather name="send" size={24} color="#9C0A35" />
                  <Text style={styles.infoText}>
                    {haversineDistance(
                      userLocation.coords.latitude,
                      userLocation.coords.longitude,
                      orderData.lat ? orderData.lat : 0,
                      orderData.lng ? orderData.lng : 0
                    ).toFixed(1)}{' '}
                    км от вас
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.metroIcon}>M</Text>
                  <Text style={styles.metroText}>Гафур Гуляма</Text>
                  <Text style={styles.metroDistance}>0.5 км от станции</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <TouchableOpacity activeOpacity={0.8} onPress={callTaxi}>
                <Text style={styles.taxiText}>Вызвать такси</Text>
              </TouchableOpacity>
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