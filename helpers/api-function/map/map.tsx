import { getConfig } from "@/app/(tabs)/(master)/main";
import { base_url } from "@/helpers/api";
import { MasterLocation, TopMastersAdressType } from "@/type/map/map";
import axios from "axios";

export const fetchMasterLocation = async (masterId: string | number, setMapData: (val: MasterLocation) => void) => {
    const config = await getConfig()
    try {
        const { data } = await axios.get(`${base_url}user/client/get-one/${masterId}`, config ? config : {});
        if (data.success) {
            setMapData(data.body)
        }
    } catch { }
}

export const fetchTopMastersAdress = async (setTopMasterAdress: (val: TopMastersAdressType[]) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true)
    const config = await getConfig()
    try {
        const { data } = await axios.get(`${base_url}user/top/master/lat-long/list`, config ? config : {});
        if (data.success) {
            setTopMasterAdress(data.body)
            setIsLoading(false)
        } else {
            setTopMasterAdress([])
            setIsLoading(false)
        }
    } catch (error) {
        setTopMasterAdress([])
        setIsLoading(false)
    }
}