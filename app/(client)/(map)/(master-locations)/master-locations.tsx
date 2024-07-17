import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { handleRefresh } from '@/constants/refresh';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import useGetMeeStore from '@/helpers/state_managment/getMee';

const MasterLocations = () => {
    const [refreshing, setRefreshing] = useState(false)
    const {userLocation, setUserLocation} = useGetMeeStore()

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    useEffect(() => {
        getUserLocation(setUserLocation);
    } ,[])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View>
                    <NavigationMenu name='Beauty Wave'/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MasterLocations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E'
    }
})