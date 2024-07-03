import { day8 } from "../input";

const checkUp = (grid: number[][], y: number, x: number) => {
    let treeHeight = grid[y][x];
    for (let i = y; i >= 0; i--) {
        if (grid[i][x] >= treeHeight) {
            return false;
        }
    }
    return true;
}

const checkLeft = (grid: number[][], y: number, x: number) => {
    let treeHeight = grid[y][x];
    for (let i = x; i >= 0; i--) {
        if (grid[y][i] >= treeHeight) {
            return false;
        }
    }
    return true;
}

const checkRight = (grid: number[][], y: number, x: number) => {
    let treeHeight = grid[y][x];
    for (let i = x; i < grid[0].length; i++) {
        if (grid[i][x] >= treeHeight) {
            return false;
        }
    }
    return true;
}

const checkDown = (grid: number[][], y: number, x: number) => {
    let treeHeight = grid[y][x];
    for (let i = y; i < grid.length; i++) {
        if (grid[i][x] >= treeHeight) {
            return false;
        }
    }
    return true;
}

const checkVisible = (grid: number[][], y: number, x: number) => {
    if (x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1) {
        return true;
    } else {
        return checkUp(grid, y, x) || checkDown(grid, x, y) || checkLeft(grid, x, y) || checkRight(grid, x, y);
    }
}

/*******************************************8*/

const input = day8.sample;
const lines = input.split("\n");

const grid = lines.map(line => {
    return line.split("").map(num => parseInt(num));
});

let visibleCount = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (checkVisible(grid, i, j)) {
            visibleCount++;
        } else {
            console.log(`(${i}, ${j}): ${grid[i][j]}`)
        }
    }
}

console.log(visibleCount);  