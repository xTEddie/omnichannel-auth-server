const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

exports.handler = async function (event, context) {
    return {
        headers,
        statusCode: 200,
        body: process.env.PUBLIC_KEY
    }
};