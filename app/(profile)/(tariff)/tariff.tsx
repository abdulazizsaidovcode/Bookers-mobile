// TariffsPage.tsx
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

const QuickSetupCard: React.FC<{ firstDetails: IDetails[], secondDetails: IDetails[], title: string, minut: number }> = ({ minut, firstDetails,secondDetails, title }) => {
    return (
        <View style={styles.qcard}>
            <LinearGradient
                colors={['#9C0A35', '#360312']}
                style={styles.header}
            >
                <Text style={styles.headerText}>{minut} минут</Text>
            </LinearGradient>
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
                <View style={styles.listColumn}>
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

    const firstCard: IDetails[] = [
        { id: 1, name: 'Услуги' },
        { id: 2, name: 'Адрес работы' },
        { id: 3, name: 'Подтверждение записей' },
    ]

    const secondCard: IDetails[] = [
        { id: 1, name: 'График работы' },
        { id: 2, name: 'Предоплата' },
        { id: 3, name: 'Клиенты' },
    ]

    return (
        <>
            {isLoading ? <Loading /> : (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <NavigationMenu name='Tariff' />
                        <View>
                            <QuickSetupCard
                            secondDetails={secondCard} 
                                firstDetails={firstCard} 
                                title='Быстрая настройка:'
                                minut={5}
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
        backgroundColor: '#BC002D',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    headerText: {
        color: 'white',
        fontSize: 12,
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
        flex: 1
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
