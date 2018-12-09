const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8").trim();
const input = rawInput.split("\n").map(e => e.trim());

const solution = solve(input);
console.log(solution);

function solve(input) {
    const steps = {};
    for(const line of input) {
        const args = line.split(" ");
        const end = args[7];
        const start = args[1];
        if(!steps[end]) {
            steps[end] = [];
        }
        if(!steps[start]) {
            steps[start] = [];
        }
        steps[end].push(start);
    }
    let entries;
    let output = "";
    while((entries = Object.entries(steps)).length) {
        const ready = [];
        for(const step of entries) {
            if(step[1].length === 0) {
                ready.push(step[0]);
            }
        }
        ready.sort();
        const nextStep = ready[0];
        output += nextStep;
        for(const step of entries) {
            const index = step[1].indexOf(nextStep);
            if(index != -1) {
                step[1].splice(index, 1);
            }
        }
        delete steps[nextStep];
    }
    return output;
}

module.exports = solve;
