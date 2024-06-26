import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import Buttons from '@/components/(buttons)/button';
import Description from '@/components/description/description';
import { router } from 'expo-router';
import heplStore from '@/helpers/state_managment/help/helpStore';


const AboutUs = () => {
    const {helpData, navigatName} = heplStore()
    const descriptionData = {
        title: "Онлайн сервис для самостоятельного бронирования услуг специалистов в сфере красоты и ухода за внешностью",
        content: "На сервис уже на протяжении 2х лет дарит пользователям ...... Равным образом сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия. Равным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Равным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.",
        contactTitle: "Контакты",
        contactInfo: "+99893 171-63-80"
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={navigatName} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw``, { backgroundColor: '#21212E' }]}>
                        <View style={[tw`mb-5 justify-center items-center`, { backgroundColor: '#21212E' }]}>
                            <View style={styles.logo}>
                                <Image
                                    source={require('../../../../assets/images/auth/logo.png')}
                                    style={{ width: '100%', height: '100%', borderRadius: 50 }}
                                    resizeMode='contain'
                                />
                            </View>
                            <Description
                                title={descriptionData.title}
                                content={helpData ? helpData.text : ""}
                                contactTitle={descriptionData.contactTitle}
                                contactInfo={descriptionData.contactInfo}
                            />
                        </View>
                        <View style={tw`content-end mb-3 p-3`}>
                        <Buttons title='На главную' onPress={() => router.push('/Welcome')} />
                    </View>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 20,
        padding: 10,
        marginTop: 20
    },
});

export default AboutUs;
