export interface MyServicesProps {
    title: string;
    subTitle?: string;
    onPress?: () => void;
}


export interface Gender {
    id: number;
    gende:string;
}
export interface Services {
    data: {key: string, value: string}[] | null
    setData: (val: {key: string, value: string}[] | null) => void
    isModal: boolean
    isChecked: boolean
    setIsModal: (val: boolean) => void
    childCategoryData: any | null
    setChildCategoryData: (val: any) => void
    childCategoryOneData: any | null
    setChildCategoryOneData: (val: any) => void
    categoryFatherId: Data | null | any
    setCategoryFatherId: (val: Data) => void
    checkedIs: boolean;
    setIsChecked: (val: boolean) => void
    routeName: string;
    setRouteName: (val: string) => void
    genderData:Gender[] | null
    setGenderData:(val:Gender[] | null) => void
    selectedServices: [] | null ;
    setSelectedServices: (data:[]) =>void
    prodseduraUslug: any,
    setProdseduraUslug: (data: any) => void
    selectedCategory: string;
    setSelectedCategory: (val:string)=>void
    selectedCategoryId: string | null
    setSelectedCategoryId: (val: string | null) => void
    serviceSelectId: string | null
    setServiceSelectId: (val:string | null) => void
    serviceId: any | null
    setServiceId: (val:Data) => void
}

export interface Data {
    id: string
    name: string
    categoryFatherId: null | string
    categoryFatherName: null | string
    isNew: boolean
}
export interface ChildCategory {
      id: string
      name: string
      categoryFatherId: string | null
      categoryFatherName: string | null
      isNew: boolean
}
