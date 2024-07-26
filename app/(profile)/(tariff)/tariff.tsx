// TariffsPage.tsx
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import {SafeAreaView} from 'react-native-safe-area-context'
import * as SecureStore from "expo-secure-store";
import {base_url} from "@/helpers/api";
import axios from "axios";
import {getConfig} from "@/app/(tabs)/(master)/main";
import {useFocusEffect} from 'expo-router';
import clientStore from '@/helpers/state_managment/client/clientStore';
import {Loading} from '@/components/loading/loading';

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

export const getTariffMaster = async (setTariffStatus: (val: any|null) => void) => {
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
        const {data} = await axios.get(`${base_url}tariff/list`, config ? config : {})
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

const TariffsPage: React.FC = () => {
    const navigation = useNavigation<any>();
    const {isLoading, setIsLoading} = clientStore()
    const [tariffStatus, setTariffStatus] = useState<string | null>(null);
    const [tariffList, setTariffList] = useState<any[] | null>(null);

    useFocusEffect(useCallback(() => {
        const fetchTariffStatus = async () => {
            try {
                const storedTariffStatus = await SecureStore.getItemAsync('tariff');
                setTariffStatus(storedTariffStatus);
            } catch (error) {
                console.error('Error fetching tariff status:', error);
            }
        };

        fetchTariffStatus();
        getAllTariff(setTariffList, setIsLoading)
        // getTariffMaster(setTariffStatus)
    }, []))

    // useFocusEffect(useCallback(() => {
    //     getTariffMaster(setTariffStatus)
    // }, [navigation]))

    // const setTariff = async (type: string) => await SecureStore.setItemAsync("tariff", type)
    //
    // const handleDisabled = () => {
    //     if (tariffStatus === 'free') return 'free'
    //     else if (tariffStatus === 'standard') return 'standard'
    //     else return 'all'
    // }

    return (
        <>
            {isLoading ? <Loading/> : (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <NavigationMenu name='Tarifi'/>
                        <View>
                            {tariffList && tariffList.map((tariff, index) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    key={index}
                                    // { opacity: handleDisabled() === tariff.unicName ? 1 : handleDisabled() === 'all' ? 1 : .75 }
                                    style={[styles.card]}
                                    // disabled={handleDisabled() === tariff.unicName ? false : handleDisabled() === 'all' ? false : true}
                                >
                                    <Text style={styles.name}>Тариф {tariff.name}</Text>
                                    <Text style={styles.description}>
                                        {tariff.name === 'Free' ? 'Стандартный набор функций' : 'Продвинутый набор функций'}</Text>
                                    <Text style={styles.price}>
                                        {tariff.name === 'Free' ? 'Срок до: 31.12.2024' : '49 000 в месяц'}
                                    </Text>
                                    {tariff.name === 'Standard' && (
                                        <Text style={styles.trial}>Пробный период доступен на 3 месяца</Text>
                                    )}
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                postTariff(tariff.id)
                                                navigation.navigate('(welcome)/Welcome')
                                            }}
                                            activeOpacity={.7}
                                            // { opacity: handleDisabled() === tariff.unicName ? 1 : handleDisabled() === 'all' ? 1 : .75 }
                                            // disabled={handleDisabled() === tariff.unicName ? false : handleDisabled() === 'all' ? false : true}
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
        shadowOffset: {width: 0, height: 2},
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
});

export default TariffsPage;
