import { adventInput } from "../Advent";

const sampleInput = adventInput(11, true);
const fullInput = adventInput(11, false);

interface Coordinate {
    x: number;
    y: number;
}

interface ExpandedInfo {
    emptyRowCount: number;
    emptyColCount: number;
    emptyRows: number[];
    emptyCols: number[];
}

const expandSpace = (input: string): ExpandedInfo => {
    const lines = input.split("\n");
    const arrayGrid: string[][] = lines.map((line) => line.split(""));
    let blockedColumns: number[] = [];
    let emptyRows: number[] = [];

    // Inside expandSpace function
    arrayGrid.forEach((lineArray, y) => {
        let emptyRow = true;
        lineArray.forEach((char, x) => {
            if (char === "#") {
                if (!blockedColumns.includes(x)) {
                    blockedColumns.push(x);
                }
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
        emptyRowCount: emptyRows.length * 1000000,
        emptyColCount: emptyColumns.length * 1000000,
        emptyRows,
        emptyCols: emptyColumns,
    };
};

const getDistance = (
    coord1: Coordinate,
    coord2: Coordinate,
    expandedInfo: ExpandedInfo
) => {
    let yDiff = Math.abs(coord1.y - coord2.y);
    let xDiff = Math.abs(coord1.x - coord2.x);

    yDiff +=
        countIntervening(coord1.y, coord2.y, expandedInfo.emptyRows) *
        expandedInfo.emptyRowCount;
    xDiff +=
        countIntervening(coord1.x, coord2.x, expandedInfo.emptyCols) *
        expandedInfo.emptyColCount;

    return yDiff + xDiff;
};

const countIntervening = (
    coord1: number,
    coord2: number,
    emptyLines: number[]
): number => {
    return emptyLines.filter(
        (line) =>
            line > Math.min(coord1, coord2) && line < Math.max(coord1, coord2)
    ).length;
};

const run11A = (input: string) => {
    const expandedInfo: ExpandedInfo = expandSpace(input);
    let shipCoords: Coordinate[] = [];
    input.split("\n").forEach((line, y) => {
        line.split("").forEach((char, x) => {
            if (char === "#") {
                shipCoords.push({ x: x, y: y });
            }
        });
    });

    let sumDistance = 0;
    for (let i = 0; i < shipCoords.length; i++) {
        for (let j = i + 1; j < shipCoords.length; j++) {
            sumDistance += getDistance(
                shipCoords[i],
                shipCoords[j],
                expandedInfo
            );
        }
    }
    return sumDistance;
};

console.log(run11A(sampleInput));
console.log(run11A(fullInput));
