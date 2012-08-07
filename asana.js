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

module.exports = (function(){
  var asana = createInstance();
  asana.createInstance = createInstance;
  return asana;
})();

Asana.prototype.setApiKey = function(api_key) {
  this.api_key = 'Basic ' + base64.encode([api_key, ''].join(':'));
};

Asana.prototype._request = function (options, callback) {
  var base = 'https://app.asana.com/api/1.0';
  callback = callback || noOp;
  if (typeof(options) != "string") {
    options.uri = base + options.uri;
  }
  if (this.api_key) {
    options.headers.authorization = this.api_key;
  }
  //console.log(options)
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

Asana.prototype._get = function(path, callback) {
  return this._request({
    uri: path,
    headers: {
      'content-type':'application/json'
    }
  }, callback);
};

Asana.prototype._put = function(path, body, callback) {
  body = body || '{}';
  return this._request({
    uri:path,
    method:"PUT",
    headers: {
      "Content-Length":body.length
    },
    body:body
  },
  callback);
};

Asana.prototype._post = function(path, body, callback) {
  body = body || '{}';
  return this._request({
    uri:path,
    method:"POST",
    headers: {
      "Content-Length":body.length
    },
    body:body
  },
  callback);
};

Asana.prototype._getOptions = function(options){
  if(options != null) {
    return '?' + options
  } else {
    return ''
  }
}
// ----- Users --------------------------------------------------------------------------------------------------------
// 
// GET    /users/me
/**
 * Retrieve SHOWING A SINGLE USER
 * @class asana
 * @method 
 * @param {String} or {null}
 * @param {Functon} callback Method to execute on completion
 */
Asana.prototype.getUserMe = function(options, callback){
  return this._get('/users/me' + this._getOptions(options), callback);
};
// GET    /users/user-id
Asana.prototype.getUser = function(user_id, options, callback){
  return this._get('/users/' + user_id + this._getOptions(options), callback);
};
// SHOWING ALL USERS IN ALL WORKSPACES
// GET    /users
Asana.prototype.getUsers = function(options, callback){
  return this._get('/users' + this._getOptions(options), callback);
};
// SHOWING ALL USERS IN A SINGLE WORKSPACE
// GET    /workspaces/workspace-id/users
Asana.prototype.getUsersWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/users' + this._getOptions(options), callback);
};

// ----- Tasks --------------------------------------------------------------------------------------------------------
// CREATING A NEW TASK
// POST    /tasks
Asana.prototype.createTask = function(ref, callback){
  return this._post('/tasks', JSON.stringify({data: ref}), callback);
};
// POST    /workspaces/workspace-id/tasks
Asana.prototype.createWorkspaceTask = function(workspace_id, ref, callback){
  return this._post('/workspaces/' + workspace_id + '/tasks', JSON.stringify({data: ref}), callback);
};
// UPDATING AN EXISTING TASK
// PUT    /tasks/task-id
Asana.prototype.updateTask = function(task_id, ref, callback){
  return this._put('/tasks/' + task_id, JSON.stringify({data: ref}), callback);
};
// COMMENTING ON A TASK
// POST    /tasks/task-id/stories
Asana.prototype.addComment = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/stories', JSON.stringify({data: ref}), callback);
};
// SHOWING A SPECIFIC TASK
// GET    /tasks/task-id
Asana.prototype.getTask = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + this._getOptions(options), callback);
};
// GET    /tasks
Asana.prototype.getTasks = function(options, callback){
  return this._get('/tasks' + this._getOptions(options), callback);
};
// GET    /projects/project-id/tasks
Asana.prototype.getTasksProject = function(project_id, options, callback){
  return this._get('/projects/' + project_id + '/tasks' + this._getOptions(options), callback);
};
// GET    /workspaces/workspace-id/tasks
Asana.prototype.getTasksWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/tasks' + this._getOptions(options), callback);
};
// READING TASK ACTIVITY AND COMMENTS
// GET    /tasks/task-id/stories
Asana.prototype.getTaskActivity = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + '/stories' + this._getOptions(options), callback);
};
// WORKING WITH PROJECTS ASSOCIATED WITH A TASK
// GET    /tasks/task-id/projects
Asana.prototype.getTaskProjects = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + '/projects' + this._getOptions(options), callback);
};
// POST    /tasks/task-id/addProject
Asana.prototype.addProject = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/addProject', JSON.stringify({data: ref}), callback);
};
// POST    /tasks/task-id/removeProject
Asana.prototype.removeProject = function(task_id, ref, callback){
  return this._post('/tasks/' + task_id + '/removeProject', JSON.stringify({data: ref}), callback);
};
// ----- Projects ------------------------------------------------------------------------------------------------------
// CREATING A NEW PROJECT
// POST    /projects
Asana.prototype.createProject = function(ref, callback){
  return this._post('/projects', JSON.stringify({data: ref}), callback);
};
// POST    /workspaces/workspace-id/projects
Asana.prototype.createWorkspaceProject = function(workspace_id, ref, callback){
  return this._post('/workspaces/' + workspace_id + '/projects', JSON.stringify({data: ref}), callback);
};
// SHOWING A SINGLE PROJECT
// GET    /projects/project-id
Asana.prototype.getProject = function(project_id, options, callback){
  return this._get('/projects/' + project_id + this._getOptions(options), callback);
};

