const fs = require('fs');
const path = require('path');
const FILEPATH = path.resolve(__dirname, '../tasksData.json');

class Files {
    static writeSync(data) {
        fs.writeFileSync(FILEPATH, JSON.stringify(data), {encoding: 'utf8', flag: 'w'});
        return;
    }
}

module.exports = Files;