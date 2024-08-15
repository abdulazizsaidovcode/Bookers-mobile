import axios from "axios";
import {
    add_feedback,
    age_list,
    client_address_book,
    client_address_book_search,
    client_address_book_update,
    client_delete, client_isVep,
    client_not_visit,
    client_not_visit_search,
    client_permanent,
    client_permanent_search,
    client_statistics,
    client_stopped_visit_search,
    client_stopped_visit_sms,
    client_stopped_visiting,
    district_list,
    getMeID,
    history_count,
    master_client_all_list,
    master_client_all_list_search,
    master_client_create,
    master_message_for_client,
    master_service_list,
    new_client,
    new_client_search,
    order_canceled,
    order_past,
    order_status_update,
    order_upcoming,
    region_list
} from "@/helpers/api";
import {
    AgeData, AllClient,
    ClientAddressBook,
    ClientNotVisit,
    ClientStatus,
    ClientStoppedVisiting,
    DistrictData, HistoryCount,
    NewClient,
    PermanentClient,
    RegionData,
    UpdateClient
} from "@/type/client/client";
import Toast from "react-native-simple-toast";
import {getConfig} from "@/app/(tabs)/(master)/main";
import {consoleClear} from "@/constants/consoleClear";

// text kesish un
export const sliceText = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
        let text: string = `${firstName} ${lastName}`
        if (text.length > 22) {
            return `${text.slice(0, 22)}...`
        } else return text
    } else {
        if (firstName) return firstName
        else return lastName
    }
}

export const sliceTextFullName = (fullName: string) => {
    if (fullName.length > 25) {
        return `${fullName.slice(0, 25)}...`
    } else return fullName
}

