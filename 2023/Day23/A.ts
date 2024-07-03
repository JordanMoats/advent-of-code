import { day23 } from "../input";

interface Coordinate {
    y: number;
    x: number;
}

const getGrid = (input: string) => {
    const lines = input.split("\n");
    const arrays = lines.map((line) => line.split(""));
    return arrays;
};

const getStartingPosition = (grid: string[][]) => {
    const startingCoord = { y: 0, x: grid[0].indexOf(".") };
    return startingCoord;
};

const getOpenAdjacentSpaces = (
    coord: Coordinate,
    grid: string[][]
): Coordinate[] => {
    const openAdjacentSpaces: Coordinate[] = [];
    const currentTile = grid[coord.y][coord.x];

    const addSpaceIfValid = (y: number, x: number) => {
        if (grid[y] && grid[y][x] && grid[y][x] !== "#") {
            openAdjacentSpaces.push({ y, x });
        }
    };

    switch (currentTile) {
        case "^":
            addSpaceIfValid(coord.y - 1, coord.x);
            break;
        case "v":
            addSpaceIfValid(coord.y + 1, coord.x);
            break;
        case "<":
            addSpaceIfValid(coord.y, coord.x - 1);
            break;
        case ">":
            addSpaceIfValid(coord.y, coord.x + 1);
            break;
        case ".":
            // Add all valid adjacent spaces for a path
            addSpaceIfValid(coord.y - 1, coord.x); // Up
            addSpaceIfValid(coord.y + 1, coord.x); // Down
            addSpaceIfValid(coord.y, coord.x - 1); // Left
            addSpaceIfValid(coord.y, coord.x + 1); // Right
            break;
    }

    return openAdjacentSpaces;
};

const findLongestPath = (
    coord: Coordinate,
    grid: string[][],
    visited: Set<string>,
    currentLength: number,
    longest: { length: number }
) => {
    // Convert current coordinates to a string to store in the visited set
    const currentPos = `${coord.y}-${coord.x}`;
    if (visited.has(currentPos)) {
        return;
    }

    visited.add(currentPos);
    currentLength += 1;
    if (currentLength > longest.length) {
        longest.length = currentLength;
    }

    const nextMoves = getOpenAdjacentSpaces(coord, grid);
    for (const nextMove of nextMoves) {
        findLongestPath(nextMove, grid, visited, currentLength, longest);
    }

    // Backtrack
    visited.delete(currentPos);
};

/**
 * Track visited tiles. Do a depth-first search, find the longest path possible.
 */

const input = day23.main;
const grid: string[][] = getGrid(input);

const startingCoord: Coordinate = getStartingPosition(grid);

// Initialize the visited set and longest object
const visited = new Set<string>();
const longest = { length: 0 };

findLongestPath(startingCoord, grid, visited, -1, longest);

console.log("Longest Path Length:", longest.length);