import { View, StyleSheet, Text, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Booked from './components/boooked'
import CalendarGrafficEdit from '@/app/(free)/(work-grafic-edit)/calendar'
import NavigationMenu from '@/components/navigation/navigation-menu'
import Buttons from '@/components/(buttons)/button'
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore'
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime'
import { postOrder } from '@/helpers/api-function/oreder/oreder'
import { useSheduleData } from '@/helpers/state_managment/schedule/schedule'
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-simple-toast'

const OrderClient = () => {
  const { selectedCategoryId, selectedClient } = ClientStory()
  const { FreeTime } = useScheduleFreeTime()
  const { timeHour } = useSheduleData()
  const { calendarDate } = graficWorkStore()
  const [orderMessageStatus, setOrderMessageStatus] = useState<string>("");

  async function setOrder() {
    let data: any = {
      serviceIds: selectedCategoryId,
      date: calendarDate,
      timeHour: parseInt(timeHour.split(":")[0], 10),
      timeMin: parseInt(timeHour.split(":")[1], 10),
      comment: "",
      clientId: selectedClient && selectedClient.id,
    }

    console.log(data);
    await postOrder({
      data,
      messageSatus: (message: string) => setOrderMessageStatus(message),
    })
  }
  useEffect(() => {
    console.log(orderMessageStatus);

    if (orderMessageStatus) {
      Toast.show(orderMessageStatus, Toast.LONG);
    }
  }, [orderMessageStatus])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <NavigationMenu name='График' />
        <Text>Сегодня четверг, 23 февраля</Text>
        <CalendarGrafficEdit />
        <Booked />
        <Buttons onPress={setOrder} title='Продолжить' isDisebled={!!FreeTime && !!timeHour} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#21212E',
    padding: 18,
    flex: 1,
    width: '100%',
  }
});

export default OrderClient