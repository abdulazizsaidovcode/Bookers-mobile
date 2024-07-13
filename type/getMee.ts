export interface GetMee {
    id: string,
    firstName: string,
    lastName: string,
    nickname: string,
    phoneNumber: string,
    gender: string,
    telegram: string | null,
    instagram: string | null,
    ageId: string | null,
    birthDate: string | null,
    regionId: string | null
    districtId: string | null,
    attachmentId: string | null
    cityId: any
} 

export interface GetMeeStore {
    getMee: GetMee;
    setGetMee: (val: GetMee) => void
    ageOption: []
    setAgeOption: (val: []) => void
    regionOption: []
    setRegionOption: (val: []) => void
    districtOption: []
    setDistrictOption: (val: []) => void
    
}