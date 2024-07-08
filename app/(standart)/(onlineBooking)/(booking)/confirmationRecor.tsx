import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import NavigationMenu from '@/components/navigation/navigation-menu'
import SwitchWithLabel from '@/components/switchWithLabel/switchWithLabel'
import SwitchWithLabelBlack from '@/components/switchWithLabel/switchWithLabelBlack'

const ConfirmationRecord = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        // setAllowClient(newValue); // Update the global state
        // onlineBookingAllowClient(newValue)
        console.log(newValue);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ marginBottom: 10, }}></Text>
            <NavigationMenu name={`Онлайн бронирование`} />
            <StatusBar style="auto" />
            <View style={{ paddingHorizontal: 16, marginBottom: 10, backgroundColor: 'white', borderRadius: 15 }}>
                <SwitchWithLabelBlack
                    label="Подтверждать записи для всех клиентов"
                    value={isEnabled}
                    onToggle={toggleSwitch} />
            </View>
            <View style={{ paddingHorizontal: 16, marginBottom: 10, backgroundColor: 'white', borderRadius: 15 }}>
                <SwitchWithLabelBlack
                    label="Подтверждать записи только для новых клиентов"
                    value={isEnabled}
                    onToggle={toggleSwitch} />
            </View>
            <View style={{ paddingHorizontal: 16, marginBottom: 20, backgroundColor: 'white', borderRadius: 15 }}>
                <SwitchWithLabelBlack
                    label="Не подтверждать записи"
                    value={isEnabled}
                    onToggle={toggleSwitch} />
            </View>

            <Text style={{ marginBottom: 10, color: 'white' }}>
                Настройте подтверждение записи Вы можете подтверждать каждую запись и приложение будет отправлять увеедомления клиентам
            </Text>
            <Text style={{ marginBottom: 10, color: 'white' }}>
                Или клиенты будут бронировать Ваши услуги без Вашего подтверждения и Вы будете видеть всех записанных клиентов
            </Text>
        </SafeAreaView>
    )
}

export default ConfirmationRecord

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
    },
})