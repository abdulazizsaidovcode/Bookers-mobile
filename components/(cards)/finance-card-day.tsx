import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CalendarComponent from '../calendar/calendar'
import financeStore from "@/helpers/state_managment/finance/financeStore";

const FinanceCardDay = () => {
    const {dayData} = financeStore()
    return (
        <View style={[tw`p-5 rounded-xl mb-5`, {backgroundColor: '#B9B9C9'}]}>
            <CalendarComponent />
            <View style={tw`flex-row justify-between items-center mt-5`}>
                <Text style={[tw`text-lg font-semibold`]}>Фактический доход</Text>
                <Text style={[tw`text-lg font-bold`, { color: '#9C0A35' }]}>
                    {dayData ? `${dayData.realIncome} сум` : 'loading...'}
                </Text>
            </View>
        </View>
    )
}

export default FinanceCardDay