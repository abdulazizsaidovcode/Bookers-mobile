import {View, Text} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import {FinanceMonth} from "@/type/finance/finance";
import moment from "moment";

const FinanceRevenuesMonth = ({items}: FinanceMonth | any) => {
    return (
        <View style={[tw`p-5 rounded-xl mb-4`, {backgroundColor: '#B9B9C9'}]}>
            <View style={tw`flex-row justify-between items-center`}>
                <Text style={[tw`text-lg font-semibold capitalize`]}>
                    {items ? items.monthName : 'loading...'}
                </Text>
                <Text style={[tw`text-lg font-bold`, {color: '#9C0A35'}]}>
                    {items ? `${items.realIncome} сум` : 'loading...'}
                </Text>
            </View>
            <Text style={[tw`text-base my-4`, {color: '#4F4F4F'}]}>
                {items ? `${moment(items.date.slice(0, 10)).format('DD.MM.YYYY')} - ${moment(items.date.slice(12, 23)).format('DD.MM.YYYY')}` : 'loading...'}
            </Text>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Доход:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>
                    {items ? `${items.income} сум` : 'loading...'}
                </Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Расход:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>
                    {items ? `${items.expense} сум` : 'loading...'}
                </Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Рабочие часы:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>
                    {items ? items.workHour : 'loading...'}
                </Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Сеансов выполнено</Text>
                <Text style={[tw`text-base font-bold text-black`]}>
                    {items ? items.completedSessions : 'loading...'}
                </Text>
            </View>
        </View>
    )
}

export default FinanceRevenuesMonth