import { getConfig } from "@/app/(tabs)/(master)/main"
import Toast from "react-native-simple-toast";
import { addFebdaback_Url, clientOrderaPastComing, clientOrderUpcoming } from "@/helpers/api";
import { addfedbackmaster, getOrderClientPastcomingInterface, getOrderClientUpcomingInterface } from "@/type/client/editClient";
import axios from "axios";


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
                Toast.show("Hammasi yahshi Sardor xavotir olma", Toast.LONG)

                console.log(res.data.message);
                toggleModal();
            }
            else {
                Toast.show('Add fedback ishlamadi', Toast.LONG)
                console.log(res.data.message);

            }
        }
        else Toast.show('Something went wrong', Toast.LONG)
    }
    catch(err) {
        Toast.show('Add fedback funksiya ishlamadi yani catchga tushdi', Toast.LONG)
        console.log(err);
    }
}