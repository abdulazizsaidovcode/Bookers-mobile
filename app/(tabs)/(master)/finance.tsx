import { FlatList, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import FiltersButton from '@/components/(buttons)/filters-button'
import FinanceCardDay from '@/components/(cards)/finance-card-day'
import FinanceRevenuesDay from '@/components/(cards)/finance-revenues-day'
import ClientCard from '@/components/(cards)/top-client-card'
import FinanceCardMonth from '@/components/(cards)/finance-card-month'
import { MaterialIcons } from '@expo/vector-icons';
import { getFinanceDay, getTopClients } from '@/helpers/api-function/finance/finance'
import financeStore from '@/helpers/state_managment/finance/financeStore'
import FinanceRevenuesMonth from "@/components/(cards)/finance-revenues-month";
import { handleRefresh } from "@/constants/refresh";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { Loading } from "@/components/loading/loading";

const Finance = () => {
    const {
        setDayData,
        monthData,
        topClients,
        setTopClients,
        date,
        startDate,
        endDate,
        setMonthData
    } = financeStore()
    const { refreshing, setRefreshing, isLoading, setIsLoading } = clientStore()
    const [isFilters, setIsFilters] = useState('day')
    const [monthShowHide, setMonthShowHide] = useState<boolean>(false)

    useEffect(() => {
        getTopClients(setTopClients, setIsLoading)
        getFinanceDay(setDayData, date)
    }, [])

    useEffect(() => {
        getFinanceDay(setDayData, date)
        if (startDate === endDate) setMonthData(null)
    }, [date]);

    useEffect(() => {
        if (isFilters !== 'month') setMonthData(null)
    }, [isFilters]);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    const toggleMonth = () => setMonthShowHide(!monthShowHide)
    return (
        <SafeAreaView
        style={{ flex: 1, backgroundColor: '#21212E' }}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, backgroundColor: '#21212E' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
                <Text style={[tw`text-white text-3xl my-7 font-bold`, { letterSpacing: 2 }]}>Финансы</Text>

                <View style={[tw`flex-row items-center mb-5`, { gap: 5 }]}>
                    <FiltersButton
                        title='По дням'
                        isDisebled={isFilters !== 'day'}
                        onPress={() => setIsFilters('day')}
                    />
                    <FiltersButton
                        title='По периоду'
                        isDisebled={isFilters !== 'month'}
                        onPress={() => setIsFilters('month')}
                    />
                    <FiltersButton
                        title='ТОП клинеты'
                        isDisebled={isFilters !== 'top_clients'}
                        onPress={() => setIsFilters('top_clients')}
                    />
                </View>

                {/*filters un*/}
                {isFilters === 'day' && <FinanceCardDay />}
                {isFilters === 'month' && (
                    <>
                        <FinanceCardMonth />
                        <View style={tw`mb-5 mt-7 flex-row justify-between items-center`}>
                            <Text style={tw`text-base text-white font-bold`}>По месяцам</Text>
                            <MaterialIcons
                                onPress={() => {
                                    (monthData && monthData.length > 0) && toggleMonth()
                                }}
                                name="navigate-next"
                                size={30}
                                color="white"
                                style={{ transform: monthData ? ((monthData.length > 0 && !monthShowHide) ? 'rotate(90deg)' : '') : '' }}
                            />
                        </View>
                    </>
                )}

                {/* day cards */}
                {isFilters === 'day' && <FinanceRevenuesDay />}

                {/* month cards */}
                {isFilters === 'month' && (
                    <View style={[tw`${monthShowHide ? 'hidden' : ''}`]}>
                        <FlatList
                            data={monthData}
                            renderItem={({ item }) => <FinanceRevenuesMonth items={item} />}
                        />
                    </View>
                )}

                {/* clients cards */}
                {isFilters === 'top_clients' && (
                    isLoading ? <Loading /> : (
                        <View style={{ gap: 18 }}>
                            {!topClients ? <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={tw`text-xl font-bold text-white text-center`}>Top client not found</Text>
                            </View> : (
                                <FlatList
                                    data={topClients}
                                    renderItem={({ item }) => <ClientCard items={item} />}
                                />
                            )}
                        </View>
                    )
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Finance;