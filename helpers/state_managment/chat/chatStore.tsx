import { create } from 'zustand';


interface ChatData {
  role: string;
  chatData: Data[];
  messageStatus: "",
  setRole: (role: string) => void;
  setChatData: (val: Data[]) => void;
}
interface ChatDto {
  attachmentIds: string[];
  content: string;
  createdAt: "3924-07-04T22:00:00.000+00:00"
  id: number;
  read: boolean
  recipientId: string
  replayDto: string | null
  senderId: string
}
export interface Data {
  attachmentId: string | null;
  chatDto: ChatDto;
  name: string;
  newMessageCount: number
  nickname: string | null
  phone: string
  status: null | string,
  userId: string;
}


const chatStore = create<ChatData>((set) => ({
  role: 'master',
  chatData: [],
  messageStatus: "",
  setRole: (role: string) => set({ role: role }),
  setChatData: (val: Data[]) => set({ chatData: val }),
}));

export default chatStore;