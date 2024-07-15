// swagger url
// export const base_url: string = 'http://45.67.35.86:8080/' ;
export const base_url: string = 'http://134.122.77.107:8080/';
// export const base_url: string = 'http://192.168.0.126/'; 
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
export const gallery_list = `${base_url}gallery/master`; // get master galleries
export const gallery_full_data = `${base_url}gallery/one`; // get master one gallery for detail page
export const main_gallery = `${base_url}gallery`; // add gallery, delete gallery, delete photo in gallery, edit gallery name
export const gallery_add_photo = `${base_url}gallery/attachment`; // add to gallery photo
export const gallery_edit_main_photo = `${base_url}gallery/update/main/photo`; // edit gallery main photo

// My services
export const category_Father = `${base_url}category`;// get all category
export const category_child = `${base_url}category/byCategory/`;// get child category {fatherid}
export const masterAdd_category = `${base_url}category`; // master add category
export const masterEdit_category = `${base_url}categoty/master`; //master edit category 
export const gender_status = `${base_url}master-service/gender?`; // master add gender
export const getGender_status = `${base_url}master-service/gender`;// master get gender
export const getCategory_master = `${base_url}master-service/category`;// master get service
export const getCategory_masterAdd = `${base_url}master-service/category?`;// master add service
export const getSpecialization = `${base_url}master-service/specialization`// master get Specialization
export const masterAdd_service = `${base_url}service`// master add service
export const masterEdit_service = `${base_url}service`// master edit service
export const master_get_Service = `${base_url}service/master/` //service belonging to the category
export const service_delete = `${base_url}service/isActive` //service delete 
export const master_get_specialization = `${base_url}master-service/specialization`//servicga tegishli bo'lgan hizmat
export const master_add_specialization = `${base_url}master-service/specialization`//servicga tegishli bo'lgan hizmat



// Register page 
export const register_page = `${base_url}auth/`

// Booking API

export const onlineBookingAllowClient_url = `${base_url}online-booking-settings/allow-client`
export const onlineBookingUgly_url = `${base_url}online-booking-settings/urgent`
export const onlineBookingUserviceTimeAll_url = `${base_url}online-booking-settings/service-time/all`
export const onlineBookingUserviceTimeservice_url = `${base_url}online-booking-settings/service-time`
export const onlineConfirmationServices_url = `${base_url}online-booking-settings/confirm-entry`
export const onlineBookingHallWaitin_url = `${base_url}online-booking-settings/hall-waiting`


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
export const client_delete: string = `${base_url}client/`

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
export const order_status_update: string = `${base_url}order/confirm-order`
export const order_update: string = `${base_url}order/move-order`

export const dashboard_daily_time_orders: string = `${base_url}user/today/calendar`
export const dashboard_main_statistic: string = `${base_url}order/master/order-statistic`
export const dashboard_wait_order: string = `${base_url}order/master/clients-today/wait`
export const dashboard_hall_order: string = `${base_url}order/master/clients-today/hall`
export const dashboard_today_work_grafic: string = `${base_url}workday/time/time`
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
export const notifications_appointment_edit: string = `${base_url}notification/settings/appointment`
export const notifications_appointment_edit_active: string = `${base_url}notification/is-active/on-off`
export const notifications_feedback_edit: string = `${base_url}notification/settings/feedback`
export const notifications_appointment: string = `${base_url}notification/settings/appointment/is-active`


// expene url 
export const expene_category_list: string = `${base_url}expense-category/master/expense-categories`
export const expene_category_post: string = `${base_url}expense-category`
export const expene_list: string = `${base_url}expense`
export const address_url: string = `${base_url}address`