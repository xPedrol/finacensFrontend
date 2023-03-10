export const cleanObject = (obj: any) => {
    for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
        }
    }
    return obj;
}