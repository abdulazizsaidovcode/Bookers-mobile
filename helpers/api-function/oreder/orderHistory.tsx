import { getConfig } from "@/app/(tabs)/(master)/main"
    
import { addFebdaback_Url, addMessage_Url, clientOrderaPastComing, clientOrderUpcoming, deleteAllpastcoming_Url, deletePastcoming_Url } from "@/helpers/api";
import { addfedbackmaster, addMessageInterface, getOrderClientPastcomingInterface, getOrderClientUpcomingInterface } from "@/type/client/editClient";
import axios from "axios";
import { Alert } from "react-native";


// Upcoming function
export const getorderClientUpcoming = async (
    setData: (val: getOrderClientUpcomingInterface[]) => void,
    setIsLoading?: (val: boolean) => void
) => {

    setIsLoading ? setIsLoading(true) : () => { }
    try {
        const config = await getConfig();
        const getclientOrderUpcoming = await axios.get(clientOrderUpcoming, config ? config : {});
        if (getclientOrderUpcoming.data.success) {
            setData(getclientOrderUpcoming.data.body)
            setIsLoading ? setIsLoading(false) : () => { }
        }
        else {
            setData([])
            setIsLoading ? setIsLoading(false) : () => { }
        }
    }
    catch {
        setIsLoading ? setIsLoading(false) : () => { }
         alert('Upcoming topilmadi afsuski',   )
        setData([])
    }
}

//Pastcoming function 

export const getOrderClientPustComing = async (setData: (val: getOrderClientPastcomingInterface[]) => void, setIsLoading?: (val: boolean) => void) => {

    setIsLoading ? setIsLoading(true) : () => { }
    try {
        const config = await getConfig();
        const getclientOrderPastcoming = await axios.get(clientOrderaPastComing, config ? config : {});
        if (getclientOrderPastcoming.data.success) {
            setData(getclientOrderPastcoming.data.body)
            setIsLoading ? setIsLoading(false) : () => { }
        }
        else {
            setData([])
            setIsLoading ? setIsLoading(false) : () => { }
        }
    }
    catch {
        setIsLoading ? setIsLoading(false) : () => { }
         alert('Upcoming topilmadi afsuski',   )
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
                 alert('Add fedback ishlamadi',   );
                console.log(res.data.message);
            }
        } else {
             alert('Something went wrong',   );
        }
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            Alert.alert("O'xshamadi", 'Faqat bir marotaba izoh qoldirishingiz mumkin !')
            toggleModal();
        } else {
             alert('Add fedback funksiya ishlamadi yani catchga tushdi',   );
        }
        console.log(err);
    }
}

//Delete pastcoming order 
export const deletePastComingFunction = async (orderId: string | null | undefined, getFunction: () => void) => {
    try {
        if (!orderId) {
            Alert.alert('Delete qilishda xatolik', 'Xatolik yuz berdi')
        };
        const config = await getConfig();
        const res = await axios.delete(`${deletePastcoming_Url}one?orderId=${orderId}&status=PAST_SESSIONS`, config ? config : {}); // URL va config bilan so'rov yuborish

        if (res.data.success) {
            getFunction()
             alert('✅Order deleted successfully',   );
        } else {
            console.error('Failed to delete order:', res.status);
        }
    } catch (error) {
        // Xatolik bilan ishlash
        console.error('An error occurred while deleting the order:', error);
    }
};

export const deleteAllPastComingFunction = async (datas: string[], toggleModal: () => void, getFunction: () => void) => {
    try {
        if (datas.length !== 0) {
            const data = {
                "orderIdList": datas,
                "status": "PAST_SESSIONS"
            }

            console.log(data);

            const config = await getConfig();
            const res = await axios.post(`${deleteAllpastcoming_Url}`, data, config ? config : {});
            if (res.data.success) {
                 alert('All orders deleted successfully',   );
                getFunction();
                toggleModal();
            } else {
                 alert('All orders deleted error sssssssss',   );
            }
        } else {
             alert('Data malumotlar topilmadi',   );
        }
    } catch {
         alert('All orders deleted errorrrrrrrrrrrr',   );
    }
}

export const AddMessageOrderUpcoming = async (datas: addMessageInterface, toggleModal: () => void) => {
    try {
        if (datas) {
            const config = await getConfig();
            const res = await axios.post(addMessage_Url, datas, config ? config : {});
            if (res.data.success) {
                toggleModal();
                 alert('✅Message sent successfully',   );
            } else {
                 alert('Message sent error',   );
            }
        }
    } catch (err) {
        console.log("Upcomingda message yuborilmadi", err);

    }
}