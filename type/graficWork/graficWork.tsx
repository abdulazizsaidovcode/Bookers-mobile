export interface weekList {
    dayName: string,
    active: boolean
}
export interface TimeList {
    from: string,
    end: string
}

export interface saveweekList {
    workDayWeeks: [],
    date: string
}

export interface Item {
    id: number;
    dayName: string;
    dayValue: string;
    active: boolean;
  }
  
export interface MarkedDates {
    [date: string]: {
      selected?: boolean;
      marked?: boolean;
      dotColor?: string;
      color?: string;
    };
  }

  export interface DateObject {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  }
