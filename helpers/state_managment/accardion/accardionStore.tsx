import { create } from "zustand";
interface AccardionStoreState{
    expanded:boolean,
    genderIndex:boolean,
    isSelected:boolean,
    setExpanded:(val:boolean)=>void,
    setGenderIndex:(val:boolean)=>void,
    setSelection:(val:boolean)=>void
}

export const  useAccardionStore=create<AccardionStoreState>((set)=>({
    expanded:false,
    genderIndex:false,
    isSelected:false,
    setExpanded:(val:boolean)=>set({expanded:val}),
    setGenderIndex:(val:boolean)=>set({genderIndex:val}),
    setSelection:(val:boolean)=>set({isSelected:val})
}))