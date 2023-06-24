const fs = require('fs');
const path = require('path');
const FILEPATH = path.resolve(__dirname, '../tasksData.json');

class Files {

    //Write to File operation
    static writeSync(data) {
        fs.writeFileSync(FILEPATH, JSON.stringify(data, null, 4), {encoding: 'utf8', flag: 'w'});
        return;
    }
}

module.exports = Files;