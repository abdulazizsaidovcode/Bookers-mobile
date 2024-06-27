import { ScrollView, StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { getFile } from '@/helpers/api';
import { fetchData } from '@/helpers/api-function/gallery/settings-gallery';
import useGalleryStore from '@/helpers/state_managment/gallery/settings-gallery';
import { Ionicons } from '@expo/vector-icons';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-gallery-main'>;
const { width, height } = Dimensions.get('window');


const SettingsGalleryMain = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const { data, setData } = useGalleryStore();

    useEffect(() => {
        fetchData(setData);
    }, []);

    const handlePress = (id: number) => {
        navigation.navigate('(settings)/(settings-gallery)/gallery-details', { id })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <NavigationMenu name='Моя галерея' />
                </View>
                <View style={styles.content}>
                    <View style={{ height: '83%', justifyContent: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
                            <Text style={styles.title}>Фото галерея</Text>
                            {data.length === 0 ? '' : <Ionicons name="add-circle-outline" size={25} color="white" onPress={() => navigation.navigate('(settings)/(settings-gallery)/settings-gallery')}/>}
                        </View>
                        {data.length === 0 ?
                            <Text style={styles.description}>Ваша галерея пустая, добавьте фотографии из проводника Вашего телефона</Text>
                            :
                            <View style={styles.imageGrid}>
                                {data.map((item, index) => (
                                    <Pressable onPress={() => handlePress(item.id)} key={index} style={styles.albumContainer}>
                                        <View style={{ flexDirection: 'row', width: 170, flexWrap: 'wrap' }}>
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
                                            <Text style={{ color: 'white', margin: 5 }}>{item.albumName}</Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                        }
                    </View>
                    <View style={{ height: '17%' }}>
                        {data.length === 0 ?
                            <Buttons onPress={() => navigation.navigate('(settings)/(settings-gallery)/settings-gallery')} icon={<AntDesign name="pluscircleo" size={20} color="white" />} title='Создать альбом' />
                            :
                            <Buttons onPress={() => navigation.goBack()} title='На главную' />}
                    </View>
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
        flexGrow: 1,
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
});