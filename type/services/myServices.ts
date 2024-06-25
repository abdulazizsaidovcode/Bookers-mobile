export interface MyServicesProps {
    title: string;
    subTitle?: string;
    onPress?: () => void;
}


export interface Services {
    data: Data[] | null
    setData: (val: Data[] | null) => void
    isModal: boolean
    setIsModal: (val: boolean) => void
    childCategoryData: any | null
    setChildCategoryData: (val: any) => void
    childCategoryOneData: any | null
    setChildCategoryOneData: (val: any) => void
    categoryFatherId: Data | null | any
    setCategoryFatherId: (val: Data) => void
    checkedIs: boolean;
    setIsChecked: (val: boolean) => void
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