// UPDATING A PROJECT
// PUT    /projects/project-id
Asana.prototype.updateProject = function(project_id, ref, callback){
  return this._put('/projects/' + project_id, JSON.stringify({data: ref}), callback);
};

// QUERYING FOR TASKS IN A PROJECT
// GET    /projects/project-id/tasks
Asana.prototype.getProjectTasks = function(project_id, options, callback){
  return this._get('/projects/' + project_id + '/tasks' + this._getOptions(options), callback);
};
// QUERYING FOR PROJECTS
// GET    /projects
Asana.prototype.getProjects = function(options, callback){
  return this._get('/projects' + this._getOptions(options), callback);
};
// GET    /workspaces/workspace-id/projects
Asana.prototype.getProjectsWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/projects' + this._getOptions(options), callback);
};
// ----- Tags --------------------------------------------------------------------------------------------------------
// CREATING A NEW TAG
// POST    /tags
Asana.prototype.createTag = function(ref, callback){
  return this._put('/tags', JSON.stringify({data: ref}), callback);
};
// POST    /workspaces/workspace-id/tags
Asana.prototype.createTagWorkspace = function(project_id, ref, callback){
  return this._put('/projects/' + project_id, JSON.stringify({data: ref}), callback);
};
// SHOWING A SINGLE TAG
// GET    /tags/tag-id
Asana.prototype.getTag = function(tag_id, options, callback){
  return this._get('/tags/' + tag_id + this._getOptions(options), callback);
};
// UPDATING A TAG
// PUT    /tags/tag-id
Asana.prototype.updateTag = function(tag_id, ref, callback){
  return this._put('/tags/' + tag_id, JSON.stringify({data: ref}), callback);
};
// QUERYING FOR TASKS WITH A TAG
// GET    /tags/tag-id/tasks
Asana.prototype.getTagTasks = function(tag_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/projects' + this._getOptions(options), callback);
};
// QUERYING FOR TAGS
// GET    /tags
Asana.prototype.getTags = function(options, callback){
  return this._get('/tags/' + this._getOptions(options), callback);
};
// GET    /workspaces/workspace-id/tags
Asana.prototype.getTagsWorkspace = function(workspace_id, options, callback){
  return this._get('/workspaces/' + workspace_id + '/tags' + this._getOptions(options), callback);
};

// ----- Stories ------
// QUERYING FOR ALL STORIES ON AN OBJECT
// GET    /tasks/task-id/stories
Asana.prototype.getStoriesTask = function(task_id, options, callback){
  return this._get('/tasks/' + task_id + '/stories' + this._getOptions(options), callback);
};
// GET    /projects/project-id/stories
Asana.prototype.getStoriesProject = function(project_id, options, callback){
  return this._get('/projects/' + project_id + '/stories' + this._getOptions(options), callback);
};
// SHOWING A SINGLE STORY
// GET    /stories/story-id
Asana.prototype.getStory = function(story_id, options, callback){
  return this._get('/stories/' + story_id + this._getOptions(options), callback);
};
// OBJECT
// POST    /projects/project-id/stories
Asana.prototype.addComment = function(project_id, ref, callback){
  return this._post('/projects/' + project_id + '/stories', JSON.stringify({data: ref}), callback);
};
// ----- Workspaces -----
// SHOWING AVAILABLE WORKSPACES
// GET    /workspaces
Asana.prototype.getWorkspaces = function(options, callback){
  return this._get('/workspaces' + this._getOptions(options), callback);
};

// UPDATING AN EXISTING WORKSPACE
// PUT    /workspaces/workspace-id
Asana.prototype.updateWorkspace = function(workspace_id, ref, callback){
  return this._put('/workspaces/' + workspace_id, JSON.stringify({data: ref}), callback);
};