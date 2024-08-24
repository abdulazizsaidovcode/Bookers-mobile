import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import { AntDesign, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { getFile } from '@/helpers/api';
import { delGallery, fetchData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { getNumbers, putNumbers } from '@/helpers/api-function/numberSittings/numbersetting';
import CenteredModal from '@/components/(modals)/modal-centered';
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from 'expo-router';
import { getMasterTariff } from '@/constants/storage';
import numberSettingStore from '@/helpers/state_managment/numberSetting/numberSetting';
import { StatusBar } from 'expo-status-bar';
import { Loading } from '@/components/loading/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(settings)/(settings-gallery)/settings-gallery-main'>;
const { width, height } = Dimensions.get('window');

const SettingsGalleryMain = () => {
    const { setNumber } = numberSettingStore();
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { data, setData, isLoading, setIsLoading } = useGalleryStore();
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [tariff, setTariff] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [showAllAttachments, setShowAllAttachments] = useState(false);
    const [isRejectModal, setIsRejectModal] = useState(false);
    const [confirmedGalleries, setConfirmedGalleries] = useState<string[]>([]);
    const [currentConfirmedIndex, setCurrentConfirmedIndex] = useState<number>(0);
    const [hasSeenModals, setHasSeenModals] = useState<boolean>(false);

    const checkForConfirmedAttachments = () => {
        const confirmedNames = [];
        for (const item of data) {
            if (item.resGalleryAttachments.some(attachment => attachment.attachmentStatus === 'APPROVED')) {
                confirmedNames.push(item.albumName);
            }
        }
        return confirmedNames;
    };

    useFocusEffect(
        useCallback(() => {
            const loadSeenModals = async () => {
                try {
                    const seen = await AsyncStorage.getItem('hasSeenModals');
                    if (seen === 'true') {
                        setHasSeenModals(true);
                    }
                } catch (error) {
                    console.error('Failed to load modal state from AsyncStorage', error);
                }
            };

            const checkAndShowModals = async () => {
                fetchData(setData, setIsLoading);
                getMasterTariff(setTariff);

                const confirmedNames = checkForConfirmedAttachments();
                if (confirmedNames.length > 0 && !hasSeenModals) {
                    setConfirmedGalleries(confirmedNames);
                    setHasSeenModals(true);
                    try {
                        await AsyncStorage.setItem('hasSeenModals', 'true');
                    } catch (error) {
                        console.error('Failed to save modal state to AsyncStorage', error);
                    }
                }
            };

            loadSeenModals().then(() => {
                checkAndShowModals();
            });

            return () => { };
        }, [hasSeenModals])
    );

    const handleNextModal = () => {
        if (currentConfirmedIndex < confirmedGalleries.length - 1) {
            setCurrentConfirmedIndex(prevIndex => prevIndex + 1);
        } else {
            setConfirmedGalleries([]);
            setCurrentConfirmedIndex(0);
        }
    };

    const handlePress = (id: number) => {
        if (showCheckboxes) {
            setSelectedItemId(id);
        } else {
            navigation.navigate('(settings)/(settings-gallery)/gallery-details', { id });
        }
    }

    const toggleModal = () => {
        if (selectedItemId !== null) {
            setIsOpen(!isOpen);
        } else {
            Toast.show('Please select a gallery', Toast.LONG);
        }
    }

    const toggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
        setSelectedItemId(null);
    }

    const toggleRejectModal = () => setIsRejectModal(!isRejectModal)

    const handleDelGallery = () => {
        if (selectedItemId) {
            delGallery(selectedItemId, setData, toggleModal, toggleCheckboxes, setIsLoading);
        }
    }

    const number = tariff === 'STANDARD' ? 4 : 2;

    if (isLoading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={{ paddingHorizontal: 10 }}>
                <NavigationMenu name='Моя галерея' />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: 10
                        }}>
                            <Text style={styles.title}>Фото галерея</Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                {data.length === 0 ? '' : (
                                    <Ionicons name="add-circle-outline" size={25} color="white"
                                        onPress={() => navigation.navigate('(settings)/(settings-gallery)/settings-gallery')} />
                                )}
                                {data.length === 0 ? '' : (
                                    <MaterialIcons name="delete" size={25} color="white" onPress={toggleCheckboxes} />
                                )}
                            </View>
                        </View>
                        {data.length === 0 ?
                            <Text style={styles.description}>Ваша галерея пустая, добавьте фотографии из проводника
                                Вашего телефона</Text>
                            :
                            <View style={styles.imageGrid}>
                                {data.map((item, index) => {
                                    const sortedAttachments = item.resGalleryAttachments.slice().sort((a, b) => {
                                        if (a.main && !b.main) return -1;
                                        if (!a.main && b.main) return 1;
                                        return 0;
                                    });
                                    return (
                                        <Pressable onPress={() => handlePress(item.id)} key={index}
                                            style={styles.albumContainer}>
                                            <View style={{ flexDirection: 'row', width: width / 2.2, flexWrap: 'wrap' }}>
                                                {showCheckboxes && (
                                                    <View style={styles.checkboxContainer}>
                                                        <MaterialIcons
                                                            name={selectedItemId === item.id ? "check-box" : "check-box-outline-blank"}
                                                            size={24} color="#9C0A35" />
                                                    </View>
                                                )}
                                                {sortedAttachments.slice(0, showAllAttachments ? sortedAttachments.length : number).map((attachment, attIndex) => (
                                                    <View key={attIndex}
                                                        style={[styles.imageContainer, selectedItemId === item.id && styles.selectedAlbum]}>
                                                        <Image
                                                            source={{ uri: getFile + attachment.attachmentId }}
                                                            style={styles.image}
                                                        />
                                                    </View>
                                                ))}
                                                {sortedAttachments.length < 4 &&
                                                    Array.from({ length: number - sortedAttachments.length }).map((_, placeholderIndex) => (
                                                        <Pressable onPress={() => handlePress(item.id)}
                                                            key={placeholderIndex}
                                                            style={[styles.imageContainer, selectedItemId === item.id && styles.selectedAlbum]}>
                                                            <Image
                                                                source={require('@/assets/images/defaultImg.jpeg')}
                                                                style={styles.image}
                                                            />
                                                        </Pressable>
                                                    ))
                                                }
                                            </View>
                                            <View>
                                                <Text style={[{
                                                    color: 'white',
                                                    margin: 5,
                                                    width: width / 2.5
                                                }, selectedItemId === item.id && styles.selectedAlbum]}>{item.albumName}</Text>
                                            </View>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        }
                    </View>

                    <CenteredModal
                        toggleModal={toggleModal}
                        isModal={isOpen}
                        btnWhiteText="Отмена"
                        btnRedText="Подтверждать"
                        isFullBtn={true}
                        onConfirm={handleDelGallery}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <MaterialIcons name="delete" size={100} color="#9C0A35" />
                            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Вы уверены, что хотите
                                открыть эту галерею?</Text>
                        </View>
                    </CenteredModal>
                    {confirmedGalleries.length > 0 && (
                        <CenteredModal
                            toggleModal={() => { }}
                            isModal={true}
                            onConfirm={handleNextModal}
                            oneBtn
                            btnWhiteText=""
                            btnRedText="Закрыть"
                            isFullBtn={false}
                        >
                            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, gap: 10 }}>
                                <Feather name="check-circle" size={100} color="#9C0A35" />
                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
                                    Фото альбома “{confirmedGalleries[currentConfirmedIndex]}”
                                    одобрено администратором
                                </Text>
                            </View>
                        </CenteredModal>
                    )}
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, padding: 10, width: '100%', justifyContent: 'center' }}>
                {data.length === 0 ?
                    <Buttons onPress={() => navigation.navigate('(settings)/(settings-gallery)/settings-gallery')}
                        icon={<AntDesign name="pluscircleo" size={20} color="white" />} title='Создать альбом' />
                    : showCheckboxes ? <Buttons title='Удалить выбранную галерею' onPress={toggleModal} />
                        :
                        <Buttons onPress={() => {
                            putNumbers(5, () => getNumbers(setNumber));
                            navigation.goBack();
                        }} title='На главную' />}
            </View>
        </SafeAreaView>
    );
}

export default SettingsGalleryMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
        position: 'relative'
    },
    scrollContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    content: {
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 27,
    },
    description: {
        width: 330,
        fontSize: 15,
        color: 'white',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    albumContainer: {
        marginBottom: 10,
        borderRadius: 10,
    },
    selectedAlbum: {
        opacity: .5
    },
    imageContainer: {
        margin: 5,
    },
    image: {
        width: width / 5 - 3.7,
        height: height / 11,
        borderRadius: 10,
    },
    checkboxContainer: {
        position: 'absolute',
        bottom: -5,
        right: 5,
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 5
    },
});
