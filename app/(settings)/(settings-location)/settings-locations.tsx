import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LocationInput from '@/components/(location)/locationInput';

const SettingsLocations = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <LocationInput label='Город' placeholder='Город' />
        <LocationInput label='Улица' placeholder='Улица' />
        <LocationInput label='Дом' placeholder='Дом' />
        <LocationInput label='Ориентир' placeholder='Ориентир' />
      </View>
    </SafeAreaView>
  )
}

export default SettingsLocations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212e'
  }
})