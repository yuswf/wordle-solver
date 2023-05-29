const fs = require('fs');
const {TR_tr} = require('./utils/Alphabet');
const {check} = require('./utils/API_Check');

let input = '*am*k';
let bannedLetters = 'hzyt';

function loop(input) {
    let result = [];

    for (let j = 0; j < TR_tr.length; j++) {
        let temp = input.replace('*', TR_tr[j]);

        result.push(temp);
    }

    return result;
}

function compare(input) {
    let start = Date.now();
    let end;
    let result = [];
    let unknown = input.split('*').length - 1;

    for (let i = 0; i < unknown; i++) {
        if (i === 0) {
            result = loop(input);
            end = Date.now();
        } else {
            let temp = [];

            for (let j = 0; j < result.length; j++) {
                temp = temp.concat(loop(result[j]));
            }

            result = temp;
            end = Date.now();
        }
    }

    return {result, ping: end - start};
}

function main(input) {
    let {result, ping} = compare(input);

    fs.readFile('./utils/Words.txt', 'utf8', (err, data) => {
        if (err) throw err;

        let temp = data.split('\n');

        for (let i = 0; i < result.length; i++) {
            if (temp.includes(result[i]) && !result[i].split('').map(x => bannedLetters.split('').includes(x)).includes(true)) {
                check(result[i]).then(res => {
                    if (!res) {
                        console.log(result[i]);
                    }
                });
            }
        }
    });
}

main(input);
