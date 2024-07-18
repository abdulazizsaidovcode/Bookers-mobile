export interface GetMee {
    id: string,
    firstName: string,
    lastName: string,
    nickname: string,
    phoneNumber: string,
    gender: string,
    job: string | null
    telegram: string | null,
    instagram: string | null,
    ageId: string | null,
    birthDate: string | null,
    regionId: string | null
    districtId: string | null,
    attachmentId: string | null
    cityId: any
}

export interface UserLocation {
    coords: {
        latitude: number,
        accuracy: number,
        altitude: number,
        altitudeAccuracy: number,
        heading: number,
        speed: number,
        longitude: number
    },
    mocked: boolean,
    timestamp: number,
}

export interface GetMeeStore {
    getMee: GetMee;
    userLocation: UserLocation;
    setGetMee: (val: GetMee) => void
    setUserLocation: (val: UserLocation) => void
    ageOption: []
    setAgeOption: (val: []) => void
    regionOption: []
    setRegionOption: (val: []) => void
    districtOption: []
    setDistrictOption: (val: []) => void

}