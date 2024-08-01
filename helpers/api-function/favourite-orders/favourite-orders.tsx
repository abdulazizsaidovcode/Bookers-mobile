import { getConfig } from "@/app/(tabs)/(master)/main"
import { favourite_add, favourite_delete, favourite_list } from "@/helpers/api";
import { FavouriteOrdersType } from "@/type/favourite-orders/favourite-orders"
import { Feather, MaterialIcons } from "@expo/vector-icons";
import axios from "axios"
import { TouchableOpacity } from "react-native";
import Toast from 'react-native-simple-toast'
import tw from "tailwind-react-native-classnames";

export const fetchFavouriteOrders = async (setFavouriteOrders: (val: FavouriteOrdersType[]) => void, setIsloading: (val: boolean) => void) => {
    setIsloading(true)
    const config = await getConfig();
    try {
        const { data } = await axios.get(favourite_list, config ? config : {})
        if (data.success) {
            setFavouriteOrders(data.body)
            setIsloading(false)
        } else {
            setFavouriteOrders([])
            setIsloading(false)
        }
    } catch (error) {
        console.error(error);
        setFavouriteOrders([])
        setIsloading(false)
    }
}

export const addFavouriteOrder = async (masterId: string) => {
    const config = await getConfig();
    try {
        const { data } = await axios.post(`${favourite_add}/${masterId}`, {}, config ? config : {})
        if (data.success) {
            Toast.show('Мастер успешно добавлен в список любимый мастеров.', Toast.LONG)
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteFavouriteOrder = async (masterId: string, setFavouriteOrders: (val: FavouriteOrdersType[]) => void, setIsloading: (val: boolean) => void, toggleModal: () => void) => {
    const config = await getConfig();
    try {
        const { data } = await axios.delete(`${favourite_delete}/${masterId}`, config ? config : {})
        if (data.success) {
            await fetchFavouriteOrders(setFavouriteOrders, setIsloading)
            toggleModal()
            Toast.show('Мастер успешно удален из списка любимый мастеров.', Toast.LONG)
        }
    } catch (error: any) {
        // Toast.show(error.response.data.message, Toast.LONG)
        console.log(error);

    }
}

export const haveOrNot = (masterId: string, favouriteOrders: FavouriteOrdersType[]) => {
    if (favouriteOrders.some(order => order.id === masterId)) {
        return (
            <TouchableOpacity onPress={() => addFavouriteOrder(masterId)} activeOpacity={0.8} style={[tw`p-2 rounded-full`, { backgroundColor: '#9C0A35' }]}>
                <MaterialIcons name="bookmark" size={27} color="white" />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity activeOpacity={0.8} style={[tw`p-2 rounded-full`, { backgroundColor: '#9C0A35' }]}>
                <Feather name="bookmark" size={27} color="white" />
            </TouchableOpacity>
        )
    }
};
