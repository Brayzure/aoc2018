function solve(input) {
    let left = recipes = parseInt(input[0]) - 2;
    let arr = [3, 7];
    let elf1 = 0;
    let elf2 = 1;
    while(left > 0) {
        let elf1Score = arr[elf1];
        let elf2Score = arr[elf2];
        let newScore = elf1Score + elf2Score;
        let recipes = newScore.toString().split("");
        arr.push(+recipes[0]);
        left--;
        if(recipes[1]) {
            arr.push(+recipes[1]);
            left--;
        }
        elf1 = (1 + elf1 + elf1Score) % arr.length;
        elf2 = (1 + elf2 + elf2Score) % arr.length;
    }
    let hold = arr.length + left;
    left += 10;
    while(left > 0) {
        let elf1Score = arr[elf1];
        let elf2Score = arr[elf2];
        let newScore = elf1Score + elf2Score;
        let recipes = newScore.toString().split("");
        arr.push(+recipes[0]);
        left--;
        if(recipes[1]) {
            arr.push(+recipes[1]);
            left--;
        }
        elf1 = (1 + elf1 + elf1Score) % arr.length;
        elf2 = (1 + elf2 + elf2Score) % arr.length;
    }
    return arr.slice(hold, hold+10).join("");
}

module.exports = solve;
