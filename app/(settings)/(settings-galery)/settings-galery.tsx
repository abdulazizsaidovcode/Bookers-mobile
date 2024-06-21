import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationMenu from '@/components/navigation/navigation-menu'
import LocationInput from '@/components/(location)/locationInput'
import Buttons from '@/components/(buttons)/button'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'

const SettingsGalery = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <NavigationMenu name='Моя галерея' />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>Фото галерея</Text>
                    <View style={{ marginTop: 10 }}>
                        <LocationInput placeholder='Название альбома' labalVisible={true} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ width: 200 }}>
                            <Buttons icon={<Feather name="upload-cloud" size={20} color="white" />} title={` Загрузить фото`} />
                        </View>
                        <View style={{ width: 180, marginTop: 10 }}>
                            <Buttons icon={<Ionicons name="camera-outline" size={20} color="white" />} title={` Сделать фото`} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsGalery

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    title: {
        color: 'white',
        fontSize: 27
    }
})