var http = require('http');
var StatusError = require('../lib');

http.createServer(function (req, res) {
    try {
        throw new StatusError(500);
    } catch (e) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(e));
    }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');