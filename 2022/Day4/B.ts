import { day4 } from "../input";

const checkRowIntersectsOtherRow = (
    low1: number,
    high1: number,
    low2: number,
    high2: number
): boolean => {
    if (high1 >= low2 && high1 <= high2) {
        return true;
    } else if (high2 >= low1 && high2 <= high1) {
        return true;
    } else {
        return false;
    }
};

const input = day4.main;
const lines = input.split("\n");

const bools = lines.map((line) => {
    let pairs = line.split(",");
    let [low1, high1] = pairs[0].split("-").map((str) => parseInt(str));
    let [low2, high2] = pairs[1].split("-").map((str) => parseInt(str));
    return checkRowIntersectsOtherRow(low1, high1, low2, high2);
});

const count = bools.reduce((acc, bool) => {
    return bool ? acc + 1 : acc;
}, 0);

console.log(count);
