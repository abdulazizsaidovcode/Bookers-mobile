import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CenteredModal from '@/components/(modals)/modal-centered';
import { AntDesign } from '@expo/vector-icons';
import Textarea from '@/components/select/textarea';
import { getFile } from '@/helpers/api';
import { useAccardionStore, useAccardionStoreId } from '@/helpers/state_managment/accardion/accardionStore';
import { addFebbakFunction, deletePastComingFunction, getOrderClientPustComing } from '@/helpers/api-function/oreder/orderHistory';
import { addfedbackmaster } from '@/type/client/editClient';

interface IProps {
    masterName: string;
    salonName: string | null;
    masterGender: string[] | null;
    ratingnumber: number | null;
    money: string | null;
    titleTex?: string[] | null; // majburiy emas
    buttonName: string;
    Adress: string | null;
    locationIcon?: React.ReactNode;
    phoneIcon?: string | React.ReactNode;
    deleteIcon?: React.ReactNode;
    imageURL: string | null;
    orderId?: string | null;
}

const ProfileCard: React.FC<IProps> = ({
    masterName,
    salonName,
    imageURL,
    masterGender,
    ratingnumber,
    money,
    titleTex = [],
    buttonName,
    Adress,
    locationIcon,
    phoneIcon,
    deleteIcon,
    orderId
}) => {
    const { activeTab, setActiveTab } = useAccardionStoreId();
    const { pastComing, setPastComing } = useAccardionStore()
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [ratingModal, setRatingModal] = useState<boolean>(false);
    const [selectOrderID, setSelectOrderID] = useState<string | null>(null);
    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const handleRating = (value: number) => setRating(value);

    const datas: addfedbackmaster = {
        count: rating,
        orderId: selectOrderID,
        text: textAreaValue
    };
    const getPastcomingClient = () => {
        getOrderClientPustComing(setPastComing);
    }
    const deleteToggleModal = () => {
        setSelectOrderID(orderId)
        setDeleteModal(!deleteModal);
    };

    const ratingToggleModal = () => {
        setRatingModal(!ratingModal);
    };

    const deleteOrderHistory = () => {
        if (selectOrderID) {
            deletePastComingFunction(selectOrderID, () =>getOrderClientPustComing(setPastComing));
            setDeleteModal(!deleteModal);
        } else {
            Alert.alert('Xatolik', 'Xatolik yuz berdi. Iltimos qaytadan urunib ko`ring!')
        }
    }
    const handleChange = (e: string) => {
        const trimmedValue = e.trim();
        const regex = /^[a-zA-Z0-9а-яА-ЯёЁ.,!?;:()\s]+$/;

        if (regex.test(trimmedValue) && !/\s\s+/.test(e)) setTextAreaValue(e);
        else if (e === '') setTextAreaValue('');
    };

    const generateStars = (count: number) => {
        const roundedCount = Math.round(count); // Yaqinlashtirilgan baho
        const starsCount = Math.min(roundedCount, 5); // 5 tadan oshmaydigan yulduzlar soni
        let stars = '';
        for (let i = 0; i < starsCount; i++) {
            stars += '★';
        }
        for (let i = starsCount; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    };

    return (
        <View style={styles.card}>
            <View style={styles.profileContainer}>
                <View style={styles.profileRow}>
                    <Image
                        source={{
                            uri: imageURL
                                ? getFile + imageURL
                                : 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                        }}
                        style={styles.profileImage}
                    />
                    <View>
                        <View style={styles.profileDetails}>
                            <Text style={styles.profileName}>{masterName}</Text>
                            <Text style={styles.salonName}>{salonName}</Text>
                        </View>
                        <View>
                            <Text style={styles.gender}>{masterGender?.join(', ')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.feedbackContainer}>
                    <Text style={styles.feedbackStars}>{generateStars(ratingnumber ?? 0)}</Text>
                    <Text style={styles.price}>{money}</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                {titleTex?.map((title, index) => (
                    <Text key={index} style={styles.titleText}>
                        {title}
                    </Text>
                ))}
            </View>
            <Text style={styles.address}>{Adress}</Text>
            <View
                style={[
                    styles.iconContainer,
                    locationIcon && phoneIcon ? { justifyContent: 'space-between' } : { gap: 10 }
                ]}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                        styles.messageButton,
                        locationIcon && phoneIcon ? {} : { width: '80%', justifyContent: 'center' }
                    ]}
                    onPress={() => {
                        setSelectOrderID(orderId);
                        if (activeTab === 'past') {
                            ratingToggleModal();
                        } else {
                            Alert.alert('Error', 'This option is not available yet');
                        }
                    }}
                >
                    <Text style={styles.messageButtonText}>{buttonName}</Text>
                </TouchableOpacity>
                {locationIcon && (
                    <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
                        {locationIcon}
                    </TouchableOpacity>
                )}
                {phoneIcon && (
                    <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
                        {phoneIcon}
                    </TouchableOpacity>
                )}
                {deleteIcon && (
                    <TouchableOpacity activeOpacity={0.7} style={styles.iconButton} onPress={deleteToggleModal}>
                        {deleteIcon}
                    </TouchableOpacity>
                )}
            </View>
            <CenteredModal
                isFullBtn={true}
                btnWhiteText={'Отмена'}
                btnRedText={'Да'}
                isModal={deleteModal}
                toggleModal={deleteToggleModal}
                onConfirm={deleteOrderHistory}
            >
                <>
                    <AntDesign name="delete" size={56} color="#9C0A35" />
                    <Text style={styles.deleteText}>Удалить прошедшую запись?</Text>
                </>
            </CenteredModal>
            <CenteredModal
                onConfirm={() => {
                    addFebbakFunction(datas, () => ratingToggleModal());
                }}
                isFullBtn={false}
                btnWhiteText={'Отправить'}
                btnRedText={'Закрыть'}
                isModal={ratingModal}
                toggleModal={ratingToggleModal}
            >
                <>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginBottom: 30 }}>
                        Оцените работу мастера!
                    </Text>
                    <View style={styles.modalContainer}>
                        <View style={styles.stars}>
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        key={index}
                                        onPress={() => handleRating(index + 1)}
                                    >
                                        <AntDesign
                                            name={index < rating ? 'star' : 'staro'}
                                            size={30}
                                            color="#B00000"
                                            style={styles.star}
                                        />
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>
                    <Textarea
                        placeholder="Оставьте отзыв"
                        value={textAreaValue}
                        onChangeText={(e) => handleChange(e)}
                    />
                </>
            </CenteredModal>
        </View>
    );
};

