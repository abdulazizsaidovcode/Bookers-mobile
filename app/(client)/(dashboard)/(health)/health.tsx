import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationMenu from '@/components/navigation/navigation-menu'
import { SafeAreaView } from 'react-native-safe-area-context'

const Health = () => {
  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor: '#21212E'}}>
      <NavigationMenu name='Здоровье и красота волос' />
      <ScrollView style={styles.container}>
        <Text style={{ color: '#C2C2C2' }}>Подберите критерии услуг</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Health

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    padding: 16,
  },
})