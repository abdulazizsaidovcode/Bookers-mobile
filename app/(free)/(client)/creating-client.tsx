import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import tw from "tailwind-react-native-classnames";
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import LocationInput from "@/components/(location)/locationInput";
import CalendarComponent from "@/components/calendar/calendar";
import PhoneInput from "react-native-phone-number-input";
import {MaterialIcons} from "@expo/vector-icons";
import ProfileImgUpload from "@/components/profile-img-upload";
import financeStore from "@/helpers/state_managment/finance/financeStore";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {Picker} from "@react-native-picker/picker";
import Select from "@/components/select/select";
import {getAgeList, getDistrictList, getRegionList, updateClientData} from "@/helpers/api-function/client/client";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-locations-main'>;

const CreatingClient = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const {date} = financeStore()
    const {
        updateClientDef,
        updateClient,
        setUpdateClient,
        ageData,
        setAgeData,
        regionData,
        setRegionData,
        districtData,
        setDistrictData,
        attachmentID
    } = clientStore()
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const phoneInput = useRef<PhoneInput>(null);

    useEffect(() => {
        getAgeList(setAgeData)
        getRegionList(setRegionData)
    }, []);

    const handlePhoneNumberChange = (text: string) => {
        if (text.length <= 13) {
            setPhoneNumber(text);
        }
    };

    const handleInputChange = (name: string, value: any) => {
        updateClient.attachmentId = '78cd54ba-2efa-4c9e-b7e7-991a1b7445d8'
        updateClient.birthDate = date
        updateClient.phoneNumber = phoneNumber
        setUpdateClient({
            ...updateClient,
            [name]: value
        });
    };

    const genderData = [
        {label: "Male", value: "true"},
        {label: "Female", value: "false"},
    ]
    console.log(updateClient)

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
                        <ProfileImgUpload/>
                        <LocationInput label={`Имя`} onChangeText={e => handleInputChange('firstName', e)}/>
                        <LocationInput label={`Фамилия`} onChangeText={e => handleInputChange('lastName', e)}/>
                        <LocationInput label={`Профессия`} onChangeText={e => handleInputChange('job', e)}/>
                        <LocationInput label={`Предпочтения клинета`}/>
                        <Text style={[tw`text-gray-500 mb-2 text-base`]}>День рождения</Text>
                        <CalendarComponent/>
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
                        <View style={tw`mb-5 mt-7 flex-row justify-between items-center`}>
                            <Text style={tw`text-base text-white font-bold`}>
                                Дополнительная информаци о клиенте
                            </Text>
                            <MaterialIcons
                                onPress={() => {
                                }}
                                name="navigate-next"
                                size={30}
                                color="white"
                                style={{transform: 'rotate(90deg)'}}
                            />
                        </View>
                        <View>
                            <Select
                                label={`Пол`}
                                value={updateClient.gender}
                                onValueChange={(e) => handleInputChange('gender', e)}
                                child={genderData.map(item => <Picker.Item label={item.label} value={item.value}/>)}
                            />
                            <Select
                                label={`Возраст`}
                                value={updateClient.ageId}
                                onValueChange={(e) => handleInputChange('ageId', e)}
                                child={ageData && ageData.map(item => <Picker.Item label={item.ageRange} value={item.id}/>)}
                            />
                            <Select
                                label={`Регион`}
                                value={updateClient.regionId}
                                onValueChange={(e) => {
                                    handleInputChange('regionId', e)
                                    getDistrictList(setDistrictData, e)
                                }}
                                child={regionData && regionData.map(item => <Picker.Item label={item.name} value={item.id}/>)}
                            />
                            <Select
                                label={`Город`}
                                value={updateClient.districtId}
                                onValueChange={(e) => handleInputChange('districtId', e)}
                                child={districtData && districtData.map(item => <Picker.Item label={item.name} value={item.id}/>)}
                            />
                        </View>
                    </View>
                    <View style={tw`py-5`}>
                        <Buttons
                            title={`Сохранить`}
                            onPress={() => {
                                // if (clientID) updateClientData(updateClient, clientID, navigation)
                            }}
                            // isDisebled={false}
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