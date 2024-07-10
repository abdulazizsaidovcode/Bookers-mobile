import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { getFile } from '@/helpers/api';
import { delGallery, fetchData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { putNumbers } from '@/helpers/api-function/numberSittings/numbersetting';
import CenteredModal from '@/components/(modals)/modal-centered';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(settings)/(settings-gallery)/settings-gallery-main'>;
const { width, height } = Dimensions.get('window');

const SettingsGalleryMain = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { data, setData } = useGalleryStore();
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        fetchData(setData);
    }, []);

    const handlePress = (id: number) => {
        setSelectedItemId(id);
    }

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const toggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
        setSelectedItemId(null); // Reset selected item when toggling checkboxes
    }

    const handleDelGallery = () => {
        delGallery(selectedItemId, setData, toggleModal, toggleCheckboxes)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <NavigationMenu name='Моя галерея' />
                </View>
                <View style={styles.content}>
                    <View style={{ height: height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                            <Text style={styles.title}>Фото галерея</Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                {data.length === 0 ? '' : (
                                    <Ionicons name="add-circle-outline" size={25} color="white" onPress={() => navigation.navigate('(settings)/(settings-gallery)/settings-gallery')} />
                                )}
                                {data.length === 0 ? '' : (
                                    <MaterialIcons name="delete" size={25} color="white" onPress={toggleCheckboxes} />
                                )}
                            </View>
                        </View>
                        {data.length === 0 ?
                            <Text style={styles.description}>Ваша галерея пустая, добавьте фотографии из проводника Вашего телефона</Text>
                            :
                            <View style={styles.imageGrid}>
                                {data.map((item, index) => (
                                    <Pressable onPress={() => handlePress(item.id)} key={index} style={styles.albumContainer}>
                                        <View style={{ flexDirection: 'row', width: width / 2.2, flexWrap: 'wrap' }}>
                                            {showCheckboxes && (
                                                <View style={styles.checkboxContainer}>
                                                    <MaterialIcons name={selectedItemId === item.id ? "check-box" : "check-box-outline-blank"} size={24} color="#9C0A35" />
                                                </View>
                                            )}
                                            {item.resGalleryAttachments.slice(0, 4).map((attachment, attIndex) => (
                                                <View key={attIndex} style={styles.imageContainer}>
                                                    <Image
                                                        source={{ uri: getFile + attachment.attachmentId }}
                                                        style={styles.image}
                                                    />
                                                </View>
                                            ))}
                                            {item.resGalleryAttachments.length < 4 &&
                                                Array.from({ length: 4 - item.resGalleryAttachments.length }).map((_, placeholderIndex) => (
                                                    <Pressable key={placeholderIndex} style={styles.imageContainer}>
                                                        <Image
                                                            source={require('@/assets/images/defaultImg.jpeg')}
                                                            style={styles.image}
                                                        />
                                                    </Pressable>
                                                ))
                                            }
                                        </View>
                                        <View>
                                            <Text style={{ color: 'white', margin: 5, width: width / 2.5 }}>{item.albumName}</Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                        }
                    </View>
                    <View>
                        {data.length === 0 ?
                            <Buttons onPress={() => navigation.navigate('(settings)/(settings-gallery)/settings-gallery')} icon={<AntDesign name="pluscircleo" size={20} color="white" />} title='Создать альбом' />
                            : showCheckboxes ? <Buttons title='Удалить выбранную галерею' onPress={toggleModal} />
                                :
                                <Buttons onPress={() => {
                                    putNumbers(5);
                                    navigation.navigate("(welcome)/Welcome");
                                }} title='На главную' />}
                    </View>
                    <CenteredModal
                        toggleModal={toggleModal}
                        isModal={isOpen}
                        btnWhiteText="Отмена"
                        btnRedText="Подтверждать"
                        isFullBtn={true}
                        onConfirm={handleDelGallery}
                    >
                        <View>
                            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Вы уверены, что хотите открыть эту галерею?</Text>
                        </View>
                    </CenteredModal>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingsGalleryMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    scrollContainer: {
        justifyContent: 'space-between',
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
        top: 5,
        right: 5,
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 5
    },
});
