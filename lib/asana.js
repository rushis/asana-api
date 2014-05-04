/**
 * NodeJS Asana API (v1)
 * @author Ruslan Khissamov
 * @class asana
 */

var Asana = function(opts){
  opts                    = opts            || {};
  global.ASANA_API_KEY    = opts.api_key    || '';
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
  global.ASANA_API_KEY = 'Basic ' + new Buffer([api_key, ''].join(':')).toString('base64');
};


// ****** USERS ***********
var users = require('./modules/users');
Asana.prototype.getUserMe = users.getUserMe;
Asana.prototype.getUser = users.getUser;
Asana.prototype.getUsers = users.getUsers;
Asana.prototype.getWorkspace = users.getUsersWorkspace;

// ****** TASKS ***********
var tasks = require('./modules/tasks');
Asana.prototype.createTask = tasks.createTask;
Asana.prototype.deleteTask = tasks.deleteTask;
Asana.prototype.createWorkspaceTask = tasks.createWorkspaceTask;
Asana.prototype.updateTask = tasks.updateTask;
Asana.prototype.addCommentTask = tasks.addCommentTask;
Asana.prototype.getTask = tasks.getTask;
Asana.prototype.getTasks = tasks.getTasks;
Asana.prototype.getTasksProject = tasks.getTasksProject;
Asana.prototype.getTasksWorkspace = tasks.getTasksWorkspace;
Asana.prototype.getTaskActivity = tasks.getTaskActivity;
Asana.prototype.getTaskProjects = tasks.getTaskProjects;
Asana.prototype.addProject = tasks.addProject;
Asana.prototype.removeProject = tasks.removeProject;
Asana.prototype.addTag = tasks.addTag;
Asana.prototype.removeTag = tasks.removeTag;
Asana.prototype.getTaskSubTasks = tasks.getTaskSubTasks;
Asana.prototype.addSubTask = tasks.addSubTask;

// ****** PROJECTS ***********
var projects = require('./modules/projects');
Asana.prototype.createProject = projects.createProject;
Asana.prototype.createWorkspaceProject = projects.createWorkspaceProject;
Asana.prototype.getProject = projects.getProject;
Asana.prototype.updateProject = projects.updateProject;
Asana.prototype.getProjectTasks = projects.getProjectTasks;
Asana.prototype.getProjects = projects.getProjects;
Asana.prototype.getProjectsWorkspace = projects.getProjectsWorkspace

// ****** TAGS ***********
var tags = require('./modules/tags');
Asana.prototype.createTag = tags.createTag;
Asana.prototype.createTagWorkspace = tags.createTagWorkspace;
Asana.prototype.getTag = tags.getTag;
Asana.prototype.updateTag = tags.updateTag;
Asana.prototype.getTagTasks = tags.getTagTasks;
Asana.prototype.getTags = tags.getTags;
Asana.prototype.getTagsWorkspace = tags.getTagsWorkspace;

// ****** STORIES ***********
var stories = require('./modules/stories');
Asana.prototype.getStoriesTask = stories.getStoriesTask;
Asana.prototype.getStoriesProject = stories.getStoriesProject;
Asana.prototype.getStory = stories.getStory;
Asana.prototype.addCommentProject = stories.addCommentProject;

// ****** WORKSPACES ***********
var workspaces = require('./modules/workspaces');
Asana.prototype.getWorkspaces = workspaces.getWorkspaces;
Asana.prototype.updateWorkspace = workspaces.updateWorkspace;


