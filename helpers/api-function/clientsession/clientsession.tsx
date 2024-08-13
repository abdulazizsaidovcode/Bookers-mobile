import { getConfig } from "@/app/(tabs)/(master)/main"
import { base_url } from "@/helpers/api"
import axios from "axios"
import Toast from "react-native-simple-toast"



export const getSeesions = async (setSessions: any) => {
    let config = await getConfig()
    try {
        let res = await axios.get(`${base_url}order/client-past`, config ? config : {})
        setSessions(res.data.body)
        
        if (res.data.success) {
            setSessions(res.data.body)
        } else {
            setSessions([])
             alert(res.data.message     )
        }

    } catch (error: any) {
         alert(error.response.data.message     )
        setSessions([])
    }

}