import { create } from 'zustand'
import { ChildCategory, Data, Services } from '@/type/services/myServices'

const servicesStore = create<Services>((set) => ({
    data: [],
    setData: (val: Data[] | null) => set({ data: val }),
    isModal: false,
    setIsModal: (val: boolean) => set({ isModal: val }),
    childCategoryData: [],
    setChildCategoryData: (val: any) => set({childCategoryData: val}),
    childCategoryOneData: null,
    setChildCategoryOneData: (val: any) => set({childCategoryOneData: val}),
    categoryFatherId: null,
    setCategoryFatherId: (val: Data) => set({categoryFatherId: val}),
    checkedIs: false,
    setIsChecked: (val: boolean) => set({isChecked: val})
}))

export default servicesStore