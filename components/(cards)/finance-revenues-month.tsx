import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const FinanceRevenuesMonth = () => {
    return (
        <View style={[tw`p-5 rounded-xl`, { backgroundColor: '#B9B9C9' }]}>
            <Text style={[tw`text-black text-xl mb-4 font-bold`]}>Доходы за март</Text>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Плановый Доход:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>3 500 000 сум</Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Рабочие часы:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>10</Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Сеансов выполнено:</Text> 
                <Text style={[tw`text-base font-bold text-black`]}>4</Text>
            </View>
        </View>
    )
}

export default FinanceRevenuesMonth