import { adventInput } from "../Advent";

const sampleInput = adventInput(11, true);
const fullInput = adventInput(11, false);

interface Coordinate {
    x: number;
    y: number;
}

const expandSpace = (arrayGrid: string[][]) => {
    
    let blockedColumns: number[] = [];
    let emptyRows: number[] = [];

    // Look for blocked columns and rows
    arrayGrid.forEach((lineArray, y) => {
        let emptyRow = true;
        lineArray.forEach((char, x) => {
            if (char === "#") {
                blockedColumns.push(x);
                emptyRow = false;
            }
        });
        if (emptyRow) {
            emptyRows.push(y);
        }
    });
    let emptyColumns: number[] = [];
    for (let i = 0; i < lines[0].length; i++) {
        if (!blockedColumns.includes(i)) {
            emptyColumns.push(i);
        }
    }

    return {
        emptyColumns: emptyColumns,
        emptyRows: emptyRows
    }
};

const getDistance = (coord1: Coordinate, coord2: Coordinate) => {
    const yDiff = Math.abs(coord1.y - coord2.y);
    const xDiff = Math.abs(coord1.x - coord2.x);
    return yDiff + xDiff;
};

const run11A = (input: string) => {
    const lines = input.split("\n");
    const arrayGrid: string[][] = lines.map((line) => {
        return line.split("");
    });

    const { emptyColumns, emptyRows } = expandSpace(arrayGrid);
    let shipCoords: Coordinate[] = [];
    expandedGrid.forEach((lineArray, y) => {
        lineArray.forEach((char, x) => {
            if (char === "#") {
                shipCoords.push({ x: x, y: y });
            }
        });
    });

    // Go through each ship coordinate and compare it's distance to every other ship.
    // Add each distance to a sum and return the sum
    let sumDistance = 0;
    for (let i = 0; i < shipCoords.length; i++) {
        for (let j = i + 1; j < shipCoords.length; j++) {
            sumDistance += getDistance(shipCoords[i], shipCoords[j]);
        }
    }
    return sumDistance;
};

console.log(run11A(sampleInput));
console.log(run11A(fullInput));
