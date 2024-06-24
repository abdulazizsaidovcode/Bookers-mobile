import tw from "tailwind-react-native-classnames";
import {FlatList, ScrollView, StatusBar, Text, View} from "react-native";
import React, {useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {clientsData} from "@/type/client/client";
import {FromAddressBookList} from "@/components/clients/client-items";
import IconsButtons from "@/components/(buttons)/icon-btn";
import {Ionicons} from "@expo/vector-icons";
import LocationInput from "@/components/(location)/locationInput";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {getClientAddressBook, getClientAddressBookSearch} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-locations-main'>;

const AddressBook = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const {addressBookData, setAddressBookData} = clientStore()

    useEffect(() => {
        getClientAddressBook(setAddressBookData)
    }, []);

    // user/master/client-addressBooks => get books ✔
    // user/master/client-count-by-status => count chiqarish un ✔
    // user/add-client-from-address-book => teldan olingan malumotlarni list qilib qushish un
    // client/{clientId} => book dagi client info edit qilish
    // user/create-client-by-master => create qilish client ni
    // user/master/client-not-visit => tashrif buyurmagan client chiqadi get
    // user/master/client-stoppedVisiting

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Из адресной книги`} clicks={() => navigation.navigate('(free)/(client)/main')}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    {addressBookData ? (
                        <View>
                            <View style={tw`mb-5`}>
                                <LocationInput
                                    onChangeText={() => getClientAddressBookSearch(setAddressBookData, '')}
                                    placeholder={`🔍 Поиск клиента по имени`}
                                />
                            </View>
                            <FlatList
                                data={addressBookData}
                                renderItem={({item}) => (
                                    <FromAddressBookList
                                        key={item.id}
                                        client={item}
                                        clicks={() => navigation.navigate('(free)/(client)/creating-client')}
                                    />
                                )}
                            />
                        </View>
                    ) : (
                        <View style={tw`flex-1 items-center justify-center`}>
                            <Text style={[tw`text-base font-medium`, {color: '#828282', letterSpacing: 1}]}>У вас пока нет ни
                                одного клиента</Text>
                        </View>
                    )}

                    <View style={tw`pb-5`}>
                        <IconsButtons
                            name={`Добавить`}
                            icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                            clicks={() => navigation.navigate('(free)/(client)/client-list')}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AddressBook;