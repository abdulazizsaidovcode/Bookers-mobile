import {View, Text} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import financeStore from "@/helpers/state_managment/finance/financeStore";

const FinanceRevenuesDay = () => {
    const {dayData} = financeStore()
    return (
        <View style={[tw`p-5 rounded-xl`, {backgroundColor: '#B9B9C9'}]}>
            <Text style={[tw`text-black text-xl mb-4 font-bold`]}>
                {dayData ?
                    <>
                        <Text>Доходы за </Text>
                        <Text style={tw`capitalize`}>{dayData.monthName}</Text>
                    </>
                    : 'loading...'
                }
            </Text>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Плановый Доход:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>
                    {dayData ? `${dayData.plannedIncome} сум` : 'loading...'}
                </Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Рабочие часы:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>
                    {dayData ? dayData.workHour : 'loading...'}
                </Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Сеансов выполнено:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>
                    {dayData ? dayData.completedSessions : 'loading...'}
                </Text>
            </View>
        </View>
    )
}

export default FinanceRevenuesDay