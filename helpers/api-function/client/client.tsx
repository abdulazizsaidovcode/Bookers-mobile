import axios from "axios";
import {config} from "@/helpers/token";
import {client_address_book, client_address_book_search, client_statistics} from "@/helpers/api";
import {ClientAddressBook, ClientStatus} from "@/type/client/client";

export const getClientStatistics = async (setData: (val: ClientStatus | null) => void) => {
    try {
        const {data} = await axios.get(client_statistics, config);
        if (data.success) setData(data.body)
        else setData(null)
    } catch (err) {
        console.error(err)
    }
}

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