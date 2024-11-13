import { day4 } from "../input"

interface Card {
    gameNum: number;
    winningNums: number[];
    nums: number[];
}

const getCard = (line: string): Card => {
    const [gameNumString, numStrings] = line.split(":");

    const gameNum = parseInt(gameNumString.split(" ")[1]);

    const [winningNumsString, numsString] = numStrings.split(" | ");
    const winningNums = winningNumsString.trim().split(/\s+/).map(Number);
    const nums = numsString.trim().split(/\s+/).map(Number);

    
    return {
        gameNum,
        winningNums,
        nums
    }
}

const calcScore = (card: Card): number => {
    const matchCount: number = card.nums.filter(num => card.winningNums.includes(num)).length;

    if (matchCount === 0) {
        return 0;
    } else {
        return Math.pow(2, matchCount -1);
    }
}

const run = () => {
    const input: string = day4.main;
    const lines = input.split('\n');

    const cards = lines.map(line => {
        return getCard(line);
    });

    let sum = 0;

    for (const card of cards) {
        sum += calcScore(card);
    }
    console.log(`Sum: ${sum}`);
}
run();