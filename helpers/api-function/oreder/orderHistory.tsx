import { getConfig } from "@/app/(tabs)/(master)/main"
import Toast from "react-native-simple-toast";
import { addFebdaback_Url, clientOrderaPastComing, clientOrderUpcoming } from "@/helpers/api";
import { addfedbackmaster, getOrderClientPastcomingInterface, getOrderClientUpcomingInterface } from "@/type/client/editClient";
import axios from "axios";


// Upcoming function
export const getorderClientUpcoming = async (setData: (val: getOrderClientUpcomingInterface[]) => void) => {
    const config = await getConfig();
    const getclientOrderUpcoming = await axios.get(clientOrderUpcoming, config ? config : {});
    try {
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
    const config = await getConfig();
    const getclientOrderPastcoming = await axios.get(clientOrderaPastComing, config ? config : {});
    try {
        if (getclientOrderPastcoming.data.success) setData(getclientOrderPastcoming.data.body)
        else setData([])
    }
    catch {
        Toast.show('Upcoming topilmadi afsuski', Toast.LONG)
        setData([])
    }
}

// Leave feedback function 
export const addFebbakFunction = async (datas:(val:addfedbackmaster[])=>void) => {
   if(datas){
    const config = await getConfig();
    const addFedbackMasterByClient = await axios.post(addFebdaback_Url, datas, config ? config : {});
    try {
        if (addFedbackMasterByClient.data.success) Toast.show(addFedbackMasterByClient.data.message, Toast.LONG)
        else Toast.show('Add fedback ishlamadi', Toast.LONG)
    }
    catch {
        Toast.show('Add fedback funksiya ishlamadi yani catchga tushdi', Toast.LONG)
    }}
    else Toast.show('Something went wrong', Toast.LONG)
}