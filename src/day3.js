function day3(callback) {
    if (callback) {
        setTimeout(() => callback('hello'), 1000);
    } else {
        return Promise.resolve('hello');
    }
}


export default day3;
