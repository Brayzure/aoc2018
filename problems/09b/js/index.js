const fs = require("fs");
const INPUT_LOCATION = "../input.txt";
const rawInput = fs.readFileSync(INPUT_LOCATION, "utf8").trim();
const input = rawInput.split("\n").map(e => e.trim());

class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.mext = null;
    }
}

class CircularLinkedList {
    constructor(initial) {
        this.head = new Node(initial);
        this.head.next = this.head;
        this.head.prev = this.head;
        this.count = 1;
    }

    addNodeAfter(addAfter, value) {
        let newNode = new Node(value);
        addAfter.next.prev = newNode;
        newNode.next = addAfter.next;
        newNode.prev = addAfter;
        addAfter.next = newNode;
        this.count++;
        return newNode;
    }

    removeNodeAfter(removeAfter) {
        let toRemove = removeAfter.next;
        removeAfter.next = toRemove.next;
        toRemove.next.prev = removeAfter;
        this.count--;
        return toRemove;
    }
}

const solution = solve(input);
console.log(solution);

function solve(input) {
    const args = input[0].split(" ");
    const players = +args[0];
    const marbles = +args[6];

    let linkedList = new CircularLinkedList(0);
    let currentNode = linkedList.head;
    let currentPlayer = 0;
    let currentScore = [];
    for(let i = 1; i <= marbles; i++) {
        if(!(i%23)) {
            if(!currentScore[currentPlayer]) {
                currentScore[currentPlayer] = 0;
            }
            currentScore[currentPlayer] += i;
            currentNode = currentNode.prev.prev.prev.prev.prev.prev.prev.prev;
            let nodeToAddValue = linkedList.removeNodeAfter(currentNode);
            currentNode = currentNode.next;
            currentScore[currentPlayer] += nodeToAddValue.value;
        }
        else {
            currentNode = currentNode.next;
            currentNode = linkedList.addNodeAfter(currentNode, i);
        }
        currentPlayer = (currentPlayer + 1) % players;
    }
    return Math.max(...currentScore.filter(e => !isNaN(e)));
}

module.exports = solve;
