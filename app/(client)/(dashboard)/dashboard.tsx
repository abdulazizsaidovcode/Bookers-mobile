import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, ImageSourcePropType, BackHandler, Platform } from 'react-native';
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

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Главная</Text>
      <View style={styles.iconGroup}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('(client)/(profile)/(notification)/notification')}
        >
          <FontAwesome5 name="bell" size={28} color="white" />
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
    React.useCallback(() => {
      getAllCategory().finally(() => setLoading(false));
      return () => { };
    }, [userLocation])
  );

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
        <AccordionItem title="Мои записи" titleThen="У вас пока нет записей, выберите услугу." backgroundColor="#21212E">
          {allCategory && allCategory.length > 0 ? (
            allCategory.map((item, index) => (
              <TouchableOpacity
                activeOpacity={.7}
                key={index}
                style={styles.touchableItem}
                onPress={() => {
                  navigation.navigate('(client)/(uslugi)/(hairHealth)/hair')
                }}
              >
                <View style={styles.item}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: `${getFile}${item.attachmentId}` }}
                      style={tw`p-3 w-1/2`}

                    />
                    {/* <Image source={item.attachmentId} style={styles.image} /> */}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.subtitleText}>Рядом с тобой {item.distanceMasterCount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            null
          )}


        </AccordionItem>
        <AccordionItem title="Мои мастера" titleThen="У вас пока нет своих мастеров" backgroundColor="#21212E">
          <TouchableOpacity style={styles.touchableItem}>
            <View style={styles.item}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText1}>Пригласить своего мастера</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableItem}
          onPress={() => {
            router.push('../(masters)/masters')
          }}
          >
            <View style={styles.itemTwo}>
              <View style={styles.textContainer}>
                <Text style={styles.titleTextTwo}>Записаться к совему мастеру</Text>
              </View>
            </View>
          </TouchableOpacity>
        </AccordionItem>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    alignItems: 'center',
    padding: 18,
    justifyContent: 'flex-start',
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
});

export default Dashboard;
