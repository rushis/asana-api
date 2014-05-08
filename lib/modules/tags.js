// ****** TAGS ***********

var req = require('./serverRequests');

/**
 * Creating a new tag
 * @class Asana
 * @method createTag
 * @apiRequest POST /tags
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
this.createTag = function(ref, callback) {
  return req.post('/tags', JSON.stringify({data: ref}), callback);
};

/**
 * Creating a new tag in project
 * @class Asana
 * @method createTagWorkspace
 * @apiRequest POST /workspaces/workspace-id/tags
 * @param {String} Project ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
this.createTagWorkspace = function(ref, callback) {
 return req.post('/tags', JSON.stringify({data: ref}), callback);
};

/**
 * Get tag by ID
 * @class Asana
 * @method getTag
 * @apiRequest GET /tags/tag-id
 * @param {String} Tag ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
this.getTag = function(tag_id, options, callback) {
  return req.get('/tags/' + tag_id + req.getOptions(options), callback);
};

/**
 * Updatting a tag
 * @class Asana
 * @method updateTag
 * @apiRequest PUT /tags/tag-id
 * @param {String} Tag ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
this.updateTag = function(tag_id, ref, callback){
  return req.put('/tags/' + tag_id, JSON.stringify({data: ref}), callback);
};

/**
 * Get all tasks in tag
 * @class Asana
 * @method getTagTasks
 * @apiRequest GET /tags/tag-id/tasks
 * @param {String} Tag ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
this.getTagTasks = function(tag_id, options, callback){
  return req.get('/tags/' + tag_id + '/tasks' + req.getOptions(options), callback);
};

/**
 * Get all tags
 * @class Asana
 * @method getTags
 * @apiRequest GET /tags
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
this.getTags = function(options, callback){
  return req.get('/tags/' + req.getOptions(options), callback);
};

/**
 * Get all tags in workspace
 * @class Asana
 * @method getTagsWorkspace
 * @apiRequest GET  /workspaces/workspace-id/tags
 * @param {String} Workspace ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
this.getTagsWorkspace = function(workspace_id, options, callback){
  return req.get('/workspaces/' + workspace_id + '/tags' + req.getOptions(options), callback);
};
