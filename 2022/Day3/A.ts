import { day3 } from "../input";

const letterToNumber = (letter: string): number => {
    if (letter.length !== 1 || !/[A-Za-z]/.test(letter)) {
        throw new Error("Input must be a single letter");
    }

    const asciiCode = letter.charCodeAt(0);

    if (letter === letter.toLowerCase()) {
        // Lowercase letters
        return asciiCode - "a".charCodeAt(0) + 1;
    } else {
        // Uppercase letters
        return asciiCode - "A".charCodeAt(0) + 27;
    }
}

const getSharedLetter = (line: string) => {
    // Split line in half
    let compartment1 = line.substring(0, line.length / 2);
    let compartment2 = line.substring(line.length / 2);

    // Find common letter
    let visited: string[] = [];
    for (let i = 0; i < compartment1.length; i++) {
        if (compartment2.includes(compartment1[i])) {
            return compartment1[i];
        }
    }
    return null;
}

/************************************/

const input = day3.main;
const lines = input.split("\n");

let sum = 0;
lines.forEach(line => {
    let sharedLetter = getSharedLetter(line);
    let num = letterToNumber(sharedLetter!);
    sum += num;
    console.log(`${sharedLetter}, ${num}`);
});

console.log(`Final sum: ${sum}`);