import NavigationMenu from '@/components/navigation/navigation-menu';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MaterialIcons } from '@expo/vector-icons';
import HomeCards from '@/components/(cards)/homeCard';



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
            <HomeCards title='Мужское' description=''/>
            <View style={tw`flex flex-row justify-between  p-4 mb-2`}>
                <Text style={tw`text-white mb-2 text-xl`}>Категория услуг</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <MaterialIcons name="mode-edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: 16, padding: 16, marginBottom: 5 }}
                showsHorizontalScrollIndicator={false}
            >
                {categories.map((category, index) => (
                    <View key={index}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={tw`rounded-lg bg-white p-3 text-lg`}>{category}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={tw`flex flex-row justify-between  p-4 mb-2`}>
                <Text style={tw`text-white mb-2 text-xl`}>Специализация услуг</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <MaterialIcons name="mode-edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: 16, padding: 16, marginBottom: 5 }}
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
            <View style={tw`flex flex-row justify-between  p-4 mb-2`}>
                <Text style={tw`text-white mb-2 text-xl`}>Процедуры услуг</Text>
                <TouchableOpacity activeOpacity={.6}>
                    <MaterialIcons name="mode-edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            
            <View style={tw` rounded-lg rounded-xl mb-4`}>
                <Text style={tw`text-white text-black mb-2`}>Процедуры услуг</Text>
                <View style={tw`bg-white rounded-lg p-4`}>
                    <Text style={tw`text-white mb-2`}>Мужская для взрослых</Text>
                    <Text style={tw`text-pink-500 mb-2`}>350 000 сум</Text>
                    <Text style={tw`text-white`}>В услугу входят мытьё головы, массаж головы и Разнообразный и богатый опыт постоянных</Text>
                </View>
                <TouchableOpacity style={tw`bg-pink-500 rounded-full p-2 mt-2`}>
                    <Text style={tw`text-white`}>На главную</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MyServicesScreen;
