# Status Errors

Opinionated way to communicate application errors based on status codes.

## Install

    npm install status-errors
 
## API

    var StatusError = require('status-errors');  
    
    try {
        throw new StatusError(401);
    } catch (e) {
        // { status: 401, name: 'Unauthorized', message: 'The request requires user authentication.' }
    }
    
    // Options:
    try {
        throw new StatusError(401, { name: 'Custom Name', devCode: 20401 });
    } catch (e) {
        // { status: 401, name: 'Custom Name', message: 'The request requires user authentication.', devCode: 20401 }
    }
   
    // Alternative:
    try {
        throw new StatusError(401, 'Custom Name');
    } catch (e) {
        // { status: 401, name: 'Custom Name', message: 'The request requires user authentication.' }
    }
    
### StatusError(code, [name|options]

* `code`: an available status code.
* `name` (optional): a custom name.
* `options` (optional): a object that gets attached to the error.
    
## Options

All options are optional and get attached to the error object.

`name` and `message` have defaults. See below under "Available Errors".

    {
        name: 'Unauthorized',
        message: 'The request requires user authentication.',
        devCode: 20400,
        devMessage: 'Verbose message intended to developers and how to fix it.'
        devInfo: 'https://dev.example.com/errors/20400'
    }

* `name`: Short name. (Defaults see below.)
* `message`: Short message, describing the error. (Defaults see below.)
* `devCode`: Internal, system-specific error code.
* `devMessage`: Verbose message intended for the developer and how to fix it.
* `devInfo`: URL to a site with additional information.

Although you are free to define your own properties, above keys are recommended to keep error reporting consistent.

## Stack Trace

`StatusError` inherits from the generic `Error` constructor, so the stack trace is available as usual under `stack` but since it's non-enumerable, it will not be available through `JSON.stringify()` or when looped over the properties.
This keeps the stack trace hidden when sending the error response to the client, but available in case when needed for private error logging.

## Example Error

An error object should look as follows:

    {
        status: 401,
        name: 'Unauthorized',
        message: 'The request requires user authentication.',
        devCode: 20400,
        devMessage: 'Verbose message intended to developers and how to fix it.'
        devInfo: 'https://dev.example.com/errors/20400'
    }

`name` and `message` could theoretically be exposed to the end user.
`devCode`, `devMessage` and `devInfo` are intended for the developer using the API and should be as verbose as possible. They have no defaults because they are very application-specific and should be described where they occur.

## Available Errors

The default error names and messages follow closely what the RFC standard specifies for each status code, but deviate
slightly in order to make error names and messages clearer.
 
The currently available errors are listed below:

<table>
<tr>
    <th>Status</th>
    <th>Name</th>
    <th>Message</th>
</tr>
<tr>
    <td>400</td>
    <td>Bad Request</td>
    <td>The request could not be understood by the server due to malformed syntax.</td>
</tr>
<tr>
    <td>401</td>
    <td>Unauthorized</td>
    <td>The request requires user authentication.</td>
</tr>
<tr>
    <td>403</td>
    <td>Forbidden</td>
    <td>The server understood the request, but is refusing to fulfill it.</td>
</tr>
<tr>
    <td>404</td>
    <td>Not Found</td>
    <td>The server has not found anything matching the Request-URI.</td>
</tr>
<tr>
    <td>405</td>
    <td>Method Not Allowed</td>
    <td>The method specified in the Request-Line is not allowed for the resource.</td>
</tr>
<tr>
    <td>409</td>
    <td>Conflict</td>
    <td>The request could not be completed due to a conflict with the current state of the resource.</td>
</tr>
<tr>
    <td>500</td>
    <td>Internal Server Error</td>
    <td>The server encountered an unexpected condition which prevented it from fulfilling the request.</td>
</tr>
</table>

If a status code isn't available, the default name from [http.STATUS_CODES](http://nodejs.org/api/http.html#http_http_status_codes) is used instead and the message (if no message was explicitly defined) will be empty.
If a status code isn't available in STATUS_CODES either, both name and message will be empty.

## License

ISC