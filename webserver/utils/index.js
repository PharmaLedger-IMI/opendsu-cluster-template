function requestBodyJSONMiddleware(request, response, next) {
    /**
     * Prepare headers for response
     */
    response.setHeader('Content-Type', 'application/json');

    const data = [];

    request.on('data', (chunk) => {
        data.push(chunk);
    });

    request.on('end', () => {
        request.body = data.length ? JSON.parse(data) : {};
        next();
    });
}

function responseModifierMiddleware(request, response, next) {
    if (!response.hasOwnProperty('send')) {
        response.send = function (statusCode, body, callback = response.end) {
            response.statusCode = statusCode;

            if (body) {
                response.write(responseWrapper(body));
            }

            callback.call(response);
            // callback();
        };
    }

    next();
}
function responseWrapper(body) {
    if (typeof body === 'string') {
        return JSON.stringify({ message: body });
    }

    return JSON.stringify(body);
}

module.exports = {
    responseModifierMiddleware,
    requestBodyJSONMiddleware
}
