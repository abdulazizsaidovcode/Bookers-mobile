export const getFileId = "salom"

// swagger url
export const base_url: string = 'http://45.67.35.86:8080/';

// sock url
export const sockjs_url = `${base_url}ws`;
export const chat_url = `${base_url}chat`;
export const newChat_url = `${base_url}chat/web/nachat-chat/send`; // sent message
export const getUsers_url = `${base_url}chat/users`; // sent message
// chat list url
export const getChatList_url = `${base_url}chat/web`; 
// message url
export const messages_url = `${base_url}chat/messages`; 

// finance urls
export const finance_top_client: string = `${base_url}/finance/top-client`
export const finance_month: string = `${base_url}/finance/month`
export const finance_day: string = `${base_url}/finance/day`