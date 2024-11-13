import { day1 } from "../input";

const input = day1.main;
const sections = input.split("\n\n");

let largestTotal = 0;

sections.forEach((section) => {
    let lines = section.split("\n");
    let total = lines.reduce((acc, line) => {
        return acc + parseInt(line);
    }, 0);
    if (total > largestTotal) {
        largestTotal = total;
    }
});

console.log(largestTotal);