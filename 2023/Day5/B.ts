import { day5 } from "../input";

interface Plot {
	firstNum: number,
    lastNum: number,
	type: string
}

const nextPlotType = new Map<string, string>([
	["seed", "soil"],
	["soil", "fertilizer"],
	["fertilizer", "water"],
	["water", "light"],
	["light", "temperature"],
	["temperature", "humidity"],
	["humidity", "location"],
]);

// Function to get the map for each level
const input = day5.main;
let sections = input.split("\n\n");

// Get seed ranges
let seedArray = sections.shift()?.split(":")[1].trim().split(" ").map(str => parseInt(str));
let plots: Plot[] = [];
seedArray?.forEach((num, index) => {
    if(index % 2 === 0) {
        let firstSeed = num;
        let lastSeed = num + seedArray![index + 1] - 1;
        let seedType = "seed";

        plots.push({
            firstNum: firstSeed,
            lastNum: lastSeed,
            type: seedType
        });
    }
});

const conversionMap = new Map<string, number[][]>();
for(let i = 0; i < sections.length; i++) {
    let sectionString = sections[i];
    
    let lines = sectionString.split("\n");
    let inputType = lines[0].split(" ")[0].split("-to-")[0];

    let arrays: number[][] = [];
    for(let j = 1; j < lines.length; j++) {
        let arrayString = lines[j];
        let nums = arrayString.split(" ").map(str => parseInt(str));
        arrays.push(nums);
    }
    
    conversionMap.set(inputType, arrays);
}

console.log(plots);
console.log(conversionMap);