export default ProfileCard;

const styles = StyleSheet.create({
    card: {
        marginBottom: 16
    },
    profileContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    profileRow: {
        display: 'flex',
        width: '50%',
        flexDirection: 'row'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 32,
        marginRight: 8
    },
    profileDetails: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginBottom: 5
    },
    profileName: {
        fontSize: 14,
        fontWeight: '600'
    },
    salonName: {
        fontSize: 8,
        color: '#666',
        borderColor: '#828282',
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 16,
        padding: 4
    },
    serviceName: {
        fontSize: 12,
        color: '#4F4F4F'
    },
    feedbackContainer: {
        alignItems: 'flex-end'
    },
    feedbackStars: {
        fontSize: 14,
        color: '#9C0A35'
    },
    price: {
        fontSize: 14,
        color: '#9C0A35',
        marginTop: 4,
        fontWeight: '600'
    },
    titleContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10
    },
    titleText: {
        fontSize: 12,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderColor: '#828282',
        color: '#828282',
        borderRadius: 5,
        borderWidth: 1
    },
    address: {
        fontSize: 12,
        color: '#828282',
        marginTop: 10
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    messageButton: {
        paddingHorizontal: 30,
        paddingVertical: 16,
        backgroundColor: '#9C0A35',
        borderRadius: 5
    },
    messageButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    },
    iconButton: {
        padding: 16,
        borderRadius: 50,
        backgroundColor: '#9C0A35'
    },
    deleteText: {
        color: '#494949',
        fontSize: 12,
        marginVertical: 20
    },
    modalContainer: {
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 20
    },
    star: {
        marginHorizontal: 5
    },
    gender: {
        fontSize: 14,
        color: '#4F4F4F',
        marginBottom: 20
    }
});
