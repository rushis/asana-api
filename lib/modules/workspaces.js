// ****** WORKSPACES ***********

var req = require('./serverRequests');

/**
 * Get all workspaces
 * @class Asana
 * @method getWorkspaces
 * @apiRequest GET /workspaces
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
this.getWorkspaces = function(options, callback){
  return req.get('/workspaces' + req.getOptions(options), callback);
};

/**
 * Updatting workspace
 * @class Asana
 * @method updateWorkspace
 * @apiRequest PUT /workspaces/workspace-id
 * @param {String} Workspace ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
this.updateWorkspace = function(workspace_id, ref, callback){
  return req.put('/workspaces/' + workspace_id, JSON.stringify({data: ref}), callback);
};