function solve(input) {
    input = input[0];
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
