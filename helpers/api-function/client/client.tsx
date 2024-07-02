import axios from "axios";
import {config} from "@/helpers/token";
import {
    add_feedback,
    age_list,
    client_address_book,
    client_address_book_search,
    client_address_book_update,
    client_not_visit,
    client_not_visit_search,
    client_permanent, client_permanent_search,
    client_statistics,
    client_stopped_visit_search,
    client_stopped_visit_sms,
    client_stopped_visiting,
    district_list, history_count,
    master_client_all_list, master_client_all_list_search,
    master_client_create, master_message_for_client, master_service_list,
    new_client, new_client_search, order_upcoming,
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

// age oraliqni list ini get qilish
export const getAgeList = async (setData: (val: AgeData[] | null) => void) => {
    try {
        const {data} = await axios.get(age_list, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// region list ni get qilish
export const getRegionList = async (setData: (val: RegionData[] | null) => void) => {
    try {
        const {data} = await axios.get(region_list, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// region id bn uziga tegishli district ni get qilish
export const getDistrictList = async (setData: (val: DistrictData[] | null) => void, id: number | string) => {
    try {
        if (id) {
            const {data} = await axios.get(`${district_list}${id}`, config);
            if (data.success) setData(data.body)
            else setData(null)
        } else console.log('region id yuq!!!')
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// client ga kirganda statistikalarni chiqazrish un yozilgan get function
export const getClientStatistics = async (setData: (val: ClientStatus | null) => void) => {
    try {
        const {data} = await axios.get(client_statistics, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// master uziga tegishli all client listini chgiqaruvchi get function
export const getClientAll = async (setData: (val: AllClient[] | null) => void) => {
    try {
        const {data} = await axios.get(master_client_all_list, config)
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.log(err)
        setData(null)
    }
}

// master all client buyicha search qiladi
export const getClientAllSearch = async (setData: (val: AllClient[] | null) => void, search: string) => {
    try {
        if (search) {
            const {data} = await axios.get(`${master_client_all_list_search}${search}`, config);
            if (data.success) setData(data.body)
            else setData(null)
        } else getClientAll(setData)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// master client ni create qilish
export const createClient = async (createData: UpdateClient, setNavigate: (val: boolean) => void) => {
    try {
        const {data} = await axios.post(master_client_create, createData, config)
        if (data.success) setNavigate(true)
        else setNavigate(false)
    } catch (err) {
        console.error(err)
        setNavigate(false)
    }
}

// stopped visit git function
export const getStoppedVisiting = async (setData: (val: null | ClientStoppedVisiting[]) => void) => {
    try {
        const {data} = await axios.get(client_stopped_visiting, config)
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.log(err)
        setData(null)
    }
}

// stopped visit search un
export const getClientStoppedVisitSearch = async (setData: (val: ClientStoppedVisiting[] | null) => void, search: string) => {
    try {
        if (search) {
            const {data} = await axios.get(`${client_stopped_visit_search}${search}`, config);
            if (data.success) setData(data.body)
            else setData(null)
        } else getStoppedVisiting(setData)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// stopped client ga sms juantish
export const addClientSMS = async (clientID: string, val: string, setTrue: (val: boolean) => void, setIsLoading: (val: boolean) => void) => {
    try {
        if (clientID && val) {
            setIsLoading(true)
            const {data} = await axios.post(`${client_stopped_visit_sms}?clientId=${clientID}&text=${val}`, '', config)
            if (data.success) {
                setTrue(true)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setTrue(false)
            }
        } else setTrue(false)
    } catch (err) {
        console.log(err)
        setTrue(false)
    }
}

// not visit git function
export const getNotVisiting = async (setData: (val: null | ClientNotVisit[]) => void) => {
    try {
        const {data} = await axios.get(client_not_visit, config)
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.log(err)
        setData(null)
    }
}

// not visit search un
export const getClientNotVisitSearch = async (setData: (val: ClientNotVisit[] | null) => void, search: string) => {
    try {
        if (search) {
            const {data} = await axios.get(`${client_not_visit_search}${search}`, config);
            if (data.success) setData(data.body)
            else setData(null)
        } else getNotVisiting(setData)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// client address book ni listini get qilish
export const getClientAddressBook = async (setData: (val: ClientAddressBook[] | null) => void) => {
    try {
        const {data} = await axios.get(client_address_book, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// client address book ni search un
export const getClientAddressBookSearch = async (setData: (val: ClientAddressBook[] | null) => void, search: string) => {
    try {
        if (search) {
            const {data} = await axios.get(`${client_address_book_search}${search}`, config);
            if (data.success) setData(data.body)
            else setData(null)
        } else getClientAddressBook(setData)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// address book da create qilgan client larni update qilish
export const updateClientData = async (updateData: UpdateClient, clientID: string, setNavigate: (val: boolean) => void) => {
    try {
        const {data} = await axios.put(`${client_address_book_update}${clientID}`, updateData, config)
        if (data.success) setNavigate(true)
        else setNavigate(false)
    } catch (err) {
        console.error(err)
        setNavigate(false)
    }
}

// new client get function
export const getNewClient = async (setData: (val: NewClient[] | null) => void) => {
    try {
        const {data} = await axios.get(new_client, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// new client search qilish
export const getNewClientSearch = async (setData: (val: NewClient[] | null) => void, search: string) => {
    try {
        if (search) {
            const {data} = await axios.get(`${new_client_search}${search}`, config);
            if (data.success) setData(data.body)
            else setData(null)
        } else getNewClient(setData)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// permanent client get function
export const getPermanentClient = async (setData: (val: PermanentClient[] | null) => void) => {
    try {
        const {data} = await axios.get(client_permanent, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
        setData(null)
    }
}

// permanent client search qilish
export const getPermanentClientSearch = async (setData: (val: PermanentClient[] | null) => void, search: string) => {
    try {
        if (search) {
            const {data} = await axios.get(`${client_permanent_search}${search}`, config);
            if (data.success) setData(data.body)
            else setData(null)
        } else getPermanentClient(setData)
    } catch (err) {
        console.error(err)
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
            const {data} = await axios.post(master_message_for_client, addData, config)
            if (data.success) {
                toggle()
                setLoading(false)
            } else {
                toggle()
                setLoading(false)
            }
        } else {
            alert('There is a message')
            setLoading(false)
        }
    } catch (err) {
        console.error(err)
        setLoading(false)
        alert('An error occurred on the server')
    }
}

// history count get function
export const getHistoryCount = async (setData: (val: HistoryCount | null) => void) => {
    try {
        const {data} = await axios.get(history_count, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.log(err)
        setData(null)
    }
}

// Services get zapis bulimi un
export const fetchServices = (setData: (val: any[] | null) => void) => {
    axios.get(master_service_list, config)
        .then((res) => setData(res.data.body))
        .catch((err) => console.error(err));
};

// feedback master post ilovaga baho berish
export const addFeedbackMaster = (star: number | any, setToast: (val: boolean) => void) => {
    const data = {
        count: star ? star : 0,
        masterId: null,
        orderId: null,
        text: null
    }
    if (data.count > 0) {
        axios.post(add_feedback, data, config)
            .then(res => {
                if (res.data.success) setToast(true)
                else setToast(false)
            })
            .catch(err => {
                console.log(err)
                setToast(false)
            })
    }
}

// client upcoming session get qilish
export const getUpcomingClient = async (setData: (val: any[] | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const {data} = await axios.get(`${order_upcoming}?status=UPCOMING_SESSIONS&clientId=${clientID}`, config)
            if (data.success) setData(data.body)
            else setData(null)
        } else setData(null)
    } catch (err) {
        console.log(err)
        setData(null)
    }
}

// client past session get qilish
export const getPastClient = async (setData: (val: any[] | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const {data} = await axios.get(`${order_upcoming}?status=PAST_SESSIONS&clientId=${clientID}`, config)
            if (data.success) setData(data.body)
            else setData(null)
        } else setData(null)
    } catch (err) {
        console.log(err)
        setData(null)
    }
}

// client canceled session get qilish
export const getCanceledClient = async (setData: (val: any[] | null) => void, clientID: string) => {
    try {
        if (clientID) {
            const {data} = await axios.get(`${order_upcoming}?status=CANCELED_SESSIONS&clientId=${clientID}`, config)
            if (data.success) setData(data.body)
            else setData(null)
        } else setData(null)
    } catch (err) {
        console.log(err)
        setData(null)
    }
}
