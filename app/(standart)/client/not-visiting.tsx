import React, {useCallback, useEffect} from 'react';
import tw from "tailwind-react-native-classnames";
import {FlatList, RefreshControl, ScrollView, StatusBar, Text, View} from "react-native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import LocationInput from "@/components/(location)/locationInput";
import {getClientNotVisitSearch, getNotVisiting} from "@/helpers/api-function/client/client";
import {FromAddressBookList} from "@/components/clients/client-items";
import IconsButtons from "@/components/(buttons)/icon-btn";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {handleRefresh} from "@/constants/refresh";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(standart)/client/not-visiting'>;

const NotVisiting = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const {setClientNotVisit, clientNotVisit, refreshing, setRefreshing} = clientStore()
    useEffect(() => {
        getNotVisiting(setClientNotVisit)
    }, []);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Не посещали`} clicks={() => navigation.navigate('(standart)/client/standard-main')}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <View>
                        <View style={tw`mb-5`}>
                            <LocationInput
                                onChangeText={(e) => getClientNotVisitSearch(setClientNotVisit, e)}
                                placeholder={`🔍 Поиск клиента по имени`}
                            />
                        </View>
                        {clientNotVisit ? (
                            <FlatList
                                data={clientNotVisit}
                                renderItem={({item}) => (
                                    <FromAddressBookList
                                        key={item.id}
                                        client={item}
                                        // clicks={() => navigation.navigate('(free)/(client)/updating-address-book', { client: item })}
                                    />
                                )}
                            />
                        ) : (
                            <View style={tw`flex-1 items-center justify-center`}>
                                <Text style={[tw`text-base font-medium`, {color: '#828282', letterSpacing: 1}]}>
                                    У вас пока нет ни одного клиента
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={tw`pb-5`}>
                        <IconsButtons
                            name={`Создать`}
                            icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                            // clicks={() => navigation.navigate('(free)/(client)/client-list')}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default NotVisiting;