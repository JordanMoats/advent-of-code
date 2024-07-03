import { day10 } from "../input.js";

const input = day10.sample;
console.log(input + '|')
const lines = input.split('\n');

const width = lines[0].length;
const height = lines.length;
const grid = lines.map((line) => {
    return line.split('');
});

let startCoord = {
    x: 0, y: 0
}

// Find the s coordinate
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (grid[y][x] === 'S') {
            startCoord = { x: x, y: y };
        }
    }
}

const step = 0;

