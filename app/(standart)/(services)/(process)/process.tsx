import React, { useState } from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router, useNavigation } from "expo-router";
import { ScrollView, StatusBar, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';

const Process = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState<string>('');



    const Gender = [
        {
            title: "Мужская для взрослых"
        },
        {
            title: "Мужская для детей"
        }
    ];

    const uslugi = [
        {
            label: "Услуга"
        },
        {
            label: "Цена"
        },
        {
            label: "Длительность (без учёта перерыва после процедуры)"
        },

    ];

    const checkFormValidity = () => {

        if (textAreaValue.trim() !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };
    
    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
           <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
           <NavigationMenu name={`Процедура услуг`} deleteIcon />
                <View style={[tw`flex-1` , {backgroundColor:'#21212E'}]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between',backgroundColor:'#21212E'}}
                > 
                    <View style = {[tw``, {backgroundColor:'#21212E'}]}>
                        <View style={[tw`w-full p-4 rounded-3xl mb-4`, { backgroundColor: '#B9B9C9' }]}>
                            <Text style={tw`text-gray-600`}>Ваша специализация</Text>
                            <Text style={tw`text-black font-bold text-lg`}>Ваша специализация
                                Парикмахер, Стилист, Специалист по причёскам Специалист по причёскам</Text>
                        </View>
                             {Gender.map((gender, index) => (
                            <ServicesCategory
                                key={index}
                                title={gender.title}
                                isRadioButton />
                        ))}
                        <View style={[tw`mt-5 p-2 `, {backgroundColor:'#21212E'}]}>
                            {uslugi.map((uslugi, index) => (
                                <LocationInput
                                    key={index}
                                    label={uslugi.label}
                                />
                            ))}
                        </View>
                        <View style={[tw`p-3`,{backgroundColor:'#21212E'}]}>
                            <Text style={tw`text-gray-500 mb-2`}>Описание</Text>
                            <TextInput
                                style={tw`bg-gray-500 p-2 rounded-xl text-lg text-white `}
                                multiline
                                numberOfLines={4}
                                value={textAreaValue}
                                onChangeText={(text) => {
                                    setTextAreaValue(text);
                                    checkFormValidity();
                                }}
                                scrollEnabled={true}
                            />
                        </View>
                    </View>
                    <View style={[tw`mb-3 p-3`, {backgroundColor:'#21212E'}]}>
                            <Buttons title='Сохранить' isDisebled={false} />
                     </View>
                </ScrollView>
                </View>
        </SafeAreaView>
    );
};
export default Process;
