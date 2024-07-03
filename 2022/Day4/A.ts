import { day4 } from "../input";

const checkRowContainsOtherRow = (low1: number, high1: number, low2: number, high2: number): boolean => {
    if (low1 === low2 || high1 === high2) {
        return true;
    }
    let rowContainsOtherRow: boolean;

    if (low1 >= low2) {
        if (high1 <= high2) {
            rowContainsOtherRow = true;
        } else {
            rowContainsOtherRow = false;
        }
    } else if (low2 >= low1) {
        if (high2 <= high1) {
            rowContainsOtherRow = true;
        } else {
            rowContainsOtherRow = false;
        }
    } else {
        rowContainsOtherRow = false;
    }
    return rowContainsOtherRow;
}

const input = day4.main;
const lines = input.split("\n");

const bools = lines.map(line => {
    let pairs = line.split(",");
    let [low1, high1] = pairs[0].split("-").map(str => parseInt(str));
    let [low2, high2] = pairs[1].split("-").map((str) => parseInt(str));
    return checkRowContainsOtherRow(low1, high1, low2, high2);
});

const count = bools.reduce((acc, bool) => {
    return bool ? acc + 1 : acc;
}, 0)

console.log(count);