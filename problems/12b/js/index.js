const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8").trim();
const input = rawInput.split("\n").map(e => e.trim());

const solution = solve(input);
console.log(solution);

function solve(input) {
    let state = input[0].split(" ")[2];
    const stateChanges = input.slice();
    stateChanges.splice(2, 0);
    const generations = 50000000000;
    const bitmaskMap = getBitmask(stateChanges);
    let offset = 0;
    let sums = [];
    let diffs = [];
    let repeat = 0;
    for(let i = 0; i < generations && repeat < 5; i++) {
        state = processGeneration(state, bitmaskMap);
        offset = 4 * (i + 1);
        sums.push(sumState(state, offset));
        if(sums.length > 1) {
            diffs.push(sums[i] - sums[i-1]);
        }
        if(diffs.length > 1 && diffs[i-1] === diffs[i-2]) {
            repeat++;
        }
    }
    const diff = diffs[diffs.length - 1];

    let target = sums[sums.length - 1] + diff * (generations - sums.length);
    return target;
}

function sumState(state, offset) {
    let sum = 0;
    for(let i = 0; i < state.length; i++) {
        const char = state[i];
        if(char === "#") {
            const pos = i - offset;
            sum += pos;
        }
    }
    return sum;
}

function processGeneration(state, bitmaskMap) {
    state = "...." + state + "....";
    let newState = [".", "."];
    for(let i = 2; i < state.length - 2; i++) {
        const testArea = state.slice(i - 2, i + 3);
        const bitmask = calculateBitmask(testArea);
        newState.push(bitmaskMap[bitmask] ? "#" : ".");
    }
    return newState.join("");
}

function calculateBitmask(str) {
    let flag = 0;
    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        if(char === "#") {
            flag += 2 ** i;
        }
    }
    return flag;
}

function getBitmask(changes) {
    let map = [];
    for(const change of changes) {
        const args = change.split(" ");
        const start = args[0];
        const result = args[2];
        let flag = calculateBitmask(start);
        if(result === "#") {
            map[flag] = true;
        }
        else {
            map[flag] = false;
        }
    }

    return map;
}

module.exports = solve;
