import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationMenu from '@/components/navigation/navigation-menu'
import SwitchWithLabelBlack from '@/components/switchWithLabel/switchWithLabelBlack'
import Buttons from '@/components/(buttons)/button'

const TimeSelect = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <NavigationMenu name={`Онлайн бронирование`} />
                <View style={{ paddingHorizontal: 16, marginBottom: 10, backgroundColor: '#B9B9C9', borderRadius: 15 }}>
                    <SwitchWithLabelBlack
                        onToggle={() => { }}
                        value={true}
                        label="Подтверждать записи для всех клиентов"
                    />
                </View>
                { }
            </View>
            <Buttons title="Сохранить" backgroundColor="#9C0A35" onPress={() => { }} />
        </SafeAreaView>
    )
}

export default TimeSelect

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#21212E',
        padding: 16,
    },
})