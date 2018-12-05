const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const input = fs.readFileSync(INPUT_LOCATION, "utf8");

console.log(solve(input));

function solve(input) {
    const claims = input.trim().split("\n").map(e => parseClaim(e.trim()));

    let claimMap = [];
    for(const claim of claims) {
        addClaim(claim);
    }

    return findPerfectClaim(claims, claimMap);
}

function findPerfectClaim(claims, claimMap) {
    for(const claim of claims) {
        let fail = false;
        for(let i = claim.leftOffset; i < claim.leftOffset + claim.width && !fail; i++) {
            for(let j = claim.topOffset; j < claim.topOffset + claim.height && !fail; j++) {
                if(claimMap[i][j] > 1) fail = true;
            }
        }
        if(!fail) {
            return claim.id;
        }
    }
}

function addClaim(object) {
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
