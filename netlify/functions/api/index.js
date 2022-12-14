const login = require('../login');
const publickey = require('../publickey');

console.log(login);

exports.handler = async function (event, context) {
    const {httpMethod, path} = event;
    console.log(httpMethod);
    console.log(path);

    if (path.endsWith('/api/login')) {
        return login.handler(event, context);
    }

    if (path.endsWith('/api/publickey')) {
        return publickey.handler(event, context);
    }

    return {
        statusCode: 404
    };
};