import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const SettingsGalery: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [isPhotoMain, setIsPhotoMain] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <NavigationMenu name='Создать альбом' />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>Фото галерея</Text>
                    <View style={{ marginTop: 10 }}>
                        <LocationInput placeholder='Название альбома' labalVisible={true} />
                    </View>
                    {image && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.image} />
                            <View style={styles.switchContainer}>
                                <Text style={styles.switchLabel}>Сделать фото основным</Text>
                                <Switch
                                    value={isPhotoMain}
                                    onValueChange={setIsPhotoMain}
                                    trackColor={{ false: '#767577', true: '#fff' }}
                                    thumbColor={isPhotoMain ? '#9C0A35' : '#f4f3f4'}
                                />
                            </View>
                        </View>
                    )}
                    <View style={{ marginTop: 10 }}>
                        <View style={{ width: 200 }}>
                            <Buttons icon={<Feather name="upload-cloud" size={20} color="white" />} title={` Загрузить фото`} />
                        </View>
                        <View style={{ width: 180, marginTop: 10 }}>
                            <Buttons icon={<Ionicons name="camera-outline" size={20} color="white" />} title={` Сделать фото`} onPress={pickImage} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsGalery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212e',
    },
    title: {
        color: 'white',
        fontSize: 27,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchLabel: {
        color: 'white',
        marginRight: 10,
    },
});
