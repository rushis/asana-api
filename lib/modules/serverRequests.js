var request   = require('request');
var noOp = function() {};

/**
* Builds and executes a asana api call
* @class asana
* @private _request
* @param {Object} options or just API URI Path for GET requests
* @param {Function} callback Function to call upon error or success
* @returns {Object} error, {Object} data
*/
this.request = function (options, callback) {
    var base = 'https://app.asana.com/api/1.0';
    callback = callback || noOp;
    if (typeof(options) != "string") {
        options.uri = base + options.uri;
    }
    if (global.ASANA_API_KEY) {
        options.headers.authorization = global.ASANA_API_KEY;
    }
    return request(options, function(error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            switch(response.statusCode) {
                case 404:
                    callback(new Error('Path not found'), null);
                    break;
                    
                case 422:
                    callback(new Error(response.body.message), null);
                    break;
                    
                default:
                    try {
                        var data = JSON.parse(body);
                        callback(null, data);
                    } catch (error2) {
                        callback(error2, null);
                    }
            }
        }
    });
}

/**
* Performs a GET
* @class Asana
* @private _get
* @param {String} path API endpoint
* @param {Functon} callback Method to execute on completion
*/    
this.get = function(path, callback) {
    return this.request({
        uri: path,
        headers: {
            'content-type':'application/json'
        }
    }, callback);
}

/**
* Performs a PUT
* @class Asana
* @private _put
* @param {String} path API endpoint
* @param {Object} body Data
* @param {Functon} callback Method to execute on completion
*/    
this.put = function(path, body, callback) {
    body = body || '{}';
    return this.request({
        uri:path,
        method:"PUT",
        headers: {
            'content-type':'application/json',
            "Content-Length":body.length
        },
        body:body
    },
    callback);
};

/**
* Performs a POST
* @class Asana
* @private _post
* @param {String} path API endpoint
* @param {Object} body Data
* @param {Functon} callback Method to execute on completion
*/    
this.post = function(path, body, callback) {
    body = body || '{}';
    return this.request({
        uri:path,
        method:"POST",
        headers: {
            'content-type':'application/json',
            "Content-Length":body.length
        },
        body:body
    },
    callback);
};

/**
* Performs a DELETE
* @class Asana
* @private _post
* @param {String} path API endpoint
* @param {Object} body Data
* @param {Functon} callback Method to execute on completion
*/    
this.delete = function(path, body, callback) {
    body = body || '{}';
    return this.request({
        uri:path,
        method:"DELETE",
        headers: {
            'content-type':'application/json'
        },
        body:body
    },
    callback);
};

/**
* Check the options parameter
* @class Asana
* @private _getOptions
* @param {String} Options pretty / fields / expand 
*/
this.getOptions = function(options) {
    if(options != null) {
        return '?' + options;
    } else {
        return '';
    }
};