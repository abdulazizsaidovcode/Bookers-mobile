export interface CilentAllCategory {
    id:string,
    setId:(val: string) => void,
    name:string,
    setName:(val: string) => void,
    distanceMasterCount:number,
    setDistanceMasterCount:(val: number) => void,
    allCategory:[]
    setAllCategory:(val:[]) => void
    
}