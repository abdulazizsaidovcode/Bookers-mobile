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
import {
    createClient,
    getAgeList,
    getClientAll,
    getClientStatistics,
    getDistrictList,
    getRegionList
} from "@/helpers/api-function/client/client";
import {useForm, Controller} from 'react-hook-form';
import PhoneInput from 'react-native-phone-input';
import {SelectList} from "react-native-dropdown-select-list";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/creating-client'>;

interface FormData {
    phoneNumber: string;
}

const genderData = [
    {key: "true", value: "Male"},
    {key: "false", value: "Female"},
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
    const [ages, setAges] = useState<any[] | null>(null);
    const [regions, setRegions] = useState<any[] | null>(null);
    const [districts, setDistricts] = useState<any[] | null>(null);

    useEffect(() => {
        getAgeList(setAgeData)
        getRegionList(setRegionData)
        setUpdateClient(updateClientDef)
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
    }, []);

    useEffect(() => {
        if (districtData) {
            const transformedDistrict = districtData.map(item => ({
                key: item.id,
                value: item.name
            }));
            setDistricts(transformedDistrict)
        }
    }, [districtData]);

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

    const toggleShowHide = () => setShowHide(!showHide)
    const handleSubmitChange = (e: any) => {
        if (e.length === 13) setPhoneNumber(e)
        else setPhoneNumber('')
    }

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
                                data={regions ? regions : [{key: 'Ma\'lumot yuq', value: ''}]}
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
                                data={districts ? districts : [{key: 'Ma\'lumot yuq', value: ''}]}
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
    dropdown: {
        zIndex: 1000,
        width: '100%',
        position: 'absolute',
        backgroundColor: '#4b4b63',
        top: 55
    }
});

export default CreatingClient;