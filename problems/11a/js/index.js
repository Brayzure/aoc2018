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
    let max = maxX2 = maxY2 = 0;
    for(let i = 0; i < maxX - 2; i ++) {
        for(let j = 0; j < maxY - 2; j++) {
            let sum = gridSum(grid, i, j, 3);
            if(sum > max) {
                max = sum;
                maxX2 = i + 1;
                maxY2 = j + 1;
            }
        }
    }
    return `${maxX2},${maxY2}`;
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
