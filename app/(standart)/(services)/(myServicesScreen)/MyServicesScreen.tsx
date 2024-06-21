import NavigationMenu from '@/components/navigation/navigation-menu';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MaterialIcons } from '@expo/vector-icons';
import HomeCards from '@/components/(cards)/homeCard';
import { Ionicons } from '@expo/vector-icons';
import Buttons from '@/components/(buttons)/button';



const MyServicesScreen = () => {

    const categories = [
        'Красота и здоровье волос',
        'Маникюр и педикюр',
        'Уход за лицом',
        'Массаж и СПА',
        'Фитнес и йога',
    ];
    return (
        <ScrollView style={tw`bg-gray-900 h-full p-4`}>
            <NavigationMenu name='Мои услуги' />
            <View style={tw`flex flex-row justify-between  p-4 mb-4`}>
                <Text style={tw`text-white mb-2 text-xl`}>Направление услуг по полу</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <MaterialIcons name="mode-edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row w-25 gap-5`}>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ gap: 10, padding: 16, marginBottom: 5 }}
                    showsHorizontalScrollIndicator={false}
                >
                    <HomeCards title='Мужское' description='Взрослое, Детский' icon={
                        () => <Ionicons name="man-outline" size={30} color="white" />
                    } />
                    <HomeCards title='Мужское' description='Взрослое, Детский' icon={
                        () => <Ionicons name="man-outline" size={30} color="white" />
                    } />
                </ScrollView>
            </View>

            <View style={tw`flex flex-row justify-between  p-4 mb-2`}>
                <Text style={tw`text-white mb-2 text-xl`}>Категория услуг</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <MaterialIcons name="mode-edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {/* <ScrollView
                horizontal
                contentContainerStyle={{ gap: 16, marginBottom: 10 }}
                showsHorizontalScrollIndicator={false}
            >
                {categories.map((category, index) => (
                    <View key={index}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={tw`rounded-lg bg-white p-2 mb-2 text-lg`}>{category}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={tw`flex flex-row justify-between mb-2 p-4`}>
                <Text style={tw`text-white mb-2 text-xl`}>Специализация услуг</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <MaterialIcons name="mode-edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: 16, padding: 20, marginBottom: 5 }}
                showsHorizontalScrollIndicator={false}
            >
                {categories.map((category, index) => (
                    <View key={index}>
                        <TouchableOpacity >
                            <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282]`}>{category}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={tw`flex flex-row justify-between p-4 mb-2`}>
                <Text style={tw`text-white mb-2 text-xl`}>Процедуры услуг</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <MaterialIcons name="mode-edit" size={24} color="white" />
                </TouchableOpacity>
            </View> */}
            {/* <View style={tw`bg-white rounded-lg rounded-xl mb-4 p-4`}>
                <Text style={tw`font-bold text-xl`}>Мужская для взрослых</Text>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ gap: 16, marginTop: 10, marginBottom: 5 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {categories.map((category, index) => (
                        <View key={index}>
                            <TouchableOpacity >
                                <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282] mb-2`}>{category}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <Text style={[tw`font-bold text-xl mb-3`, { color: '#9C0A35' }]}>350 000 сум</Text>
                <Text style={tw`text-black mb-2`}>В услугу входит мытьё головы, массаж головы и Разнообразный и богатый опыт постоянный</Text>
            </View> */}
            <View style = {tw`mb-10`}>
                <Buttons title='На главную'/>
            </View>
            
        </ScrollView>
    );
};

export default MyServicesScreen;
