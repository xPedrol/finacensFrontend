const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const formatNumbersBalanceDate = (date: string) => {
    const dateArray = date.split('/');
    const month = Number(dateArray[0]);
    const year = dateArray[1];
    return `${months[month - 1]} ${year}`;
};