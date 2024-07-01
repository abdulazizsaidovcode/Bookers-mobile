import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import RequestsAccordion from './components/accordion/RequestsAccordion'
import { masterOrderHWaitStore } from '@/helpers/state_managment/order/order'
import { getMasterOrderWait } from '@/helpers/api-function/oreder/oreder'

const Requestchedule = () => {
  const {  waitData ,setWaitData } = masterOrderHWaitStore()


  useEffect(() => {
    getMasterOrderWait(setWaitData)

  }, [setWaitData])

  return (
    <View>
      {<RequestsAccordion />}
    </View>
  )
}

export default Requestchedule