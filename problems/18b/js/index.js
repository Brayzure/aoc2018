function solve(input) {
    let map = [];
    for(let i = 0; i < input.length; i++) {
        map[i] = input[i].split("");
    }
    const MINUTES = 1000000000;
    let samples = [];
    let pattern = null;
    let elapsed = 0;
    while(!pattern) {
        let newMap = JSON.parse(JSON.stringify(map));
        for(let x = 0; x < map[0].length; x++) {
            for(let y = 0; y < map.length; y++) {
                newMap[y][x] = getNewPlot(map, x, y);
            }
        }
        map = newMap;
        let tree = yard = 0;
        for(let x = 0; x < map[0].length; x++) {
            for(let y = 0; y < map.length; y++) {
                if(map[y][x] === "|") tree++;
                if(map[y][x] === "#") yard++;
            }
        }
        samples.push(tree * yard);
        pattern = detectPattern(samples);
        elapsed++;
    }

    const minutesLeft = MINUTES - elapsed;
    const advanceInPattern = minutesLeft % pattern.length;
    
    return pattern[advanceInPattern];
}

function detectPattern(arr, maxWindow=100) {
    let sample = arr.slice(-2 * maxWindow);
    let found = false;
    let window = 1;
    while(window <= maxWindow && !found && window <= sample.length / 2) {
        let testWindow1 = sample.slice(0, window);
        let testWindow2 = sample.slice(window, window * 2);
        if(testWindow1.join(",") === testWindow2.join(",")) {
            found = true;
        }
        else {
            window++;
        }
    }
    return found ? sample.slice(-1 * window - 1, -1) : null;
}

function getNewPlot(map, x, y) {
    const PLOT_MAP = {
        ".": "open",
        "|": "tree",
        "#": "yard"
    };
    let adjacency = {
        open: 0,
        tree: 0,
        yard: 0
    };
    for(let i = x - 1; i <= x + 1; i++) {
        for(let j = y - 1; j <= y + 1; j++) {
            if(i === x && j === y) continue;
            if(map[j] && map[j][i]) {
                adjacency[PLOT_MAP[map[j][i]]]++;
            }
        }
    }
    switch(map[y][x]) {
        case ".":
            if(adjacency.tree >= 3) return "|";
            return ".";
        case "|":
            if(adjacency.yard >= 3) return "#";
            return "|";
        case "#":
            if(adjacency.tree >= 1 && adjacency.yard >= 1) return "#";
            return ".";
    }
}

module.exports = solve;
