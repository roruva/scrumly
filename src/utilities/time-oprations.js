export const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEK_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
export const MONTHS_FULL = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

export function formatDate(d, format) {
    let date;
    if (!(d instanceof Date)) { date = new Date(d); }

    let dateFormatted = date;
    switch (format) {
        case 'duration':
            let diff = new Date() - date;
            let seconds = ('0' + (Math.floor(diff / 1000) % 60)).slice(-2);
            let minutes = ('0' + (Math.floor(diff / (1000 * 60)) % 60)).slice(-2);
            let hours = Math.floor(diff / (1000 * 60 * 60));

            dateFormatted = hours >= 1 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
            break;
        case 'MM-DD':
            let month = getMonthName(dateFormatted.getMonth());
            let day = dateFormatted.getDate();
            dateFormatted = `${month} ${day}`;
            break;
    
        default:
            dateFormatted = date.toLocaleDateString();
            break;
    }
    return dateFormatted;
}

export function getMonthName(indexMonth, isFull) {
    let month = isFull? MONTHS_FULL[indexMonth] : MONTHS[indexMonth];
    return month;
}

export function getFirstAndLastDayWeek(date) {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
    return [firstDay, lastDay];
}

export function getNumWeekFromDate(date) {
    let d = new Date( Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) );
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

export function isDateToday(date){
    if (!(date instanceof Date)) { date = new Date(date); }
    let today = new Date();
    let sameYear = date.getFullYear() === today.getFullYear();
    let sameMonth = date.getMonth() === today.getMonth();
    let sameDate = date.getDate() === today.getDate();
    return sameYear && sameMonth && sameDate;
}