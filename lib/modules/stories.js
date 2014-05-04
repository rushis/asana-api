// ****** STORIES ***********

var req = require('./serverRequests');

/**
 * Get all stories in task
 * @class Asana
 * @method getStoriesTask
 * @apiRequest GET /tasks/task-id/stories
 * @param {String} Task ID
 * @param {String} Options pretty / fields / expand 
 * @param {Functon} callback Method to execute on completion
 */
this.getStoriesTask = function(task_id, options, callback) {
  return req.get('/tasks/' + task_id + '/stories' + req.getOptions(options), callback);
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
this.getStoriesProject = function(project_id, options, callback) {
  return req.get('/projects/' + project_id + '/stories' + req.getOptions(options), callback);
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
this.getStory = function(story_id, options, callback) {
  return req.get('/stories/' + story_id + req.getOptions(options), callback);
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
this.addCommentProject = function(project_id, ref, callback){
  return req.post('/projects/' + project_id + '/stories', JSON.stringify({data: ref}), callback);
};