import { View, ScrollView, StatusBar, FlatList, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import LocationInput from "@/components/(location)/locationInput";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { StandardNowAndConstClient } from "@/components/clients/client-items";
import { getClientAll } from '@/helpers/api-function/client/client';
import { useEffect, useState } from 'react';
import { useOrderPosdData } from '@/helpers/state_managment/order/order';
import { postOrder } from '@/helpers/api-function/oreder/oreder';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ScheuleAllClient = () => {
    const navigation = useNavigation(); // Use useNavigation hook
    const { allClientsList, setAllClients } = clientStore();
    const { OrderData, setOrderData, setStatus } = useOrderPosdData(); // Destructure setStatus
    const [orderMessageStatus, setOrderMessageStatus] = useState<string>("");

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

            await postOrder({ 
                data: newOrderData, 
                messageSatus: (message: string) => setOrderMessageStatus(message),
                setStatus, // Pass setStatus to postOrder
                navigation // Pass navigation to postOrder
            });

        } catch (error) {
            console.error('Error setting client or posting order:', error);
        }
    };

    useEffect(() => {
        console.log(orderMessageStatus);
        
        if (orderMessageStatus) {
            Toast.show(orderMessageStatus, Toast.LONG);
        }
    }, [orderMessageStatus]);

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name="Мои клиенты" />
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between' }}
                >
                    <View>
                        <LocationInput placeholder="🔍  Поиск клиента по имени" />
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
