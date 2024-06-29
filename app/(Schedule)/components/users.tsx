import { View, ScrollView, StatusBar, FlatList, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { Ionicons } from '@expo/vector-icons';
import ClientsBtn from "@/components/(buttons)/clients-btn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import LocationInput from "@/components/(location)/locationInput";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { StandardNowAndConstClient } from "@/components/clients/client-items";
import { getClientAll } from '@/helpers/api-function/client/client';
import { useEffect } from 'react';
import { useOrderPosdData } from '@/helpers/state_managment/order/order';
import { postOder } from '@/helpers/api-function/oreder/oreder';

const ScheuleAllClient = () => {
    const { allClientsList, setAllClients } = clientStore();
    const { OrderData, setOrderData } = useOrderPosdData();

    useEffect(() => {
        getClientAll(setAllClients);
    }, []);

    const setClient = async (id: string) => {
        try {
            const newOrderData = {
                ...OrderData,
                clientId: id,
            };
            setOrderData(newOrderData);
            console.log(newOrderData);
            
            // postOder({ data: newOrderData }); // If needed, uncomment this line to post the order
        } catch (error) {
            console.error('Error setting client or posting order:', error);
        }
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Мои клиенты`} />
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between' }}
                >
                    <View>
                        <LocationInput placeholder={`🔍  Поиск клиента по имени`} />
                        <View style={tw`mt-5`}>
                            <FlatList
                                data={allClientsList}
                                keyExtractor={(item) => item.id} // Add a unique key extractor
                                renderItem={({ item }) => (
                                    <StandardNowAndConstClient
                                        client={item}
                                        clicks={() => setClient(item.id)} // Pass client ID to the setClient function
                                    />
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ScheuleAllClient;
