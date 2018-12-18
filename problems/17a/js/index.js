function solve(input) {
    let lines = []
    for(const line of input) {
        lines.push(parseLine(line));
    }
    const minX = Math.min(...lines.map(e => e.minX));
    const maxX = Math.max(...lines.map(e => e.maxX));
    const minY = Math.min(...lines.map(e => e.minY));
    const maxY = Math.max(...lines.map(e => e.maxY));
    const offset = minX - 1;
    let map = [];
    for(let y = 0; y <= maxY; y++) {
        map[y] = [];
        for(let x = minX - 1; x <= maxX + 1; x++) {
            map[y][x - offset] = ".";
        }
    }
    for(const wall of lines) {
        for(let y = wall.minY; y <= wall.maxY; y++) {
            for(let x = wall.minX; x <= wall.maxX; x++) {
                map[y][x - offset] = "#";
            }
        }
    }
    const offsetSpringLoc = { x: 500 - offset, y: 0 };
    let loc;
    let count = 0;
    do {
        loc = drip(map, offsetSpringLoc);
        count++;
    }
    while(loc.x !== offsetSpringLoc.x || loc.y !== minY);
    return count;
}

function drip(map, springLoc) {
    let maxX = map[0].length - 1;
    let maxY = map.length - 1;
    let loc = {
        x: springLoc.x,
        y: springLoc.y
    };
    let char = map[loc.y][loc.x];
    let wentRight = wentLeft = false;
    while(char !== "|" && char !== "#" && char !== "~") {
        // Out of bounds
        if(loc.y + 1 > maxY) {
            map[loc.y][loc.x] = "|";
        }
        // We can keep falling
        else if(map[loc.y+1][loc.x] === ".") {
            loc.y++;
            wentRight = wentLeft = false;
        }
        // We encountered flowing water, stop
        else if(map[loc.y+1][loc.x] === "|") {
            map[loc.y][loc.x] = "|";
        }
        // We can go left, and we haven't gone right
        else if(map[loc.y][loc.x-1] === "." && !wentRight) {
            loc.x--;
            wentLeft = true;
        }
        // We can go right, and we haven't gone left
        else if(map[loc.y][loc.x+1] === "." && !wentLeft) {
            loc.x++;
            wentRight = true;
        }
        // We're trapped! Water here
        else {
            if(map[loc.y][loc.x+1] === "|" || map[loc.y][loc.x-1] === "|") {
                map[loc.y][loc.x] = "|";
                if(map[loc.y][loc.x+1] === "~") {
                    let convertLoc = {
                        x: loc.x,
                        y: loc.y
                    };
                    while(map[convertLoc.y][convertLoc.x+1] === "~") {
                        map[convertLoc.y][convertLoc.x+1] = "|";
                        convertLoc.x++;
                    }
                }
                if(map[loc.y][loc.x-1] === "~") {
                    let convertLoc = {
                        x: loc.x,
                        y: loc.y
                    };
                    while(map[convertLoc.y][convertLoc.x-1] === "~") {
                        map[convertLoc.y][convertLoc.x-1] = "|";
                        convertLoc.x--;
                    }
                }
            }
            else {
                map[loc.y][loc.x] = "~";
            }
        }
        char = map[loc.y][loc.x];
    }
    return loc;
}

function parseLine(line) {
    const args = line.split(", ");
    let minX, maxX, minY, maxY;
    const num = +args[0].split("=")[1];
    if(args[0][0] === "x") {
        minX = maxX = num;
    }
    else {
        minY = maxY = num;
    }
    const nums = args[1].split("=")[1].split("..");
    if(args[1][0] === "x") {
        minX = +nums[0];
        maxX = +nums[1];
    }
    else {
        minY = +nums[0];
        maxY = +nums[1];
    }
    return {
        minX,
        maxX,
        minY,
        maxY
    };
}

module.exports = solve;
