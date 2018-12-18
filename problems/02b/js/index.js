function solve(input) {
    let IDs = input;
    let found = false;
    let i, j;
    for(i = 0; i < IDs.length - 1 && !found; i++) {
        for(j = i + 1; j < IDs.length && !found; j++) {
            found = compare(IDs[i], IDs[j]);
        }
    }
    i--;
    j--;
    return stripDifferences(IDs[i], IDs[j]);
}

function stripDifferences(str1, str2) {
    let str = "";
    for(let i = 0; i < str1.length; i++) {
        if(str1[i] === str2[i]) str += str1[i];
    }
    return str;
}

function compare(str1, str2) {
    let diff = 0;
    for(let i = 0; i < str1.length && diff < 2; i++) {
        if(str1[i] !== str2[i]) diff++;
    }
    return diff === 1;
}

module.exports = solve;
