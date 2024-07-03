import { day6 } from "../input";

function extractNumbers(input: string): number[] {
    const numberPattern = /\d+/g; // Regular expression to match numbers
    const matches = input.match(numberPattern);

    if (!matches) {
        return []; // Return an empty array if no numbers are found
    }

    return matches.map(Number); // Convert each string to a number
}

function getWinningTimes(time: number, distance: number) {
    const winningTimes: number[] = [];

    for (let timeButtonHeld = time - 1; timeButtonHeld > 0; timeButtonHeld--) {
        const timeSpentMoving = time - timeButtonHeld;
        const distanceTraveled = timeSpentMoving * timeButtonHeld;

        if(distanceTraveled > distance) {
            winningTimes.push(timeButtonHeld);
        }
    }

    return winningTimes;
}

/***************************** */
// parse Input
const input = day6.main;
const lines = input.split("\n");
const [times, distances] = lines.map(line => extractNumbers(line));

// get the ways to win for each race
const winningTimesArrays: number[][] = [];
times.forEach((time, index) => {
    const winningTimes = getWinningTimes(time, distances[index]);
    winningTimesArrays.push(winningTimes);
})

// calc the final answer
const product = winningTimesArrays.reduce((acc, winningTimeArray) => {
    return acc * winningTimeArray.length;
}, 1)
console.log(product);