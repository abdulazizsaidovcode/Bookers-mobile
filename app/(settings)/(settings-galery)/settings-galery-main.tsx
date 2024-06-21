import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-galery-main'>;

const SettingsGaleryMain = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <NavigationMenu name='Моя галерея' />
                </View>
                <View style={styles.content}>
                    <View style={{ height: '83%' }}>
                        <Text style={styles.title}>Фото галерея</Text>
                        <Text style={styles.description}>Ваша галерея пустая, добавьте фотографии из проводника Вашего телефона</Text>
                    </View>
                    <View style={{ height: '17%' }}>
                        <Buttons onPress={() => navigation.navigate('(settings)/(settings-galery)/settings-galery')} icon={<AntDesign name="pluscircleo" size={20} color="white" />} title='Создать альбом' />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsGaleryMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    backButton: {
        marginRight: 10,
    },
    content: {
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 27,
    },
    description: {
        width: 330,
        fontSize: 15,
        color: 'white',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
});
