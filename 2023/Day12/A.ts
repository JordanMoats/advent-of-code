import { day12 } from "../input";

// Checks if a given arrangement is valid
function checkConfig(str: string, nums: number[]): boolean {
    if (str.includes("?")) {
        throw new Error("String has a question mark.")
    }

    const regex = /\.{1,}/;

    str = str.replace(/^\.*|\.*$/g, "");

    const strings = str.split(regex);
    const passes: boolean = strings.every((str, index) => {
        return str.length === nums[index];
    });
    return passes;
}

function getPossibleArrangements(str: string, nums: number[]): string[] {
    if(!str.includes("?")) {
        throw new Error("You shouldn't be here.")
    }
    const hashGoal = nums.reduce((acc, num) => {
        return acc + num;
    }, 0);



    const qMarkIndices: number[] = [];
    let hashCount = 0;
    str.split("").forEach((char, index) => {
        if(char === "?") {
            qMarkIndices.push(index);
        } 
        else if(char === "#") {
            hashCount++;
        }
    });

    const possibleCombinations = getSubsetsOfSizeN(qMarkIndices, hashGoal - hashCount);

    const possibleStrings = possibleCombinations.map((indicesToReplace) => {
        let possibleString = str.split("").reduce( (acc, character, index) => {
            if(character !== "?") {
                return acc + character;
            } else {
                if(indicesToReplace.includes(index)) {
                    return acc + "#";
                } else {
                    return acc + ".";
                }
            }
        }, "");
        return possibleString;
    });

    const validStrings: string[] = [];
    possibleStrings.forEach(str => {
        if(checkConfig(str, nums)) {
            validStrings.push(str);
        }
    });

    return validStrings;
}

function getSubsetsOfSizeN<T>(array: T[], n: number): T[][] {
    // Function to recursively find the subsets
    function findSubsets(
        i: number,
        currentSubset: T[],
        allSubsets: T[][]
    ): void {
        // Base case: if current subset size is equal to n, add it to the result
        if (currentSubset.length === n) {
            allSubsets.push([...currentSubset]);
            return;
        }

        // If the remaining elements plus current subset size is less than n, return
        if (array.length - i + currentSubset.length < n) {
            return;
        }

        // Include the current element and recurse
        currentSubset.push(array[i]);
        findSubsets(i + 1, currentSubset, allSubsets);

        // Exclude the current element and recurse
        currentSubset.pop();
        findSubsets(i + 1, currentSubset, allSubsets);
    }

    const allSubsets: T[][] = [];
    findSubsets(0, [], allSubsets);
    return allSubsets;
}


/**********************************************/
function run() {
    const input = day12.sample;
    const lines = input.split("\n");

    const possibleArrangements: string[][] = lines.map(line => {
        const [str, numsString] = line.split(" ");
        const nums = numsString.split(",").map(num => parseInt(num));
        return getPossibleArrangements(str, nums);
    });

    let sum = possibleArrangements.reduce((acc, arrangements) => {
        return acc + arrangements.length;
    }, 0);

    console.log(sum);
}
try {
    run();
} catch (e) {
    console.log(e);
}