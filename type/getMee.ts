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
    districtId: string | null,
    attachmentId: string | null
} 

export interface GetMeeStore {
    getMee: GetMee;
    setGetMee: (val: GetMee) => void
}