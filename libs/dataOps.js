const tasks = require('../tasksData.json');

class DataOps {

    // Class method to sort tasks by time, default sortOrder is ascending
    static sortByTime(sortOrder=0) {
        if(sortOrder == 0) { //sort ascending, this is default sort
            return tasks.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
        } else { // sort descending, sortOrder 1
            return tasks.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
        }
    }

    // Class method to filter tasks based on completion status
    static filterCompleted(completionStatus='true', sortedData) {
        const status = completionStatus === 'true' ? true : false;
        const data = !sortedData.length ? sortedData : tasks;
        return data.filter(item => item.completed === status)
    }

    // Private class method to validate the priority value given by end user
    static #validatePriority(level) {
        return level === 'low' || level === 'medium' || level === 'high'
    }

    // Class method that retrieves tasks based on the priority level passed
    static retrieveOnPriority(level) {
        if(this.#validatePriority(level)) {
            const filteredTasks = tasks.filter(item => item.priority === level);
            return {success: true, data: filteredTasks}
        } else {
            return {success: false, message: "Invalid priority level!!"}
        }
    } 
}

module.exports = DataOps;