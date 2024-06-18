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

export type Chat = {
    avatar: string;
    name: string;
    text: string;
    time: number;
    textCount: number;
    color: string;
};

export interface ChatusersListType {
    user: Data[];
    role: string;
    userIds: any;
}

export interface ChatSentSmsType {
    editId: any,
    replyId: any,
    deleteId: any,
    senderId: string | null,
    sendMessage: () => void,
    chat: ChatSentSmstList[],
    content: string,
    setContent: (val: any) => void,
    reply: () => void,
    deleteMessage: () => void,
    editMessage: () => void,
    setPhoto: any,
    markMessageAsRead: (val: any) => void,
}

export interface ChatSentSmstList {
    content: string,
    senderName: string
    createdAt: string,
    id: any,
    read: boolean,
    recipientId: string,
    senderId: string,
    userImgId: string | null,
    receiverName: string,
    receiverImg: string | null
    senderImg: string | null,
    replayDto: any,
    attachmentIds: any,
}
