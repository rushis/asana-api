// ****** USERS ***********

var req = require('./serverRequests');

/**
* Get info about me
* @class Asana
* @method getUserMe
* @apiRequest GET /users/me
* @param {String} Options pretty / fields / expand 
* @param {Functon} callback Method to execute on completion
*/
this.getUserMe = function(options, callback) {
    return req.get('/users/me' + req.getOptions(options), callback);
};

/**
* Get user information
* @class Asana
* @method getUser
* @apiRequest GET /users/user-id
* @param {String} User ID
* @param {String} Options pretty / fields / expand 
* @param {Functon} callback Method to execute on completion
*/
this.getUser = function(user_id, options, callback) {
    return req.get('/users/' + user_id + req.getOptions(options), callback);
};

/**
* Get all users information in all workspaces
* @class Asana
* @method getUsers
* @apiRequest GET /users
* @param {String} Options pretty / fields / expand 
* @param {Functon} callback Method to execute on completion
*/
this.getUsers = function(options, callback) {
    return req.get('/users' + req.getOptions(options), callback);
};

/**
* Get all users information in single workspace
* @class Asana
* @method getUsersWorkspace
* @apiRequest GET /workspaces/workspace-id/users
* @param {String} Workspace ID
* @param {String} Options pretty / fields / expand 
* @param {Functon} callback Method to execute on completion
*/
this.getUsersWorkspace = function(workspace_id, options, callback) {
    return req.get('/workspaces/' + workspace_id + '/users' + req.getOptions(options), callback);
};    