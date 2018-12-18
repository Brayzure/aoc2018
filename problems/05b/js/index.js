function solve(input) {
    input = input[0];
    const possibilities = [];
    for(let i = 0; i < input.length; i++) {
        if(!possibilities.includes(input[i].toLowerCase())) {
            possibilities.push(input[i].toLowerCase());
        }
    }
    let minLength = input.length;
    for(const removal of possibilities) {
        const newInput = input.replace(new RegExp(removal, "gi"), "");
        const length = simplifyPolymer(newInput);
        minLength = Math.min(length, minLength);
    }
    return minLength;
}

function simplifyPolymer(input) {
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
