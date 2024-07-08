import AppointmentCard from "@/components/(cards)/appointment-card";
import {RootStackParamList} from "@/type/root";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import tw from "tailwind-react-native-classnames";
import {FlatList, ScrollView, StatusBar, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {getPastClient} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/history/past-history'>;

const PastHistory = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<any>();
    const {clientID} = route.params;
    const {pastData, setPastData} = clientStore()
    const [serviceName, setServiceName] = useState(null);

    useEffect(() => {
        getPastClient(setPastData, clientID)
    }, []);

    useEffect(() => {
        let list;
        pastData && pastData.map(item => {
            list = item.serviceName.split(', ')
        })
        setServiceName(list ? list : null)
    }, [pastData]);

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('clientID', clientID);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Прошедшие записи`}/>
            <View style={tw`flex-1`}>
                {pastData ? (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 24, gap: 16}}
                    >
                        <FlatList
                            data={pastData}
                            renderItem={({item}) => (
                                <AppointmentCard
                                    data={item}
                                    serviceName={serviceName ? serviceName : ['']}
                                    isBtn={item.orderStatus === 'WAIT'}
                                    clicks={() => {
                                        navigation.navigate('(free)/(client)/details/history/history-details', {historyData: item})
                                        storeData()
                                    }}
                                />
                            )}
                        />
                    </ScrollView>
                ) : (
                    <View style={[tw`flex-1 items-center justify-center`]}>
                        <Text style={[tw`text-base font-bold text-white`, {opacity: .7}]}>Информация недоступна</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default PastHistory;