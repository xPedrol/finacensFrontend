export const pageCount = (count: number, limit: number = 10): number => {
    const value = Math.ceil(count / limit);
    if (value === 0 || value < 0 || value < 1) {
        return 1;
    }
    return value;
};