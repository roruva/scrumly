// CONSTANTS
export const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEK_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
export const MONTHS_FULL = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
// Utils
export function getNewState(state, newState){
    return Object.assign({}, state, newState);
}

// DATE operations
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

export function isEmpty(obj) {
    if (obj === undefined) { return true; }
    return JSON.stringify(obj) === JSON.stringify({});
}
// COOLORS
/**
 * #29BF12
 * 08BDBD
 * F21B3F
 * FF9914 D64933
 * 7F2982
 */
// DESIGNS
/*
https://i.pinimg.com/originals/17/db/13/17db13e7ddc779044bc87eca5beedcb3.jpg
https://i.pinimg.com/originals/a2/9c/f4/a29cf46dde12484dc3761c9bf18698e6.png
https://uigarage.net/wp-content/uploads/2016/06/tumblr_o8r27dn5ur1ul8y65o1_1280-1.jpg

BOOTSTRAP
https://themes.getbootstrap.com/products/dashboard
https://dev.to/sabatesduran/add-custom-bootstrap-4-sass-to-create-react-app


HTML 2 CANVAS
https://github.com/niklasvh/html2canvas


REACT
https://www.youtube.com/watch?v=8AeJOIk58tQ&t=1s

*/