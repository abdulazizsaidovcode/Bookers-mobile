import {View, Text, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import NavigationMenu from "@/components/navigation/navigation-menu";
import IconsButtons from "@/components/(buttons)/icon-btn";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import ContactList from "@/app/(free)/(client)/contacts";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/client-list'>;

const MainClientList = () => {
    const {selectedClientList} = clientStore()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            {selectedClientList.length > 0 ? (
                <View style={[tw`flex-row items-center justify-between mt-7`, {paddingHorizontal: 16}]}>
                    <View style={tw`flex-row items-center justify-center`}>
                        <View style={tw`flex-row items-center justify-center`}>
                            <AntDesign name="close" size={20} color="#828282"/>
                            <Text
                                style={[tw`text-lg font-bold mr-4 ml-1`, {color: '#828282'}]}>{selectedClientList.length}</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={tw`flex-row items-center`}
                        >
                            <Text style={tw`text-white ml-2 text-base font-medium`}>выделить все</Text>
                        </TouchableOpacity>
                    </View>
                    <MaterialIcons name="delete" size={30} color="white" onPress={() => {
                    }}/>
                </View>
            ) : <NavigationMenu name={`Мои клиенты`}/>}
            <View style={tw`flex-1`}>
                <Text style={[tw`text-white text-base font-semibold my-6`, {paddingHorizontal: 16, lineHeight: 20}]}>
                    Выберите клиентов, которые желаете добавить в приложение
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <ContactList/>
                    <View style={tw`pb-5 fixed bottom-0 right-0 left-0`}>
                        {selectedClientList.length !== 0 && (
                            <IconsButtons
                                name={`Добавить`}
                                icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                                clicks={() => {
                                    // navigation.navigate('(free)/(client)/address-book')
                                    console.log('data: ', selectedClientList)
                                }}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MainClientList;