// id buyicha get me qiladi client ni
export const getMeClient = async (setData: (val: any | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const config = await getConfig()
            const {data} = await axios.get(`${getMeID}${clientID}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else Toast.show('An error occurred, it will be fixed soon!', Toast.LONG)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// age oraliqni list ini get qilish
export const getAgeList = async (setData: (val: AgeData[] | null) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(age_list, config ? config : {});
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// region list ni get qilish
export const getRegionList = async (setData: (val: RegionData[] | null) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(region_list, config ? config : {});
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// region id bn uziga tegishli district ni get qilish
export const getDistrictList = async (setData: (val: DistrictData[] | null) => void, id: number | string) => {
    try {
        if (id) {
            const config = await getConfig()
            const {data} = await axios.get(`${district_list}${id}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else console.log('region id yuq!!!')
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// client ga kirganda statistikalarni chiqazrish un yozilgan get function
export const getClientStatistics = async (setData: (val: ClientStatus | null) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(client_statistics, config ? config : {});
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// master uziga tegishli all client listini chgiqaruvchi get function
export const getClientAll = async (setData: (val: AllClient[] | null) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(master_client_all_list, config ? config : {})
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// master all client buyicha search qiladi
export const getClientAllSearch = async (setData: (val: AllClient[] | null) => void, search: string) => {
    try {
        if (search) {
            const config = await getConfig()
            const {data} = await axios.get(`${master_client_all_list_search}${search}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else await getClientAll(setData)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// master client ni create qilish
export const createClient = async (createData: UpdateClient, setNavigate: (val: boolean) => void, setLoading: (val: boolean) => void) => {
    setLoading(true)
    try {
        const config = await getConfig()
        const {data} = await axios.post(master_client_create, createData, config ? config : {})
        if (data.success) {
            setNavigate(true)
            setLoading(false)
            Toast.show('Successfully saved client✔', Toast.LONG)
        } else {
            Toast.show('Error saved client✔', Toast.LONG)
            setLoading(false)
            setNavigate(false)
        }
    } catch (err) {
        consoleClear()
        Toast.show('Error saved client✔', Toast.LONG)
        setLoading(false)
        setNavigate(false)
    }
}

// stopped visit git function
export const getStoppedVisiting = async (setData: (val: null | ClientStoppedVisiting[]) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(client_stopped_visiting, config ? config : {})
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// stopped visit search un
export const getClientStoppedVisitSearch = async (setData: (val: ClientStoppedVisiting[] | null) => void, search: string) => {
    try {
        if (search) {
            const config = await getConfig()
            const {data} = await axios.get(`${client_stopped_visit_search}${search}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else await getStoppedVisiting(setData)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// stopped client ga sms juantish
export const addClientSMS = async (clientID: string, val: string, setTrue: (val: boolean) => void, setIsLoading: (val: boolean) => void) => {
    try {
        if (clientID && val) {
            setIsLoading(true)
            const config = await getConfig()
            const {data} = await axios.post(`${client_stopped_visit_sms}?clientId=${clientID}&text=${val}`, '', config ? config : {})
            if (data.success) {
                setTrue(true)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setTrue(false)
            }
        } else setTrue(false)
    } catch (err) {
        consoleClear()
        setTrue(false)
    }
}

// not visit git function
export const getNotVisiting = async (setData: (val: null | ClientNotVisit[]) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(client_not_visit, config ? config : {})
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// not visit search un
export const getClientNotVisitSearch = async (setData: (val: ClientNotVisit[] | null) => void, search: string) => {
    try {
        if (search) {
            const config = await getConfig()
            const {data} = await axios.get(`${client_not_visit_search}${search}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else await getNotVisiting(setData)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// client address book ni listini get qilish
export const getClientAddressBook = async (setData: (val: ClientAddressBook[] | null) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(client_address_book, config ? config : {});
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// client address book ni search un
export const getClientAddressBookSearch = async (setData: (val: ClientAddressBook[] | null) => void, search: string) => {
    try {
        if (search) {
            const config = await getConfig()
            const {data} = await axios.get(`${client_address_book_search}${search}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else await getClientAddressBook(setData)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// address book da create qilgan client larni update qilish
export const updateClientData = async (updateData: UpdateClient, clientID: string, setNavigate: (val: boolean) => void, setLoading: (val: boolean) => void) => {
    setLoading(true)
    try {
        const config = await getConfig()
        const {data} = await axios.put(`${client_address_book_update}${clientID}`, updateData, config ? config : {})
        if (data.success) {
            setNavigate(true)
            setLoading(false)
            Toast.show('Successfully update client ✔', Toast.LONG)
        } else {
            setLoading(false)
            setNavigate(false)
            Toast.show('Error update client❌', Toast.LONG)
        }
    } catch (err) {
        consoleClear()
        setLoading(false)
        setNavigate(false)
        Toast.show('Error update client❌', Toast.LONG)
    }
}

// new client get function
export const getNewClient = async (setData: (val: NewClient[] | null) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(new_client, config ? config : {});
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// new client search qilish
export const getNewClientSearch = async (setData: (val: NewClient[] | null) => void, search: string) => {
    try {
        if (search) {
            const config = await getConfig()
            const {data} = await axios.get(`${new_client_search}${search}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else await getNewClient(setData)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// permanent client get function
export const getPermanentClient = async (setData: (val: PermanentClient[] | null) => void) => {
    try {
        const config = await getConfig()
        const {data} = await axios.get(client_permanent, config ? config : {});
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// permanent client search qilish
export const getPermanentClientSearch = async (setData: (val: PermanentClient[] | null) => void, search: string) => {
    try {
        if (search) {
            const config = await getConfig()
            const {data} = await axios.get(`${client_permanent_search}${search}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else await getPermanentClient(setData)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// ============================ CLIENT DETAILS ======================================
// master client ga message junatish
export const addClientMessage = async (clientID: string, message: string, setLoading: (val: boolean,) => void, toggle: () => void) => {
    const addData = {
        clientId: clientID,
        masterId: null,
        adminId: null,
        message: message,
        messageStatus: "MASTER_CLIENT_MESSAGE_FOR_WRITE"
    }
    setLoading(true)
    try {
        if (clientID && message) {
            const config = await getConfig()
            const {data} = await axios.post(master_message_for_client, addData, config ? config : {})
            if (data.success) {
                toggle()
                setLoading(false)
                Toast.show('Successfully message feedback✔', Toast.LONG)
            } else {
                Toast.show('An error occurred on the server❌', Toast.LONG)
                toggle()
                setLoading(false)
            }
        } else {
            Toast.show('There is a message', Toast.LONG)
            setLoading(false)
        }
    } catch (err) {
        consoleClear()
        setLoading(false)
        Toast.show('An error occurred on the server', Toast.LONG)
    }
}

// history count get function
export const getHistoryCount = async (setData: (val: HistoryCount | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const config = await getConfig()
            const {data} = await axios.get(`${history_count}${clientID}`, config ? config : {});
            if (data.success) setData(data.body)
            else setData(null)
        } else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// Services get zapis bulimi un
export const fetchServices = async (setData: (val: any[] | null) => void) => {
    const config = await getConfig()
    await axios.get(master_service_list, config ? config : {})
        .then((res) => setData(res.data.body))
        .catch(() => consoleClear())
};

// feedback master post ilovaga baho berish
export const addFeedbackMaster = async (star: number | any, setIsLoading: (val: boolean) => void, toggle?: () => void, text?: string) => {
    const data = {
        count: star ? star : 0,
        masterId: null,
        orderId: null,
        text: text ? text : null
    }
    setIsLoading(true)
    if (data.count > 0) {
        const config = await getConfig()
        await axios.post(add_feedback, data, config ? config : {})
            .then(res => {
                setIsLoading(false)
                toggle && toggle()
                if (res.data.success) Toast.show(`Вы оценили приложение на ${data.count}`, Toast.LONG)
            })
            .catch(() => {
                setIsLoading(false)
                toggle && toggle()
                Toast.show(`An error occurred on the server`, Toast.LONG)
                consoleClear()
            })
    }
}

// client upcoming session get qilish
export const getUpcomingClient = async (setData: (val: any[] | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const config = await getConfig()
            const {data} = await axios.get(`${order_upcoming}?status=UPCOMING_SESSIONS&clientId=${clientID}`, config ? config : {})
            if (data.success) setData(data.body)
            else setData(null)
        } else setData(null)
    } catch (err) {
        setData(null)
        consoleClear()
    }
}

// client past session get qilish
export const getPastClient = async (setData: (val: any[] | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const config = await getConfig()
            const {data} = await axios.get(`${order_past}?status=PAST_SESSIONS&clientId=${clientID}`, config ? config : {})
            if (data.success) setData(data.body)
            else setData(null)
        } else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

// client canceled session get qilish
export const getCanceledClient = async (setData: (val: any[] | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const config = await getConfig()
            const {data} = await axios.get(`${order_canceled}?status=CANCELED_SESSIONS&clientId=${clientID}`, config ? config : {})
            if (data.success) setData(data.body)
            else setData(null)
        } else setData(null)
    } catch (err) {
        consoleClear()
        setData(null)
    }
}

export const updateOrderStatus = async (orderID: string, status: string, setLoading: (val: boolean) => void, setSuccessStatus: (val: string) => void, toggle?: () => void) => {
    setLoading(true)
    try {
        if (orderID && status) {
            const config = await getConfig()
            const {data} = await axios.put(`${order_status_update}?orderId=${orderID}&status=${status}`, '', config ? config : {})
            if (data.success) {
                toggle && toggle()
                setSuccessStatus('ACCEPTED')
                Toast.show('Successfully update order status', Toast.LONG)
                setLoading(false)
            } else {
                toggle && toggle()
                setLoading(false)
                Toast.show('An error occurred on the server', Toast.LONG)
            }
        } else Toast.show('Something went wrong', Toast.LONG)
    } catch (err) {
        setLoading(false)
        consoleClear()
        toggle && toggle()
        Toast.show('An error occurred on the server', Toast.LONG)
    }
}

export const clientDelete = async (clientID: string, setRes: (val: boolean) => void, setLoading: (val: boolean) => void) => {
    setLoading(true)
    try {
        const config = await getConfig()
        if (clientID) {
            const {data} = await axios.delete(`${client_delete}${clientID}`, config ? config : {})
            if (data.success) {
                setLoading(false)
                setRes(data.success)
                Toast.show(data.message, Toast.LONG)
            }
        } else Toast.show('An error occurred on the server', Toast.LONG)
    } catch (err) {
        setLoading(false)
        Toast.show('An error occurred on the server', Toast.LONG)
        consoleClear()
    }
}

export const clientIsVip = async (clientID: string, isStatus: boolean, setSwitch: (val: boolean) => void) => {
    try {
        if (clientID) {
            const config = await getConfig()
            const {data} = await axios.put(`${client_isVep}?isVip=${isStatus}&clientId=${clientID}`, '', config ? config : {})
            if (data.success) {
                setSwitch(isStatus)
                Toast.show(`${isStatus ? 'You have made the client a vep client' : 'You have converted a vep client to a normal client'}`, Toast.LONG)
            } else Toast.show('Something went wrong', Toast.LONG)
        }
    } catch (err) {
        consoleClear()
        Toast.show('Something went wrong', Toast.LONG)
    }
}
