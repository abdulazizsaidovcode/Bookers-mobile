import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationMenu from '@/components/navigation/navigation-menu'
import SwitchWithLabelBlack from '@/components/switchWithLabel/switchWithLabelBlack'
import Buttons from '@/components/(buttons)/button'
import { OnlineBookingStory3 } from '@/helpers/state_managment/onlinBooking/onlineBooking'

const TimeSelect = () => {
    const { setTimeEnabled, timeEnabled } = OnlineBookingStory3()

    const timeSwitch = () => {
        const newValue = !timeEnabled
        setTimeEnabled(newValue)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <NavigationMenu name={`Онлайн бронирование`} />
                <View style={styles.switchContainer}>
                    <SwitchWithLabelBlack
                        onToggle={timeSwitch}
                        value={timeEnabled}
                        label="Подтверждать записи для всех клиентов"
                    />
                </View>
                {timeEnabled && (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Salom dunyo</Text>
                    </View>
                )}
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
    switchContainer: {
        paddingHorizontal: 16,
        marginBottom: 10,
        backgroundColor: '#B9B9C9',
        borderRadius: 15,
    },
    messageContainer: {
        padding: 16,
        backgroundColor: '#B9B9C9',
        borderRadius: 15,
        marginTop: 10,
    },
    messageText: {
        color: '#000',
        fontSize: 16,
    },
})


