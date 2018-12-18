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
    count = timeToMeet(points);
    return Math.round(count);
}

function timeToMeet(points) {
    points.sort((a, b) => {
        return a.y - b.y;
    });
    const testPoint = points[Math.round(points.length / 2)];
    const times = [];
    for(const point of points) {
        if(point === testPoint || point.yv === testPoint.yv) continue;
        times.push((testPoint.y - point.y) / (point.yv - testPoint.yv));
    }
    return times.reduce((a, b) => a + b, 0) / times.length;
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
