var http = require('http');
var codes = require('./codes');

function StatusError(code, options) {
    if (!(this instanceof StatusError)) {
        return new StatusError(code, options);
    }

    options = options || {};

    if (typeof options === 'string') {
        options = {
            message: options
        };
    }

    this.status = code;

    options.name = options.name || ((codes[code]) ? codes[code].name : http.STATUS_CODES[code] || '');
    options.message = options.message || ((codes[code]) ? codes[code].message : '');

    Object.keys(options).forEach(function (key) {
        this[key] = options[key];
    }, this);
}

StatusError.prototype = new Error();
StatusError.prototype.constructor = StatusError;

module.exports = StatusError;