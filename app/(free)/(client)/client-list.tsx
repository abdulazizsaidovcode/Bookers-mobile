import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import NavigationMenu from "@/components/navigation/navigation-menu";
import IconsButtons from "@/components/(buttons)/icon-btn";
import {clientsData} from "@/type/client/client";
import {ClientItem} from "@/components/clients/client-items";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/client-list'>;

const MainClientList: React.FC = () => {
    const {setSelectedClientList} = clientStore()
    const [selectedClients, setSelectedClients] = useState<number[]>([]);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    useEffect(() => {
        setSelectedClientList(selectedClients);
    }, [selectedClients]);

    const toggleSelectClient = (clientId: number) => {
        setSelectedClients(prevSelected =>
            prevSelected.includes(clientId)
                ? prevSelected.filter(id => id !== clientId)
                : [...prevSelected, clientId]
        );
    };

    const allClientsSelected = selectedClients.length === clientsData.length;

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            {selectedClients.length > 0 ? (
                <View style={[tw`flex-row items-center justify-between mt-7`, {paddingHorizontal: 16}]}>
                    <View style={tw`flex-row items-center justify-center`}>
                        <View style={tw`flex-row items-center justify-center`}>
                            <AntDesign name="close" size={20} color="#828282"/>
                            <Text style={[tw`text-lg font-bold mr-4 ml-1`, {color: '#828282'}]}>{selectedClients.length}</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => setSelectedClients(allClientsSelected ? [] : clientsData.map(client => client.id))}
                            style={tw`flex-row items-center`}
                        >
                            <Ionicons name={allClientsSelected ? "checkbox" : "square-outline"} size={24} color="white"/>
                            <Text style={tw`text-white ml-2 text-base font-medium`}>выделить все</Text>
                        </TouchableOpacity>
                    </View>
                    <MaterialIcons name="delete" size={30} color="white" onPress={() => setSelectedClients([])}/>
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
                    <View>
                        {clientsData.map(client => (
                            <ClientItem
                                key={client.id}
                                client={client}
                                isSelected={selectedClients.includes(client.id)}
                                onSelect={toggleSelectClient}
                            />
                        ))}
                    </View>
                    <View style={tw`pb-5`}>
                        {selectedClients.length !== 0 && (
                            <IconsButtons
                                name={`Добавить`}
                                icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                                clicks={async () => {
                                    await navigation.navigate('(free)/(client)/address-book')
                                    await setSelectedClients([])
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
