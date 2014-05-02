# Asana Api v. 1

> Node.JS Asana Api (v1) Wrapper

## Installation
```bash
git clone https://github.com/rushis/asana-api.git
```
## Usage 

``` js
  var asana = require('asana');
  
  asana.setApiKey('1NK9OUI.Qn0nrbByagb8fB2TGyOeziEN');
  
  asana.getUserMe(null, function(error, me){
    console.log(me)
  });
```

## API Coverage

### Implemented

``` scala

// =======================================================
// Users
// =======================================================
// Showing a single user
// .getUser
GET     /users/user-id   
// .getUserMe
GET     /users/me        
// Showing all users in all workspaces
// .getUsers
GET     /users                    
// Showing all users in a single workspace or organization
// .getUsersWorkspace
GET     /workspaces/workspace-id/users  

// =======================================================
// Tasks
// =======================================================
// Creating a new task
// .createTask
POST    /tasks
// .createWorkspaceTask
POST    /workspaces/workspace-id/tasks
// Showing a specific task
// .getTask
GET     /tasks/task-id
// Updating an existing task
// .updateTask
PUT     /tasks/task-id
// Deleting an existing task
// .deleteTask
DELETE  /tasks/task-id
// Quqeryng for tasks
// .getTasks
GET     /tasks
// .getTasksProject
GET     /projects/project-id/tasks
// .getTasksWorkspace
GET     /workspaces/workspace-id/tasks
// Working with subtasks
// .getTaskSubTasks 
GET     /tasks/task-id/subtasks
// .addSubTask
POST    /tasks/parent-id/subtasks
// .setParentSubtasks
POST    /tasks/task-id/setParent
// Reading task activity and comments
// .getTaskActivity
GET     /tasks/task-id/stories
// Commenting on a task
// .addCommentTask
POST    /tasks/task-id/stories
/**
  * Working with projects associated with a task 
  * and reordering withim a project
  */
// .getTaskProjects
GET     /tasks/task-id/projects
// .addProject
POST    /tasks/task-id/addProject
// .removeProject
POST    /tasks/task-id/removeProject
// Working with tags on a task
//
GET     /tasks/task-id/tags
// .addTag
POST    /tasks/task-id/addTag
// .removeTag
POST    /tasks/task-id/removeTag
// Working with followers on a task
POST    /tasks/task-id/addFollowers
POST    /tasks/task-id/removeFollowers
// =======================================================
// Projects 
// =======================================================
// Creating a new project
// .createProject 
POST    /projects
// .createWorkspaceProject
POST    /workspaces/workspace-id/projects
// Showing a single project
// .getProject
GET     /projects/project-id
// Updating a project
// .updateProject
PUT     /projects/project-id
// Deleting a project
DELETE  /projects/project-id
// Querying for tasks in a project
// .getProjectTasks
GET     /projects/project-id/tasks
// Querying for projects
// .getProjects
GET     /projects
// .getProjectsWorkspace
GET     /workspaces/workspace-id/projects

// =======================================================
// Tags
// =======================================================
// Creating a new tag
POST    /tags
POST    /workspaces/workspace-id/tags
// SHOWING A SINGLE TAG
GET     /tags/tag-id
// UPDATING A TAG
PUT     /tags/tag-id
// QUERYING FOR TASKS WITH A TAG
GET     /tags/tag-id/tasks
// QUERYING FOR TAGS
GET     /tags
GET     /workspaces/workspace-id/tags
// ======================================================
// Stories
// ======================================================
// SHOWING A SINGLE STORY
GET     /stories/story-id
GET     /projects/project-id/stories
POST    /projects/project-id/stories
// ======================================================
// Workspaces and Organizations
// ======================================================
// SHOWING AVAILABLE WORKSPACES
GET     /workspaces
// UPDATING AN EXISTING WORKSPACE
PUT      /workspaces/workspace-id
// ======================================================
// Teams
// ======================================================
// SHOW ALL TEAMS YOU'RE A MEMBER OF IN AN ORGANIZATION
GET     /organizations/organization-id/teams
// ======================================================
// Attachments
// ======================================================
// SHOWING A SINGLE ATTACHMENT
GET     /attachments/attachment-id
// SHOWING ALL ATTACHMENTS ON A TASK
GET     /tasks/task-id/attachments
// UPLOADING AN ATTACHMENT TO A TASK
POST    /tasks/task-id/attachments

```

## License (MIT)

Copyright (c) 2012, Ruslan Khissamov.

**

### Author: [Ruslan Khissamov][0]

[0]: http://github.com/rushis/
