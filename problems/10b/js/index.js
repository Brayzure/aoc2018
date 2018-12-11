const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8").trim();
const input = rawInput.split("\n").map(e => e.trim());

const solution = solve(input);
console.log(solution);

function solve(input) {
    const points = [];
    for(let line of input) {
        line = line.replace(/<|,|>/g, " ");
        const args = line.split(/\s+/);
        const point = {
            x: parseInt(args[1]),
            y: parseInt(args[2]),
            xv: parseInt(args[4]),
            yv: parseInt(args[5])
        };
        points.push(point);
    }
    let count = 0;
    while(adjacencyRatio(points) < 0.7) {
        movePoints(points);
        count++;
    }
    return count;
}

function adjacencyRatio(points) {
    const pointSet = new Set(points.map(p => pointToString(p)));
    let count = 0;
    for(const point of points) {
        const toCheck = [
            point.x.toString() + "," + (point.y+1).toString(),
            point.x.toString() + "," + (point.y-1).toString(),
            (point.x+1).toString() + "," + point.y.toString(),
            (point.x-1).toString() + "," + point.y.toString()
        ];
        let found = false;
        for(let i = 0; i < toCheck.length && !found; i++) {
            if(pointSet.has(toCheck[i])) {
                count++;
                found = true;
            }
        }
    }
    return count / points.length;
}

function movePoints(points) {
    for(let i = 0; i < points.length; i++) {
        points[i].x += points[i].xv;
        points[i].y += points[i].yv;
    }
}

function pointToString(point) {
    return point.x.toString() + "," + point.y.toString();
}

module.exports = solve;
