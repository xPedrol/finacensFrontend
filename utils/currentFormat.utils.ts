const currentFormat = (value: number | undefined) => {
    if (typeof value === 'number') {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    } else {
        return 'R$ 0,00';
    }
};

export default currentFormat;