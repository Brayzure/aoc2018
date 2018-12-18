function solve(input) {
    let map = [];
    let carts = [];
    for(let i = 0; i < input.length; i++) {
        map[i] = input[i].split("");
        for(let j = 0; j < map[i].length; j++) {
            let cart = parseCart(map[i][j]);
            if(cart) {
                cart.x = j;
                cart.y = i;
                carts.push(cart);
            }
        }
    }
    for(const cart of carts) {
        map[cart.y][cart.x] = inferTrack(map, cart.x, cart.y);
    }
    //console.log(map.map(e => e.join("")).join("\n"), carts);
    let crash;
    let ticks = 0;
    while(!(crash = tick(map, carts))) {
        ticks++;
        console.log(ticks);
        //displayMap(map, carts);
    }
    return crash.x + "," + crash.y;
}

function displayMap(map, carts) {
    const cartIcons = [
        "^",
        ">",
        "v",
        "<"
    ];
    const mapStr = map.map(e => e.join("")).join("\n");
    const displayMap = mapStr.split("\n").map(e => e.split(""));
    for(const cart of carts) {
        displayMap[cart.y][cart.x] = cartIcons[cart.d];
    }
    console.log(displayMap.map(e => e.join("")).join("\n"));
}

function tick(map, carts) {
    let currentLocs = new Set();
    for(const cart of carts) {
        currentLocs.add(cart.x + "," + cart.y);
    }
    const newCoord = [
        (x, y) => { return { x, y: y-1 } },
        (x, y) => { return { x: x+1, y } },
        (x, y) => { return { x, y: y+1 } },
        (x, y) => { return { x: x-1, y } }
    ]
    carts.sort((a, b) => {
        if(a.y - b.y === 0) {
            return a.x - b.x;
        }
        return a.y - b.y;
    });
    let crash = false;
    let crashLoc = {};
    for(let i = 0; i < carts.length && !crash; i++) {
        const cart = carts[i];
        currentLocs.delete(cart.x + "," + cart.y);
        const newPos = newCoord[cart.d](cart.x, cart.y);
        cart.x = newPos.x;
        cart.y = newPos.y;
        const newChar = map[newPos.y][newPos.x];
        if(currentLocs.has(newPos.x + "," + newPos.y)) {
            crash = true;
            crashLoc = { x: newPos.x, y: newPos.y };
        }
        else {
            // Ignore straight tracks, we just need to worry about cart direction
            switch(newChar) {
                case "+": {
                    const newTurn = [
                        1,
                        3,
                        null,
                        0
                    ];
                    cart.d = (cart.d + cart.turn) % 4;
                    cart.turn = newTurn[cart.turn];
                    break;
                }
                case "/": {
                    const newDir = [
                        1,
                        0,
                        3,
                        2
                    ];
                    cart.d = newDir[cart.d];
                    break;
                }
                case "\\": {
                    const newDir = [
                        3,
                        2,
                        1,
                        0
                    ];
                    cart.d = newDir[cart.d];
                    break;
                }
            }
        }
        currentLocs.add(cart.x + "," + cart.y);
    }
    return crash ? crashLoc : null;
}

function parseCart(cartChar) {
    switch(cartChar) {
        case ">":
            return { d: 1, turn: 3 };
        case "v":
            return { d: 2, turn: 3 };
        case "<":
            return { d: 3, turn: 3 };
        case "^":
            return { d: 0, turn: 3 };
        default:
            return null;
    }
}

function inferTrack(map, x, y) {
    const l = !!map[y][x-1] && map[y][x-1] !== " " && map[y][x-1] !== "|";
    const r = !!map[y][x+1] && map[y][x+1] !== " " && map[y][x+1] !== "|";
    const u = !!map[y-1] && !!map[y-1][x] && map[y-1][x] !== " " && map[y-1][x] !== "-";
    const d = !!map[y+1] && !!map[y+1][x] && map[y+1][x] !== " " && map[y+1][x] !== "-";
    if(d && u && l && r) return "+";
    if((d && l) || (u && r)) return "\\";
    if((d && r) || (u && l)) return "/";
    if(r && l) return "-";
    if(u && d) return "|";
    return " "
}

module.exports = solve;
