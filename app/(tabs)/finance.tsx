import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context'
import FiltersButton from '@/components/(buttons)/filters-button'
import FinanceCard from '@/components/(cards)/finance-card'
import FinanceRevenuesDay from '@/components/(cards)/finance-revenues-day'
import ClientCard from '@/components/(cards)/top-client-card'

const Finance = () => {
    const [isFilters, setIsFilters] = useState('day')
    console.log(isFilters);
    
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, padding: 16, backgroundColor: '#21212E' }}
        >
            <SafeAreaView>
                <StatusBar backgroundColor={`black`} barStyle={`dark-content`} />
            </SafeAreaView>
            <Text style={[tw`text-white text-3xl my-7 font-bold`, { letterSpacing: 2 }]}>Финансы</Text>

            <View style={styles.tabs}>
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
            <FinanceCard />
            <FinanceRevenuesDay />
            <ClientCard />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        gap: 5
    },
    boldText: {
        fontWeight: 'bold',
    }
});

export default Finance;