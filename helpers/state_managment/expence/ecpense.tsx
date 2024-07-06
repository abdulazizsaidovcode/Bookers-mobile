import { create } from "zustand";

type expenseCategoryType = {
    expenseCategory: masterOrderWaitType[];
    setExpenseCategory: (newSchedule: any) => void;
};
type expenseType = {
    expense: masterOrderWaitType[];
    setExpense: (newSchedule: any) => void;
};
interface masterOrderWaitType {
    id: string,
    title: string,
    description: string,
    amount: string,
    icon: string,
}


export const masterExpenseCategory = create<expenseCategoryType>((set) => ({
    expenseCategory: [],
    setExpenseCategory: (wait) => set({ expenseCategory: wait }),
}));

export const masterExpense = create<expenseType>((set) => ({
    expense: [],
    setExpense: (expence) => set({ expense: expence }),
}));