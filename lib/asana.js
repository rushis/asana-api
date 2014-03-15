/**
 * NodeJS Asana API (v1)
 * @author Ruslan Khissamov
 * @class asana
 */

var request   = require('request')
    , utile   = require('utile')
    , base64  = utile.base64; 

var noOp = function(){};

var Asana = function(opts){
  opts                    = opts            || {};
  this.api_key            = opts.api_key    || '';
  this.version_api        = '1'
};

var createInstance = function(opts){
  return new Asana(opts);
};

/* For the sake of backwards compatibility I've made this method return an instance.
 * This particular instance has a createInstance factory method that can create other instances of the Asana class. 
 * In a future version this should be updated to:
 *    module.exports = createInstance; 
 * Set module.exports to the createInstance function
 */
module.exports = (function(){
  var asana = createInstance();
  asana.createInstance = createInstance;
  return asana;
})();

/**
 * Sets Access for Asana access.
 * @class Asana
 * @method setApiKey
 * @param {api_key}
*/
Asana.prototype.setApiKey = function(api_key) {
  this.api_key = 'Basic ' + base64.encode([api_key, ''].join(':'));
};

/**
 * Builds and executes a asana api call
 * @class asana
 * @private _request
 * @param {Object} options or just API URI Path for GET requests
 * @param {Function} callback Function to call upon error or success
 * @returns {Object} error, {Object} data
*/

