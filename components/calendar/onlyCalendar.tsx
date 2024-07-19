import { useCallback, useState } from "react";
import DateTimePicker, {
  Event as DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import useProfileStore from "@/helpers/state_managment/client/clientEditStore";
import { useFocusEffect } from "expo-router";

const CalendarComponent = ({
  setMonthDate,
  defDate,
  color,
}: {
  setMonthDate?: (val: string) => void;
  defDate?: any;
  color?: string;
}) => {
  const {
    showCalendar,
    setShowCalendar,
    updateProfileField,
    birthDate,
  } = useProfileStore();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    birthDate ? new Date(birthDate) : undefined
  );

  useFocusEffect(
    useCallback(() => {
      if (birthDate) {
        setSelectedDate(new Date(birthDate));
      } else {
        setSelectedDate(undefined);
      }
      return () => null;
    }, [birthDate])
  );

  useFocusEffect(
    useCallback(() => {
      if (selectedDate) {
        const date: string = moment(selectedDate).format("YYYY-MM-DD");
        updateProfileField("birthDate", date);
      }
      return () => null;
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (selectedDate) {
        const date: string = moment(selectedDate).format("YYYY-MM-DD");
        updateProfileField("birthDate", date);
        setMonthDate && setMonthDate(date);
      }
      return () => null;
    }, [selectedDate])
  );

  useFocusEffect(
    useCallback(() => {
      if (defDate) {
        setSelectedDate(new Date(defDate));
      } else {
        setSelectedDate(undefined);
      }
      return () => null;
    }, [defDate])
  );

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || undefined;
    setShowCalendar(false);
    setSelectedDate(currentDate);
    if (currentDate) {
      const formattedDate = moment(currentDate).format("YYYY-MM-DD");
      updateProfileField("birthDate", formattedDate);
    }
  };

  return (
    <>
      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate || new Date()} // new Date() default ni bitta sanani olish uchun kerak
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default CalendarComponent;
