import { create } from 'zustand';

interface ChatDto {
  attachmentIds: string[];
  content: string;
  createdAt: string;
  id: number;
  read: boolean;
  recipientId: string;
  replayDto: string | null;
  senderId: string;
}

export interface Data {
  attachmentId: string | null;
  chatDto: ChatDto;
  name: string;
  newMessageCount: number;
  nickname: string | null;
  phone: string;
  status: null | string;
  userId: string;
}

export interface ChatData {
  messageData: Data[];
  setmessageData: (val: Data[]) => void;
}

const fetchChatDataStore = create<ChatData>((set) => ({
  messageData: [],
  setmessageData: (val: Data[]) => set({ messageData: val }),
}));

export default fetchChatDataStore;
