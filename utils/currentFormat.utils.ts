const currentFormat = (value: number | undefined) => {
    if (typeof value === 'number') {
        return Math.abs(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    } else {
        return 'R$ 0,00';
    }
};

export const getCurrencyColor = (value: number | undefined) => {
    if (typeof value === 'number') {
        if (value < 0) {
            return 'red.400';
        } else if (value > 0) {
            return 'green.400';
        } else {
            return 'gray.400';
        }
    } else {
        return 'gray.200';
    }
}

export default currentFormat;