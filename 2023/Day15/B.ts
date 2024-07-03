import { getHashValue } from "./A"

const getSampleInput = () => {
    const inputFile = Bun.file(
        "llm-playground/src/lib/adventOfCode/Day15/sampleInput.txt"
    );
    return inputFile.text();
};

const getInput = () => {
    const inputFile = Bun.file(
        "llm-playground/src/lib/adventOfCode/Day15/input.txt"
    );
    return inputFile.text();
};

interface Lens {
    label: string,
    focalLength: number
}

let boxMap = new Map<number, Lens[]>();

function getLens(str: string) {
    const newLens = {
        label: str.split("=")[0],
        focalLength: parseInt(str.split("=")[1]),
    };
    return newLens;
}

function processLensString(str: string) {
    if(str.includes("=")) {
        const lens: Lens = getLens(str);
        const destinationBox: number = getHashValue(lens.label);
        
        let boxContents = boxMap.get(destinationBox) ?? [];
        let indexToSwap = boxContents.findIndex((lensToCheck) => {
            if(lens.label === lensToCheck.label) {
                return true;
            } else {
                return false;
            }
        })
        if(indexToSwap === -1) {
            boxContents.push(lens);
        } else {
            boxContents[indexToSwap] = lens;
        }
        boxMap.set(destinationBox, boxContents);
    }
    if(str.includes("-")) { 
        const lensLabel = str.replace("-", "");
        const boxToRemoveFrom = getHashValue(lensLabel);

        let boxContents = boxMap.get(boxToRemoveFrom);
        if(boxContents) {
            let indexToRemove = boxContents.findIndex((lens) => {
                if(lens.label === lensLabel) {
                    return true;
                } else {
                    return false;
                }
            });
            if(indexToRemove !== -1) {
                boxContents.splice(indexToRemove, 1);
            }
        }
    }
}

const input = await getInput();
let lensStrings = input.split(",");
lensStrings.forEach((lensString) => {
    processLensString(lensString);
});

boxMap.forEach((boxContents, boxNumber) => {
    
});

// After all the strings and boxes have been built
let sum = 0;
boxMap.forEach((boxContents, boxNumber) => {
    

    

    boxContents.forEach((lens, index) => {
        let numToAdd = (boxNumber + 1) * (index + 1) * (lens.focalLength)
        sum += numToAdd;
    });
});

console.log(sum);

