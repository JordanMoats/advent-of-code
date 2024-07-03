import { day14 } from "../input";

const input = day14.main;
const lines = input.split("\n");
const grid: string[][] = lines.map((lines) => lines.split(""));

const checkUpClear = (y: number, x: number) => {
    if (grid[y][x] !== "O") {
        throw new Error("Spot is not a rock.")
    } 

    if(y === 0) {
        return false;
    } else {
        if(grid[y - 1][x] === ".") {
            return true;
        } else {
            return false;
        }
    }
}

const moveRockToTop = (y: number, x: number) => {
    while(checkUpClear(y, x)) {
        grid[y][x] = ".";
        grid[y-1][x] = "O";

        y -= 1;
    }
}

const moveAllRocks = () => {
    grid.forEach((row, y) => {
        row.forEach((character, x) => {
            if(character === "O"){
                moveRockToTop(y, x);
            }
        })
    })
}

const printGrid = () => {
    let lines = grid.map(charArray => {
        let str = charArray.reduce((acc, string) => {
            return acc + string;
        }, "");
        return str;
    })
    lines.forEach(line => {
        console.log(line);
    })
}

const scoreGrid = () => {
    let sum = 0;
    grid.forEach((line, index) => {
        for (let i = 0; i < line.length; i++) {
            if(line[i] === "O") {
                sum += (lines.length - index);
            }
        }
    });
    return sum;
}

moveAllRocks();
console.log(scoreGrid());