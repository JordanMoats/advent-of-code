import { day10 } from "../input";

function getDiffArray(nums: number[]) {
    let newArray: number[] = [];

    for (let i = 0; i < nums.length - 1; i++) {
        newArray.push(nums[i + 1] - nums[i]);
    }

    return newArray;
}

function getAllDiffArrays(nums: number[]) {
    let diffArrays: number[][] = [nums];

    let allZero = false;
    while (!allZero) {
        nums = getDiffArray(nums);
        diffArrays.push(nums);

        allZero = nums.every((num) => num === 0);
    }

    return diffArrays;
}

function addNewValues(diffArrays: number[][]) {
    const newValuesAdded: number[] = [];

    for(let i = diffArrays.length - 1; i > 0; i--) {
        let currentArray = diffArrays[i];
        let nextArray = diffArrays[i - 1];

        let numToAdd = nextArray[0] - currentArray[0];

        newValuesAdded.push(numToAdd);
        diffArrays[i - 1].unshift(numToAdd);
    }

    return newValuesAdded;
}

/**********************************************/

const input = day10.main;

const lines = input.split("\n");

let arrays: number[][] = lines.map(line => {
    return line.split(" ").map(numString => parseInt(numString));
});

let diffArrays: number[][][] = arrays.map(array => getAllDiffArrays(array));

let numsAddedArrays: number[][] = diffArrays.map(diffArray => addNewValues(diffArray));

let finalSum = numsAddedArrays.reduce((acc, numArray) => {
    return acc + numArray[numArray.length - 1];
}, 0);

console.log(finalSum);