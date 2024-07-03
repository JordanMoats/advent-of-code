import { day2 } from "../input";

const getScore = (gameLine: string) => {
    let gameScore = 0;
    const [botThrow, gameOutcome] = gameLine.split(" ");
    if (gameOutcome === "X") {
        gameScore += 0;
        if (botThrow === "A") {
            gameScore += 3;
        }
        if (botThrow === "B") {
            gameScore += 1;
        }
        if (botThrow === "C") {
            gameScore += 2;
        }
    } else if (gameOutcome === "Y") {
        gameScore += 3;
        if (botThrow === "A") {
            gameScore += 1;
        }
        if (botThrow === "B") {
            gameScore += 2;
        }
        if (botThrow === "C") {
            gameScore += 3;
        }
    } else if (gameOutcome === "Z") {
        gameScore += 6;
        if (botThrow === "A") {
            gameScore += 2;
        }
        if (botThrow === "B") {
            gameScore += 3;
        }
        if (botThrow === "C") {
            gameScore += 1;
        }
    }
    return gameScore;
}

const input = day2.main;
const lines = input.split("\n");

const scoreSum = lines.reduce((acc, line) => {
    return acc + getScore(line.trim());
}, 0);

console.log(scoreSum);