export interface MyServicesProps {
    title: string;
    subTitle: string;
    onPress?: () => void;
}


export interface Services {
    data: Data[] | null
    setData: (val: Data[] | null) => void
    isModal: boolean
    setIsModal: (val: boolean) => void
    childCategoryData: ChildCategory[] | null
    setChildCategoryData: (val: ChildCategory[]) => void
    categoryFatherId: Data | null | any
    setCategoryFatherId: (val: Data) => void
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