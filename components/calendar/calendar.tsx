import type {DatePickerProps} from 'antd';
import {DatePicker} from 'antd';
import type {Dayjs} from 'dayjs';

const Calendar = () => {
    const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    return <DatePicker onChange={onChange}/>
};

export default Calendar;