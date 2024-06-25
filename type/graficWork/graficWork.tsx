export interface weekList {
    dayName: string,
    active: boolean
}

export interface Item {
    id: number;
    dayName: string;
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
  