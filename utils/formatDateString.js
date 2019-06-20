const monthsDict = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

export function formatDateString(dateString) {
    if (!dateString) return 'Release date unknown';
    let [ year, month, day ] = dateString.split('-');
    if (day.charAt(0) === '0') {
        day = day.charAt(1);
    } 
    return `${monthsDict[month]} ${day}, ${year}`;
}