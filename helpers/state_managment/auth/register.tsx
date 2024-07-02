import { create } from "zustand";

export interface IState {
    phoneNumber: string;
    setPhoneNumber: (val: string) => void;
    setIsValid: (val: boolean) => void;
    isValid: boolean;
    setCode: (val: any) => void;
    code: any;
    img: any
    setImg: (val: any) => void
    otpValue: string[];
    setOtpValue: (val: string[]) => void;
    role: string;
    setRole: (val: string) => void;
    firstName: string;
    setFirstName: (val: string) => void;
    lastName: string;
    setLastName: (val: string) => void;
    nickname: string;
    setNickname: (val: string) => void;
    firstNameError: string;
    setFirstNameError: (val: string) => void;
    lastNameError: string;
    setLastNameError: (val: string) => void;
}

const registerStory = create<IState>((set) => ({
    phoneNumber: '',
    setPhoneNumber: (val: string) => set({ phoneNumber: val }),
    setIsValid: (val: boolean) => set({ isValid: val }),
    isValid: true,
    code: '',
    setCode: (val: any) => set({ code: val }),
    otpValue: ['', '', '', ''],
    setOtpValue: (val: string[]) => set({ otpValue: val }), // Bu yerda tip xato bo'lgan
    role: '',
    setRole: (val: string) => set({ role: val }),
    firstName: '',
    setFirstName: (val: string) => set({ firstName: val }),
    lastName: '',
    setLastName: (val: string) => set({ lastName: val }),
    nickname: '',
    setNickname: (val: string) => set({ nickname: val }),
    firstNameError: '',
    setFirstNameError: (val: string) => set({ firstNameError: val }),
    lastNameError: '',
    setLastNameError: (val: string) => set({ lastNameError: val }),
    img: null,
    setImg: (val: any) => set({ img: val })
}));
export default registerStory;
