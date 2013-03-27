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

POST    /login 
GET     /me
GET     /me/settings
GET     /me/events
GET     /me/friends
GET     /me/services
GET     /me/shares

GET     /me/tasks
POST    /me/tasks
PUT     /me/<task_id>
DELETE  /me/<task_id>

GET     /me/tasks
POST    /me/tasks
PUT     /me/<task_id>
DELETE  /me/<task_id>

```

## License (MIT)

Copyright (c) 2012, Ruslan Khissamov.

**

### Author: [Ruslan Khissamov][0]

[0]: http://github.com/rushis/
