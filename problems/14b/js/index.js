function solve(input) {
    let recipes = parseInt(input[0]);
    let target = recipes.toString().split("").map(e => +e);
    let arr = [3, 7];
    let elf1 = 0;
    let elf2 = 1;
    let ding = 0;
    let found;
    while(!found) {
        let elf1Score = arr[elf1];
        let elf2Score = arr[elf2];
        let newScore = elf1Score + elf2Score;
        let recipes = newScore.toString().split("");
        arr.push(+recipes[0]);
        if(+recipes[0] === target[ding]) {
            ding++;
        }
        else {
            ding = 0;
        }
        if(ding === target.length) found = arr.length;
        if(recipes[1]) {
            if(+recipes[1] === target[ding]) {
                ding++;
            }
            else {
                ding = 0;
            }
            if(ding === target.length) found = arr.length;
            arr.push(+recipes[1]);
        }
        elf1 = (1 + elf1 + elf1Score) % arr.length;
        elf2 = (1 + elf2 + elf2Score) % arr.length;
    }
    return found - target.length;
}

module.exports = solve;
