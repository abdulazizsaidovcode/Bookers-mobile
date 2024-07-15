import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { handleRefresh } from '@/constants/refresh';

const RecentMasters = () => {
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);
    return (
        <SafeAreaView>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text>RecentMasters</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecentMasters

const styles = StyleSheet.create({})