function solve(input) {
    let maxX = 0;
    let maxY = 0;
    let valid = 0;
    let arr = input.map(line => line.split(", ").map(e => parseInt(e)));
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][0] > maxX) {
            maxX = arr[i][0];
        }
        if(arr[i][1] > maxY) {
            maxY = arr[i][1];
        }
    }
    for(let i = 0; i < maxX+50; i++) {
        for(let j = 0; j < maxY+50; j++) {
            let num = distanceSum(i, j, arr);
            if(num < 10000) {
                valid++;
            }
        }
    }
    return valid;
}

function distanceSum(x, y, points) {
    let total = points.reduce((a, b) => a + distance([x,y], b), 0)

    return total;
}

function distance(point1, point2) {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

module.exports = solve;
