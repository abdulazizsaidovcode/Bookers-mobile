import { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import moment from "moment";
import financeStore from "@/helpers/state_managment/finance/financeStore";
import tw from "tailwind-react-native-classnames";

const CalendarComponent = ({ setMonthDate, defDate, color }: { setMonthDate?: (val: string) => void, defDate?: any, color?: string }) => {
    const { setDate } = financeStore()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    useEffect(() => {
        const date: string = moment(selectedDate).format('YYYY-MM-DD')
        setDate(date)
    }, []);

    useEffect(() => {
        const date: string = moment(selectedDate).format('YYYY-MM-DD')
        setDate(date)
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
            <TouchableOpacity
                style={[styles.datePicker, tw`h-12`, {backgroundColor: color ? color : '#6b7280'}]}
                onPress={() => setShowCalendar(true)}
                activeOpacity={.8}
            >
                <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
                <MaterialIcons name="date-range" size={24} color="white" />
            </TouchableOpacity>
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
