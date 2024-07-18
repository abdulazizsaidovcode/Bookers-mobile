import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import AccordionFree from '@/components/accordions/accardionFree';
import AccordionSlider from '@/components/accordions/accardionSlider'
import AccordionSliderTwo from '@/components/accordions/accardionSliderTwo'
const Health: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationMenu name="Здоровье и красота волос" />
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Подберите критерии услуг</Text>
        <AccordionFree title="Пол мастера" />
        <AccordionSlider title="Рядом со мной" />
        <AccordionSliderTwo title="Рейтинг" />
      </ScrollView>
      <Buttons title="Подобрать мастера" />
    </SafeAreaView>
  );
};
export default Health;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#21212E',
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#21212E',
  },
  headerText: {
    color: '#C2C2C2',
    marginBottom: 16,
  },
});
