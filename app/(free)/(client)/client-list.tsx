import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import NavigationMenu from "@/components/navigation/navigation-menu";
import IconsButtons from "@/components/(buttons)/icon-btn";

interface Client {
    id: number;
    name: string;
    phone: string;
    image: string;
}

const clientsData: Client[] = [
    {id: 1, name: 'Гузаль Шерматова', phone: '+998 93 123-45-67', image: 'https://via.placeholder.com/150'},
    {id: 2, name: 'Севара Юнусова', phone: '+998 93 171-63-80', image: 'https://via.placeholder.com/150'},
    {id: 3, name: 'Ноила Азизова', phone: '+998 93 455-45-67', image: 'https://via.placeholder.com/150'},
    {id: 4, name: 'Шахло Акбарова', phone: '+998 93 874-63-90', image: 'https://via.placeholder.com/150'},
    {id: 5, name: 'Максуд Акбаров', phone: '+998 93 455-45-67', image: 'https://via.placeholder.com/150'},
    {id: 6, name: 'Нодир Расулов', phone: '+998 93 874-63-90', image: 'https://via.placeholder.com/150'},
];

interface ClientItemProps {
    client: Client;
    isSelected: boolean;
    onSelect: (id: number) => void;
    selectedClients: number[]
}

const ClientItem: React.FC<ClientItemProps> = ({client, isSelected, onSelect, selectedClients}) => (
    <TouchableOpacity
        onPress={() => onSelect(client.id)}
        style={[
            tw`flex-row items-center p-4 mb-2 rounded-2xl`,
            {backgroundColor: isSelected ? 'rgba(216,216,216,0.83)' : '#B9B9C9'},
            isSelected && {borderWidth: 2, borderColor: '#9C0A35'}
        ]}
        activeOpacity={.8}
    >
        {isSelected
            ? <View style={[tw`w-7 h-7 items-center justify-center rounded-md mr-3`, {backgroundColor: '#9C0A35'}]}>
                <Ionicons name="checkmark" size={24} color="white" style={tw`font-bold`}/>
            </View>
            : selectedClients.length !== 0 && <View
            style={[tw`w-7 h-7 items-center justify-center rounded-md mr-3`,
                {
                    backgroundColor: '#B9B9C9',
                    borderWidth: 2,
                    borderColor: 'gray'
                }
            ]}></View>
        }
        <Image source={{uri: client.image}} style={tw`w-10 h-10 rounded-full`}/>
        <View style={tw`ml-4`}>
            <Text style={[tw`text-black text-lg font-bold`, {lineHeight: 20}]}>{client.name}</Text>
            <Text style={[tw`text-gray-500 text-base`, {lineHeight: 20}]}>{client.phone}</Text>
        </View>
    </TouchableOpacity>
);

const MainClientList: React.FC = () => {
    const [selectedClients, setSelectedClients] = useState<number[]>([]);

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
                            <AntDesign name="close" size={20} color="#828282" />
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
                                selectedClients={selectedClients}
                                key={client.id}
                                client={client}
                                isSelected={selectedClients.includes(client.id)}
                                onSelect={toggleSelectClient}
                            />
                        ))}
                    </View>
                    <View style={tw`pb-5`}>
                        <IconsButtons
                            name={`Добавить`}
                            icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MainClientList;
