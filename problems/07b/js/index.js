const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8").trim();
const input = rawInput.split("\n").map(e => e.trim());

const solution = solve(input);
console.log(solution);

function solve(input) {
    const TIME_DELAY = 60;
    const WORKERS = 5;

    const steps = {};
    const inProgress = {};
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
    let time = 0;
    let availableWorkers = WORKERS;
    while(Object.entries(steps).length) {
        // Mark off completed steps
        for(const entry of Object.entries(inProgress)) {
            if(entry[1] === 0) {
                delete inProgress[entry[0]];
                delete steps[entry[0]];
                for(const step of Object.entries(steps)) {
                    const index = step[1].indexOf(entry[0]);
                    if(index != -1) {
                        step[1].splice(index, 1);
                    }
                }
                availableWorkers++;
            }
        }
        
        const ready = [];
        for(const step of Object.entries(steps)) {
            if(step[1].length === 0 && !inProgress[step[0]]) {
                ready.push(step[0]);
            }
        }
        ready.sort();
        const toStart = ready.slice(0, availableWorkers);
        availableWorkers -= toStart.length;
        for(const step of toStart) {
            inProgress[step] = TIME_DELAY + step.charCodeAt(0) - 64;
        }
        if(Object.keys(inProgress).length) {
            let min = Math.min(...Object.values(inProgress));
            for(const step of Object.keys(inProgress)) {
                inProgress[step] -= min;
            }
            time += min;
        }
    }
    return time;
}

module.exports = solve;
