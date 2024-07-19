import { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import moment from "moment";
import financeStore from "@/helpers/state_managment/finance/financeStore";
import tw from "tailwind-react-native-classnames";
import useProfileStore from '@/helpers/state_managment/client/clientEditStore';

const CalendarComponent = ({ setMonthDate, defDate, color }: { setMonthDate?: (val: string) => void, defDate?: any, color?: string }) => {
const {showCalendar, setShowCalendar, updateProfileField} = useProfileStore()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        const date: string = moment(selectedDate).format('YYYY-MM-DD')
        updateProfileField("birthDate", date)
    }, []);

    useEffect(() => {
        const date: string = moment(selectedDate).format('YYYY-MM-DD')
        updateProfileField("birthDate", date)
        setMonthDate && setMonthDate(date)
    }, [selectedDate]);

    useEffect(() => {
        if (defDate) setSelectedDate(defDate)
        else setSelectedDate(new Date())
    }, [defDate]);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        setShowCalendar(false);
        setSelectedDate(currentDate);
    };

    const formatDate = (date: Date) => {
        if (!date) return '';
        const options: any = moment(date).format('DD.MM.YYYY')
        return options
    };

    return (
        <>
            {showCalendar && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default CalendarComponent;
