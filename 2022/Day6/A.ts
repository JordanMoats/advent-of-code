import { day6 } from "../input";

const getIndex = (input: string) => {
    let recentThree = input.substring(0, 13).split("");
    for (let i = 13; i < input.length; i++) {
        let setToCheck = new Set([...recentThree, input[i]]);
        if (setToCheck.size === 14) {
            console.log(Array.from(setToCheck) + "settocheck");
            return i;
        } else {
            recentThree.splice(0, 1);
            recentThree.push(input[i]);
        }
    }
    return null;
}

const input = day6.main;

console.log(getIndex(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`)! + 1);
console.log(getIndex(`bvwbjplbgvbhsrlpgdmjqwftvncz`)! + 1);
console.log(getIndex(`nppdvjthqldpwncqszvftbrmjlhg`)! + 1);
console.log(getIndex(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)! + 1);
console.log(getIndex(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)! + 1);

console.log(getIndex(input)! + 1);