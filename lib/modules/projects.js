// ****** PROJECTS ***********

var req = require('./serverRequests');

/**
 * Creating a new project
 * @class Asana
 * @method createProject
 * @apiRequest POST /projects
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */
this.createProject = function(ref, callback){
    return req.post('/projects', JSON.stringify({data: ref}), callback);
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
this.createWorkspaceProject = function(workspace_id, ref, callback){
    return req.post('/workspaces/' + workspace_id + '/projects', JSON.stringify({data: ref}), callback);
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
this.getProject = function(project_id, options, callback){
    return req.get('/projects/' + project_id + req.getOptions(options), callback);
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
this.updateProject = function(project_id, ref, callback){
  return req.put('/projects/' + project_id, JSON.stringify({data: ref}), callback);
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
this.getProjectTasks = function(project_id, options, callback){
  return req.get('/projects/' + project_id + '/tasks' + req.getOptions(options), callback);
};

/**
 * Get all projects
 * @class Asana
 * @method getProjects
 * @apiRequest GET /projects
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
this.getProjects = function(options, callback){
  return req.get('/projects' + req.getOptions(options), callback);
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
this.getProjectsWorkspace = function(workspace_id, options, callback){
  return req.get('/workspaces/' + workspace_id + '/projects' + req.getOptions(options), callback);
};