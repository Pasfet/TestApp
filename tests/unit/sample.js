export function floatArray(array) {
    return array.reduce((acc, cur) => [...acc, cur[1]], []);
}

export function stubImageInObject(object) {
    Object.keys(object).forEach((key) => {
        if (key === 'backgroundImage' || key === 'image') {
            object[key] = '';
        }
        if (key === 'description') {
            object[key] = 'description';
        }
    });
    return object;
}

export function stubImageInArray(array) {
    const resultArray = Object.entries(array).map((obj) => {
        const result = stubImageInObject(obj[1]);

        return result;
    });

    return resultArray;
}
