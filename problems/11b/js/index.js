const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8").trim();
const input = rawInput.split("\n").map(e => e.trim());

const solution = solve(input);
console.log(solution);

function solve(input) {
    const maxX = maxY = 300;
    const gridID = parseInt(input[0]);
    let grid = [];
    for(let i = 0; i < maxX; i++) {
        grid[i] = Array(maxY).fill(0);
    }
    for(let i = 0; i < maxX; i++) {
        for(let j = 0; j < maxY; j++) {
            grid[i][j] = (i + 11) * (j + 1);
            grid[i][j] += gridID;
            grid[i][j] *= (i + 11);
            grid[i][j] = grid[i][j] > 99 ? parseInt(grid[i][j].toString().slice(-3, -2)) : 0;
            grid[i][j] -= 5;
        }
    }
    let max = maxX2 = maxY2 = maxSize = 0;
    for(let i = 0; i < maxX; i ++) {
        for(let j = 0; j < maxY; j++) {
            let localMax = -1e8;
            let localMaxSize = 0;
            let start = grid[i][j];
            let sum;
            let q = 1;
            // Don't go out of bounds!
            let maxQ = Math.min(maxX - i, maxY - j);
            // Keep increasing grid size until sum falls below start, and we've tried at least a 5x5 grid
            while(q < maxQ && (q < 6 || sum > start)) {
                q++;
                sum = gridSum(grid, i, j, q);
                if(sum > localMax) {
                    localMax = sum;
                    localMaxSize = q;
                }
            }
            if(localMax > max) {
                max = localMax;
                maxX2 = i + 1;
                maxY2 = j + 1;
                maxSize = localMaxSize;
            }
        }
    }
    
    return `${maxX2},${maxY2},${maxSize}`;
}

// Sum of grid with specified top left coordinate, and width
function gridSum(points, x, y, size) {
    let sum = 0;
    for(let i = x; i < x + size; i++) {
        for(let j = y; j < y + size; j++) {
            sum += points[i][j];
        }
    }
    return sum;
}

module.exports = solve;
