// swagger url
export const base_url: string = 'http://45.67.35.86:8080/';
export const getMe = `${base_url}user/me`
export const getMeID = `${base_url}user/get/me/`

// get file
export const getFile: string = `${base_url}attachment/getFile/`
export const postFileId = `${base_url}attachment/upload`; // get chat list
export const postFilelist = `${base_url}attachment/upload/list`; // get chat list

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

// gallery
export const gallery_list = `${base_url}gallery/master`;
export const gallery_full_data = `${base_url}gallery/one`;
export const gallery_add = `${base_url}gallery`;
export const gallery_add_photo = `${base_url}gallery/attachment`;

// My services
export const category_Father = `${base_url}category`;
export const category_child = `${base_url}category/byCategory/`;
export const masterAdd_category = `${base_url}category`;
export const masterEdit_category = `${base_url}categoty/master`;
export const gender_status = `${base_url}master-service/gender?`;
export const getGender_status = `${base_url}master-service/gender`;
export const getCategory_master = `${base_url}master-service/category`;
export const getCategory_masterAdd = `${base_url}master-service/category?`;
export const getSpecialization = `${base_url}master-service/specialization`
export const masterAdd_service = `${base_url}service`
export const master_get_Service = `${base_url}service/master/`
export const master_get_specialization = `${base_url}master-service/specialization`



// Register page 
export const register_page = `${base_url}auth/`

// Grafic Work page
export const workday_put = `${base_url}workday/time/edit/graphic`
export const worktime_put = `${base_url}workday/time/edit/time`
export const workday_save = `${base_url}workday/time/save/graphic`
export const worktime_save = `${base_url}workday/time/save/time`
export const workday_get = `${base_url}workday/time/weekday`
export const worktime_get = `${base_url}workday/time/time/`

// clients url
export const client_statistics: string = `${base_url}user/master/client-count-by-status`
export const client_address_book: string = `${base_url}user/master/client-addressBooks`
export const client_address_book_search: string = `${base_url}client/search/for/from/contact?name=`
export const client_address_book_update: string = `${base_url}client/`
export const client_address_book_create: string = `${base_url}user/add-client-from-address-book`
export const master_client_create: string = `${base_url}user/create-client-by-master`
export const master_client_all_list: string = `${base_url}user/master/all-client`
export const master_client_all_list_search: string = `${base_url}client/search/for/all?name=`
export const client_not_visit: string = `${base_url}user/master/client-not-visit`
export const client_stopped_visiting: string = `${base_url}user/master/client-stoppedVisiting`
export const client_not_visit_search: string = `${base_url}client/search/for/not/visit?name=`
export const client_stopped_visit_search: string = `${base_url}client/search/for/stopped/visiting?name=`
export const client_stopped_visit_sms: string = `${base_url}sms/send-invite`
export const master_message_for_client: string = `${base_url}message/for/client/by/master`
export const client_permanent: string = `${base_url}user/master/client-permanent`
export const client_permanent_search: string = `${base_url}client/search/for/regular/visit?name=`
export const new_client: string = `${base_url}user/master/client-new`
export const new_client_search: string = `${base_url}client/search/for/new?name=`
export const history_count: string = `${base_url}order/client/session-history?clientId=`

// age url
export const age_list: string = `${base_url}age`

// region url
export const region_list: string = `${base_url}region`

// district url
export const district_list: string = `${base_url}district?regionId=`


// schedule url

export const schedule_list: string = `${base_url}order/today/orders/for/master`

//master servise url

export const master_service_list: string = `${base_url}service`


// free Time url

export const free_time_list: string = `${base_url}order/free-time`

// help url
export const help_url: string = `${base_url}help/one?HELP_STATUS=`

//order
export const order_list: string = `${base_url}order/today/orders/for/master`
export const order_add: string = `${base_url}order/save`
export const order_get_one: string = `${base_url}order/one?orderId=`
export const order_upcoming: string = `${base_url}order/client/upcoming-sessions`
export const order_past: string = `${base_url}order/client/past-sessions`
export const order_canceled: string = `${base_url}order/client/canceled-sessions`

export const dashboard_daily_time_orders: string = `${base_url}user/today/calendar`
export const dashboard_main_statistic: string = `${base_url}order/master/order-statistic`
export const dashboard_wait_order: string = `${base_url}order/master/clients-today/wait`
export const dashboard_hall_order: string = `${base_url}order/master/clients-today/hall`
export const dashboard_edit_order_status: string = `${base_url}order/confirm-order`

export const master_order_confirmed: string = `${base_url}order/master/clients-today/confirmed`
export const master_order_wait: string = `${base_url}order/master/clients-today/wait`
export const master_order_hall: string = `${base_url}order/master/clients-today/hall`

export const master_order_confirm: string = `${base_url}order/confirm-order`

// feedback url
export const add_feedback: string = `${base_url}feedback/for/app/by/master`

// number settings

export const master_put_number: string = `${base_url}user/master-setting-number`
export const master_get_number: string = `${base_url}user/master-setting-count`

// notifications url
export const notifications_main_data: string = `${base_url}notification/settings/all`
export const notifications_main_data_edit: string = `${base_url}notification/settings/all/turn-off-turn-on`
export const notifications_all_data: string = `${base_url}notification/settings`
export const notifications_messengers_edit: string = `${base_url}notification/settings/messages`
export const notifications_cancel_edit: string = `${base_url}notification/settings/cancel-order`
export const notifications_changing_edit: string = `${base_url}notification/settings/change-order`
export const notifications_window_edit: string = `${base_url}notification/settings/waiting/hall`
export const notifications_feedback_edit: string = `${base_url}notification/settings/feedback`