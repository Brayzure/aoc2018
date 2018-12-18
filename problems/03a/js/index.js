function solve(input) {
    const claims = input;

    let claimMap = [];
    for(const claim of claims) {
        const claimObj = parseClaim(claim);
        addClaim(claimMap, claimObj);
    }

    const overlaps = [];
    for(const row of claimMap) {
        if(row) overlaps.push(row.filter(e => e > 1).length);
    }

    return overlaps.reduce((a, b) => a + b, 0);
}

function addClaim(claimMap, object) {
    for(let i = object.leftOffset; i < object.leftOffset + object.width; i++) {
        for(let j = object.topOffset; j < object.topOffset + object.height; j++) {
            if(!claimMap[i]) claimMap[i] = [];
            if(!claimMap[i][j]) claimMap[i][j] = 0;
            claimMap[i][j]++;
        }
    }
}

function parseClaim(claim) {
    const claimParams = claim.split(/\D+/g).map(e => parseInt(e)).slice(1);
    return {
        id: claimParams[0],
        leftOffset: claimParams[1],
        topOffset: claimParams[2],
        width: claimParams[3],
        height: claimParams[4]
    }
}

module.exports = solve;
