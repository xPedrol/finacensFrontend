export const months = [
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
    if(dateArray.length !== 2) {
        const day = Number(dateArray[0]);
        const month = Number(dateArray[1]);
        const year = dateArray[2];
        return `${day} ${months[month - 1]} ${year}`;
    }else {
        const month = Number(dateArray[0]);
        const year = dateArray[1];
        return `${months[month - 1]} ${year}`;
    }
};