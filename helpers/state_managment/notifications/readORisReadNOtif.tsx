import { create } from 'zustand'
interface ISchecked {
    hasNotification: boolean
    setHasNotification: (val: boolean) => void
}
const hasNotificationState=create<ISchecked>((set) => ({
    hasNotification: false,
    setHasNotification: (val) => set({hasNotification: val})
}))
export default hasNotificationState;