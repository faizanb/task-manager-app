const tasks = require('../tasksData.json');

class Validator {

    // Private class method to validate task ID
    static #validateTaskId(id) {
        const taskWithId = tasks.filter(item => item.id == id);
        if(!taskWithId.length)
            return {success: false, message: "Task with given id does not exist!!"};
        return {success: true, data: taskWithId};
    }

    //Private class method to check mandatory parameter exists in request payload
    static #validateTaskProps(data) {
        return data && data.hasOwnProperty('name') &&
            data.hasOwnProperty('description') &&
            (data.hasOwnProperty('completed') &&
            typeof data.completed === 'boolean') &&
            (data.hasOwnProperty('priority') &&
            data.priority === 'low' || data.priority === 'medium' || data.priority === 'high')
        }

    // Class method that will invoked in routes for error handling for any CRUD operation
    static validateTaskData(action, data=null, id=null) {
        if(action === 'CREATE' || action === 'UPDATE') {
            const isValidProps = this.#validateTaskProps(data);
            if(!isValidProps)
                return { success: false, message: "Invalid/missing data fields!!", fieldsMissing: true}
        }
        let taskExists = false;
        switch(action) {
            case 'CREATE': 
            taskExists = tasks.some(item => ((item.name === data.name) || (item.description === data.description)))
                if(taskExists)
                    return {success: false, message: "Task with given data does exist!!"};
                return {success: true}; 
            case 'READ':
            case 'DELETE':
                return this.#validateTaskId(id);
            case 'UPDATE':
                let validateId = this.#validateTaskId(id);
                if(validateId.success) {
                    taskExists = ((validateId.data[0].name === data.name) &&
                        (validateId.data[0].description === data.description) &&
                        (validateId.data[0].completed === data.completed) &&
                        (validateId.data[0].priority === data.priority))
                    if(taskExists)
                        return {success: false, message: "Trying to modify same data. Please update your inputs!!", idExists: true};
                    return {success: true, idExists: true}; 
                }
                return {...validateId, idExists: false};
        }
    }
}

module.exports = Validator;