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
        attachmentId: null
    },
    setGetMee: (val: GetMee) => set({ getMee: val })
}));
export default useGetMeeStore;