Asana.prototype._request = function (options, callback) {
  var base = 'https://app.asana.com/api/1.0';
  callback = callback || noOp;
  if (typeof(options) != "string") {
    options.uri = base + options.uri;
  }
  if (this.api_key) {
    options.headers.authorization = this.api_key;
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
};

/**
 * Performs a GET
 * @class Asana
 * @private _get
 * @param {String} path API endpoint
 * @param {Functon} callback Method to execute on completion
 */

Asana.prototype._get = function(path, callback) {
  return this._request({
    uri: path,
    headers: {
      'content-type':'application/json'
    }
  }, callback);
};

/**
 * Performs a PUT
 * @class Asana
 * @private _put
 * @param {String} path API endpoint
 * @param {Object} body Data
 * @param {Functon} callback Method to execute on completion
 */

Asana.prototype._put = function(path, body, callback) {
  body = body || '{}';
  return this._request({
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

Asana.prototype._post = function(path, body, callback) {
  body = body || '{}';
  return this._request({
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
 * Check the options parameter
 * @class Asana
 * @private _getOptions
 * @param {String} Options pretty / fields / expand 
 */

Asana.prototype._getOptions = function(options){
  if(options != null) {
    return '?' + options
  } else {
    return ''
  }
}

// ****** USERS ***********
/**
 * Get info about me
 * @class Asana
 * @method getUserMe
 * @apiRequest GET /users/me
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getUserMe = function(options, callback){
  return this._get('/users/me' + this._getOptions(options), callback);
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
Asana.prototype.getUser = function(user_id, options, callback){
  return this._get('/users/' + user_id + this._getOptions(options), callback);
};

/**
 * Get all users information in all workspaces
 * @class Asana
 * @method getUsers
 * @apiRequest GET /users
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getUsers = function(options, callback){
  return this._get('/users' + this._getOptions(options), callback);
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
Asana.prototype.getUsersWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/users' + this._getOptions(options), callback);
};

// ****** TASKS ***********
/**
 * Creating a new task
 * @class Asana
 * @method createTask
 * @apiRequest POST /tasks
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.createTask = function(ref, callback){
  return this._post('/tasks', JSON.stringify({data: ref}), callback);
};

/**
 * Creating a new task in workspace
 * @class Asana
 * @method createWorkspaceTask
 * @apiRequest POST /workspaces/workspace-id/tasks
 * @param {String} Workspace ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */ 
Asana.prototype.createWorkspaceTask = function(workspace_id, ref, callback){
  return this._post('/workspaces/' + workspace_id + '/tasks', JSON.stringify({data: ref}), callback);
};

/**
 * Updating an existing task
 * @class Asana
 * @method updateTask
 * @apiRequest PUT /tasks/task-id
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */ 
Asana.prototype.updateTask = function(task_id, ref, callback){
  return this._put('/tasks/' + task_id, JSON.stringify({data: ref}), callback);
};

/**
 * Commenting on a task
 * @class Asana
 * @method addCommentTask
 * @apiRequest POST /tasks/task-id/stories
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.addCommentTask = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/stories', JSON.stringify({data: ref}), callback);
};

/**
 * Showing a single task with ID
 * @class Asana
 * @method getTask
 * @apiRequest GET /tasks/task-id
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTask = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + this._getOptions(options), callback);
};

/**
 * Showing a all tasks in workspace for assignee
 * @class Asana
 * @method getTasks
 * @apiRequest GET /tasks
 * @param {String} Options pretty / fields / expand. Sure string 'workspace=id0&assignee=id' 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTasks = function(options, callback){
  return this._get('/tasks' + this._getOptions(options), callback);
};

/**
 * Showing a all tasks in project
 * @class Asana
 * @method getTasksProject
 * @apiRequest GET /projects/project-id/tasks
 * @param {String} Project ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTasksProject = function(project_id, options, callback){
  return this._get('/projects/' + project_id + '/tasks' + this._getOptions(options), callback);
};

/**
 * Showing a all tasks in workspace for assignee
 * @class Asana
 * @method getTasksWorkspace
 * @apiRequest GET /workspaces/workspace-id/tasks
 * @param {String} Workspace ID
 * @param {String} Options pretty / fields / expand. Sure string 'assignee=id' 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTasksWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/tasks' + this._getOptions(options), callback);
};

/**
 * Reading task activity and comments
 * @class Asana
 * @method getTaskActivity
 * @apiRequest GET /tasks/task-id/stories
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTaskActivity = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + '/stories' + this._getOptions(options), callback);
};

/**
 * Get all the projects for task
 * @class Asana
 * @method getTaskProjects
 * @apiRequest GET /tasks/task-id/projects
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTaskProjects = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + '/projects' + this._getOptions(options), callback);
};

/**
 * Add project in task
 * @class Asana
 * @method addProject
 * @apiRequest POST /tasks/task-id/addProject
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.addProject = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/addProject', JSON.stringify({data: ref}), callback);
};

/**
 * Remove project in task
 * @class Asana
 * @method removeProject
 * @apiRequest POST /tasks/task-id/removeProject
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */ 
Asana.prototype.removeProject = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/removeProject', JSON.stringify({data: ref}), callback);
};

/**
 * Add tag in task
 * @class Asana
 * @method addProject
 * @apiRequest POST /tasks/task-id/addTag
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.addTag = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/addTag', JSON.stringify({data: ref}), callback);
};

/**
 * Remove tag in task
 * @class Asana
 * @method removeProject
 * @apiRequest POST /tasks/task-id/removeTag
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */ 
Asana.prototype.removeTag = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/removeTag', JSON.stringify({data: ref}), callback);
};

/**
 * Get info about me
 * @class Asana
 * @method getTaskSubTasks
 * @apiRequest GET /tasks/task-id/subtasks
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTaskSubTasks = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + '/subtasks' + this._getOptions(options), callback);
};

/**
 * Add a subtask to a task
 * @class Asana
 * @method getTaskSubTasks
 * @apiRequest PUT /tasks/parent-id/subtasks
 * @param {String} Parent ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.addSubTask = function(parent_id, ref, callback){
  return this._post('/tasks/' + parent_id + "/subtasks", JSON.stringify({data: ref}), callback);
};

// ****** PROJECTS ***********
/**
 * Creating a new project
 * @class Asana
 * @method createProject
 * @apiRequest POST /projects
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.createProject = function(ref, callback){
  return this._post('/projects', JSON.stringify({data: ref}), callback);
};

/**
 * Creating a new project in workspace
 * @class Asana
 * @method createWorkspaceProject
 * @apiRequest POST /workspaces/workspace-id/projects
 * @param {String} Workspace ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.createWorkspaceProject = function(workspace_id, ref, callback){
  return this._post('/workspaces/' + workspace_id + '/projects', JSON.stringify({data: ref}), callback);
};

/**
 * Showing a single project with ID
 * @class Asana
 * @method getProject
 * @apiRequest GET /projects/project-id
 * @param {String} Project ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getProject = function(project_id, options, callback){
  return this._get('/projects/' + project_id + this._getOptions(options), callback);
};

/**
 * Updating a project
 * @class Asana
 * @method updateProject
 * @apiRequest PUT /projects/project-id
 * @param {String} Project ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.updateProject = function(project_id, ref, callback){
  return this._put('/projects/' + project_id, JSON.stringify({data: ref}), callback);
};

/**
 * Get all tasks for project
 * @class Asana
 * @method getProjectTasks
 * @apiRequest GET /projects/project-id/tasks
 * @param {String} Project ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getProjectTasks = function(project_id, options, callback){
  return this._get('/projects/' + project_id + '/tasks' + this._getOptions(options), callback);
};

/**
 * Get all projects
 * @class Asana
 * @method getProjects
 * @apiRequest GET /projects
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getProjects = function(options, callback){
  return this._get('/projects' + this._getOptions(options), callback);
};

/**
 * Get all projects in workspace
 * @class Asana
 * @method getProjectsWorkspace
 * @apiRequest GET /workspaces/workspace-id/projects
 * @param {String} Workspace ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getProjectsWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/projects' + this._getOptions(options), callback);
};

// ****** TAGS ***********
/**
 * Creating a new tag
 * @class Asana
 * @method createTag
 * @apiRequest POST /tags
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.createTag = function(ref, callback){
  return this._post('/tags', JSON.stringify({data: ref}), callback);
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
Asana.prototype.createTagWorkspace = function(ref, callback){
 return this._post('/tags', JSON.stringify({data: ref}), callback);
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
Asana.prototype.getTag = function(tag_id, options, callback){
  return this._get('/tags/' + tag_id + this._getOptions(options), callback);
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
Asana.prototype.updateTag = function(tag_id, ref, callback){
  return this._put('/tags/' + tag_id, JSON.stringify({data: ref}), callback);
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
Asana.prototype.getTagTasks = function(tag_id, options, callback){
  return this._get('/tags/' + tag_id + '/tasks' + this._getOptions(options), callback);
};

/**
 * Get all tags
 * @class Asana
 * @method getTags
 * @apiRequest GET /tags
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getTags = function(options, callback){
  return this._get('/tags/' + this._getOptions(options), callback);
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
Asana.prototype.getTagsWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/tags' + this._getOptions(options), callback);
};

// ****** STORIES ***********
/**
 * Get all stories in task
 * @class Asana
 * @method getStoriesTask
 * @apiRequest GET /tasks/task-id/stories
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getStoriesTask = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + '/stories' + this._getOptions(options), callback);
};

/**
 * Get all stories in project
 * @class Asana
 * @method getStoriesProject
 * @apiRequest GET /projects/project-id/stories
 * @param {String} Project ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getStoriesProject = function(project_id, options, callback){
  return this._get('/projects/' + project_id + '/stories' + this._getOptions(options), callback);
};

/**
 * Get story by ID
 * @class Asana
 * @method getStory
 * @apiRequest GET /stories/story-id
 * @param {String} Story ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getStory = function(story_id, options, callback){
  return this._get('/stories/' + story_id + this._getOptions(options), callback);
};

/**
 * Commenting on a project
 * @class Asana
 * @method addCommentProject
 * @apiRequest POST /projects/project-id/stories
 * @param {String} Project ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.addCommentProject = function(project_id, ref, callback){
  return this._post('/projects/' + project_id + '/stories', JSON.stringify({data: ref}), callback);
};

// ****** WORKSPACES ***********
/**
 * Get all workspaces
 * @class Asana
 * @method getWorkspaces
 * @apiRequest GET /workspaces
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getWorkspaces = function(options, callback){
  return this._get('/workspaces' + this._getOptions(options), callback);
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
Asana.prototype.updateWorkspace = function(workspace_id, ref, callback){
  return this._put('/workspaces/' + workspace_id, JSON.stringify({data: ref}), callback);
};