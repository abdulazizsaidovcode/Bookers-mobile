import { create } from "zustand";
interface AccardionStoreState{
    expanded:boolean,
    expanded2:boolean,
    expanded3:boolean,
    genderIndex:boolean,
    isSelected:boolean,
    setExpanded:(val:boolean)=>void,
    setGenderIndex:(val:boolean)=>void,
    setSelection:(val:boolean)=>void,
    setExpended2:(val:boolean)=>void,
    setExpended3:(val:boolean)=>void
}

export const  useAccardionStore=create<AccardionStoreState>((set)=>({
    expanded:false,
    genderIndex:false,
    isSelected:false,
    expanded2:false,
    expanded3:false,
    setExpended2:(val:boolean)=>set({expanded2:val}),
    setExpended3:(val:boolean)=>set({expanded3:val}),
    setExpanded:(val:boolean)=>set({expanded:val}),
    setGenderIndex:(val:boolean)=>set({genderIndex:val}),
    setSelection:(val:boolean)=>set({isSelected:val})
}))