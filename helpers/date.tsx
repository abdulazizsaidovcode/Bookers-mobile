export const curentData = new Date()
export const curentDay = curentData.getDate()
 const curentMonth = curentData.getMonth() + 1
 const curentWeekk = curentData.getDay()
export const months = ['января', 'февраля', 'марта', 'ап', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноя', 'декабря']
export const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суб']

export const curentWeekName = days[curentWeekk]
export const curentMonthName = months[curentMonth - 1]