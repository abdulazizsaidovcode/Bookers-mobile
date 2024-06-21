import { View, Text, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import ClientCountCard from "@/components/(cards)/client-count-card";
import { Ionicons } from '@expo/vector-icons';
import ClientsBtn from "@/components/(buttons)/clients-btn";

const MainClient = () => {
    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <NavigationMenu name={`Мои клиенты`} />
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between' }}
                >
                    <View>
                        <View style={[tw`mt-5 mb-10`, { alignSelf: 'flex-start' }]}>
                            <ClientsBtn
                                name={`Все`}
                                countOrIcon
                                icon={<Ionicons name="person-circle-outline" size={30} color="white" />}
                            />
                        </View>
                        <View style={[tw``, { gap: 14 }]}>
                            <ClientCountCard
                                title={`Все клиенты`}
                                icon={<Ionicons name="person-circle-outline" size={36} color="#9C0A35" />}
                            />
                            <ClientCountCard
                                title={`Из адресной книги`}
                                icon={<Ionicons name="person-circle-outline" size={36} color="#9C0A35" />}
                            />

                            <Text style={tw`text-white text-base mt-5`}>
                                У вас пока нет ни одного клиента
                            </Text>
                            <View style={[tw``, { alignSelf: 'flex-start' }]}>
                                <ClientsBtn
                                    name={`Создать`}
                                    countOrIcon={false}
                                    icon={<Ionicons name="add-circle-outline" size={36} color="white" />}
                                />
                            </View>
                            <View style={[tw``, { alignSelf: 'flex-start' }]}>
                                <ClientsBtn
                                    name={`Добавить из книги`}
                                    countOrIcon={false}
                                    icon={<Ionicons name="person-circle-outline" size={36} color="white" />}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={tw`pb-5`}>
                        <Buttons title={`Настроить позже и перейти на главную`} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MainClient;
