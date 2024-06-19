import axios from 'axios';
import { newsletters_url } from '../../api';
import { config } from '../../token';
import { Data } from '../../state_managment/chat/mailStore';

interface IChatLetters {
    subject?: string;
    date?: string;
    page?: string;
    size?: string;
    setLetterData: (val: Data[]) => void;
}

export const GetChatLetters = ({ subject, date, page, size, setLetterData }: IChatLetters) => {
    axios.get(`${newsletters_url}/list${subject ? `?subject=${subject}` : ''}${date ? subject ? `&date=${date}` : `?date=${date}` : ''}${page ? `&page=${page} ` : ''} ${size ? `&size=${size} ` : ''}`, config)
        .then(res => {
            if (res.data.success === true) {
                setLetterData(res.data.body);
            } else {
                setLetterData([]);
            }
        })
        .catch(() => setLetterData([]));
};
