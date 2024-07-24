import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, ImageSourcePropType, BackHandler } from 'react-native';
import AccordionItem from '../../../components/accordions/accardion';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect, useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import { getAllCategory } from '@/helpers/api-function/uslugi/uslugi';
import Toast from "react-native-simple-toast";


// Bu bo'limga teginma
type DashboardItemType = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  titleThen: string;
  onPress?: () => void;
};

const IMAGES = {
  health: require('@/assets/clientDashboard/Layer_1.png'),
  nails: require('@/assets/clientDashboard/pomada.png'),
  eyes: require('@/assets/clientDashboard/eyes.png'),
  body: require('@/assets/clientDashboard/aranow.png'),
  face: require('@/assets/clientDashboard/dont.png'),
};

const DashboardItem: React.FC<{ item: DashboardItemType }> = ({ item }) => {

  const {userLocation, setUserLocation} = useGetMeeStore();
  const {allCategory, setSelectedServiceId} = ClientStory();

//   useFocusEffect(
//     React.useCallback(() => {
//         getUserLocation(setUserLocation);
//         return () => {
//         };
//     }, [])
// );
  const handlePress = useCallback(() => {
    if (item.onPress) item.onPress();
  }, [item]);

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

const Navbar: React.FC = () => (
  <View style={styles.navbar}>
    <Text style={styles.title}>Главная</Text>
    <View style={styles.iconGroup}>
      <FontAwesome5 name="bell" size={28} color="white" />
      <Feather name="bookmark" size={28} color="white" />
    </View>
  </View>
);

const Dashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [backPressCount, setBackPressCount] = useState(0);

  const dataDashboard: DashboardItemType[] = [
    { id: 1, image: IMAGES.health, title: 'Здоровье и красота волос', titleThen: 'Рядом с тобой 450', onPress: () => navigation.navigate('(client)/(uslugi)/(hairHealth)/hair') },
    { id: 2, image: IMAGES.nails, title: 'Ногтевой сервис', titleThen: 'Рядом с тобой 75',onPress: () => navigation.navigate('(client)/(uslugi)/(hairHealth)/hair') },
    { id: 3, image: IMAGES.eyes, title: 'Ресницы и брови', titleThen: 'Рядом с тобой 322',onPress: () => navigation.navigate('(client)/(uslugi)/(hairHealth)/hair') },
    { id: 4, image: IMAGES.body, title: 'Уход за телом', titleThen: 'Рядом с тобой 456',onPress: () => navigation.navigate('(client)/(uslugi)/(hairHealth)/hair') },
    { id: 5, image: IMAGES.face, title: 'Уход за лицом', titleThen: 'Рядом с тобой 210',onPress: () => navigation.navigate('(client)/(uslugi)/(hairHealth)/hair') },
  ];

  // navigatsiyani login registratsiyadan o'tganda bloklash
useEffect(() => {
  const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
    e.preventDefault();
  });

  return unsubscribe;
}, [navigation]);

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
          {dataDashboard.map(item => (
            <DashboardItem key={item.id} item={item} />
          ))}
        </AccordionItem>
        <AccordionItem title="Мои мастера" titleThen="У вас пока нет своих мастеров" backgroundColor="#21212E">
          <TouchableOpacity style={styles.touchableItem}>
            <View style={styles.item}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText1}>Пригласить своего мастера</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableItem}>
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
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  subtitleText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Dashboard;
