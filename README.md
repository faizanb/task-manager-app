# task-manager-app
Task Manager Application

## Project Layout
    .
    ├── libs                   # Folder containing all the utils libs
    │   ├── dataOps.js              # Handles sort, filter and priority fetch logic
    │   ├── files.js                # Handles file operations
    │   └── validator.js            # Handles validation on the request data
    ├── index.js               # Entry file
    ├── routes.js              # Defines all the top level routes
    ├── tasksData.json         # In memory storage file
    ├── package.json           
    └── README.md

## To Get Started

```bash
npm install
npm run start
```

Application will start running on `localhost` port `3000` <br />

## CRUD Operations

### GET APIs

API Endpoints
  * To retrieve all tasks from `tasksData.json` [http://localhost:3000/tasks](http://localhost:3000/tasks)
  * To retrieve a specific task based on Id [http://localhost:3000/tasks/:id] eg: [http://localhost:3000/tasks/351j18bfwlja9jptu](http://localhost:3000/tasks/351j18bfwlja9jptu)
  * To sort tasks based on timestamp [http://localhost:3000/tasks?sortByTime=true&sortOrder=0](http://localhost:3000/tasks?sortByTime=true&sortOrder=0) <br />
    `sortOrder` can be `0` (for ascending) and `1` (for descending)
  * To filter on task completion status [http://localhost:3000/tasks?filterCompleted=true&completionStatus=true](http://localhost:3000/tasks?filterCompleted=true&completionStatus=true) <br />
    `completionStatus` can be `true` or `false`
  * To retrieve based on priority level [http://localhost:3000/tasks/priority/:level] eg: [http://localhost:3000/tasks/priority/high](http://localhost:3000/tasks/priority/high) <br />
    `level` can be `high`, `low` or `medium`
    
### POST API

API Endpoint to CREATE a task [http://localhost:3000/tasks](http://localhost:3000/tasks) <br />
Sample Payload
```json
{
    "name": "new task",
    "description": "new task description",
    "completed": true,
    "priority": "high"
}
```

### PUT API

API Endpoint to UPDATE a task [http://localhost:3000/tasks/:id] eg: [http://localhost:3000/tasks/351j18bfwlja9jptu](http://localhost:3000/tasks/351j18bfwlja9jptu)
Sample Payload
```json
{
    "name": "reading",
    "description": "complete reading 10 pages",
    "completed": true,
    "priority": "low"
}
```

### DELETE API

API Endpoint to DELETE a task [http://localhost:3000/tasks/:id] eg: [http://localhost:3000/tasks/351j18bfwlja9jptu](http://localhost:3000/tasks/351j18bfwlja9jptu)
