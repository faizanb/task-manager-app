const express = require('express');
const uniqid = require('uniqid');

const routes = express.Router();

const tasks = require('./tasksData.json');
const Files = require('./libs/files');
const Validator = require('./libs/validator');
const DataOps = require('./libs/dataOps');

routes.get('/', (req, res) => {
    if(tasks.length > 1) {
        let finalData = tasks;
        if(req.query.sortByTime && req.query.sortByTime === 'true') {
            finalData = DataOps.sortByTime(req.query.sortOrder);
        }
        if(req.query.filterCompleted && req.query.filterCompleted === 'true') {
            finalData = DataOps.filterCompleted(req.query.completionStatus, finalData);
        }
        res.status(200).send(finalData);
    } else {
        res.status(200).send(tasks);
    }
})

routes.get('/:id', (req, res) => {
    const validatedData = Validator.validateTaskData('READ', null, req.params.id);
    if(validatedData.success) {
        res.status(200).send(validatedData.data);
    } else {
        res.status(404).send(validatedData);
    }
    
})

routes.post('/', (req, res) => {
    const validatedData = Validator.validateTaskData('CREATE', req.body);
    if(validatedData.success) {
        const newTaskId = uniqid();
        const timeStamp = new Date().getTime();
        const newTask = { id: newTaskId, ...req.body, createdAt: timeStamp };
        tasks.push(newTask);
        Files.writeSync(tasks);
        res.status(200).send({message: 'New task created successfully', success: true})
    } else {
        let statusCode = 400;
        if(!validatedData.fieldsMissing) {
            statusCode = 403;
        } 
        res.status(statusCode).send(validatedData);
    }
})

routes.put('/:id', (req, res) => {
    const validatedData = Validator.validateTaskData('UPDATE', req.body, req.params.id);
    if(validatedData.success) {
        const taskIndex = tasks.findIndex(item => item.id == req.params.id);
        const updatedTask = { id: req.params.id, ...req.body, createdAt: tasks[taskIndex].createdAt };
        tasks[taskIndex] = updatedTask;
        Files.writeSync(tasks);
        res.status(200).send({message: 'Task updated successfully', success: true})
    } else {
        let statusCode = 400;
        if(validatedData.idExists) {
            statusCode = 403;
        }
        res.status(statusCode).send(validatedData);
    }
})

routes.delete('/:id', (req, res) => {
    const validatedData = Validator.validateTaskData('DELETE', null, req.params.id);
    if(validatedData.success) {
        const taskRemoved = tasks.filter(item => item.id != req.params.id);
        Files.writeSync(taskRemoved);
        res.status(204).end();
    } else {
        res.status(404).send(validatedData);
    }
})

routes.get('/priority/:level', (req, res) => {
    const priorityTasks = DataOps.retrieveOnPriority(req.params.level);
    if(priorityTasks.success) {
        res.status(200).send(priorityTasks.data);
    } else {
        res.status(400).send(priorityTasks)
    }
})


module.exports.routes = routes;