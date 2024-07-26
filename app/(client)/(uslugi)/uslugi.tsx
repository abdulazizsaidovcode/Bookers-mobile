import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { getAllCategory } from '@/helpers/api-function/uslugi/uslugi';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { getFile } from '@/helpers/api';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
// import MyIcon from './path/to/MyIcon.svg';  // Import the SVG component

interface Service {
    id: string;
    name: string;
    distanceMasterCount: number;
    icon?: string;
    onPress: () => void;
    attachmentId?: string;
}

const ServiceCard: React.FC<Service> = ({ id, name, distanceMasterCount, onPress, attachmentId }) => {
    return (
        <TouchableOpacity style={tw`w-1/2 px-2 py-2`} activeOpacity={0.8} onPress={onPress}>
            <View style={[tw`flex flex-col items-center rounded-xl p-4 w-full h-56`, { backgroundColor: '#B9B9C9' }]}>
                <View style={[tw`rounded-full p-3`, { backgroundColor: '#9C0A35' }]}>
                    <Image
                        source={attachmentId ? { uri: `${getFile}${attachmentId}` } : require('../../../assets/avatar.png')}
                        style={tw`w-20 h-20 rounded-full`}
                        
                    />
                     
                </View>
                <Text style={[tw`text-lg font-bold text-center`]}>{name}</Text>
                <Text>Рядом с тобой {distanceMasterCount}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Uslugi = () => {
    const [loading, setLoading] = useState(true);
    const { userLocation, setUserLocation } = useGetMeeStore();
    const { allCategory, setAllCategory, setSelectedServiceId } = ClientStory();
    const router = useRouter();
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            getUserLocation(setUserLocation).finally(() => setLoading(false));
            return () => { };
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            getAllCategory().finally(() => setLoading(false));
            return () => { };
        }, [userLocation])
    );

    const renderItem = ({ item }: { item: Service }) => (
        <ServiceCard
            key={item.id}
            id={item.id}
            name={item.name}
            attachmentId={item.attachmentId}
            distanceMasterCount={item.distanceMasterCount}
            onPress={() => {
                setSelectedServiceId(item.id);
                router.push(`/(hairHealth)/hair`);
                console.log("id", setSelectedServiceId);
            }}
        />
    );

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <View style={[tw`flex-1 mt-10`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        backgroundColor: '#21212E'
                    }}>
                    <View style={tw`flex flex-row items-center justify-between p-3`}>
                        <Text style={tw`text-white text-3xl font-bold mb-4 px-4`}>Услуги</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('(client)/(profile)/(notification)/notification')}
                        >
                            <Ionicons name="notifications" size={30} color="white" />
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <View style={[tw`flex-1 justify-center items-center`]}>
                            <ActivityIndicator size="large" color="#9C0A35" />
                        </View>
                    ) : (
                        <FlatList
                            data={allCategory}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Uslugi;
