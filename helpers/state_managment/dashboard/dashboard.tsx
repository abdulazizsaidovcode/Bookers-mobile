import { DashboardDailyTimeOrders, DashboardHallingOrder, DashboardMainStatistic, DashboardState, DashboardWaitingOrder, TodayWorkGrafic } from '@/type/dashboard/dashboard';
import { create } from 'zustand';

const useDashboardStore = create<DashboardState>((set) => ({
    waitingData: [],
    todayGraficData: {from: '', end: ''},
    hallData: [],
    dailyTimeData: [],
    isConfirmModal: false,
    isRejectedModal: false,
    mainStatisticData: {
        completedSessions: '',
        incomeToday: '',
        rejectedOrder: 0,
        incomeThisMonth: 0
    },
    setDailyTimeData: (val: DashboardDailyTimeOrders[]) => set({ dailyTimeData: val }),
    setWaitingData: (val: DashboardWaitingOrder[]) => set({ waitingData: val }),
    setTodayGraficData: (val: TodayWorkGrafic) => set({ todayGraficData: val }),
    setHallData: (val: DashboardHallingOrder[]) => set({ waitingData: val }),
    setMainStatisticData: (val: DashboardMainStatistic) => set({ mainStatisticData: val }),
    setConfirmIsModal: (val: boolean) => set({ isConfirmModal: val }),
    setRejectedIsModal: (val: boolean) => set({ isRejectedModal: val }),
}));

export default useDashboardStore;
