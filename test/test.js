var should = require('should');
var codes = require('../lib/codes');
var StatusError = require('../lib');

describe('Status Errors', function () {

    it('should throw', function () {
        (function (){
            throw new StatusError(401);
        }).should.throw();
    });

    it('should be an instance of Error', function () {
        var error = new StatusError(401);
        error.should.be.an.instanceOf(Error);
    });

    it('should have a default name and message', function () {
        var error = new StatusError(401);
        error.name.should.equal(codes[401].name);
        error.message.should.equal(codes[401].message);
    });

    it('should allow a message instead of a config object', function () {
        var error = new StatusError(401, 'Custom message here.');
        error.name.should.equal('Unauthorized');
        error.message.should.equal('Custom message here.');
    });

    it('should allow custom properties', function () {
        var error = new StatusError(401, { foo: 'bar' });
        error.foo.should.equal('bar');
    });

    it('should have the stack trace available on the prototype', function () {
        var error = new StatusError(401);
        error.should.have.property('stack');
    });

    it('should consult http module for unavailable status codes', function () {
        var error = new StatusError(418);
        error.name.should.equal(require('http').STATUS_CODES[418]);
    });

    it('should use non-existent status codes', function () {
        var error = new StatusError(999);
        error.status.should.equal(999);
        error.name.should.equal('');
    });

});