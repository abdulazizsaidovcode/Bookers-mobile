import {useEffect, useState} from "react";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import ClientCountCard from "@/components/(cards)/client-count-card";
import ClientsBtn from "@/components/(buttons)/clients-btn";
import CenteredModal from "@/components/(modals)/modal-centered";
import tw from 'tailwind-react-native-classnames';
import {getClientStatistics} from "@/helpers/api-function/client/client";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons, Entypo} from '@expo/vector-icons';
import {RootStackParamList} from "@/type/root";
import {View, Text, ScrollView, StatusBar} from 'react-native';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(standart)/client/standard-main'>;

const StandardMain = () => {
    const {
        isClientModal,
        setIsClientModal,
        setStatusData,
        statusData
    } = clientStore()
    const [isFilter, setIsFilter] = useState<string>('all')
    const toggleClientModal = () => setIsClientModal(!isClientModal);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    useEffect(() => {
        getClientStatistics(setStatusData)
    }, []);

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Мои клиенты`}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View>
                        <View style={[tw`mt-5 mb-10 flex-row justify-between`, {gap: 10}]}>
                            <ClientsBtn
                                name={`Все`}
                                countOrIcon
                                role={`all`}
                                isActive={isFilter === 'all' ? false : true}
                                clicks={() => {
                                    setIsFilter('all')
                                }}
                            />
                            <ClientsBtn
                                name={`Новые`}
                                countOrIcon
                                role={`new`}
                                isActive={isFilter === 'new' ? false : true}
                                clicks={() => {
                                    setIsFilter('new')
                                }}
                            />
                            <ClientsBtn
                                name={`Постоянные`}
                                countOrIcon
                                role={`constant`}
                                isActive={isFilter === 'constant' ? false : true}
                                clicks={() => {
                                    setIsFilter('constant')
                                }}
                            />
                        </View>
                        <View style={[tw``, {gap: 14}]}>
                            <ClientCountCard
                                title={`Перестали посещать`}
                                icon={<Entypo name="block" size={30} color="#9C0A35"/>}
                                clicks={() => navigation.navigate('(standart)/client/stopped-visiting')}
                                counts={statusData ? +statusData.stoppedVisiting : 0}
                            />
                            <ClientCountCard
                                title={`Не посещали`}
                                icon={<Ionicons name="eye-off" size={34} color="#9C0A35"/>}
                                clicks={() => navigation.navigate('(standart)/client/not-visiting')}
                                counts={statusData ? +statusData.didNotVisit : 0}
                            />
                            <ClientCountCard
                                title={`Из адресной книги`}
                                icon={<Ionicons name="person-circle-outline" size={36} color="#9C0A35"/>}
                                clicks={() => navigation.navigate('(free)/(client)/address-book')}
                                counts={statusData ? +statusData.fromTheAddressBook : 0}
                            />

                            <Text style={tw`text-white text-base mt-5`}>
                                У вас пока нет ни одного клиента
                            </Text>
                            <View style={[tw``, {alignSelf: 'flex-start'}]}>
                                <ClientsBtn
                                    name={`Создать`}
                                    countOrIcon={false}
                                    icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                                    clicks={() => navigation.navigate('(free)/(client)/creating-client')}
                                />
                            </View>
                            <View style={[tw``, {alignSelf: 'flex-start'}]}>
                                <ClientsBtn
                                    clicks={toggleClientModal}
                                    name={`Добавить из книги`}
                                    countOrIcon={false}
                                    icon={<Ionicons name="person-circle-outline" size={36} color="white"/>}
                                />
                            </View>
                        </View>
                        <CenteredModal
                            btnWhiteText={`Закрыть`}
                            btnRedText={`Разрешить`}
                            isFullBtn
                            isModal={isClientModal}
                            toggleModal={toggleClientModal}
                            onConfirm={() => {
                                navigation.navigate('(free)/(client)/client-list')
                                toggleClientModal()
                            }}
                        >
                            <Text style={[tw`text-base text-white text-center mb-5`, {opacity: .8, lineHeight: 22}]}>
                                Разрешить приложению “Bookers” доступ к фото, мультимедиа и файлам на устройстве
                            </Text>
                        </CenteredModal>
                    </View>
                    <View style={tw`pb-5`}>
                        <Buttons title={`Настроить позже и перейти на главную`}
                                 onPress={() => navigation.navigate('(welcome)/Welcome')}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default StandardMain;
