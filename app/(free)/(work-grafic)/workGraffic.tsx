import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import { useRouter } from 'expo-router';
import NavigationMenu from '@/components/navigation/navigation-menu';
import CalendarGraffic from './calendar';

interface Item {
  id: number;
  name: string;
  active: boolean;
}

const GrafficWork: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Понедельник', active: false },
    { id: 2, name: 'Вторник', active: false },
    { id: 3, name: 'Среда', active: false },
    { id: 4, name: 'Четверг', active: false },
    { id: 5, name: 'Пятница', active: false },
    { id: 6, name: 'Суббота', active: false },
    { id: 7, name: 'Воскресенье', active: false },
  ]);

  const router = useRouter();

  const handleCategoryPress = (id: number) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    setItems(updatedItems);
    console.log('Updated Items:', updatedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name="График работы" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.title}>График работы с</Text>
          <CalendarGraffic />
        </View>
        <View style={styles.fullHeightSection}>
          <Text style={styles.title}>Выберите рабочие дни в неделю</Text>
          <View style={styles.categoriesContainer}>
            {items.map((item, index) => (
              <ServicesCategory
                key={index}
                title={item.name}
                isChecked={item.active}
                onPress={() => handleCategoryPress(item.id)}
              />
            ))}
          </View>
          <View style={{ padding: 10 }}>
            <Buttons title="Продолжить" onPress={() => router.push('/workMain')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GrafficWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212e',
  },
  section: {
    height: 430,
    display: 'flex',
    gap: 20,
  },
  fullHeightSection: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 15,
  },
  categoriesContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    gap: 5,
    paddingVertical: 10,
  },
});
