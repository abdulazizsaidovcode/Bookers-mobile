import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import tw from "tailwind-react-native-classnames";
import {RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import LocationInput from "@/components/(location)/locationInput";
import CalendarComponent from "@/components/calendar/calendar";
import {useForm, Controller} from 'react-hook-form';
import PhoneInput from 'react-native-phone-input';
import {MaterialIcons} from "@expo/vector-icons";
import ProfileImgUpload from "@/components/profile-img-upload";
import financeStore from "@/helpers/state_managment/finance/financeStore";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {
    getAgeList, getClientAll,
    getClientStatistics,
    getDistrictList,
    getRegionList,
    updateClientData
} from "@/helpers/api-function/client/client";
import {handleRefresh} from "@/constants/refresh";
import {SelectList} from "react-native-dropdown-select-list";
import {getMasterTariff} from "@/constants/storage";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/updating-address-book'>;

interface FormData {
    phoneNumber: string
}

const UpdatingAddressBook = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<any>();
    const {client} = route.params;
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
        setIsLoading,
        refreshing,
        setRefreshing,
        tariff,
        setTariff
    } = clientStore()
    const {control, formState: {errors}} = useForm<FormData>();
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [regex, setRegex] = useState<boolean>(false);
    const [navigate, setNavigate] = useState<boolean>(false);
    const [showHide, setShowHide] = useState<boolean>(false);
    const [ages, setAges] = useState<any[] | null>(null);
    const [regions, setRegions] = useState<any[] | null>(null);
    const [districts, setDistricts] = useState<any[] | null>(null);

    useEffect(() => {
        getAgeList(setAgeData)
        getRegionList(setRegionData)
        getMasterTariff(setTariff)
        if (client) {
            updateClient.phoneNumber = client.phoneNumber
            updateClient.firstName = client.firstName
            updateClient.lastName = client.lastName
        }
    }, []);

    useEffect(() => {
        if (client) {
            updateClient.phoneNumber = client.phoneNumber
            updateClient.firstName = client.firstName
            updateClient.lastName = client.lastName
        }
    }, [client]);

    useEffect(() => {
        updateClient.birthDate = date
        updateClient.phoneNumber = phoneNumber
    }, [date, phoneNumber]);

    useEffect(() => {
        setRegex(validateObject(updateClient))

        if (ageData) {
            const transformedAge = ageData.map(item => ({
                key: item.id,
                value: item.ageRange
            }));
            setAges(transformedAge)
        }

        if (regionData) {
            const transformedRegion = regionData.map(item => ({
                key: item.id,
                value: item.name
            }));
            setRegions(transformedRegion)
        }

        if (districtData) {
            const transformedDistrict = districtData.map(item => ({
                key: item.id,
                value: item.name
            }));
            setDistricts(transformedDistrict)
        }
    }, [updateClient]);

    useEffect(() => {
        isLoading ? setRegex(false) : setRegex(true)
    }, [isLoading]);

    useEffect(() => {
        if (navigate) {
            if (tariff==='FREE') navigation.navigate('(free)/(client)/main')
            else navigation.navigate('(standart)/client/standard-main')
            setUpdateClient(updateClientDef)
            getClientStatistics(setStatusData)
            getClientAll(setAllClients)
            setNavigate(false)
            setRegex(false)
        }
    }, [navigate]);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    const handleSubmitChange = (e: any) => {
        if (e.length === 13) setPhoneNumber(e)
        else setPhoneNumber('')
    }

    const handleInputChange = (name: string, value: any) => {
        attachmentID ? updateClient.attachmentId = attachmentID : updateClient.attachmentId = null;
        updateClient.birthDate = date
        updateClient.phoneNumber = phoneNumber
        setUpdateClient({
            ...updateClient,
            [name]: value
        });
    };

    const genderData = [
        {key: "true", value: "Male"},
        {key: "false", value: "Female"},
    ]

    function validateObject(obj: any) {
        for (let key in obj) {
            if (key !== 'attachmentId' && !obj[key]) return false
        }
        return true;
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
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <View>
                        <ProfileImgUpload attachmentID={client ? client.attachmentId : ''}/>
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
                                        this.phone = ref
                                    }}
                                    initialValue={client.phoneNumber}
                                    initialCountry="uz"
                                    onChangePhoneNumber={handleSubmitChange}
                                    style={styles.phoneInputContainer}
                                    textStyle={styles.textInput}
                                    flagStyle={styles.flagButton}
                                />
                            )}
                        />
                        {errors.phoneNumber && <Text style={{color: 'red'}}>{errors.phoneNumber.message}</Text>}
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
                            <Text style={tw`text-gray-500 mb-2 text-base`}>Пол</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => handleInputChange('gender', e)}
                                data={genderData}
                                save="key"
                                search={false}
                                placeholder="Пол"
                            />
                            <Text style={tw`text-gray-500 mb-2 mt-3 text-base`}>Возраст</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => handleInputChange('ageId', e)}
                                data={ages ? ages : [{key: 'Ma\'lumot yuq', value: ''}]}
                                save='key'
                                search={false}
                                placeholder="Возраст"
                            />
                            <Text style={tw`text-gray-500 mb-2 mt-3 text-base`}>Регион</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => {
                                    handleInputChange('regionId', e)
                                    getDistrictList(setDistrictData, e)
                                }}
                                data={regions ? regions : [{key: '', value: 'Ma\'lumot yuq'}]}
                                save='key'
                                search={false}
                                placeholder="Регион"
                            />
                            <Text style={tw`text-gray-500 mb-2 mt-3 text-base`}>Город</Text>
                            <SelectList
                                boxStyles={tw`w-60 z-50 w-full text-white bg-gray-500`}
                                inputStyles={tw`text-white text-lg`}
                                dropdownStyles={styles.dropdown}
                                dropdownTextStyles={tw`text-white text-lg`}
                                setSelected={(e: string) => handleInputChange('districtId', e)}
                                data={districts ? districts : [{key: '', value: 'Ma\'lumot yuq'}]}
                                save='key'
                                search={false}
                                placeholder="Город"
                            />
                        </View>
                    </View>
                    <View style={tw`py-5`}>
                        <Buttons
                            title={isLoading ? 'loading...' : `Сохранить`}
                            onPress={() => {
                                if (client) updateClientData(updateClient, client.id, setNavigate, setIsLoading)
                            }}
                            isDisebled={regex && client.id}
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
    dropdown: {
        zIndex: 1000,
        width: '100%',
        backgroundColor: '#4b4b63',
    }
});

export default UpdatingAddressBook;