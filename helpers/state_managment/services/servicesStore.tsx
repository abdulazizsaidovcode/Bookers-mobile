import { create } from 'zustand'
import { ChildCategory, Data, Gender, Services } from '@/type/services/myServices'

const servicesStore = create<Services>((set) => ({
    data: [],
    isChecked: false,
    setData: (val: {key: string, value: string}[] | null) => set({ data: val }),
    isModal: false,
    setIsModal: (val: boolean) => set({ isModal: val }),
    childCategoryData: [],
    setChildCategoryData: (val: any) => set({childCategoryData: val}),
    childCategoryOneData: null,
    setChildCategoryOneData: (val: any) => set({childCategoryOneData: val}),
    categoryFatherId: null,
    setCategoryFatherId: (val: Data) => set({categoryFatherId: val}),
    checkedIs: false,
    setIsChecked: (val: boolean) => set({isChecked: val}),
    routeName: "",
    setRouteName: (val: string) => set({routeName: val}),
    genderData:[],
    setGenderData:(val:Gender[] | null) => set({genderData:val}),
    selectedServices: [],
    setSelectedServices: (data) => set({ selectedServices: data }),
    prodseduraUslug: null,
    setProdseduraUslug: (data: any) => set({prodseduraUslug: data}),
    selectedCategory:"",
    setSelectedCategory:(val:string) => set({selectedCategory:val}),
    selectedCategoryId: null,
    setSelectedCategoryId: (val: string | null) => set({selectedCategoryId : val}),
    serviceSelectId: null,
    setServiceSelectId: (val: string | null) => set({serviceSelectId:val}),
    serviceId:false,
    setServiceId: (data) => set({serviceId:data}),

}))

export default servicesStore