import { day3 } from "../input";

const getSharedLetter = (str1: string, str2: string, str3: string) => {
    for (let i = 0; i < str1.length; i++) {
        if (str2.includes(str1[i]) && str3.includes(str1[i])) {
            return str1[i];
        }
    }
    return null;
}

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
};

/********************************/

const input = day3.main;

let lines = input.split("\n");

let trios: string[][] = [];
for (let i = 0; i < lines.length; i += 3) {
    let newArray = [
        lines[i],
        lines[i + 1],
        lines[i + 2]
    ];
    trios.push(newArray);
}

let sharedLetters: string[] = trios.map(trio => {
    return getSharedLetter(trio[0], trio[1], trio[2])!;
});

let sum = sharedLetters.reduce((acc, letter) => {
    return acc + letterToNumber(letter);
}, 0);

console.log(sum);
