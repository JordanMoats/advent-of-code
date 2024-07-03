import { day18 } from "../input";

interface Coordinate {
    x: number,
    y: number
}

const buildGrid = (moves: [string, number][]) => {
    let position = {
        x: 0,
        y: 0
    }
    let visited: { x: number; y: number }[] = [{x: 0, y: 0}];
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    moves.forEach(move => {
        while(move[1] > 0) {
            let newPos = {
                x: position.x,
                y: position.y,
            };
            switch (move[0]) {
                case "R":
                    newPos.x++;
                    break;
                case "U":
                    newPos.y--;
                    break;
                case "D":
                    newPos.y++;
                    break;
                case "L":
                    newPos.x--;
                    break;
                default:
                    throw new Error("how the fuck did you get here?")
            }
            visited.push(newPos);
            position = {
                x: newPos.x,
                y: newPos.y
            }
            if(position.x < minX) {
                minX = position.x;
            }
            if(position.x > maxX) {
                maxX = position.x;
            }
            if(position.y < minY) {
                minY = position.y;
            }
            if (position.y > maxY) {
                maxY = position.y;
            }
            move[1]--;
        }
    });
    let grid: string[][] = [];
    for (let i = minY; i <= maxY; i++) {
        let blankArray = new Array(maxX - minX + 1).fill(".");

        visited.forEach(pos => {
            if(pos.y === i) {
                blankArray[pos.x - minX] = "x";
            }
        });
        grid.push(blankArray);        
    }
    return grid;
}

function getConnectedDots(
    grid: string[][],
    coordinate: Coordinate
): Coordinate[] {
    // Set to keep track of visited coordinates
    let visited = new Set<string>();

    // Check if the coordinate is out of bounds, already visited, or not a dot
    function isOutOfBoundsOrVisitedOrNotDot(x: number, y: number): boolean {
        let key = `${x},${y}`;
        return (
            x < 0 ||
            y < 0 ||
            x >= grid[0].length ||
            y >= grid.length ||
            grid[y][x] !== "." ||
            visited.has(key)
        );
    }

    // Depth First Search to find connected dots
    function dfs(x: number, y: number, connected: Coordinate[]) {
        if (isOutOfBoundsOrVisitedOrNotDot(x, y)) {
            return;
        }

        // Mark the current dot as visited
        visited.add(`${x},${y}`);
        connected.push({ x, y });

        // Search in all four directions
        dfs(x + 1, y, connected);
        dfs(x - 1, y, connected);
        dfs(x, y + 1, connected);
        dfs(x, y - 1, connected);
    }

    let connectedDots: Coordinate[] = [];
    dfs(coordinate.x, coordinate.y, connectedDots);
    return connectedDots;
}


/**
 * Idea, follow through the directions and mark every square in a string array that you travel to. 
 * Then, go around the perimeter of the array and do a search to count how many unmarked squares you can reach from the edge.
 */
const input = day18.main;
const lines = input.split("\n");
const moves: [string, number][] = lines.map(line => {
    const [direction, numStr] = line.split(" (")[0].split(" ");
    return [direction, parseInt(numStr)];
});

const grid = buildGrid(moves);

let stringCoordSet = new Set<string>;

grid.forEach((strArr, index) => {
    const tempFunc = (coord: {x: number, y: number}) => {
        let newCoords = getConnectedDots(grid, coord);
        newCoords.forEach(newCoord => {
            stringCoordSet.add(JSON.stringify(newCoord));
        })
    }
    if(index === 0) {
        strArr.forEach((element, index) => {
            if (element === ".") {
                tempFunc({ x: index, y: 0 });
            }
        });
    }
    if (index === grid.length - 1) {
        strArr.forEach((element, index) => {
            if (element === ".") {
                tempFunc({ x: index, y: grid.length - 1});
            }
        });
    }
    if(strArr[0] === "." ) {
        tempFunc({ x: 0, y: index });
    }
    if (strArr[strArr.length - 1] === ".") {
        tempFunc({ x: strArr.length - 1, y: index });
    }
});


const totalArea = (grid.length) * (grid[0].length);

console.log(totalArea - stringCoordSet.size);