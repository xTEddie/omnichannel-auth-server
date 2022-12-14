const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
    const {httpMethod} = event;

    if (httpMethod === 'POST') {
        const expiresIn = 5 * 60;
        const sub = 'sub';
        const iss = process.env.ISSUER
        const payload = {
            sub,
            iss
        };

        const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
            algorithm: "HS256",
            expiresIn
        });

        return {
            statusCode: 200,
            body: token
        }
    }

    return {
        statusCode: 404
    }
};