export const getFileId = "salom"

// swagger url
export const base_url: string = 'http://45.67.35.86:8080/';

// sock url
export const sockjs_url = `${base_url}ws`;
export const chat_url = `${base_url}chat`;
export const newChat_url = `${base_url}chat/web/nachat-chat/send`; // sent message
// chat list url
export const getChatList_url = `${base_url}chat/web`; // get chat list