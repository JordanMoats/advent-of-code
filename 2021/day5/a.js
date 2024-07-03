import { day5 } from "./input.js";

const input = day5.main;

const lines = input.split('\n');

const lineSegments = [];

for (const line of lines) {
    let linePieces = line.split(' -> ');
    let pointA = linePieces[0].split(',').map(str => parseInt(str));
    let pointB = linePieces[1].split(',').map(str => parseInt(str));
    lineSegments.push([{x: pointA[0], y: pointA[1]}, {x: pointB[0], y: pointB[1]}]);
}
let coordHitMap = new Map();

lineSegments.forEach(lineSegment => {
    const [p1, p2] = lineSegment;
    console.log(`p1: ${p1.x}, ${p1.y}; p2: ${p2.x}, ${p2.y}`);
    if (p1.x === p2.x) {
        let minY = Math.min(p1.y, p2.y);
        let maxY = Math.max(p1.y, p2.y);
        for (let y = minY; y <= maxY; y++) {
            let key = `${p1.x},${y}`;
            const currentFound = coordHitMap.get(key) || 0;
            coordHitMap.set(key, currentFound + 1);
        }
    } else if (p1.y === p2.y) {
        let minX = Math.min(p1.x, p2.x);
        let maxX = Math.max(p1.x, p2.x);
        for (let x = minX; x <= maxX; x++) {
            let key = `${x},${p1.y}`;
            const currentFound = coordHitMap.get(key) || 0;
            coordHitMap.set(key, currentFound + 1);
        }
    } else if (Math.abs(p1.y - p2.y) === Math.abs(p1.x - p2.x)) {
        let key = `${p2.x},${p2.y}`;
        coordHitMap.set(key, (coordHitMap.get(key) || 0) + 1);

        while (p1.x !== p2.x) {
            key = `${p1.x},${p1.y}`;
            coordHitMap.set(key, (coordHitMap.get(key) || 0) + 1);
            if (p1.x < p2.x) {
                p1.x = p1.x + 1;
            } else {
                p1.x = p1.x - 1;
            }
            if (p1.y < p2.y) {
                p1.y = p1.y + 1;
            } else {
                p1.y = p1.y - 1;
            }
        }
    } else {
        console.error('Something went wrong???');
    }
    
});

let count = 0;
coordHitMap.forEach((value, key) => {
    if (value >= 2) {
        count++;
    }
});

console.log(count);