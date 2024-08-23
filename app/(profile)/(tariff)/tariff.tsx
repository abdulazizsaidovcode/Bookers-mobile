// TariffsPage.tsx
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SecureStore from "expo-secure-store";
import { base_url } from "@/helpers/api";
import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { useFocusEffect } from 'expo-router';
import clientStore from '@/helpers/state_managment/client/clientStore';
import { Loading } from '@/components/loading/loading';
import { getMasterTariff } from "@/constants/storage";
import Buttons from '@/components/(buttons)/button';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // LinearGradient ni import qilish

interface IDetails {
    id: number;
    name: string;
}

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

export const postTariff = async (id: string | number) => {
    let config = await getConfig()
    try {
        if (id) {
            await axios.post(`${base_url}tariff/save?tariffId=${id}`, '', config ? config : {})
        } else {
            console.log('bunga tushmadi')
        }
    } catch (err) {
        console.error(err)
    }
}

export const getTariffMaster = async (setTariffStatus: (val: any | null) => void) => {
    let config = await getConfig()
    axios.get(`${base_url}tariff/master`, config ? config : {})
        .then(res => {
            if (res.data.success) setTariffStatus(res.data.body.tariffCode)
            else setTariffStatus(null)
        })
        .catch(err => {
            console.log(err)
            setTariffStatus(null)
        })
}

export const getAllTariff = async (setData: (val: any[] | null) => void, setLoading: (val: boolean) => void) => {
    setLoading(true)
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${base_url}tariff/list`, config ? config : {})
        if (data.success) {
            setLoading(false)
            setData(data.body.reverse());
        } else {
            setData(null);
            setLoading(false);
        }
    } catch (error) {
        setData(null);
        setLoading(false);
        console.error(error);
    }
}

const QuickSetupCard: React.FC<{ firstDetails: IDetails[], secondDetails: IDetails[], title: string, minut: number }> = ({ minut, firstDetails, secondDetails, title }) => {
    return (
        <View style={styles.qcard}>
            <ImageBackground
                source={require('../../../assets/images/vector.png')}
                style={styles.header}
            // imageStyle={styles.headerImage} // Apply additional styling to the image
            >
                <Text style={styles.headerText}>• {minut} минут</Text>
            </ImageBackground>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.listContainer}>
                <View style={styles.listColumn}>
                    {firstDetails.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="dot-single" size={24} color="#9C0A35" />
                            <Text style={styles.listItem}>{item.name}</Text>
                        </View>
                    ))}
                </View>
                <View style={[styles.listColumn]}>
                    {secondDetails.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="dot-single" size={24} color="#9C0A35" />
                            <Text style={styles.listItem}>{item.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <Buttons title='Настроить' backgroundColor='#fff' textColor='#9C0A35' bordered={true} />
        </View>
    );
};

const TariffsPage: React.FC = () => {
    const navigation = useNavigation<any>();
    const { isLoading, setIsLoading } = clientStore()
    const [tariffStatus, setTariffStatus] = useState<string | null>(null);
    const [tariffList, setTariffList] = useState<any[] | null>(null);

    useFocusEffect(useCallback(() => {
        getAllTariff(setTariffList, setIsLoading)
        getMasterTariff(setTariffStatus)
    }, []))

    const someFirstCard: IDetails[] = [
        { id: 1, name: 'Услуги' },
        { id: 2, name: 'Адрес работы' },
        { id: 3, name: 'Подтверждение записей' },
    ]

    console.log(-screenHeight);


    const someSecondCard: IDetails[] = [
        { id: 1, name: 'График работы' },
        { id: 2, name: 'Галерея' },
        { id: 3, name: 'Клиенты' },
    ]

    const manyFirstCard: IDetails[] = [
        { id: 1, name: 'График работы' },
        { id: 2, name: 'Предоплата' },
        { id: 3, name: 'Клиенты' },
    ]

    const manySecondCard: IDetails[] = [

        { id: 1, name: 'Услуги' },
        { id: 2, name: 'Адрес работы' },
        { id: 3, name: 'Подтверждение записей' },
        { id: 4, name: 'Активация брони' },
        { id: 5, name: 'Подтверждение брони' },
        { id: 6, name: 'Длительность записей' },
        { id: 7, name: 'Активация зала ожидания' },
        { id: 8, name: 'Время для ВИП клиентов' },
        { id: 9, name: 'Предоплата' },
        { id: 10, name: 'Напоминание о записи' },
    ]

    return (
        <>
            {isLoading ? <Loading /> : (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <NavigationMenu name='Tariff' />
                        <View>
                            <QuickSetupCard
                                secondDetails={someSecondCard}
                                firstDetails={someFirstCard}
                                title='Быстрая настройка:'
                                minut={5}
                            />
                            <QuickSetupCard
                                secondDetails={manyFirstCard}
                                firstDetails={manySecondCard}
                                title='Полная настройка:'
                                minut={15}
                            />
                            {tariffList && tariffList.map((tariff, index) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    key={index}
                                    style={[styles.card]}
                                >
                                    <Text style={styles.name}>Тариф {tariff.name}</Text>
                                    <Text style={styles.description}>
                                        {tariff.tariffCode === 'FREE' ? 'Стандартный набор функций' : 'Продвинутый набор функций'}</Text>
                                    <Text style={styles.price}>
                                        {tariff.tariffCode === 'FREE' ? 'Срок до: 31.12.2024' : '49 000 в месяц'}
                                    </Text>
                                    {tariff.tariffCode === 'STANDARD' && (
                                        <Text style={styles.trial}>Пробный период доступен на 3 месяца</Text>
                                    )}
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                postTariff(tariff.id)
                                                navigation.navigate('(welcome)/Welcome')
                                            }}
                                            activeOpacity={.7}
                                            style={[styles.activateButton]}
                                        >
                                            <Text style={styles.buttonText}>Активировать</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={.4}
                                            style={styles.detailsButton}
                                        >
                                            <Text style={[styles.buttonText, styles.detailsButtonText]}>Подробнее</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#B9B9C9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        marginVertical: 5,
        color: '#666',
    },
    price: {
        color: '#666',
    },
    trial: {
        color: '#666',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    activateButton: {
        backgroundColor: '#9C0A35',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    detailsButton: {
        backgroundColor: '#B9B9C9',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: '#9C0A35',
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
    },
    detailsButtonText: {
        color: '#9C0A35',
    },
    qcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Background color
    },
    qcard: {
        backgroundColor: '#B9B9C9',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    header: {
        width: screenWidth / 3.3, // Set to your desired width
        height: 30, // Set to your desired height
        position: 'absolute',
        right: '-3%',
        top: 0,
        alignItems: 'center'
    },
    headerImage: {
        // borderRadius: 15, // Adjust for rounded corners
    },
    headerText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600'
    },
    title: {
        color: '#000',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    listColumn: {
        width: '45%'
    },
    listItem: {
        color: '#4F4F4F',
        fontSize: 13,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qbuttonText: {
        color: '#BC002D',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TariffsPage;
