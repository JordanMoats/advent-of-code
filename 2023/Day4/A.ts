import { day4 } from "../input"

const calcScore = (winningNums: String[], nums: String[]) => {
    let winningCount = 0;

    for (const num of nums) {
        if (winningNums.includes(num)) {
            winningCount++;
        }
    }

    if (winningCount <= 0) {
        return 0;
    } else {
        return 1 * (Math.pow(2, winningCount - 1));
    }
}

const run = () => {
    const input: string = day4.main;
    const lines = input.split('\n');

    let sum = 0;
    for (const line of lines) {
        const linePieces = line.split(":");
        const [winningNumString, numString] = linePieces[1].split("|");
        const winningNums = winningNumString.trim().replace("  ", " ").split(" ");
        const nums = numString.trim().replace("  ", " ").split(" ");

        const score = calcScore(winningNums, nums);
        sum += score;
        console.log(`line: ${line}, score: ${score}`);
    }

    console.log(sum);
}
run()