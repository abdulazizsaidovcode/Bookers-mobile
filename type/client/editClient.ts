import { create } from "zustand";
export interface getClientNotififcations {
    id: string|null
    title: string|null
    content:string|null
    clientId:string|null
    masterId:string|null
    createAt:string|null
    read:boolean|null
}

export interface getOrderClientUpcomingInterface{
    serviceIds:string[]|null
    serviceName:string|null 
    orderDate:string|null 
    firstName:string|null
    lastName:string|null
    specializations:string[]|null
    salonName:string|null
    userAttachmentId:string|null
    feedbackCount:number|null
    orderPrice:number|null
    address:string|null
    phoneNumber:string|null
    lng:number|null
    lat:number|null
    orderCount:number|null
    clientCount:number|null
    instagram:string|null
    telegram:string|null
}
export interface getOrderClientPastcomingInterface{
    serviceIds:string[]|null
    serviceName:string|null 
    orderDate:string|null 
    firstName:string|null
    lastName:string|null
    specializations:string[]|null
    salonName:string|null
    userAttachmentId:string|null
    feedbackCount:number|null
    orderPrice:number|null
    address:string|null
    phoneNumber:string|null
    lng:number|null
    lat:number|null
    orderCount:number|null
    clientCount:number|null
    instagram:string|null
    telegram:string|null
    orderId:string|null
}
export interface getClientPastcomingInterface{
    serviceIds:string[]|null
    serviceName:string|null 
    orderDate:string|null 
    firstName:string|null
    lastName:string|null
    specializations:string[]|null
    salonName:string|null
    userAttachmentId:string|null
    feedbackCount:number|null
    orderPrice:number|null
    address:string|null
    phoneNumber:string|null
    lng:number|null
    lat:number|null
    orderCount:number|null
    clientCount:number|null
    instagram:string|null
    telegram:string|null
    orderId:string|null
}

export interface addfedbackmaster{
    count:number|null
    orderId:string|null|undefined
    text:string|null
}   