import { GetMee, GetMeeStore, UserLocation } from '@/type/getMee';
import { create } from 'zustand';
const useGetMeeStore = create<GetMeeStore>((set) => ({
    getMee: {
        id: '',
        firstName: '',
        lastName: '',
        nickname: '',
        phoneNumber: '',
        gender: '',
        telegram: null,
        instagram: null,
        ageId: null,
        birthDate: null,
        districtId: null,
        attachmentId: null,
        regionId: null,
        cityId: "",
        job: ""
    },
    setUserLocation: (val: UserLocation) => set({ userLocation: val }),
    userLocation: {
        coords: {
            latitude: 0,
            longitude:0,
            speed:0,
            heading: 0,
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0
        },
        mocked: false,
        timestamp: 0
    },
    setGetMee: (val: GetMee) => set({ getMee: val }),
    ageOption: [],
    setAgeOption: (val: any) => set({ ageOption: val }),
    regionOption: [],
    setRegionOption: (val: any) => set({ regionOption: val }),
    districtOption: [],
    setDistrictOption: (val: any) => set({ districtOption: val })

}));
export default useGetMeeStore;