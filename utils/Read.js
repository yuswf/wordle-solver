const fs = require('fs');

function read(path) {
    let arr = [];

    fs.readFile('./utils/Words.txt', 'utf8', (err, data) => {
        if (err) throw err;

        let temp = data.split('\n');

        for (let i = 0; i < temp.length; i++) {
            arr.push(temp[i]);
        }
    });

    return arr;
}

module.exports = {
    read
}
