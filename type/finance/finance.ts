export interface Finance {
    dayData: null | FinanceDay;
    setDayData: (val: FinanceDay | null) => void;
    monthData: null | FinanceMonth[];
    setMonthData: (val: FinanceMonth[] | null) => void;
    topClients: null | FinanceTopClients[];
    setTopClients: (val: FinanceTopClients[] | null) => void;
    date: string | null;
    setDate: (val: string | null) => void;
    startDate: string | null;
    setStartDate: (val: string | null) => void;
    endDate: string | null;
    setEndDate: (val: string | null) => void;
}

export interface FinanceDay {
    realIncome: number | null;
    monthName: string | null;
    date: string | null;
    plannedIncome: number | null;
    workHour: string | null;
    completedSessions: number | null;
}

export interface FinanceMonth {
    realIncome: number | null;
    monthName: string | null;
    date: string | null;
    income: number | null;
    expense: number | null;
    workHour: string | null;
    completedSessions: number | null;
}

export interface FinanceTopClients {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    nickname: string | null
    phoneNumber: string | null;
    attachmentId: string | null
    price: number | null;
    status: string[] | null;
}