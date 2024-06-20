import {FlatList, ScrollView, StatusBar, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import {SafeAreaView} from 'react-native-safe-area-context'
import FiltersButton from '@/components/(buttons)/filters-button'
import FinanceCardDay from '@/components/(cards)/finance-card-day'
import FinanceRevenuesDay from '@/components/(cards)/finance-revenues-day'
import ClientCard from '@/components/(cards)/top-client-card'
import FinanceCardMonth from '@/components/(cards)/finance-card-month'
import {MaterialIcons} from '@expo/vector-icons';
import {getFinanceDay, getTopClients} from '@/helpers/api-function/finance/finance'
import {setConfig} from '@/helpers/token'
import financeStore from '@/helpers/state_managment/finance/financeStore'

const Finance = () => {
    const {
        dayData,
        setDayData,
        monthData,
        setMonthData,
        topClients,
        setTopClients,
        date
    } = financeStore()
    const [isFilters, setIsFilters] = useState('day')

    useEffect(() => {
        setConfig()
        getTopClients(setTopClients)
        getFinanceDay(setDayData, date)
    }, [])

    useEffect(() => {
        getFinanceDay(setDayData, date)

    }, [date]);

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, padding: 16, backgroundColor: '#21212E'}}
        >
            <SafeAreaView>
                <StatusBar backgroundColor={`black`} barStyle={`dark-content`}/>
            </SafeAreaView>
            <Text style={[tw`text-white text-3xl my-7 font-bold`, {letterSpacing: 2}]}>Финансы</Text>

            <View style={[tw`flex-row justify-between items-center mb-5`, {gap: 5}]}>
                <FiltersButton
                    title='По дням'
                    isDisebled={isFilters !== 'day' ? true : false}
                    onPress={() => setIsFilters('day')}
                />
                <FiltersButton
                    title='По периоду'
                    isDisebled={isFilters !== 'month' ? true : false}
                    onPress={() => setIsFilters('month')}
                />
                <FiltersButton
                    title='ТОП клинеты'
                    isDisebled={isFilters !== 'top_clients' ? true : false}
                    onPress={() => setIsFilters('top_clients')}
                />
            </View>

            {/*filters un*/}
            {isFilters === 'day' && <FinanceCardDay/>}
            {isFilters === 'month' && (
                <>
                    <FinanceCardMonth/>
                    <View style={tw`mb-5 mt-7 flex-row justify-between items-center`}>
                        <Text style={tw`text-base text-white font-bold`}>По месяцам</Text>
                        <MaterialIcons
                            name="navigate-next"
                            size={30}
                            color="white"
                            style={{transform: 'rotate(90deg)'}}
                        />
                    </View>
                </>
            )}

            {/* day cards */}
            {isFilters === 'day' && <FinanceRevenuesDay/>}

            {/* month cards */}
            {isFilters === 'month' && (
                <View style={{gap: 18}}>
                    <FinanceRevenuesDay/>
                    <FinanceRevenuesDay/>
                    <FinanceRevenuesDay/>
                </View>
            )}

            {/* clients cards */}
            {isFilters === 'top_clients' && (
                <View style={{gap: 18}}>
                    <FlatList
                        data={topClients}
                        renderItem={({item}) => <ClientCard items={item}/>}
                        keyExtractor={(item: any) => item.id}
                    />
                </View>
            )}
        </ScrollView>
    )
}

export default Finance;