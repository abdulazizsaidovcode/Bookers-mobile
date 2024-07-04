import { switchBtn } from "@/helpers/api"
import { config } from "@/helpers/token"
import axios from "axios"
import { Alert } from "react-native"

export const SwithBTN = (isEnabled: boolean) => {
    axios.post(`${switchBtn}=${isEnabled}`, "", config)
        .then(res => {
            console.log(res.data)
            Alert.alert("success")
        })
        .catch(err => {
            console.log(err)
            Alert.alert("error")
        })
}