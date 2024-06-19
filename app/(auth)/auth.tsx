import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { router } from 'expo-router';
import Buttons from "@/components/(buttons)/button";

const Auth = () => {
    const onPress = (language: string, link: string) => {
        router.push(link)
        console.log(language);
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image resizeMode='contain' source={require('../../assets/images/auth/logo.png')} />
            </View>
            <View>
                <Text style={{ fontSize: 20, color: 'white', marginTop: 15, marginBottom: 8 }}>Bookers Beauty</Text>
            </View>
            <View>
                <Text style={{ fontSize: 21, color: 'white', marginTop: 40 }}>Добро пожаловать!</Text>
            </View>
            <View>
                <Text style={{ fontSize: 22, color: 'white', marginTop: 40 }}>Выберите язык</Text>
            </View>
            <View style={{ width: '90%' }}>
                <View style={{ marginTop: 10 }}>
                    <Buttons onPress={() => onPress('ru', '')} title='Русский' textColor='white' backgroundColor='#9C0A35' />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Buttons onPress={() => onPress('uz', '')} title="O'zbek" textColor='white' backgroundColor='#9C0A35' />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Buttons onPress={() => onPress('en', '')} title='English' textColor='white' backgroundColor='#9C0A35' />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})