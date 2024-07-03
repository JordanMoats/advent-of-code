import { day2 } from "../input";

const getRPS = (str: string) => {
    if (str === "A" || str === "X") {
        return "R";
    } else if (str === "B" || str === "Y") {
        return "P";
    } else if (str === "C" || str === "Z") {
        return "S"
    } else {
        return null;
    }
}

const getPlayerScore = (game: [string, string]) => {
    const botThrow = getRPS(game[0]);
    const userThrow = getRPS(game[1]);
    let score = 0;
    if (userThrow === "R") {
        score += 1;
        if (botThrow === "R") {
            score += 3;
        } else if (botThrow === "P") {
            score += 0;
        } else if (botThrow === "S") {
            score += 6;
        }
    } else if (userThrow === "P") {
        score += 2;
        if (botThrow === "R") {
            score += 6;
        } else if (botThrow === "P") {
            score += 3;
        } else if (botThrow === "S") {
            score += 0;
        }
    } else if (userThrow === "S") {
        score += 3;
        if (botThrow === "R") {
            score += 0;
        } else if (botThrow === "P") {
            score += 6;
        } else if (botThrow === "S") {
            score += 3;
        }
    }
    return score;
}
/************************ */

const lines = day2.main.split("\n");
const games: [string, string][] = lines.map(line => {
    let linePieces = line.split(" ");
    return [linePieces[0], linePieces[1]];
});

let scoreSum = 0;
games.forEach(game => {
    scoreSum += getPlayerScore(game);
});

console.log(scoreSum);