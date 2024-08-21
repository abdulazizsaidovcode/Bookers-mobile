import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Buttons from './(buttons)/button'

const DatingSkip: React.FC<{ navigation: any, navigate: string }> = ({ navigate, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ width: '30%' }}>
                <Buttons
                    textSize={15}
                    backgroundColor='#21212E'
                    textColor='white'
                    title='Пропустить'
                    onPress={() => navigation.navigate('(auth)/(register)/(roleSelection)/masterORclient')}
                />
            </View>
            <View style={{ width: '30%' }}>
                <Buttons
                    textSize={15}
                    title='Далее'
                    onPress={() => navigation.navigate(navigate)}
                />
            </View>
        </View>
    )
}

export default DatingSkip

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    }
})