import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationMenu from '@/components/navigation/navigation-menu'
import Buttons from '@/components/(buttons)/button'
import SwitchWithLabelBlack from '@/components/switchWithLabel/switchWithLabelBlack'
import { OnlineBookingStory2 } from '@/helpers/state_managment/onlinBooking/onlineBooking'

const RequestWindow = () => {
    const { isEnabled, setIsEnabled, isEnabled2, setIsEnabled2 } = OnlineBookingStory2()
    const requestSwitch = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        // onlineBookingAllowClient(newValue)
        console.log(newValue);
    };
    const requestSwitch2 = () => {
        const newValue = !isEnabled2;
        setIsEnabled2(newValue);
        // onlineBookingAllowClient(newValue)
        console.log(newValue);
    };
    console.log(isEnabled, isEnabled2);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ marginBottom: 10, }}></Text>
                <NavigationMenu name={`Онлайн бронирование`} />
                <Text style={{ marginTop: 10, marginBottom: 10, color: 'white', fontSize: 18 }}>Запрос окошка</Text>
                <Text style={{ color: 'white', marginBottom: 10 }}>
                    Когда клиент выбирает день для записи и на этот день нет свободного времени, он может активировать
                    зал ожидания. Затем, если у мастера освобождается время в этот день из-за отмены другого заказа, клиент,
                    находящийся в зале ожидания, может быть перенаправлен на это время. Мастер уведомляет клиента через
                    приложение о доступном времени, и клиент может подтвердить запись на это время
                </Text>
                <View style={{ paddingHorizontal: 16, marginBottom: 10, backgroundColor: '#B9B9C9', borderRadius: 15 }}>
                    <SwitchWithLabelBlack
                        value={isEnabled}
                        onToggle={requestSwitch}
                        label="Подтверждать записи для всех клиентов"
                    />
                </View>
                <View style={{ paddingHorizontal: 16, marginBottom: 10, backgroundColor: '#B9B9C9', borderRadius: 15 }}>
                    <SwitchWithLabelBlack
                        onToggle={requestSwitch2}
                        value={isEnabled2}
                        label="Активировать запрос окошка только для постоянных клиентов"
                    />
                </View>
            </View>
            <Buttons title="Сохранить" backgroundColor="#9C0A35" onPress={() => { }} />
        </SafeAreaView>
    )
}

export default RequestWindow

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#21212E',
        padding: 16,
    },
})