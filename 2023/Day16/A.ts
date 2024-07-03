import { day16 } from "../input";

interface Coordinate {
    x: number;
    y: number;
}

interface Beam {
    coord: Coordinate,
    direction: string
}

function getNorth(coord: Coordinate): Coordinate {
    return { x: coord.x, y: coord.y - 1 };
}

function getSouth(coord: Coordinate): Coordinate {
    return { x: coord.x, y: coord.y + 1 };
}

function getEast(coord: Coordinate): Coordinate {
    return { x: coord.x + 1, y: coord.y };
}

function getWest(coord: Coordinate): Coordinate {
    return { x: coord.x - 1, y: coord.y };
}

const updateBeam = (beam: Beam, grid: string[][]) => {
    let newBeams: Beam[] = [];

    let newCoord: Coordinate;
    switch (beam.direction) {
        case "N":
            newCoord = getNorth(beam.coord);
            if(newCoord.y < 0 || newCoord.y >= grid.length || newCoord.x < 0 || newCoord.x >= grid[0].length) {
                return newBeams;
            }
            if(grid[newCoord.y][newCoord.x] === "|") {
                newBeams.push({ coord: newCoord, direction: "N" });
            } else if (grid[newCoord.y][newCoord.x] === "-") {
                newBeams.push({ coord: newCoord, direction: "E" });
                newBeams.push({ coord: newCoord, direction: "W" });
            } else if (grid[newCoord.y][newCoord.x] === "/") {
                newBeams.push({ coord: newCoord, direction: "E" });
            } else if (grid[newCoord.y][newCoord.x] === "\\") {
                newBeams.push({ coord: newCoord, direction: "W" });
            } else if (grid[newCoord.y][newCoord.x] === ".") {
                newBeams.push({ coord: newCoord, direction: "N" });
            }
            break;
        case "S":
            newCoord = getSouth(beam.coord);
            if (
                newCoord.y < 0 ||
                newCoord.y >= grid.length ||
                newCoord.x < 0 ||
                newCoord.x >= grid[0].length
            ) {
                return newBeams;
            }
            if(grid[newCoord.y][newCoord.x] === "|") {
                newBeams.push({ coord: newCoord, direction: "S" });
            } else if (grid[newCoord.y][newCoord.x] === "-") {
                newBeams.push({ coord: newCoord, direction: "E" });
                newBeams.push({ coord: newCoord, direction: "W" });
            } else if (grid[newCoord.y][newCoord.x] === "/") {
                newBeams.push({ coord: newCoord, direction: "W" });
            } else if (grid[newCoord.y][newCoord.x] === "\\") {
                newBeams.push({ coord: newCoord, direction: "E" });
            } else if (grid[newCoord.y][newCoord.x] === ".") {
                newBeams.push({ coord: newCoord, direction: "S" });
            }
            break;
        case "E":
            newCoord = getEast(beam.coord);
            if (
                newCoord.y < 0 ||
                newCoord.y >= grid.length ||
                newCoord.x < 0 ||
                newCoord.x >= grid[0].length
            ) {
                return newBeams;
            }
            if(grid[newCoord.y][newCoord.x] === "|") {
                newBeams.push({ coord: newCoord, direction: "N" });
                newBeams.push({ coord: newCoord, direction: "S" });
            } else if (grid[newCoord.y][newCoord.x] === "-") {
                newBeams.push({ coord: newCoord, direction: "E" });
            } else if (grid[newCoord.y][newCoord.x] === "/") {
                newBeams.push({ coord: newCoord, direction: "N" });
            } else if (grid[newCoord.y][newCoord.x] === "\\") {
                newBeams.push({ coord: newCoord, direction: "S" });
            } else if (grid[newCoord.y][newCoord.x] === ".") {
                newBeams.push({ coord: newCoord, direction: "E" });
            }
            break;
        case "W":
            newCoord = getWest(beam.coord);
            if (
                newCoord.y < 0 ||
                newCoord.y >= grid.length ||
                newCoord.x < 0 ||
                newCoord.x >= grid[0].length
            ) {
                return newBeams;
            }
            if(grid[newCoord.y][newCoord.x] === "|") {
                newBeams.push({ coord: newCoord, direction: "N" });
                newBeams.push({ coord: newCoord, direction: "S" });
            } else if (grid[newCoord.y][newCoord.x] === "-") {
                newBeams.push({ coord: newCoord, direction: "W" });
            } else if (grid[newCoord.y][newCoord.x] === "/") {
                newBeams.push({ coord: newCoord, direction: "S" });
            } else if (grid[newCoord.y][newCoord.x] === "\\") {
                newBeams.push({ coord: newCoord, direction: "N" });
            } else if (grid[newCoord.y][newCoord.x] === ".") {
                newBeams.push({ coord: newCoord, direction: "W" });
            }
            break;
        default:
            throw new Error("Invalid direction");
        }
    return newBeams;
}

const countEnergizedTiles = (beam: Beam, grid: string[][]) => {
    let beams: Beam[] = [beam];
    let visited: Set<string> = new Set<string>();

    // continuously update beams until no more beams. Track visited coordinates
    let currentBeamIndex = 0;
    while (currentBeamIndex < beams.length) {
        let nextBeam = beams[currentBeamIndex++];
        if (!nextBeam) continue;
        let coordString = `${nextBeam.coord.x},${nextBeam.coord.y},${nextBeam.direction}`;
        if (visited.has(coordString)) {
            continue;
        }
        visited.add(coordString);
        let newBeams = updateBeam(nextBeam, grid);
        beams = beams.concat(newBeams);
    }

    let coordSet = new Set<string>();
    visited.forEach(coordString => {
        coordSet.add(`${coordString.split(",")[0]},${coordString.split(",")[1]}`);
    });
    return coordSet.size;
}

/************************************************/
const input = day16.main;
const grid = input.split("\n").map(line => {
    console.log(line);
    return line.split("");
});

let max = 0;
// Check top row
for(let x = 0; x < grid[0].length; x++) {
    let beam = { coord: { x, y: 1 }, direction: "S" };
    let energizedTileCount = countEnergizedTiles(beam, grid);
    if(energizedTileCount > max) {
        max = energizedTileCount;
    }
}

// Check bottom row
for(let x = 0; x < grid[0].length; x++) {
    let beam = { coord: { x, y: grid.length }, direction: "N" };
    let energizedTileCount = countEnergizedTiles(beam, grid);
    if(energizedTileCount > max) {
        max = energizedTileCount;
    }
}

// Check left column
for(let y = 0; y < grid.length; y++) {
    let beam = { coord: { x: -1, y }, direction: "E" };
    let energizedTileCount = countEnergizedTiles(beam, grid);
    if(energizedTileCount > max) {
        max = energizedTileCount;
    }
}

// check right column
for(let y = 0; y < grid.length; y++) {
    let beam = { coord: { x: grid[0].length, y }, direction: "W" };
    let energizedTileCount = countEnergizedTiles(beam, grid);
    if(energizedTileCount > max) {
        max = energizedTileCount;
    }
}

console.log(max);