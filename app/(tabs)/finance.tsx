import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context'
import FiltersButton from '@/components/(buttons)/filters-button'
import FinanceCard from '@/components/(cards)/finance-card'
import FinanceRevenuesMonth from '@/components/(cards)/finance-revenues-month'

const Finance = () => {
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
                <FiltersButton title='По дням' />
                <FiltersButton title='По периоду' />
                <FiltersButton title='ТОП клинеты' />
            </View>
            <FinanceCard />
            <FinanceRevenuesMonth />
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