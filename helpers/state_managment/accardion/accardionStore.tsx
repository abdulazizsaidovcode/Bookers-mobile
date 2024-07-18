import { create } from "zustand";
interface AccardionStoreState{
    expanded:boolean,
    genderIndex:boolean,
    isSelected:boolean,
    setExpanded:(val:boolean)=>void,
    setGenderIndex:(val:boolean)=>void,
    setSelection:(val:boolean)=>void
}