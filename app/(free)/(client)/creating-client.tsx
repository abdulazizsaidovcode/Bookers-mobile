import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import tw from "tailwind-react-native-classnames";
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import LocationInput from "@/components/(location)/locationInput";
import CalendarComponent from "@/components/calendar/calendar";
import {MaterialIcons} from "@expo/vector-icons";
import ProfileImgUpload from "@/components/profile-img-upload";
import financeStore from "@/helpers/state_managment/finance/financeStore";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {Picker} from "@react-native-picker/picker";
import Select from "@/components/select/select";
import {
    createClient,
    getAgeList, getClientAll,
    getClientStatistics,
    getDistrictList,
    getRegionList
} from "@/helpers/api-function/client/client";
import {useForm, Controller} from 'react-hook-form';
import PhoneInput from 'react-native-phone-input';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/creating-client'>;
interface FormData {
    phoneNumber: string;
}

const genderData = [
    {label: "Gender ni tanlang", value: ""},
    {label: "Male", value: "true"},
    {label: "Female", value: "false"},
]

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
        attachmentID,
        setStatusData,
        setAllClients,
        isLoading,
        setIsLoading
    } = clientStore()
    const {control, formState: {errors}} = useForm<FormData>();
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [regex, setRegex] = useState<boolean>(false);
    const [navigate, setNavigate] = useState<boolean>(false);
    const [showHide, setShowHide] = useState<boolean>(false);

    useEffect(() => {
        getAgeList(setAgeData)
        getRegionList(setRegionData)
        setUpdateClient(updateClientDef)
    }, []);

    useEffect(() => {
        setRegex(validateObject(updateClient))
    }, [updateClient]);

    useEffect(() => {
        updateClient.birthDate = date
        updateClient.phoneNumber = phoneNumber
    }, [date, phoneNumber]);

    useEffect(() => {
        if (navigate) {
            navigation.navigate('(free)/(client)/main')
            setUpdateClient(updateClientDef)
            getClientStatistics(setStatusData)
            getClientAll(setAllClients)
            setNavigate(false)
            setRegex(false)
        }
    }, [navigate]);

    useEffect(() => {
        isLoading ? setRegex(false) : setRegex(true)
    }, [isLoading]);

    const handleInputChange = (name: string, value: any) => {
        attachmentID ? updateClient.attachmentId = attachmentID : updateClient.attachmentId = null;
        updateClient.birthDate = date
        updateClient.phoneNumber = phoneNumber
        setUpdateClient({
            ...updateClient,
            [name]: value
        });
    };

    function validateObject(obj: any) {
        for (let key in obj) {
            if (key !== 'attachmentId' && !obj[key]) return false
        }
        return true;
    }

    const handleSubmitChange = (e: any) => {
        if (e.length === 13) setPhoneNumber(e)
        else setPhoneNumber('')
    }

    const toggleShowHide = () => setShowHide(!showHide)

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
                        <LocationInput
                            value={updateClient.firstName}
                            label={`Имя`}
                            onChangeText={e => handleInputChange('firstName', e)}
                        />
                        <LocationInput
                            value={updateClient.lastName}
                            label={`Фамилия`}
                            onChangeText={e => handleInputChange('lastName', e)}
                        />
                        <LocationInput
                            value={updateClient.job}
                            label={`Профессия`}
                            onChangeText={e => handleInputChange('job', e)}
                        />
                        <LocationInput
                            value={updateClient.clientPreferences ? updateClient.clientPreferences : ''}
                            label={`Предпочтения клинета`}
                            onChangeText={e => handleInputChange('clientPreferences', e)}
                        />
                        <Text style={[tw`text-gray-500 mb-2 text-base`]}>День рождения</Text>
                        <CalendarComponent/>
                        <Text style={[tw`text-gray-500 mb-2 mt-3 text-base`]}>Номер телефона</Text>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^\+998[0-9]{9}$/,
                                    message: 'Phone number is not valid',
                                },
                            }}
                            render={({field: {value}}) => (
                                <PhoneInput
                                    ref={(ref) => {
                                        this.phone = ref;
                                    }}
                                    initialValue={value}
                                    initialCountry="uz"
                                    onChangePhoneNumber={handleSubmitChange}
                                    style={styles.phoneInputContainer}
                                    textStyle={styles.textInput}
                                    flagStyle={styles.flagButton}
                                />
                            )}
                        />
                        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

                        <View style={tw`mb-5 mt-7 flex-row justify-between items-center`}>
                            <Text style={tw`text-base text-white font-bold`}>
                                Дополнительная информаци о клиенте
                            </Text>
                            <MaterialIcons
                                onPress={() => toggleShowHide()}
                                name="navigate-next"
                                size={30}
                                color="white"
                                style={{transform: showHide ? 'rotate(90deg)' : ''}}
                            />
                        </View>
                        <View style={tw`${showHide ? '' : 'hidden'}`}>
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
                            title={isLoading ? 'loading...' : `Сохранить`}
                            onPress={() => {
                                if (regex) createClient(updateClient, setNavigate, setIsLoading)
                            }}
                            isDisebled={regex}
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
    errorText: {
        color: 'red',
    },
});

export default CreatingClient;