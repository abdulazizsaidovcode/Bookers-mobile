import { switchBtn } from "@/helpers/api"
import { config } from "@/helpers/token"
import axios from "axios"
import { Alert } from "react-native"

export const SwithBTN = (isEnabled: boolean) => {
    if (isEnabled === true || isEnabled === false) {
        axios.put(`${switchBtn}?allowClient=${isEnabled}`, {}, config)
            .then(res => {
                if (res.data.success) {
                    Alert.alert("success")
                }
                else {
                    Alert.alert("Ular bizni aldashdi😣🫥")
                }
            })
            .catch(err => {
                Alert.alert("error")
            })
    }

    else {

        Alert.alert("Biza xato ish qildik!++")
    }
}
export const SwitchBtnGet = (setData: (val: boolean) => void) => {
    axios.get(`${switchBtn}`, config)
        .then(res => {
            if (res.data.success) {
                setData(res.data.body)
            }
            else {
                setData(false)
            }
        })
        .catch(err => {
            setData(false)
        })
}

