const generateRandomColor = () => {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber: string | number = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, "0");
    return `#${randColor.toUpperCase()}`;
};

export const getStatusColor = (status: string | number) => {
    if(typeof status === 'number'){
        if(status > 0) return 'green.400';
        if(status < 0) return 'red.400';
        return 'gray.400';
    }
    switch (status) {
        case 'gain':
            return 'green.400';
        case 'loss':
            return 'red.400';
        case 'note':
            return 'gray.400';
        default:
            return 'gray.400';
    }
};
export default generateRandomColor;