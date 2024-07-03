import { day1 } from "../input";

let input = day1.main;

let sections = input.split("\n\n");

let sums = sections.map((section) => {
    let lines = section.split("\n");
    let total = lines.reduce((acc, line) => {
        return acc + parseInt(line);
    }, 0);
    return total;
});

sums.sort((a, b) => {
    return b - a;
});

console.log(sums[0] + sums[1] + sums[2]);