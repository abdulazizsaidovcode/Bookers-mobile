import { Finance, FinanceDay, FinanceMonth, FinanceTopClients } from '@/type/finance/finance';
import { create } from 'zustand';

const financeStore = create<Finance>((set) => ({
    dayData: null,
    setDayData: (val: FinanceDay | null) => set({ dayData: val }),
    monthData: null,
    setMonthData: (val: FinanceMonth[] | null) => set({ monthData: val }),
    topClients: null,
    setTopClients: (val: FinanceTopClients[] | null) => set({ topClients: val }),
    date: null,
    setDate: (val: string | null) => set({ date: val }),
    startDate: null,
    setStartDate: (val: string | null) => set({ startDate: val }),
    endDate: null,
    setEndDate: (val: string | null) => set({ endDate: val }),
}));

export default financeStore;