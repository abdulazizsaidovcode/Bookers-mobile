import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationMenu from "@/components/navigation/navigation-menu";
import AntDesign from '@expo/vector-icons/AntDesign';

const NotificationClient = () => {
  return (
    <View style={{backgroundColor: '#21212E', flex: 1,padding: 10}}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
            <NavigationMenu name={"Уведомления"} />
            <AntDesign name="delete" size={24} color="white" />
        </View>
      <Text>NotificationClient</Text>
    </View>
  )
}

export default NotificationClient

const styles = StyleSheet.create({})