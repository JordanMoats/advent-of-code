import { day5 } from "../input";

const getStacks = (lines: string[]) => {
    let stacks: string[][] = [];
    let stackCount = lines[lines.length - 1].trim().split(" ").length;

    let stackIndex = 1;
    for (let stackNum = 1; stackNum <= stackCount; stackNum++) {
        let newStack: string[] = [];
        let lineIndex = lines.length - 1;
        while (lineIndex >= 0 && lines[lineIndex][stackIndex] !== " ") {
            newStack.push(lines[lineIndex][stackIndex]);
            lineIndex--;
        }
        stacks.push(newStack);
        stackIndex += 4;
    }
    return stacks;
};

const processMove = (stacks: string[][], move: string) => {
    let moveParts = move.split(" ");
    let moveCount = parseInt(moveParts[1]);
    let from = parseInt(moveParts[3]);
    let to = parseInt(moveParts[5]);

    let blocks: string[] = [];
    for (let i = 0; i < moveCount; i++) {
        blocks.push(stacks[from - 1].pop()!);
    }
    blocks.reverse();
    blocks.forEach((block) => {
        stacks[to - 1].push(block);
    });
    return stacks;
};
/*******************************/

const input = day5.main;
const lines = input.split("\n");

let numIndex = 0;
let lineString = lines[0];
while (!lineString.includes("1")) {
    numIndex++;
    lineString = lines[numIndex];
}

let stackLines = lines.slice(0, numIndex);
let moveLines = lines.slice(numIndex + 1);
let stacks: string[][] = getStacks(stackLines);

moveLines.forEach((move) => {
    stacks = processMove(stacks, move);
});

let finalString = "";
stacks.forEach((stack) => {
    finalString += stack.pop();
});

console.log(finalString);
