function solve(input) {
    const OPS = {
        addr: (r, a, b, c) => r[c] = r[a] + r[b],
        addi: (r, a, b, c) => r[c] = r[a] + +b,
        mulr: (r, a, b, c) => r[c] = r[a] * r[b],
        muli: (r, a, b, c) => r[c] = r[a] * +b,
        banr: (r, a, b, c) => r[c] = r[a] & r[b],
        bani: (r, a, b, c) => r[c] = r[a] & +b,
        borr: (r, a, b, c) => r[c] = r[a] | r[b],
        bori: (r, a, b, c) => r[c] = r[a] | +b,
        setr: (r, a, b, c) => r[c] = r[a],
        seti: (r, a, b, c) => r[c] = +a,
        gtir: (r, a, b, c) => r[c] = +(+a > r[b]),
        gtri: (r, a, b, c) => r[c] = +(r[a] > +b),
        gtrr: (r, a, b, c) => r[c] = +(r[a] > r[b]),
        eqir: (r, a, b, c) => r[c] = +(+a === r[b]),
        eqri: (r, a, b, c) => r[c] = +(r[a] === +b),
        eqrr: (r, a, b, c) => r[c] = +(r[a] === r[b])
    }
    let valid = Array(16);
    for(let i = 0; i < 16; i++) {
        valid[i] = Object.keys(OPS);
    }

    const linesJoined = input.join("\n");
    const inputs = linesJoined.split("\n\n\n");
    const commands = inputs[0].split("\n\n");
    let count = 0;
    for(const rawCommand of commands) {
        const command = parseCommand(rawCommand);
        let valid = 0;
        for(const op of Object.values(OPS)) {
            let dummyRegister = command.before.slice();
            op(dummyRegister, ...command.input);
            if(dummyRegister.join(",") === command.after.join(",")) {
                valid++
            }
        }
        if(valid >= 3) count++;
    }
    return count;
}

function parseCommand(command) {
    const args = command.split("\n");
    const before = args[0].replace(/\[|\]|,/gi, "").split(" ");
    const beforeRegister = [...before.slice(-4).map(e => +e)];
    const after = args[2].replace(/\[|\]|,/gi, "").split(" ");
    const afterRegister = [...after.slice(-4).map(e => +e)];
    const input = args[1].split(" ").slice(1).map(e => +e);
    const code = +args[1].split(" ")[0];
    return {
        before: beforeRegister,
        after: afterRegister,
        input,
        code
    };
}

function op(registers, name, a, b, c) {
    let output = registers.slice();
    const OPS = {
        addr: (r, a, b, c) => r[c] = r[a] + r[b],
        addi: (r, a, b, c) => r[c] = r[a] + +b,
        mulr: (r, a, b, c) => r[c] = r[a] * r[b],
        muli: (r, a, b, c) => r[c] = r[a] * +b,
        banr: (r, a, b, c) => r[c] = r[a] & r[b],
        bani: (r, a, b, c) => r[c] = r[a] & +b,
        borr: (r, a, b, c) => r[c] = r[a] | r[b],
        bori: (r, a, b, c) => r[c] = r[a] | +b,
        setr: (r, a, b, c) => r[c] = r[a],
        seti: (r, a, b, c) => r[c] = +a,
        gtir: (r, a, b, c) => r[c] = +(+a > r[b]),
        gtri: (r, a, b, c) => r[c] = +(r[a] > +b),
        gtrr: (r, a, b, c) => r[c] = +(r[a] > r[b]),
        eqir: (r, a, b, c) => r[c] = +(+a === r[b]),
        eqri: (r, a, b, c) => r[c] = +(r[a] === +b),
        eqrr: (r, a, b, c) => r[c] = +(r[a] === r[b])
    }
}

module.exports = solve;
