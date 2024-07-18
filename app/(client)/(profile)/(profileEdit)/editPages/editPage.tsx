import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import NavigationMenu from '@/components/navigation/navigation-menu'
import useProfileStore from '@/helpers/state_managment/client/clientEditStore'

const EditProfilePage = () => {
  const {routeName} = useProfileStore()
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor="#21212E" />
    <NavigationMenu name={`${routeName}`} />
    </SafeAreaView>
  )
}

export default EditProfilePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },
})