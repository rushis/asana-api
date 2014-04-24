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
GET   /users/user-id 
GET   /users/me
GET   /users
GET   /workspaces/workspace-id/users

POST  /tasks
POST  /workspaces/workspace-id/tasks
GET   /tasks/task-id
PUT   /tasks/task-id
DELETE /tasks/task-id - deleteTask(taskid, callback)
GET   /tasks
GET   /projects/project-id/tasks
GET   /workspaces/workspace-id/tasks
GET   /tasks/task-id/stories
POST  /tasks/task-id/stories
GET   /tasks/task-id/projects
POST  /tasks/task-id/addProject
POST  /tasks/task-id/removeProject
GET   /tasks/task-id/tags
POST  /tasks/task-id/addTag
POST  /tasks/task-id/removeTag

POST  /projects
POST  /workspaces/workspace-id/projects
GET   /projects/project-id
PUT   /projects/project-id
GET   /projects/project-id/tasks
GET   /projects
GET   /workspaces/workspace-id/projects

POST  /tags
POST  /workspaces/workspace-id/tags
GET   /tags/tag-id
PUT   /tags/tag-id
GET   /tags/tag-id/tasks
GET   /tags
GET   /workspaces/workspace-id/tags

GET   /projects/project-id/stories
GET   /stories/story-id
POST  /projects/project-id/stories

GET    /workspaces
PUT    /workspaces/workspace-id
```

## License (MIT)

Copyright (c) 2012, Ruslan Khissamov.

**

### Author: [Ruslan Khissamov][0]

[0]: http://github.com/rushis/
