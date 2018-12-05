const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const input = fs.readFileSync(INPUT_LOCATION, "utf8").trim();

const solution = solve(input);
console.log(solution);

function solve(input) {
    let redo = false;
    do {
        redo = false;
        for(let i = 0; i < input.length - 1; i++) {
            if(input[i] !== input[i+1] && input[i].toLowerCase() === input[i+1].toLowerCase()) {
                input = input.slice(0, i) + input.slice(i+2);
                i--;
                redo = true;
            }
        }
    }
    while(redo);
    return input.length;
}

module.exports = solve;
