const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
    const {httpMethod} = event;

    if (httpMethod === 'POST') {
        const {body} = event;
        let parsedBody = {contactid: ""};

        if (body) {
            try {
                parsedBody = JSON.parse(body);
            } catch (error) {
                console.log(error);
            }
        }

        let expiresIn = 5 * 60;
        const iss = process.env.ISSUER;
        let sub = 'sub';

        if (parsedBody.contactid) {
            sub = parsedBody.contactid
        }

        if (parsedBody.expiry) {
            expiresIn = parsedBody.expiry
        }

        const payload = {
            sub,
            iss
        };

        const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
            algorithm: "HS256",
            expiresIn
        });

        console.log(token);

        return {
            statusCode: 200,
            body: token
        }
    }

    return {
        statusCode: 404
    }
};