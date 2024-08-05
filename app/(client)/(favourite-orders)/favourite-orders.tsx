import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationMenu from '@/components/navigation/navigation-menu'
import { useFocusEffect } from 'expo-router'
import { deleteFavouriteOrder, fetchFavouriteOrders } from '@/helpers/api-function/favourite-orders/favourite-orders'
import useFavoutiteOrders from '@/helpers/state_managment/favourite-orders/favourite-orders'
import ClientCard from '@/components/(cliendCard)/cliendCard'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import CenteredModal from '@/components/(modals)/modal-centered'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Loading } from '@/components/loading/loading'

const FavouriteOrders = () => {
    const navigation = useNavigation<any>()
    const { favouriteOrders, setFavouriteOrders, isModal, setIsModal, isLoading, setIsLoading, masterId, setMasterId } = useFavoutiteOrders();

    useFocusEffect(
        useCallback(() => {
            fetchFavouriteOrders(setFavouriteOrders, setIsLoading);
            return () => { }
        }, [favouriteOrders])
    )

    // const masterCategories = favouriteOrders.map(item => item.categoryNames.join(', '));
    const toggleModal = (masterId?: string) => {
        setIsModal(!isModal)
        setMasterId(masterId ? masterId : '')
    };
    const handleDelte = () => deleteFavouriteOrder(masterId, setFavouriteOrders, setIsLoading, toggleModal)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <NavigationMenu name='Избранные специалисты' />
                </View>
                <View style={styles.favouriteContainer}>
                    {isLoading ? <Loading /> : favouriteOrders.length === 0 ? <Text style={styles.notFoundText}>Увас нет любимый мастер</Text> : favouriteOrders.map((item, index) => (
                        <ClientCard
                            key={index}
                            favouriteStyle={true}
                            name={item.firstName}
                            clients={item.clientCount}
                            orders={item.orderCount}
                            address={`${item.district}, ${item.street}, ${item.house}`}
                            imageUrl={item.attachmentId}
                            feedbackCount={item.favoriteCount}
                            salon={item.salonName}
                            zaps={item.nextEntryDate ? moment(item.nextEntryDate).format('dddd') : 0}
                            masterType={item.gender === 'MALE' ? 'Мужской мастер' : 'Женский мастер'}
                            onPress={() => navigation.navigate('(client)/(map)/(master-locations)/master-locations', { id: item.id })}
                            favouriteOnPress={() => toggleModal(item.id)}
                        />
                    ))}
                </View>
                <CenteredModal
                    isModal={isModal}
                    toggleModal={toggleModal}
                    isFullBtn
                    btnRedText='Удалить'
                    btnWhiteText='Назад'
                    onConfirm={handleDelte}
                >
                    <View style={styles.deleteContainer}>
                        <MaterialIcons name="delete" size={100} color="#9C0A35" />
                        <Text style={styles.deleteText}>Вы уверены что удалите этот мастер из списка любимых мастеров.</Text>
                    </View>
                </CenteredModal>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FavouriteOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
    },
    favouriteContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    deleteText: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center'
    },
    notFoundText: {
        fontSize: 16,
        color: '#fff',
        padding: 5
    }
})