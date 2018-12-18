function solve(input) {
    const args = input[0].split(" ");
    const players = +args[0];
    const marbles = +args[6];
    let circle = [0, 1];
    let currentIndex = 1;
    let currentPlayer = 0;
    let currentScore = [];
    for(let i = 2; i <= marbles; i++) {
        if(!(i%23)) {
            if(!currentScore[currentPlayer]) {
                currentScore[currentPlayer] = 0;
            }
            currentScore[currentPlayer] += i;
            currentIndex = (currentIndex - 7) % circle.length;
            if(currentIndex < 0) currentIndex += circle.length;
            currentScore[currentPlayer] += circle[currentIndex];
            circle.splice(currentIndex, 1);
        }
        else {
            currentIndex = (currentIndex + 2) % circle.length;
            circle = [...circle.slice(0, currentIndex), i, ...circle.slice(currentIndex)];
        }
        currentPlayer = (currentPlayer + 1) % players;
    }
    return Math.max(...currentScore.filter(e => !isNaN(e)));
}

module.exports = solve;
