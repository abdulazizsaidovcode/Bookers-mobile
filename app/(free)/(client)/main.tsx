import {View, Text, ScrollView, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import ClientCountCard from "@/components/(cards)/client-count-card";
import {Ionicons} from '@expo/vector-icons';
import ClientsBtn from "@/components/(buttons)/clients-btn";
import CenteredModal from "@/components/(modals)/modal-centered";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-locations-main'>;

const MainClient = () => {
    const {isClientModal, setIsClientModal} = clientStore()
    const toggleClientModal = () => setIsClientModal(!isClientModal);
    const navigation = useNavigation<SettingsScreenNavigationProp>();
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
                        <View style={[tw`mt-5 mb-10`, {alignSelf: 'flex-start'}]}>
                            <ClientsBtn
                                name={`Все`}
                                countOrIcon
                                icon={<Ionicons name="person-circle-outline" size={30} color="white"/>}
                            />
                        </View>
                        <View style={[tw``, {gap: 14}]}>
                            <ClientCountCard
                                title={`Все клиенты`}
                                icon={<Ionicons name="person-circle-outline" size={36} color="#9C0A35"/>}
                                clicks={() => console.log('')}
                            />
                            <ClientCountCard
                                title={`Из адресной книги`}
                                icon={<Ionicons name="person-circle-outline" size={36} color="#9C0A35"/>}
                                clicks={() => navigation.navigate('(free)/(client)/address-book')}
                            />

                            <Text style={tw`text-white text-base mt-5`}>
                                У вас пока нет ни одного клиента
                            </Text>
                            <View style={[tw``, {alignSelf: 'flex-start'}]}>
                                <ClientsBtn
                                    name={`Создать`}
                                    countOrIcon={false}
                                    icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
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
                        <Buttons title={`Настроить позже и перейти на главную`} onPress={() => navigation.navigate('(tabs)')}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MainClient;
