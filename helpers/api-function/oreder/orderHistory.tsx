import { getConfig } from "@/app/(tabs)/(master)/main"
import Toast from "react-native-simple-toast";
import { addFebdaback_Url, clientOrderaPastComing, clientOrderUpcoming, deletePastcoming_Url } from "@/helpers/api";
import { addfedbackmaster, getOrderClientPastcomingInterface, getOrderClientUpcomingInterface } from "@/type/client/editClient";
import axios from "axios";
import { Alert } from "react-native";


// Upcoming function
export const getorderClientUpcoming = async (setData: (val: getOrderClientUpcomingInterface[]) => void) => {
    try {
        const config = await getConfig();
        const getclientOrderUpcoming = await axios.get(clientOrderUpcoming, config ? config : {});
        if (getclientOrderUpcoming.data.success) setData(getclientOrderUpcoming.data.body)
        else setData([])
    }
    catch {
        Toast.show('Upcoming topilmadi afsuski', Toast.LONG)
        setData([])
    }
}
//Pastcoming function 

export const getOrderClientPustComing = async (setData: (val: getOrderClientPastcomingInterface[]) => void) => {
    try {
        const config = await getConfig();
        const getclientOrderPastcoming = await axios.get(clientOrderaPastComing, config ? config : {});
        if (getclientOrderPastcoming.data.success) setData(getclientOrderPastcoming.data.body)
        else setData([])
    }
    catch {
        Toast.show('Upcoming topilmadi afsuski', Toast.LONG)
        setData([])
    }
}

// Leave feedback function 
export const addFebbakFunction = async (datas: addfedbackmaster, toggleModal: () => void) => {
    try {
        if (datas) {
            const config = await getConfig();
            const res = await axios.post(addFebdaback_Url, datas, config ? config : {});
            if (res.data.success) {
                Alert.alert("Muvaffaqqiaytli", "Izohingiz yuborildi.")
                console.log(res.data.message);
                toggleModal();
            } else {
                Toast.show('Add fedback ishlamadi', Toast.LONG);
                console.log(res.data.message);
            }
        } else {
            Toast.show('Something went wrong', Toast.LONG);
        }
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            Alert.alert("O'xshamadi", 'Faqat bir marotaba izoh qoldirishingiz mumkin !')
            toggleModal();
        } else {
            Toast.show('Add fedback funksiya ishlamadi yani catchga tushdi', Toast.LONG);
        }
        console.log(err);
    }
}

//Delete pastcoming order 

export const deletePastComingFunction = async (orderId: string) => {
    try {
        const config = await getConfig(); // Configni olish
        const res = await axios.delete(`${deletePastcoming_Url}one?orderId=${orderId}&status=PAST_SESSIONS`,  config ? config : {}); // URL va config bilan so'rov yuborish

        if (res.data.success) {
            // Muvaffaqiyatli natija, xabar bering
            console.log('Order deleted successfully');
        } else {
            // Xato yoki boshqa javob kodi, xabar bering
            console.error('Failed to delete order:', res.status);
        }
    } catch (error) {
        // Xatolik bilan ishlash
        console.error('An error occurred while deleting the order:', error);
    }
};