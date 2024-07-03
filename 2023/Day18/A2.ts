import { day18 } from "../input";

type Instruction = {
    direction: string;
    distance: number;
    color: string;
};

type Position = {
    x: number;
    y: number;
};

const GROUND_LEVEL = 0;
const DUG = 1;
const INTERIOR = 2; // Mark for the interior spaces

// Parses the dig plan into instructions
function parseDigPlan(plan: string[]): Instruction[] {
    return plan.map((line) => {
        const [direction, distanceStr, color] = line.split(" ");
        return {
            direction,
            distance: parseInt(distanceStr),
            color,
        };
    });
}

// Creates a grid of specified dimensions
function createGrid(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, () => Array(cols).fill(GROUND_LEVEL));
}

// Calculates the next position based on the direction
function calculateNextPosition(current: Position, direction: string): Position {
    switch (direction) {
        case "U":
            return { x: current.x, y: current.y - 1 };
        case "D":
            return { x: current.x, y: current.y + 1 };
        case "L":
            return { x: current.x - 1, y: current.y };
        case "R":
            return { x: current.x + 1, y: current.y };
        default:
            return current;
    }
}

// Determines the size of the grid needed based on the dig plan
function determineGridSize(instructions: Instruction[]): [number, number, Position] {
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    let currentPosition: Position = { x: 0, y: 0 };

    instructions.forEach(instruction => {
        for (let step = 0; step < instruction.distance; step++) {
            currentPosition = calculateNextPosition(currentPosition, instruction.direction);
            minX = Math.min(minX, currentPosition.x);
            maxX = Math.max(maxX, currentPosition.x);
            minY = Math.min(minY, currentPosition.y);
            maxY = Math.max(maxY, currentPosition.y);
        }
    });

    // Calculate the grid size and the adjusted starting position
    const padding = 10;
    const width = maxX - minX + 1 + padding * 2;
    const height = maxY - minY + 1 + padding * 2;
    const startPosition: Position = { x: -minX + padding, y: -minY + padding };

    return [height, width, startPosition];
}

// Simulates the digging process
function simulateDigging(
    grid: number[][],
    instructions: Instruction[],
    startPosition: Position
): void {
    let currentPosition = startPosition;
    grid[currentPosition.y][currentPosition.x] = DUG; // Marking the initial hole

    instructions.forEach((instruction) => {
        for (let step = 0; step < instruction.distance; step++) {
            currentPosition = calculateNextPosition(
                currentPosition,
                instruction.direction
            );
            grid[currentPosition.y][currentPosition.x] = DUG;
        }
    });
}

// Iterative flood fill algorithm to mark the interior area
function floodFill(grid: number[][], startX: number, startY: number, target: number, replacement: number): void {
    const stack: Position[] = [{ x: startX, y: startY }];

    while (stack.length > 0) {
        const { x, y } = stack.pop()!;

        if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length || grid[y][x] !== target) {
            continue;
        }

        grid[y][x] = replacement;

        stack.push({ x: x + 1, y: y });
        stack.push({ x: x - 1, y: y });
        stack.push({ x: x, y: y + 1 });
        stack.push({ x: x, y: y - 1 });
    }
}

// Extends the digging for the interior area
function extendDiggingForInterior(grid: number[][]): void {
    // Flood fill from the edges to mark undug cells that are not part of the interior
    for (let x = 0; x < grid[0].length; x++) {
        if (grid[0][x] === GROUND_LEVEL)
            floodFill(grid, x, 0, GROUND_LEVEL, INTERIOR);
        if (grid[grid.length - 1][x] === GROUND_LEVEL)
            floodFill(grid, x, grid.length - 1, GROUND_LEVEL, INTERIOR);
    }
    for (let y = 0; y < grid.length; y++) {
        if (grid[y][0] === GROUND_LEVEL)
            floodFill(grid, 0, y, GROUND_LEVEL, INTERIOR);
        if (grid[y][grid[0].length - 1] === GROUND_LEVEL)
            floodFill(grid, grid[0].length - 1, y, GROUND_LEVEL, INTERIOR);
    }

    // Dig out the remaining ground-level cells (the interior)
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === GROUND_LEVEL) {
                grid[y][x] = DUG;
            }
        }
    }
}

// Calculates the volume of the lagoon
function calculateVolume(grid: number[][]): number {
    let volume = 0;
    for (const row of grid) {
        for (const cell of row) {
            if (cell === DUG) {
                volume++;
            }
        }
    }
    return volume;
}

// Main function to calculate the lagoon volume
function calculateLagoonVolume(digPlan: string[]): number {
    const instructions = parseDigPlan(digPlan);
    const [gridHeight, gridWidth, startPosition] = determineGridSize(instructions);
    const grid = createGrid(gridHeight, gridWidth);

    simulateDigging(grid, instructions, startPosition);
    extendDiggingForInterior(grid);
    return calculateVolume(grid);
}



// Example usage
const digPlan = day18.main.split("\n");

console.log(`Lagoon Volume: ${calculateLagoonVolume(digPlan)} cubic meters`);
