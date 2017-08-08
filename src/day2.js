function day2(data) {
    if (typeof data === 'object') {
        return Object.assign({}, data);
    }

    if ((typeof data === 'string') && (data === 'error')) {
        throw new Error('Cannot pass error');
    }

    return data;
}

export default day2;
