// store.ts
import create from 'zustand';

interface TimeSlotState {
    startTime: string | null;
    endTime: string | null;
    setStartTime: (time: string) => void;
    setEndTime: (time: string) => void;
    resetTimes: () => void;
}

const UseGrafficStore = create<TimeSlotState>(set => ({
    startTime: null,
    endTime: null,
    setStartTime: (time) => set(state => {
        if (state.endTime && new Date(`1970-01-01T${state.endTime}:00Z`) <= new Date(`1970-01-01T${time}:00Z`)) {
            return { startTime: time, endTime: null };
        }
        return { startTime: time };
    }),
    setEndTime: (time) => set(state => {
        if (state.startTime && new Date(`1970-01-01T${time}:00Z`) <= new Date(`1970-01-01T${state.startTime}:00Z`)) {
            return { endTime: null };
        }
        return { endTime: time };
    }),
    resetTimes: () => set({ startTime: null, endTime: null }),
}));

export default UseGrafficStore;
