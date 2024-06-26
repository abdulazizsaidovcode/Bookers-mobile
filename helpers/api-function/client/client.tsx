import axios from "axios";
import {config} from "@/helpers/token";
import {
    age_list,
    client_address_book,
    client_address_book_search, client_address_book_update,
    client_statistics,
    district_list, master_client_create,
    region_list
} from "@/helpers/api";
import {AgeData, ClientAddressBook, ClientStatus, DistrictData, RegionData, UpdateClient} from "@/type/client/client";

// client ga kirganda statistikalarni chiqazrish un yozilgan get function
export const getClientStatistics = async (setData: (val: ClientStatus | null) => void) => {
    try {
        const {data} = await axios.get(client_statistics, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
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
            else getClientAddressBook(setData)
        } else getClientAddressBook(setData)
    } catch (err) {
        console.error(err)
        getClientAddressBook(setData)
    }
}

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
