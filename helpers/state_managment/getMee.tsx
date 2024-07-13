import { GetMee, GetMeeStore } from '@/type/getMee';
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
        regionId: null
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