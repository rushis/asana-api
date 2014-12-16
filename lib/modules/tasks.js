// ****** TASKS ***********

var req = require('./serverRequests');

/**
 * Creating a new task
 * @class Asana
 * @method createTask
 * @apiRequest POST /tasks
 * @param {JSON} Data
 * @param {Function} callback Method to execute on completion
 */
this.createTask = function(ref, callback){
    return req.post('/tasks', JSON.stringify({data: ref}), callback);
};


this.deleteTask = function(taskid, callback) {
    return req.delete('/tasks/'+taskid, null, callback);
}

/**
 * Creating a new task in workspace
 * @class Asana
 * @method createWorkspaceTask
 * @apiRequest POST /workspaces/workspace-id/tasks
 * @param {String} Workspace ID
 * @param {JSON} Data
 * @param {Functon} callback Method to execute on completion
 */ 
this.createWorkspaceTask = function(workspace_id, ref, callback) {
  return req.post('/workspaces/' + workspace_id + '/tasks', JSON.stringify({data: ref}), callback);
};

/**
 * Updating an existing task
 * @class Asana
 * @method updateTask
 * @apiRequest PUT /tasks/task-id
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Function} callback Method to execute on completion
 */ 
this.updateTask = function(task_id, ref, callback){
  return req.put('/tasks/' + task_id, JSON.stringify({data: ref}), callback);
};

/**
 * Commenting on a task
 * @class Asana
 * @method addCommentTask
 * @apiRequest POST /tasks/task-id/stories
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Funciton} callback Method to execute on completion
 */
this.addCommentTask = function(task_id, ref, callback){
  return req.post('/tasks/' + task_id + '/stories', JSON.stringify({data: ref}), callback);
};

/**
 * Showing a single task with ID
 * @class Asana
 * @method getTask
 * @apiRequest GET /tasks/task-id
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Function} callback Method to execute on completion
 */
this.getTask = function(task_id, options, callback){
  return req.get('/tasks/' + task_id + req.getOptions(options), callback);
};

/**
 * Showing a all tasks in workspace for assignee
 * @class Asana
 * @method getTasks
 * @apiRequest GET /tasks
 * @param {String} Options pretty / fields / expand. Sure string 'workspace=id0&assignee=id' 
 * @param {Function} callback Method to execute on completion
 */
this.getTasks = function(options, callback){
  return req.get('/tasks' + req.getOptions(options), callback);
};

/**
 * Showing a all tasks in project
 * @class Asana
 * @method getTasksProject
 * @apiRequest GET /projects/project-id/tasks
 * @param {String} Project ID
 * @param {String} Options pretty / fields / expand 
 * @param {Function} callback Method to execute on completion
 */
this.getTasksProject = function(project_id, options, callback) {
  return req.get('/projects/' + project_id + '/tasks' + req.getOptions(options), callback);
};

/**
 * Showing a all tasks in workspace for assignee
 * @class Asana
 * @method getTasksWorkspace
 * @apiRequest GET /workspaces/workspace-id/tasks
 * @param {String} Workspace ID
 * @param {String} Options pretty / fields / expand. Sure string 'assignee=id' 
 * @param {Function} callback Method to execute on completion
 */
this.getTasksWorkspace = function(workspace_id, options, callback) {
  return req.get('/workspaces/' + workspace_id + '/tasks' + req.getOptions(options), callback);
};

/**
 * Reading task activity and comments
 * @class Asana
 * @method getTaskActivity
 * @apiRequest GET /tasks/task-id/stories
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Function} callback Method to execute on completion
 */
this.getTaskActivity = function(task_id, options, callback) {
  return req.get('/tasks/' + task_id + '/stories' + req.getOptions(options), callback);
};

/**
 * Get all the projects for task
 * @class Asana
 * @method getTaskProjects
 * @apiRequest GET /tasks/task-id/projects
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Function} callback Method to execute on completion
 */
this.getTaskProjects = function(task_id, options, callback) {
  return req.get('/tasks/' + task_id + '/projects' + req.getOptions(options), callback);
};

/**
 * Add project in task
 * @class Asana
 * @method addProject
 * @apiRequest POST /tasks/task-id/addProject
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Function} callback Method to execute on completion
 */
this.addProject = function(task_id, ref, callback) {
  return req.post('/tasks/' + task_id + '/addProject', JSON.stringify({data: ref}), callback);
};

/**
 * Remove project in task
 * @class Asana
 * @method removeProject
 * @apiRequest POST /tasks/task-id/removeProject
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Function} callback Method to execute on completion
 */ 
this.removeProject = function(task_id, ref, callback) {
  return req.post('/tasks/' + task_id + '/removeProject', JSON.stringify({data: ref}), callback);
};

/**
 * Add tag in task
 * @class Asana
 * @method addProject
 * @apiRequest POST /tasks/task-id/addTag
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Function} callback Method to execute on completion
 */
this.addTag = function(task_id, ref, callback){
  return req.post('/tasks/' + task_id + '/addTag', JSON.stringify({data: ref}), callback);
};

/**
 * Remove tag in task
 * @class Asana
 * @method removeProject
 * @apiRequest POST /tasks/task-id/removeTag
 * @param {String} Task ID
 * @param {JSON} Data
 * @param {Function} callback Method to execute on completion
 */ 
this.removeTag = function(task_id, ref, callback){
  return req.post('/tasks/' + task_id + '/removeTag', JSON.stringify({data: ref}), callback);
};

/**
 * Get all subtasks for a task
 * @class Asana
 * @method getTaskSubTasks
 * @apiRequest GET /tasks/task-id/subtasks
 * @param {String} Options pretty / fields / expand 
 * @param {Function} callback Method to execute on completion
 */
this.getTaskSubTasks = function(task_id, options, callback){
  return req.get('/tasks/' + task_id + '/subtasks' + req.getOptions(options), callback);
};

/**
 * Add a subtask to a task
 * @class Asana
 * @method getTaskSubTasks
 * @apiRequest PUT /tasks/parent-id/subtasks
 * @param {String} Parent ID
 * @param {JSON} Data
 * @param {Function} callback Method to execute on completion
 */
this.addSubTask = function(parent_id, ref, callback){
  return req.post('/tasks/' + parent_id + "/subtasks", JSON.stringify({data: ref}), callback);
};
