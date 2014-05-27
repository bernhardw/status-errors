module.exports = {
    400: {
        name: 'Bad Request',
        message: 'The request could not be understood by the server due to malformed syntax.'
    },
    401: {
        name: 'Unauthorized',
        message: 'The request requires user authentication.'
    },
    403: {
        name: 'Forbidden',
        message: 'The server understood the request, but is refusing to fulfill it.'
    },
    404: {
        name: 'Not Found',
        message: 'The server has not found anything matching the Request-URI.'
    },
    405: {
        name: 'Method Not Allowed',
        message: 'The method specified in the Request-Line is not allowed for the resource.'
    },
    409: {
        name: 'Conflict',
        message: 'The request could not be completed due to a conflict with the current state of the resource.'
    },
    500: {
        name: 'Internal Server Error',
        message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
    }
};