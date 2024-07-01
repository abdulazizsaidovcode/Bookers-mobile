import { DashboardDailyTimeOrders, DashboardMainStatistic, DashboardState } from '@/type/dashboard/dashboard';
import { create } from 'zustand';

const useDashboardStore = create<DashboardState>((set) => ({
    data: [],
    mainStatisticData: {
        completedSessions: '',
        incomeToday: '',
        rejectedOrder: 0,
        incomeThisMonth: 0
    },
    setData: (val: DashboardDailyTimeOrders[]) => set({ data: val }),
    setMainStatisticData: (val: DashboardMainStatistic) => set({ mainStatisticData: val }),
}));

export default useDashboardStore;
