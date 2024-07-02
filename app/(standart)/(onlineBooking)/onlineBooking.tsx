                          import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { router } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import SwitchWithLabel from '@/components/switchWithLabel/switchWithLabel';
import Buttons from '@/components/(buttons)/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MessageOption from '@/components/messageOption/messageOption';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { putNumbers } from '@/helpers/api-function/numberSittings/numbersetting';



const data = [
    {
        id: '1',
        title: 'Длительность записи',
        subtitle: 'Не настроено',
        IconComponent: <FontAwesome5 name="calendar-alt" size={30} color="#9C0A35"/>,
        onPress: () => { router.push('/booking') }
    },
    {
        id: '1',
        title: 'Перерыв между сеансами',
        subtitle: 'Не настроено',
        IconComponent: <Ionicons name="wine" size={30} color="#9C0A35"/>,
        onPress: () => { router.push('/booking') }
    },
    {
        id: '1',
        title: 'Перерыв между сеансами',
        subtitle: 'Не настроено',
        IconComponent: <Feather name="check-circle" size={30} color="#9C0A35"/>,
        onPress: () => { router.push('/booking') }
    },
    {
        id: '1',
        title: 'Перерыв между сеансами',
        subtitle: 'Не настроено',
        IconComponent: <Feather name="watch" size={30} color="#9C0A35" />,
        onPress: () => { router.push('/booking') }
    },
]

const OnlineBooking = () => {

    const renderItem = ({item}) => (
        <MessageOption
            title={item.title}
            subtitle={item.subtitle}
            onPress={item.onPress}
            IconComponent={item.IconComponent}

        />
    );

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={[tw`flex-1 mt-6`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Настройка уведомлений`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View>
                        <View style={tw`mb-5`}>
                            <SwitchWithLabel
                                label="Отключить все уведомления"
                                value={isEnabled}
                                onToggle={toggleSwitch}
                            />
                        </View>
                        <View style={tw`text-white mb-3`}>
                            <Text style={tw`text-white mb-3`}>Настройте уведомления приложения</Text>
                        </View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />

                    </View>
                    <View style={[tw`grid content-end mb-5`, { backgroundColor: '#21212E' }]}>
                        <Buttons title="На главную" onPress={() =>  {
                            putNumbers(6)
                            router.push("(welcome)/Welcome")
                        }} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default OnlineBooking;
