const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8").trim();
const input = rawInput.split("\n").map(e => e.trim());

const solution = solve(input);
console.log(solution);

function solve(input) {
    let maxX = 0;
    let maxY = 0;
    let arr = input.map(line => line.split(", ").map(e => parseInt(e)));
    let points = {};
    for(let i = 0; i < arr.length; i++) {
        points[i.toString()] = 0;
        if(arr[i][0] > maxX) {
            maxX = arr[i][0];
        }
        if(arr[i][1] > maxY) {
            maxY = arr[i][1];
        }
    }
    for(let i = 0; i < maxX; i++) {
        for(let j = 0; j < maxY; j++) {
            const closest = closestPoint(i, j, arr);
            if(closest.length > 1) continue;
            if(i === 0 || i === maxX || j === maxY || j === 0) {
                if(points.hasOwnProperty(closest[0])) {
                    delete points[closest[0]];
                }
            }
            else {
                if(points.hasOwnProperty(closest[0])) {
                    points[closest[0]]++;
                }
            }
        }
    }
    console.log(points);
    return Math.max(...Object.values(points));
}

function closestPoint(x, y, points) {
    let minDistance = 1e6;
    let minPoint = [];
    for(let i = 0; i < points.length; i++) {
        let dist = distance([x,y],points[i]);
        if(dist === minDistance) {
            minPoint.push(i.toString());
        }
        if(dist < minDistance) {
            minDistance = dist;
            minPoint = [i.toString()];
        }
    }

    return minPoint;
}

function distance(point1, point2) {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

module.exports = solve;
