const generateRandomColor = () => {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber: string | number = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, "0");
    return `#${randColor.toUpperCase()}`;
};
export default generateRandomColor;