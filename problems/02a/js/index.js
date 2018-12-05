const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const input = fs.readFileSync(INPUT_LOCATION, "utf8");
const IDs = input.trim().split("\n");

console.log(calculateChecksum(IDs));

function calculateChecksum(inputs) {
    let twos = threes = 0;
    for(const input of inputs) {
        let two = three = false;
        let currentLetter = "";
        let currentCount = 0;
        const sortedLetters = input.split("").sort();
        for(let i = 0; i < sortedLetters.length && !(two && three); i++) {
            const letter = sortedLetters[i];
            if(letter != currentLetter) {
                currentLetter = letter;
                if(currentCount === 2) two = true;
                if(currentCount === 3) three = true;
                currentCount = 0;
            }
            currentCount++;
        }
        if(currentCount === 2) two = true;
        if(currentCount === 3) three = true;
        if(two) twos++;
        if(three) threes++;
    }

    return twos * threes;
}

module.exports = calculateChecksum;
