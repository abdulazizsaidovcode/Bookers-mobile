import {View, ScrollView, StatusBar, FlatList, Text, RefreshControl} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {Ionicons} from '@expo/vector-icons';
import ClientsBtn from "@/components/(buttons)/clients-btn";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import LocationInput from "@/components/(location)/locationInput";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {StandardNowAndConstClient} from "@/components/clients/client-items";
import {getClientAllSearch} from "@/helpers/api-function/client/client";
import {useCallback} from "react";
import {handleRefresh} from "@/constants/refresh";
import {clientIdStore} from "@/constants/storage";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/all-client'>;

const AllClient = () => {
    const {allClientsList, setAllClients, refreshing, setRefreshing} = clientStore()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);
    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Мои клиенты`}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <View>
                        <View style={[tw`mt-5`, {alignSelf: 'flex-start'}]}>
                            <ClientsBtn
                                name={`Все`}
                                countOrIcon
                                icon={<Ionicons name="person-circle-outline" size={30} color="white"/>}
                                role={`free`}
                            />
                        </View>
                        <LocationInput
                            placeholder={`🔍  Поиск клиента по имени`}
                            onChangeText={e => getClientAllSearch(setAllClients, e)}
                        />
                        <View style={tw`mt-5`}>
                            {allClientsList ? (
                                <FlatList
                                    data={allClientsList}
                                    renderItem={({item}) => (
                                        <StandardNowAndConstClient
                                            client={item}
                                            clicks={() => {
                                                clientIdStore(item.id)
                                                navigation.navigate('(free)/(client)/details/detail-main', {infoClient: item})
                                            }}
                                        />
                                    )}
                                />
                            ) : (
                                <View style={tw`flex-1 justify-center items-center`}>
                                    <Text style={tw`text-center text-base font-semibold text-white`}>
                                        У вас пока нет ни одного клиента
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AllClient;
