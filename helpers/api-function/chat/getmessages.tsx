import axios from 'axios';
import { messages_url } from '../../api'; // Adjust the import path as needed
import { config } from '../../token';

interface FetchMessagesParams {
    setmessageData: (val: any) => void; // Adjust the import path as needed
    adminId: string | null;
    recipientId: string | null;
}

export const fetchMessages = async ({ adminId, recipientId, setmessageData }: FetchMessagesParams) => {

    if (adminId && recipientId) {
        try {
            const res = await axios.get(`${messages_url}/${adminId}/${recipientId}`, config);
            setmessageData(res.data.body);
            console.log(res.data.body);
        } catch (err: any) {
            if (err.response.status === 404) { 
                setmessageData([]);
            }
        }
    } else {

    }
};
