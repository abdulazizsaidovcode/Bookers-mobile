import { View, Text } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CalendarComponent from '../calendar/calendar'

const FinanceCard = () => {
    return (
        <View style={[tw`p-5 rounded-xl mb-5`, {backgroundColor: '#B9B9C9'}]}>
            <CalendarComponent />
            <View style={tw`flex-row justify-between items-center`}>
                {/* bu joyga date quyiladi yani calendar */}
                <Text style={[tw`text-lg font-semibold`]}>Фактический доход</Text>
                <Text style={[tw`text-lg font-bold`, { color: '#9C0A35' }]}>750 000 сум</Text>
            </View>
        </View>
    )
}

export default FinanceCard