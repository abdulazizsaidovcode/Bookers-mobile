import {View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {StandardNowAndConstClient} from "@/components/clients/client-items";
import HistoryCard from "@/components/(cards)/history-card";
import {Entypo, Feather, FontAwesome5} from "@expo/vector-icons";
import React, {useState} from "react";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/records-information'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/records-information'>;

const RecordsInformation = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {orderID} = route.params;
    const [bottomModalNetwork, setBottomModalNetwork] = useState(false)
    const toggleBottomModalNetwork = () => setBottomModalNetwork(!bottomModalNetwork)
    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={``}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View style={tw`mt-3`}>
                        <StandardNowAndConstClient client={``}/>
                        <TouchableOpacity activeOpacity={.9} style={styles.button}>
                            <Text style={styles.text}>
                                categoryName
                            </Text>
                        </TouchableOpacity>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`zur`}
                                btnOrText
                                statusName={`price`}
                                description={`dsZUFHa8odfbgvoa`}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`zur`}
                                btnOrText
                                statusName={`hour`}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`zur`}
                                btnOrText={false}
                                statusName={`hour`}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`zur`}
                                btnOrText={false}
                                statusName={`status`}
                            />
                        </View>

                        <Text style={styles.contactTitle}>Контактная информация</Text>
                        <View style={styles.contactInfo}>
                            <TouchableOpacity
                                onPress={() => toggleBottomModalNetwork()}
                                activeOpacity={.6}
                                style={[styles.contactItem]}
                            >
                                <Feather name="phone" size={24} color="#9C0A35"/>
                                <Text style={styles.contactText}>
                                    {/*{client ? client.phoneNumber : ''}*/}
                                </Text>
                            </TouchableOpacity>
                            {/*{client.instagram && (*/}
                                <TouchableOpacity
                                    onPress={() => toggleBottomModalNetwork()}
                                    activeOpacity={.6}
                                    style={[styles.contactItem, {marginTop: 10}]}
                                >
                                    <Entypo name="instagram" size={24} color="#9C0A35"/>
                                    <Text style={styles.contactText}>
                                        {/*{client.instagram}*/}
                                    </Text>
                                </TouchableOpacity>
                            {/*)}*/}
                            {/*{client.telegram && (*/}
                                <TouchableOpacity
                                    onPress={() => toggleBottomModalNetwork()}
                                    activeOpacity={.6}
                                    style={[styles.contactItem, {marginTop: 10}]}
                                >
                                    <FontAwesome5 name="telegram-plane" size={24} color="#9C0A35"/>
                                    <Text style={styles.contactText}>
                                        {/*{client.telegram}*/}
                                    </Text>
                                </TouchableOpacity>
                            {/*)}*/}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16
    },
    text: {
        color: '#696868',
        borderWidth: 2,
        borderColor: '#868686',
        alignSelf: 'flex-start',
        fontSize: 16,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 6
    },
    contactInfo: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    contactTitle: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 26,
        marginBottom: 16,
        fontWeight: '700'
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactText: {
        color: '#4F4F4F',
        marginLeft: 12,
        fontSize: 16
    },
});

export default RecordsInformation;
