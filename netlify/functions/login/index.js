exports.handler = async function (event, context) {
    const {httpMethod} = event;

    if (httpMethod === 'POST') {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "login" })
        }
    }

    return {
        statusCode: 404
    }
};