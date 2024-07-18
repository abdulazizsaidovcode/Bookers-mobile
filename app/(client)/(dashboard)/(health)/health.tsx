import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationMenu from '@/components/navigation/navigation-menu'
import { SafeAreaView } from 'react-native-safe-area-context'
import AccardionFree from '@/components/accordions/accardionFree'
import AccardionSlider from '@/components/accordions/accardionSlider'
import AccardionSliderTwo from '@/components/accordions/accardionSliderTwo'
import Buttons from '@/components/(buttons)/button'

const Health = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#21212E',padding: 16 }}>
      <NavigationMenu name='Здоровье и красота волос' />
      <ScrollView style={styles.container}>
        <Text style={{ color: '#C2C2C2',marginBottom: 16 }}>Подберите критерии услуг</Text>
        <AccardionFree title='Пол мастера' />
        <AccardionSlider title='Рядом со мной' />
        <AccardionSliderTwo title='Рейтинг'/>
      </ScrollView>
      <Buttons title='Подобрать мастера' />
    </SafeAreaView>
  )
}

export default Health

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
  },
})