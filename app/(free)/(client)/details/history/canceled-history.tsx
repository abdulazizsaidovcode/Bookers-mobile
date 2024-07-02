import AppointmentCard from "@/components/(cards)/appointment-card";
import {RootStackParamList} from "@/type/root";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import tw from "tailwind-react-native-classnames";
import {FlatList, ScrollView, StatusBar, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {getCanceledClient} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/history/canceled-history'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/history/canceled-history'>;

const CanceledHistory = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {clientID} = route.params;
    const {canceledData, setCanceledData} = clientStore()
    const [serviceName, setServiceName] = useState(null);

    useEffect(() => {
        getCanceledClient(setCanceledData, clientID)
    }, []);

    useEffect(() => {
        let list;
        canceledData && canceledData.map(item => {
            list = item.serviceName.split(', ')
        })
        setServiceName(list ? list : null)
    }, [canceledData]);

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Отменённые записи`}/>
            <View style={tw`flex-1`}>
                {canceledData ? (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 24, gap: 16}}
                    >
                        <FlatList
                            data={canceledData}
                            renderItem={({item}) => (
                                <AppointmentCard
                                    data={item}
                                    serviceName={serviceName ? serviceName : ['']}
                                    isBtn={item.orderStatus === 'WAIT'}
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

export default CanceledHistory;