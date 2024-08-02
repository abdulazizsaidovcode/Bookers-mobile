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
import { getClientDashboard, getDashboradMaster, getDashboradMasterAll } from '@/helpers/api-function/dashboardClient/dashboardClient';
import { useDashboardClientStore } from '@/helpers/state_managment/dashboardClient/dashboardClient';
import AccardionHistory from '@/components/accordions/accardionHistory';
import ProfileCard from '../(profile)/(orderHistory)/profileCard';
import { useDashboardMasterStore } from '@/helpers/state_managment/dashboardClient/clientForMaster';
import { useMapStore } from '@/helpers/state_managment/map/map';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Loading } from '@/components/loading/loading';
import SkeletonContent from 'react-native-skeleton-content';
import Skelaton from '@/components/skelaton/skelaton';
import AccordionSkelaton from '@/components/skelaton/accordionSkelaton';






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
  const { allCategory, setSelectedClient, setCategoryId, categoryId, setClientData } = ClientStory();
  const navigation = useNavigation<NavigationProp<any>>();
  const [backPressCount, setBackPressCount] = useState(0);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { dashboardData, isLoading, setIsLoading, setDashboardData, isBottomLoading, setIsBottomLoading } = useDashboardClientStore();
  const { dashboardMasterData, setDashboardMasterData, setDashboardMasterDataAll, dashboardMasterDataAll } = useDashboardMasterStore();
  const [selectedCategory, setSelectedCategory] = useState('Bceni');
  const { setOrderData } = useMapStore();
  const navigate = useNavigation<any>();



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


  useFocusEffect(
    React.useCallback(() => {
      getUserLocation(setUserLocation);
      getClientDashboard(setDashboardData, setIsLoading);
      getAllCategory();
      getDashboradMasterAll(setDashboardMasterDataAll, setIsBottomLoading);
      pushNotifications()
      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(notificationListener.current);
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(responseListener.current);
        }
      };
      return () => { };
    }, [])
  );


  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      getAllCategory();
      return () => { };
    }, [userLocation])
  );
  useFocusEffect(
    useCallback(() => {
      getDashboradMaster(setDashboardMasterData, setIsBottomLoading);
      return () => { };
    }, [categoryId])
  );

  const handlePhonePress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(backPressCount + 1);
          Toast.show('Orqaga qaytish uchun yana bir marta bosing', Toast.SHORT);
          setTimeout(() => {
            setBackPressCount(0);
          }, 2000);
          return true;
        } else {
          BackHandler.exitApp(); // Ilovadan chiqish
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [backPressCount])
  );

  if (!dashboardData && !dashboardMasterData && !allCategory) {
    return <Loading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView>
        {isLoading ? <AccordionSkelaton /> : dashboardData && dashboardData.length > 0 ? (
          <View style={tw`p-1`}>
            <Text style={tw`font-bold text-xl text-white mb-4 `}>Мои записи</Text>
            {dashboardData.map((item: any, index) => (
              <View key={index} style={tw`w-full flex `}>
                <AccardionHistory
                  id={item.orderId}
                  title={item.serviceName}
                  date={`${item.orderDate} ${item && item.time}` || 'Дата не указана'}
                >
                  <ProfileCard
                    onPress={() => {
                      setSelectedClient(item);
                      navigation.navigate('(client)/(oreder)/orderDetail', { id: item.orderId });
                    }}
                    Adress={item && item.address}
                    buttonName="Написать сообщение"
                    imageURL={item.userAttachmentId || 'https://example.com/default-image.jpg'}
                    money={`${item.orderPrice || 'Не указано'} сум`}
                    ratingnumber={item.feedbackCount || 0}
                    titleTex={item.serviceName?.trim().split(`, `)}
                    masterName={item.firstName || 'Имя не указано'}
                    salonName={item.salonName || 'Салон не указан'}
                    masterGender={[]}
                    locationIcon={
                      <SimpleLineIcons
                        onPress={() => {
                          navigate.navigate('(client)/(map)/(salon-location)/salon-location');
                          setOrderData(item)
                        }}
                        name="location-pin"
                        size={24}
                        color="white"
                      />
                    }
                    phoneIcon={
                      <Feather
                        name="phone"
                        size={24}
                        color="white"
                        onPress={() => handlePhonePress(item.phoneNumber)}
                      />
                    }
                    orderId={item.orderId || 'Не указан'}
                  />
                </AccardionHistory>
              </View>
            ))}
          </View>
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
                        <Text style={tw`text-gray-600`}>Рядом с тобой {item.distanceMasterCount}</Text>
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
        <>
          { dashboardMasterData && dashboardMasterData.length > 0 ?
            (
              <View style={tw`p-1`}>
                <View style={tw`mb-4 mt-5`}>
                  <Text style={tw`font-bold text-xl text-white`}>Мои мастера</Text>
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{ paddingHorizontal: 1 }}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={{ marginRight: 16, marginBottom: 20 }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelectedCategory('Все');
                        console.log('Selected Category ID:', 'all'); // Use an appropriate ID for "Все"
                      }}

                    >
                    </TouchableOpacity>
                  </View>
                  {allCategory ? allCategory.map((item, index) => (
                    <View key={index} style={{ marginRight: 16, marginBottom: 20 }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          setSelectedCategory(item.name);
                          setCategoryId(item.id)
                        }}
                        style={{
                          backgroundColor: selectedCategory === item.name ? 'white' : 'transparent',
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={tw`border border-gray-600 p-3 ${selectedCategory === item.name ? 'text-black border-white' : 'text-gray-600'
                            } rounded-xl font-bold`}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                  )
                    : <View>
                      <Text>notFound</Text>
                    </View>
                  }
                </ScrollView>
                <View style={tw`mb-4`}>
                  {isBottomLoading ? <Skelaton /> : dashboardMasterData ? dashboardMasterData.map((master, idx) => (
                    <View style={tw`mb-3`}>
                      <ClientCard
                        key={idx} // Har bir element uchun noyob kalit kerak
                        name={master.firstName}
                        salon={master.salonName}
                        imageUrl={master.attachmentId}
                        masterType={master.gender}
                        feedbackCount={master.favoriteCount}
                        address={`${master.district}, ${master.street}, ${master.house}`}
                        orders={master.orderCount}
                        zaps={master.nextEntryDate}
                        clients={master.clientCount}
                        onPress={() => {
                          setClientData(master)
                          navigation.navigate('(client)/(uslugi)/(masterInformation)/masterInformation')
                        }}
                        locationIcon={
                          <SimpleLineIcons name="location-pin" size={29} color="white"
                            onPress={() => {
                              navigate.navigate('(client)/(map)/(master-locations)/master-locations', { id: master.id });
                            }}
                          />
                        }
                      />
                    </View>
                  )
                  ) :
                    <View>
                      <Text>notFound</Text>
                    </View>
                  }
                </View>

              </View>
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
                  <TouchableOpacity style={styles.touchableItem}
                    onPress={() => {
                      navigation.navigate('../(masters)/masters');
                    }}>
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
