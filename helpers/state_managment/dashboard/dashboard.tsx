import { DashboardDailyTimeOrders, DashboardHallingOrder, DashboardMainStatistic, DashboardState, DashboardWaitingOrder } from '@/type/dashboard/dashboard';
import { create } from 'zustand';

const useDashboardStore = create<DashboardState>((set) => ({
    waitingData: [],
    hallData: [],
    dailyTimeData: [],
    isModal: false,
    mainStatisticData: {
        completedSessions: '',
        incomeToday: '',
        rejectedOrder: 0,
        incomeThisMonth: 0
    },
    setDailyTimeData: (val: DashboardDailyTimeOrders[]) => set({ dailyTimeData: val }),
    setWaitingData: (val: DashboardWaitingOrder[]) => set({ waitingData: val }),
    setHallData: (val: DashboardHallingOrder[]) => set({ waitingData: val }),
    setMainStatisticData: (val: DashboardMainStatistic) => set({ mainStatisticData: val }),
    setIsModal: (val: boolean) => set({ isModal: val }),
}));

export default useDashboardStore;
