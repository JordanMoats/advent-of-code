import { day6 } from "../input";

function extractNumbers(input: string): number[] {
    const numberPattern = /\d+/g; // Regular expression to match numbers
    const matches = input.match(numberPattern);

    if (!matches) {
        return []; // Return an empty array if no numbers are found
    }

    return matches.map(Number); // Convert each string to a number
}

function combineNums(nums: number[]) {
    let combinedNumString = nums.reduce((acc, time) => {
        return `${acc}${time}`;
    }, '');
    
    return parseInt(combinedNumString);
}

function getWinningTimes(time: number, distance: number) {
    let firstWinningButtonDuration: number;

    for (let timeButtonHeld = 0; timeButtonHeld < time; timeButtonHeld++) {
        const timeSpentMoving = time - timeButtonHeld;
        const distanceTraveled = timeSpentMoving * timeButtonHeld;

        if (distanceTraveled > distance) {
            firstWinningButtonDuration = timeButtonHeld;
            break;
        }
    }

    let lastWinningDuration: number;
    for (let timeButtonHeld = time - 1; timeButtonHeld > 0; timeButtonHeld--) {
        let timeSpentMoving = time - timeButtonHeld;
        const distanceTraveled = timeSpentMoving * timeButtonHeld;

        if(distanceTraveled > distance) {
            lastWinningDuration = timeButtonHeld;
            break;
        }
    } 

    return [firstWinningButtonDuration!, lastWinningDuration!];
}



/*********************************************************************/



const input = day6.main;
const lines = input.split('\n');

const [times, distances] = lines.map(line => extractNumbers(line));

const time = combineNums(times);
const distance = combineNums(distances);

const [firstTime,lastTime] = getWinningTimes(time, distance);

let numberOfWaysToWin = lastTime - firstTime + 1; 
console.log(`${numberOfWaysToWin}`);