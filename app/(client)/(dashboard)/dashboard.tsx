import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, ImageSourcePropType, BackHandler, Platform, Linking } from 'react-native';
import AccordionItem from '../../../components/accordions/accardion';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import { getAllCategory } from '@/helpers/api-function/uslugi/uslugi';
import Toast from "react-native-simple-toast";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { deviceInfo } from "@/helpers/api-function/register/registrFC";
import { getFile } from '@/helpers/api';
import tw from 'tailwind-react-native-classnames';
import hasNotificationState from '@/helpers/state_managment/notifications/readORisReadNOtif';
import { getNotificationNor_ReadyClient } from '@/helpers/api-function/client/clientPage';
import { getExpenceCategory } from '@/helpers/api-function/expence/expence';;
import { getClientDashboard, getDashboradMaster } from '@/helpers/api-function/dashboardClient/dashboardClient';
import { useDashboardClientStore } from '@/helpers/state_managment/dashboardClient/dashboardClient';
import AccardionHistory from '@/components/accordions/accardionHistory';
import ProfileCard from '../(profile)/(orderHistory)/profileCard';
import { useDashboardMasterStore } from '@/helpers/state_managment/dashboardClient/clientForMaster';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useMapStore } from '@/helpers/state_managment/map/map';





// Bu bo'limga teginma
type DashboardItemType = {
  id: string | null;
  image: string | undefined;
  title: string;
  titleThen: number;
  onPress?: () => void;
};



