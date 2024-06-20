import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CalendarComponent from '../calendar/calendar'
import Buttons from '../(buttons)/button'
import financeStore from "@/helpers/state_managment/finance/financeStore";
import {getFinanceMonth} from "@/helpers/api-function/finance/finance";

const FinanceCardMonth = () => {
    const {setStartDate, setEndDate, setMonthData, startDate, endDate} = financeStore()
    return (
        <View style={[tw`p-5 rounded-xl`, { backgroundColor: '#B9B9C9' }]}>
            <View style={[tw`mb-5`, {flexDirection: 'column'}]}>
                <Text style={[tw`text-lg font-semibold`]}>Прибыль за пеприод</Text>
                <Text style={[tw`text-lg font-bold`, { color: '#9C0A35' }]}>10 000 000 сум</Text>
            </View>
            <View style={{ gap: 14, marginBottom: 14 }}>
                <CalendarComponent setMonthDate={setStartDate} />
                <CalendarComponent setMonthDate={setEndDate} />
            </View>
            <Buttons title='Расчитать' onPress={() => getFinanceMonth(setMonthData, startDate, endDate)} isDisebled={!(startDate && endDate && (startDate === endDate))} />
        </View>
    )
}

export default FinanceCardMonth