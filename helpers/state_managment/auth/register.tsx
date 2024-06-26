import { create } from "zustand";

export interface IState {
    phoneNumber: string,
    setPhoneNumber: (val: string) => void,
    setIsValid: (val: boolean) => void,
    isValid: boolean,
    setCode: (val: any) => void,
    code: any,
    otp: string,
    setOtp: (val: string) => void,
    otpErr: boolean,
    setOtpErr: (val: boolean) => void,
    role: string,
    setRole: (val: string) => void,
    firstName: string,
    setFirstName: (val: string) => void,
    lastName: string,
    setLastName: (val: string) => void,
    nickname: string,
    setNickname: (val: string) => void,

}

const registerStory = create<IState>((set) => ({
    phoneNumber: '',
    setPhoneNumber: (val: string) => set({ phoneNumber: val }),
    setIsValid: (val: boolean) => set({ isValid: val }),
    isValid: true,
    code: '',
    setCode: (val: any) => set({ code: val }),
    otp: '',
    setOtp: (val: string) => set({ otp: val }),
    otpErr: false,
    setOtpErr: (val: boolean) => set({ otpErr: val }),
    role: '',
    setRole: (val: string) => set({ role: val }),
    firstName: '',
    setFirstName: (val: string) => set({ firstName: val }),
    lastName: '',
    setLastName: (val: string) => set({ lastName: val }),
    nickname: '',
    setNickname: (val: string) => set({ nickname: val }),
}));

export default registerStory;
