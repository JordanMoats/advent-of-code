import { readFile, readFileSync } from "fs";
import { join } from "path";

let input;
try {
    input = readFileSync("2021/day4/main.txt", "utf8");
} catch (error) {
    console.error(`Error reading file: ${error}`);
}

const pieces = input.split("\n\n");

let numberQueue = pieces
    .shift()
    .split(",")
    .map((str) => parseInt(str));

let boards = [];
for (const piece of pieces) {
    const lines = piece.split("\n");
    let board = [];
    for (const line of lines) {
        let row = line.split(" ");
        row = row.filter((str) => {
            return str !== "";
        });
        row = row.map((str) => {
            return parseInt(str);
        });
        board.push(row);
    }
    boards.push(board);
}

const updateBoard = (board, scoredNum) => {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (parseInt(board[rowIndex][colIndex]) === scoredNum) {
                board[rowIndex][colIndex] = -1;
            }
        }
    }
};

const checkForWin = (board) => {
    let rowWin, colWin;
    // Check rows
    rowWin = board.some((row) => {
        return row.every((num) => num === -1);
    });

    for (let i = 0; i < 5; i++) {
        let thisColWin = board.every((row) => {
            return row[i] === -1;
        });
        if (thisColWin) {
            colWin = true;
        }
    }

    return rowWin || colWin;
};

const printBoard = (board) => {
    board.forEach((row) => {
        console.log(row.join());
    });
    console.log("\n");
};

while (numberQueue.length > 0) {
    let nextNum = numberQueue.shift();

    for (let i = 0; i < boards.length; i++) {
        updateBoard(boards[i], nextNum);
    }

    let winningBoards = boards.filter((board) => {
        return checkForWin(board);
    });

    if (winningBoards.length > 0) {
        let winningBoard = winningBoards[0];

        printBoard(winningBoard);

        let sum = 0;
        winningBoard.forEach((row) => {
            row.forEach((num) => {
                if (num !== -1) {
                    sum += num;
                }
            });
        });

        console.log(`sum: ${sum}, nextNum: ${nextNum}, product: ${sum * nextNum}`);
        break;
    }
}

console.log("finished execution");