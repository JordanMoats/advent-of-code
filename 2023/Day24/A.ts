import { day24 } from "../input";

interface Hailstone {
    x: number,
    y: number,
    vx: number,
    vy: number,
}

const getYIntercept = (h: Hailstone) => {
    const slope = h.vy / h.vx;
    const c = h.y - (slope * h.x);
    return c;
}

const checkWhereCollide = (h1: Hailstone, h2: Hailstone) => {
    const c1 = getYIntercept(h1);
    const c2 = getYIntercept(h2);
    const m1 = h1.vy / h1.vx;
    const m2 = h2.vy / h2.vx;
    if(m1 === m2) {
        return [null, null];
    }
    const x = (c2 - c1) / (m1 - m2);
    const y = m1 * x + c1;

    if(h1.vx < 0) {
        if(x > h1.x) {
            return [null, null];
        }
    } else {
        if(x < h1.x) {
            return [null, null ]
        }
    }
    if(h2.vy < 0) {
        if(y > h2.y) {
            return [null, null];
        }
    } else {
        if(y < h2.y) {
            return [null, null];
        }
    }

    if (h2.vx < 0) {
        if (x > h2.x) {
            return [null, null];
        }
    } else {
        if (x < h2.x) {
            return [null, null];
        }
    }
    if (h2.vy < 0) {
        if (y > h2.y) {
            return [null, null];
        }
    } else {
        if (y < h2.y) {
            return [null, null];
        }
    }


    return [x, y];
}

const printHailstone = (h: Hailstone) => {
    return `${h.x}, ${h.y} @ ${h.vx}, ${h.vy}`;
}

/************************************/
const input = day24.main;
const lines = input.split("\n");

const hailstones = lines.map(line => {
    const [positionString, velocityString] = line.split(" @ ");
    const [x, y, z] = positionString.trim().split(", ").map(str => parseInt(str));
    const [vx, vy, vz] = velocityString
        .trim()
        .split(", ")
        .map((str) => parseInt(str));

    const hailstone: Hailstone = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
    }
    return hailstone;
});

let collisionCount = 0;

for(let i = 0; i < hailstones.length - 1; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
        const [x, y] = checkWhereCollide(hailstones[i], hailstones[j]);
        // console.log(`${printHailstone(hailstones[i])} and ${printHailstone(hailstones[j])}`)
        if (!x || !y) {
            // console.log(` don't intersect.`)
            // console.log("\n\n");
            continue;
        }
        // console.log(` intersect at ${x}, ${y}.`) // debug
        if (x >= 200000000000000 && x <= 400000000000000) {
            if (y >= 200000000000000 && y <= 400000000000000) {
                // console.log(`collision in range.`);
                collisionCount++;
            }
        }
        // console.log(`\n\n`);
    }
}

console.log(collisionCount);