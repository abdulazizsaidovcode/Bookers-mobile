import { Finance, FinanceDay, FinanceMonth, FinanceTopClients } from '@/type/finance/finance';
import { create } from 'zustand';

const financeStore = create<Finance>((set) => ({
    dayData: null,
    setDayData: (val: FinanceDay) => set({ dayData: val }),
    monthData: null,
    setMonthData: (val: FinanceMonth[]) => set({ monthData: val }),
    topClients: null,
    setTopClients: (val: FinanceTopClients[]) => set({ topClients: val }),
}));

export default financeStore;