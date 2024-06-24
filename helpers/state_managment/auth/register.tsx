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
    setOtpErr: (val: boolean) => void
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
    setOtpErr: (val: boolean) => set({ otpErr: val })
}));

export default registerStory;
