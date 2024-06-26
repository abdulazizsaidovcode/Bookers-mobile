import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import SwitchWithLabel from '@/components/switchWithLabel/switchWithLabel';
import Buttons from '@/components/(buttons)/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';

const data = [
    {
        day: "1 день"
    },
    {
        day: "1 день"
    }
]

const Booking = () => {
    const [salonId, setSalonId] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);

    const data = [
        { key: '1', value: 'Salon A' },
        { key: '2', value: 'Salon B' },
        { key: '3', value: 'Salon C' }
    ];



    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={[tw`flex-1 mt-6`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Онлайн бронирование`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >

                    <View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ gap: 16, marginTop: 15, marginBottom: 5 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            <TouchableOpacity activeOpacity={.8}>
                                <Text style={[tw`rounded-lg p-3 text-white text-[#828282] mb-6`, { backgroundColor: '#9C0A35' }]}>По дням</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={tw`mb-3`}>
                            <Text style={tw`text-white text-lg`}>Длительность записи</Text>
                        </View>
                        <View style={tw`mb-10`}>
                            <Text style={tw`text-gray-400`}>
                                Настройте период в который запись к вам будет доступна заранее Настройте период в который запись к вам будет доступна заранее
                            </Text>
                        </View>
                        <SelectList
                            boxStyles={[tw`w-full text-white`, {backgroundColor: '#4B4B64'}]}
                            inputStyles={tw`text-white text-lg`}
                            dropdownStyles={[tw``,{backgroundColor:'#4B4B64'}]}
                            dropdownTextStyles={tw`text-white text-lg`}
                            setSelected={(val) => setSalonId(val)}
                            data={data.map(item => ({ key: item.key, value: item.value }))}
                            save="key"
                            search={false}
                        />
                    </View>
                    <View style={[tw`grid content-end mb-5`, { backgroundColor: '#21212E' }]}>
                        <Buttons title="Сохранить" onPress={() => router.push('/category')} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Booking;
