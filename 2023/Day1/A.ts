import { day1 } from "../input";

const isDigit = (char: string) => {
    if (char.length !== 1) {
        return false;
    }
    return '0129384756'.includes(char);
}

const run = () => {
    const input = day1.main;
    const lines = input.split('\n');
    let sum = 0;

    for (const line of lines) {
        let left = 0;
        let leftFound = false;

        let right = line.length - 1;
        let rightFound = false;

        while (left < line.length && !leftFound) {

            if (isDigit(line[left])) {
                leftFound = true;
                left--;
            }
            left++;
        }

        while (right >= 0 && !rightFound) {
            if (isDigit(line[right])) {
                rightFound = true;
                right++;
            }
            right--;
        }

        if (leftFound && rightFound) {
            sum += parseInt(line[left] + line[right])
        }
    }

    console.log(sum);
}
run();