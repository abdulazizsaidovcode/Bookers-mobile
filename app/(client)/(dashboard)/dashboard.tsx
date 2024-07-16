import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import AccordionItem from '../../../components/accordions/accardion';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

const Dashboard = () => {
  const dataDashboard = [
    {
      id: 1,
      image: require('@/assets/clientDashboard/Layer_1.png'),
      title: 'Здоровье и красота волос',
      titleThen: 'Рядом с тобой 450',
    },
    {
      id: 2,
      image: require('@/assets/clientDashboard/pomada.png'),
      title: 'Ногтевой сервис',
      titleThen: 'Рядом с тобой 75',
    },
    {
      id: 3,
      image: require('@/assets/clientDashboard/eyes.png'),
      title: 'Ресницы и брови',
      titleThen: 'Рядом с тобой 322',
    },
    {
      id: 4,
      image: require('@/assets/clientDashboard/aranow.png'),
      title: 'Уход за телом',
      titleThen: 'Рядом с тобой 456',
    },
    {
      id: 5,
      image: require('@/assets/clientDashboard/dont.png'),
      title: 'Уход за лицом',
      titleThen: 'Рядом с тобой 210',
    },
  ];

  const handlePress = () => {
    // Handle onPress logic here
    console.log('TouchableOpacity pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Главная</Text>
        <View style={styles.iconGroup}>
          <FontAwesome5 name="bell" size={28} color="white" />
          <Feather name="bookmark" size={28} color="white" />
        </View>
      </View>
      <ScrollView>
        <AccordionItem title="Мои записи" titleThen='У вас пока нет записей, выберите услугу.' backgroundColor='#21212E'>
          {dataDashboard.map((item) => (
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
          ))}
        </AccordionItem>
        <AccordionItem title="Мои мастера" titleThen='У вас пока нет своих мастеров' backgroundColor='#21212E'>
          <TouchableOpacity style={styles.touchableItem} onPress={handlePress}>
            <View style={styles.item}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Пригласить своего мастера</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableItem} onPress={handlePress}>
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
