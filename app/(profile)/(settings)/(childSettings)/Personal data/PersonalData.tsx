import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import NavigationMenu from '@/components/navigation/navigation-menu';

const EditProfile: React.FC = () => {
    const [name, setName] = useState<string>('Гузаль');
    const [surname, setSurname] = useState<string>('Шерматова');
    const [phone, setPhone] = useState<string>('93 171 63 80');
    const [nickname, setNickname] = useState<string>('guzal_1987');
    const [gender, setGender] = useState<string>('Женский');
    const [age, setAge] = useState<string>('30-40 лет');
    const [region, setRegion] = useState<string>('Ташкентский область');
    const [city, setCity] = useState<string>('Янгиюль');
    const [telegram, setTelegram] = useState<string>('@guzal_1987');
    const [instagram, setInstagram] = useState<string>('@guzalll_1987');

    const genderOptions = [
        { key: '1', value: 'Женский' },
        { key: '2', value: 'Мужской' }
    ];

    const ageOptions = [
        { key: '1', value: '15-20 лет' },
        { key: '2', value: '20-25 лет' },
        { key: '3', value: '25-30 лет' },
        { key: '4', value: '30-40 лет' },
        { key: '5', value: '40-45 лет' },
        { key: '6', value: '45-50 лет' },
        { key: '7', value: '50 лет и выше' }
    ];

    const regionOptions = [
        { key: '1', value: 'Ташкентский область' },
        { key: '2', value: 'Самаркандская область' },
        { key: '3', value: 'Ферганская область' }
    ];

    const cityOptions = [
        { key: '1', value: 'Ташкент' },
        { key: '2', value: 'Янгиюль' },
        { key: '3', value: 'Самарканд' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <NavigationMenu name='Мой профиль'/>

                <View style={styles.profileContainer}>
                    <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.avatar} />
                    <View>
                        <Text style={styles.profileName}>Гузаль Шерматова</Text>
                        <Text style={styles.profilePhone}>+998 93 171 63 80</Text>
                        <Text style={styles.profileUsername}>@guzal_1987</Text>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Имя</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Фамилия</Text>
                    <TextInput style={styles.input} value={surname} onChangeText={setSurname} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Номер телефона</Text>
                    <View style={styles.phoneContainer}>
                        <View style={styles.countryCode}>
                            <Text style={styles.countryCodeText}>+998</Text>
                        </View>
                        <TextInput style={styles.phoneInput} value={phone} onChangeText={setPhone} keyboardType="numeric" />
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nickname</Text>
                    <TextInput style={styles.input} value={nickname} onChangeText={setNickname} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Пол</Text>
                    <SelectList
                        inputStyles={{ color: '#fff' }}
                        setSelected={setGender}
                        data={genderOptions}
                        defaultOption={{ key: '1', value: gender }}
                        boxStyles={styles.selectListBox}
                        dropdownStyles={styles.absoluteDropdown}
                        dropdownTextStyles={styles.selectListDropdownText}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Возраст</Text>
                    <SelectList
                        inputStyles={{ color: '#fff' }}
                        setSelected={setAge}
                        data={ageOptions}
                        defaultOption={{ key: '4', value: age }}
                        boxStyles={styles.selectListBox}
                        dropdownStyles={styles.absoluteDropdown}
                        dropdownTextStyles={styles.selectListDropdownText}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Регион</Text>
                    <SelectList
                        inputStyles={{ color: '#fff' }}
                        setSelected={setRegion}
                        data={regionOptions}
                        defaultOption={{ key: '1', value: region }}
                        boxStyles={styles.selectListBox}
                        dropdownStyles={styles.absoluteDropdown}
                        dropdownTextStyles={styles.selectListDropdownText}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Город</Text>
                    <SelectList
                        inputStyles={{ color: '#fff' }}
                        setSelected={setCity}
                        data={cityOptions}
                        defaultOption={{ key: '2', value: city }}
                        boxStyles={styles.selectListBox}
                        dropdownStyles={styles.absoluteDropdown}
                        dropdownTextStyles={styles.selectListDropdownText}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Telegram</Text>
                    <TextInput style={styles.input} value={telegram} onChangeText={setTelegram} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Instagram</Text>
                    <TextInput style={styles.input} value={instagram} onChangeText={setInstagram} />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={() => { /* save function */ }}>
                    <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
    },
    scrollContainer: {
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: '#b9b9c9',
        padding: 16,
        borderRadius: 8,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    profileName: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profilePhone: {
        color: '#555',
    },
    profileUsername: {
        color: '#555',
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        color: '#ccc',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#4B4B64',
        color: '#fff',
        borderRadius: 8,
        padding: 12,
        justifyContent: 'center',
    },
    inputText: {
        color: '#fff',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCode: {
        backgroundColor: '#4B4B64',
        borderRadius: 8,
        padding: 12,
        marginRight: 8,
    },
    countryCodeText: {
        color: '#fff',
    },
    phoneInput: {
        flex: 1,
        backgroundColor: '#4B4B64',
        color: '#fff',
        borderRadius: 8,
        padding: 12,
    },
    saveButton: {
        backgroundColor: '#9c0935',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectListBox: {
        backgroundColor: '#4B4B64',
        borderRadius: 8,
        padding: 12,
        borderWidth: 0,
        position: "relative",
        zIndex: 0,
    },
    selectListDropdownText: {
        color: '#fff',
    },
    absoluteDropdown: {
        position: 'absolute',
        backgroundColor: '#4B4B64',
        top: '100%',
        width: '100%',
        zIndex: 100,
    },
});

export default EditProfile;
