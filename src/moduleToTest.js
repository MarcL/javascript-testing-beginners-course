import request from 'superagent';

const moduleToTest = (url) => {
    return request.get(url);
}

export default moduleToTest;
