function solve(input) {
    const STARTING_FREQUENCY = 0;
    const offsets = parseInput(input);
    return calculateFrequency(STARTING_FREQUENCY, offsets);
}

function parseInput(input) {
    const changes = input;
    const newValues = [];
    for(const value of changes) {
        let offset = parseInt(value.slice(1));
        if(value[0] === "-") offset *= -1;
        newValues.push(offset);
    }
    return newValues;
}

function calculateFrequency(start=0, changes=[]) {
    return changes.reduce((a, b) => a + b, start);
}

module.exports = solve;
