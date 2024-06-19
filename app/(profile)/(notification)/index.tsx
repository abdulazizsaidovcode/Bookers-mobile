import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';

const Notification = () => {
    const navigation = useNavigation();
    navigation.navigate('(chat)/(communicatie)/chatDetails', { id })
    return (
        <View>
            <Text>Notification</Text>
        </View>
    )
}

export default Notification