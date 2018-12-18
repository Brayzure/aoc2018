function solve(input) {
    let map = [];
    for(let i = 0; i < input.length; i++) {
        map[i] = input[i].split("");
    }
    const MINUTES = 10;
    for(let m = 1; m <= MINUTES; m++) {
        let newMap = JSON.parse(JSON.stringify(map));
        for(let x = 0; x < map[0].length; x++) {
            for(let y = 0; y < map.length; y++) {
                newMap[y][x] = getNewPlot(map, x, y);
            }
        }
        map = newMap;
    }
    let tree = yard = 0;
    for(let x = 0; x < map[0].length; x++) {
        for(let y = 0; y < map.length; y++) {
            if(map[y][x] === "|") tree++;
            if(map[y][x] === "#") yard++;
        }
    }
    return tree * yard;
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
