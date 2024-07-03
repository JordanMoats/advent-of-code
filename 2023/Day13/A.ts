import { day13 } from "../input";

function checkPatternForHorizontalSymmetry(patternGrid: string[]): number {
    let leftMirrorIndices: number[] = [];
    for (let i = 0; i < patternGrid[0].length - 1; i++) {
        let columnMatchesNextColumn = patternGrid.every((line) => {
            return line[i] === line[i + 1];
        });
        if (columnMatchesNextColumn) {
            leftMirrorIndices.push(i);
        }
    }

    let validMirrorIndex = -2;
    leftMirrorIndices.forEach((leftMirrorIndex) => {
        let validMirrorPoint: boolean = patternGrid.every((line) => {
            let leftPointer = leftMirrorIndex;
            let rightPointer = leftMirrorIndex + 1;

            while (leftPointer >= 0 && rightPointer < line.length) {
                if (line[leftPointer] !== line[rightPointer]) {
                    return false;
                }
                leftPointer--;
                rightPointer++;
            }
            return true;
        });

        if (validMirrorPoint) {
            validMirrorIndex = leftMirrorIndex;
        }
    });

    return validMirrorIndex + 1;
}

function checkPatternForVerticalSymmetry(patternGrid: string[]): number {
    let topMirrorIndices = [];
    for (let i = 0; i < patternGrid.length - 1; i++) {
        if (patternGrid[i] === patternGrid[i + 1]) {
            topMirrorIndices.push(i);
        }
    }

    let validMirrorIndex = -2;
    topMirrorIndices.forEach((topMirrorIndex) => {
        let validMirrorPoint = true;
        for (
            let above = topMirrorIndex, below = topMirrorIndex + 1;
            above >= 0 && below < patternGrid.length;
            above--, below++
        ) {
            for (let j = 0; j < patternGrid[above].length; j++) {
                if (patternGrid[above][j] !== patternGrid[below][j]) {
                    validMirrorPoint = false;
                    break;
                }
            }
            if (!validMirrorPoint) break;
        }

        if (validMirrorPoint) {
            validMirrorIndex = topMirrorIndex;
        }
    });

    return validMirrorIndex + 1;
}

/*****************************/

const input = day13.main;
const patternStrings = input.split("\n\n");

const patternGrids: string[][] = patternStrings.map((patternString) => {
    return patternString.split("\n");
});

let colsToTheLeft = 0;
let rowsAbove = 0;
patternGrids.forEach((patternGrid) => {
    let leftOfMirror = checkPatternForHorizontalSymmetry(patternGrid);
    let aboveMirror = checkPatternForVerticalSymmetry(patternGrid);
    if (leftOfMirror !== -1) {
        colsToTheLeft += leftOfMirror;
    }
    if (aboveMirror !== -1) {
        rowsAbove += 100 * aboveMirror;
    }
});

console.log(colsToTheLeft + rowsAbove);
