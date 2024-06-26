import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import Buttons from '@/components/(buttons)/button';
import Description from '@/components/description/description';
import { router } from 'expo-router';


const OfferFree = () => {
    const descriptionData = {
        title: "Онлайн сервис для самостоятельного бронирования услуг специалистов в сфере красоты и ухода за внешностью",
        content: "На сервис уже на протяжении 2х лет дарит пользователям ...... Равным образом сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия. Равным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Равным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. авным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. ",
      
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Публичная оферта`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw``, { backgroundColor: '#21212E' }]}>
                        <View style={[tw`mb-5 justify-center items-center`, { backgroundColor: '#21212E' }]}>
                            <Description
                                title={descriptionData.title}
                                content={descriptionData.content}
                            />
                        </View>
                    </View>
                    <View style={tw`content-end mb-3 p-3`}>
                        <Buttons title='На главную' onPress={() => router.push('/Welcome')} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default OfferFree;
