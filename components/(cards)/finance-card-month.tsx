import {View, Text} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import CalendarComponent from '../calendar/calendar'
import Buttons from '../(buttons)/button'
import financeStore from "@/helpers/state_managment/finance/financeStore";
import {getFinanceMonth} from "@/helpers/api-function/finance/finance";
import {useEffect, useState} from "react";

const FinanceCardMonth = () => {
    const {setStartDate, setEndDate, setMonthData, startDate, endDate, monthData} = financeStore()
    const [counts, setCounts] = useState<any>(0)
    useEffect(() => {
        setCounts(monthData && monthData.reduce((sum: number, item: any) => sum + item.realIncome, 0))
    }, [monthData]);
    return (
        <View style={[tw`p-5 rounded-xl`, {backgroundColor: '#B9B9C9'}]}>
            <View style={[tw`${(monthData && monthData.length > 0) ? 'mb-5' : 'mb-3'}`, {flexDirection: 'column'}]}>
                <Text style={[tw`text-lg font-semibold`]}>Прибыль за пеприод</Text>
                {(monthData && monthData.length > 0) && (
                    <Text style={[tw`text-lg font-bold`, {color: '#9C0A35'}]}>
                        {`${counts ? `${counts} сум` : `${0} сум`}`}
                    </Text>
                )}
            </View>
            <View style={{gap: 14, marginBottom: 14}}>
                <CalendarComponent setMonthDate={setStartDate}/>
                <CalendarComponent setMonthDate={setEndDate}/>
            </View>
            <Buttons title='Расчитать' onPress={() => getFinanceMonth(setMonthData, startDate, endDate)}
                     isDisebled={!(startDate && endDate && (startDate === endDate))}/>
        </View>
    )
}

export default FinanceCardMonth