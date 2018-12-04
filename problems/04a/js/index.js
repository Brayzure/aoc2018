const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8");
const input = rawInput.trim().split("\n").map(e => e.trim());

solve(input);

function solve(entries) {
    const guards = {};

    // Default sorting is sufficient
    entries.sort();

    let currentGuard, startSleep, endSleep;
    for(const entry of entries) {
        const args = entry.replace(/[|]/g, "").split(" ");
        switch(args[2]) {
            case "Guard":
                const guardID = args[3].slice(1);
                if(!guards[guardID]) {
                    guards[guardID] = new Array(60).fill(0);
                }
                currentGuard = guardID;
                break;
            case "falls":
                startSleep = parseInt(args[1].split(":")[1]);
                break;
            case "wakes":
                endSleep = parseInt(args[1].split(":")[1]);
                for(let i = startSleep; i < endSleep; i++) {
                    guards[currentGuard][i]++;
                }
                break;
        }
    }

    const solution = findSleepiestGuard(guards);
    console.log(solution);
}

function findSleepiestGuard(guards) {
    let maxSleep = 0;
    let maxGuard = "";
    for(const guard of Object.keys(guards)) {
        const sum = guards[guard].reduce((a, b) => a + b, 0);
        if(sum > maxSleep) {
            maxSleep = sum;
            maxGuard = guard;
        }
    }

    let maxMinute = 0;
    let maxIndex = -1;
    for(let i = 0; i < 60; i++) {
        if(guards[maxGuard][i] > maxMinute) {
            maxMinute = guards[maxGuard][i];
            maxIndex = i;
        }
    }

    return parseInt(maxGuard) * maxIndex;
}