const DashboardItem: React.FC<{ item: DashboardItemType }> = ({ item }) => {
  return (
    <TouchableOpacity key={item.id} style={styles.touchableItem} onPress={handlePress}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.subtitleText}>{item.titleThen}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Navbar: React.FC = () => {
  const navigation = useNavigation();
  const { hasNotification, setHasNotification } = hasNotificationState()

  useFocusEffect(
    useCallback(() => {
      getNotificationNor_ReadyClient(setHasNotification)
    }, [setHasNotification])
  )
  useFocusEffect(
    useCallback(() => {
      getExpenceCategory;
    }, [])
  );

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Главная</Text>
      <View style={styles.iconGroup}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('(client)/(profile)/(notification)/notification')}
        >
          <View style={styles.notificationIconContainer}>
            <FontAwesome5 name="bell" size={28} color="white" />
            {hasNotification && <View style={styles.notificationDot} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bookmark" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const Dashboard: React.FC = () => {

  const { userLocation, setUserLocation } = useGetMeeStore();
  const { allCategory, setSelectedServiceId } = ClientStory();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<any>>();
  const [backPressCount, setBackPressCount] = useState(0);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { dashboardData } = useDashboardClientStore();
  const { dashboardMasterData } = useDashboardMasterStore();
  const [selectedCategory, setSelectedCategory] = useState('Bceni');
  const { setMapData } = useMapStore();



  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const pushNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    // const deviceId = Constants.deviceId;
    const deviceType = Device.modelName;
    deviceInfo(deviceType, Platform.OS, token);
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  useEffect(() => {
    pushNotifications()
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
  // navigatsiyani login registratsiyadan o'tganda bloklash
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getUserLocation(setUserLocation).finally(() => setLoading(false));
      return () => { };
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      getClientDashboard().finally(() => setLoading(false));
      return () => { };
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      getAllCategory().finally(() => setLoading(false));
      return () => { };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      getAllCategory().finally(() => setLoading(false));
      return () => { };
    }, [userLocation])
  );
  useFocusEffect(
    useCallback(() => {
      getDashboradMaster().finally(() => setLoading(false));
      return () => { };
    }, [])
  );

  const handlePhonePress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // 2 marta orqaga qaytishni bosganda ilovadan chiqaradi
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(backPressCount + 1);
          Toast.show('Orqaga qaytish uchun yana bir marta bosing', Toast.SHORT);
          setTimeout(() => {
            setBackPressCount(0);
          }, 2000); // 2 soniya ichida ikkinchi marta bosilmasa, holatni qayta boshlaydi
          return true; // Orqaga qaytishni bloklaydi
        } else {
          BackHandler.exitApp(); // Ilovadan chiqish
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [backPressCount])
  );


  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView>
      <>
      {dashboardData && dashboardData.length > 0 ? (
        dashboardData.map((item, index) => (
          <View key={index} style={tw`w-full flex`}>
            <AccardionHistory
              id={item.orderId}
              title={item.specializations || 'Без специализации'}
              date={item.orderDate || 'Дата не указана'}
            >
              <ProfileCard
                Address={item.address || 'Адрес не указан'}
                buttonName="Написать сообщение"
                imageURL={item.userAttachmentId || 'https://example.com/default-image.jpg'}
                money={`${item.orderPrice || 'Не указано'} сум`}
                ratingnumber={item.feedbackCount || 0}
                masterName={item.firstName || 'Имя не указано'}
                salonName={item.salonName || 'Салон не указан'}
                locationIcon={<FontAwesome5 name="map-marker-alt" size={20} color="white" />}
                phoneIcon={<FontAwesome5 name="phone" size={20} color="white" />}
                orderId={item.orderId || 'Не указан'}
              />
            </AccardionHistory>
          </View>
        ))
      ) : (
        <AccordionItem title="Мои записи" titleThen="У вас пока нет записей, выберите услугу." backgroundColor="#21212E">
          <View style={styles.container}>
      {allCategory && allCategory.length > 0 ? (
        allCategory.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('(client)/(uslugi)/(hairHealth)/hair');
            }}
            style={styles.touchableItem}
          >
            <View style={styles.item}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: `${getFile}${item.attachmentId}` }}
                  style={tw`p-3 w-1/2`}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={tw`text-gray-400`}>Рядом с тобой {item.distanceMasterCount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={tw`text-white`}>Нет доступных категорий</Text>
      )}
    </View>
        </AccordionItem>
      )}
    </>
        <>
          {dashboardMasterData && dashboardMasterData.length > 0 ?
            (
              <>
                <View style={tw`mb-3 mt-5`}>
                  <Text style={tw`font-bold text-xl text-white`}>Мои мастера</Text>
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {allCategory.map((item, index) => (
                    <View key={index} style={{ marginRight: 16, marginBottom: 20 }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setSelectedCategory(item.name)}
                        style={{
                          backgroundColor: selectedCategory === item.name ? 'white' : 'transparent',
                          borderRadius: 10,
                        }}
                      >
                        <Text style={tw`border border-gray-600 p-3 ${selectedCategory === item.name ? 'text-black border-white' : 'text-gray-600'} rounded-xl font-bold`}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </>
            ) :
            (
              <>
                <AccordionItem title="Мои мастера" titleThen="У вас пока нет своих мастеров" backgroundColor="#21212E">
                  <TouchableOpacity style={styles.touchableItem}>
                    <View style={styles.item}>
                      <View style={styles.textContainer}>
                        <Text style={styles.titleText1}>Пригласить своего мастера</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.touchableItem} onPress={() => router.push('../(masters)/masters')}>
                    <View style={styles.itemTwo}>
                      <View style={styles.textContainer}>
                        <Text style={styles.titleTextTwo}>Записаться к своему мастеру</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </AccordionItem>
              </>
            )
          }
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    alignItems: 'center',
    padding: 9,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  touchableItem: {
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B9B9C9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    maxWidth: 358,
  },
  itemTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9C0a35',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    height: 50,
    maxWidth: 358,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9C0A35',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  image: {
    width: 20,
    height: 20,
    padding: 50,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#111',
  },
  titleText1: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9C0A35',
  },
  titleTextTwo: {
    fontSize: 16,
    fontWeight: "900",
    textAlign: 'center',
    color: '#fff',
  },
  subtitleText: {
    fontSize: 14,
    color: 'gray',
  },
  notificationIconContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 1,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9C0A35',
  },
});

export default Dashboard;
