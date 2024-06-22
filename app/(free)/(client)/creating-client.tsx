import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import tw from "tailwind-react-native-classnames";
import {ScrollView, StatusBar, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import LocationInput from "@/components/(location)/locationInput";
import CalendarComponent from "@/components/calendar/calendar";
import PhoneInput from "react-native-phone-number-input";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-locations-main'>;

const CreatingClient = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const phoneInput = useRef<PhoneInput>(null);

    const handlePhoneNumberChange = (text: string) => setPhoneNumber(text)
    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Создание клиента`}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View>
                        <LocationInput label={`Имя`}/>
                        <LocationInput label={`Фамилия`}/>
                        <LocationInput label={`Профессия`}/>
                        <LocationInput label={`Предпочтения клинета`}/>
                        <Text style={[tw`text-gray-500 mb-2 text-base`]}>День рождения</Text>
                        <CalendarComponent />
                        <Text style={[tw`text-gray-500 mb-2 mt-3 text-base`]}>Номер телефона</Text>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode="UZ"
                            layout="second"
                            onChangeFormattedText={handlePhoneNumberChange}
                            placeholder=" "
                            containerStyle={styles.phoneInputContainer}
                            textContainerStyle={styles.textContainer}
                            textInputStyle={styles.textInput}
                            codeTextStyle={styles.codeText}
                            flagButtonStyle={styles.flagButton}
                        />
                    </View>
                    <View style={tw`pb-5`}>
                        <Buttons
                            title={`Сохранить`}
                            onPress={() => {
                            }}
                            isDisebled={false}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    phoneInputContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#6B7280',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    textContainer: {
        backgroundColor: '#6B7280',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    textInput: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 0,
        paddingHorizontal: 0,
        margin: 0,
    },
    codeText: {
        color: 'white',
        fontSize: 16,
    },
    flagButton: {
        marginLeft: 8,
    },
});

export default CreatingClient;