interface Coordinate {
    x: number;
    y: number;
}

let sampleInput = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

// Build the grid and get the starting coordinate.
let startCoords: Coordinate = {
    x: 0,
    y: 0,
};
const grid: string[][] = sampleInput.split("\n").map((line, y) => {
    const lineParts = line.split("");
    lineParts.forEach((character, x) => {
        if(character === "S") {
            startCoords = { x: x, y: y};
        }
    });
    return line.split("");
});

const getNextCoords = (coord: Coordinate) => {
    // Check the 4 coords
    let coordsArray: Coordinate[] = [];
    if(coord.y > 0) {
        coordsArray.push({x: coord.x, y: coord.y - 1});
    }
    if(coord.y < grid.length - 1) {
        coordsArray.push({ x: coord.x, y: coord.y + 1 });
    }
    if(coord.x > 0) {
        coordsArray.push({ x: coord.x - 1, y: coord.y});
    }
    if(coord.x < grid[0].length - 1) {
        coordsArray.push({ x: coord.x + 1, y: coord.y });
    }

    let validCoordsArray = coordsArray.filter((coord) => {
        if(coord && grid[coord.y][coord.x] === ".") {
            return true;
        } else {
            return false;
        }
    });
    return validCoordsArray;
}

let steps = 0;
let currentCoords: Coordinate[] = [startCoords];

while(steps !== 64) {
    currentCoords = currentCoords.forEach((coord) => {
        let nextCoords = getNextCoords(coord);
        if(nextCoords.length > 0) {
            nextCoords.forEach((coord) => {
                
            })
        }
    })



    steps++;
}