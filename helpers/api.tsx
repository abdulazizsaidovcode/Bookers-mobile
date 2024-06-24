export const getFileId = "salom"

// swagger url
export const base_url: string = 'http://45.67.35.86:8080/';

// get file
export const getFile: string = `${base_url}attachment/getFile/`

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
export const finance_top_client: string = `${base_url}finance/top-client`
export const finance_month: string = `${base_url}finance/month`
export const finance_day: string = `${base_url}finance/day`

// attachment
export const postFileId = `${base_url}attachment/upload`; // get chat list
export const postFilelist = `${base_url}attachment/upload/list`; // get chat list

// gallery
export const gallery_list = `${base_url}gallery/master`;
export const gallery_add = `${base_url}gallery`;

// My services
export const services_list = `${base_url}category`

// Register page 
export const register_page = `${base_url}/auth/`

