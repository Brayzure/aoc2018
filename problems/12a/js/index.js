function solve(input) {
    let state = input[0].split(" ")[2];
    const stateChanges = input.slice();
    stateChanges.splice(2, 0);
    const generations = 20;
    const bitmaskMap = getBitmask(stateChanges);
    let offset = 0;
    for(let i = 0; i < generations; i++) {
        state = processGeneration(state, bitmaskMap);
        offset = 4 * (i + 1);
    }
    return sumState(state, offset);
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
