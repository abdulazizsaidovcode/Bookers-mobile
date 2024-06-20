import {View, Text} from 'react-native'
import tw from 'tailwind-react-native-classnames'

const FinanceRevenuesMonth = ({items}: any) => {
    return (
        <View style={[tw`p-5 rounded-xl`, {backgroundColor: '#B9B9C9'}]}>
            <View style={tw`flex-row justify-between items-center`}>
                <Text style={[tw`text-lg font-semibold`]}>Март</Text>
                <Text style={[tw`text-lg font-bold`, {color: '#9C0A35'}]}>
                    3 500 000 сум
                </Text>
            </View>
            <Text style={[tw`text-base my-4`, {color: '#4F4F4F'}]}>01.03.2024 - 20.03.2024</Text>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Доход:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>4 500 000 сум</Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Расход:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>1 000 000 сум</Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Рабочие часы:</Text>
                <Text style={[tw`text-base font-bold text-black`]}>10</Text>
            </View>
            <View style={[tw`flex-row justify-between items-center`]}>
                <Text style={[tw`text-base`, {color: '#4F4F4F'}]}>Сеансов выполнено</Text>
                <Text style={[tw`text-base font-bold text-black`]}>4</Text>
            </View>
        </View>
    )
}

export default FinanceRevenuesMonth