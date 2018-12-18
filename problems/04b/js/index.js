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

    const solution = findSleepiestMinute(guards);
    return solution;
}

function findSleepiestMinute(guards) {
    let maxMinute = -1;
    let maxSleep = 0;
    let maxGuard = "";
    for(const guard of Object.keys(guards)) {
        for(let i = 0; i < 60; i++) {
            if(guards[guard][i] > maxSleep) {
                maxSleep = guards[guard][i];
                maxMinute = i;
                maxGuard = guard;
            }
        }
    }

    return parseInt(maxGuard) * maxMinute;
}

module.exports = solve();
