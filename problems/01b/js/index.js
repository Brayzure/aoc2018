function solve(input) {
    const STARTING_FREQUENCY = 0;
    const visitedValues = new Set();
    const offsets = parseInput(input);

    let frequency = STARTING_FREQUENCY;
    let currentIndex = 0;
    while(!visitedValues.has(frequency)) {
        visitedValues.add(frequency);
        frequency += offsets[currentIndex];
        currentIndex = (currentIndex + 1) % offsets.length;
    }

    return frequency;
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

module.exports = solve;
