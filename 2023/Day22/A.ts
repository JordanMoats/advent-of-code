import { day22 } from "../input";

interface Brick {
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number
}

interface Coordinate {
    x: number,
    y: number,
    z: number
}

function getCoordinatesInsideBrick(brick: Brick): Coordinate[] {
    let coordinates: Coordinate[] = [];

    // Determine the range of x, y, and z
    const minX = Math.min(brick.x1, brick.x2);
    const maxX = Math.max(brick.x1, brick.x2);
    const minY = Math.min(brick.y1, brick.y2);
    const maxY = Math.max(brick.y1, brick.y2);
    const minZ = Math.min(brick.z1, brick.z2);
    const maxZ = Math.max(brick.z1, brick.z2);

    // Iterate over the range of x, y, and z
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                coordinates.push({ x, y, z });
            }
        }
    }

    return coordinates;
}

const calcLowestZ = (brick: Brick) => {
    const coordsFilled = getCoordinatesInsideBrick(brick);

    let lowestZ: number = coordsFilled.reduce((acc, coordinate) => {
        if(coordinate.z < acc) {
            return coordinate.z;
        } else {
            return acc;
        }
    }, Number.MAX_SAFE_INTEGER);

    return lowestZ;
}


/*******************************/
const lines = day22.main.split("\n");
const bricks = lines.map(line => {
    const [str1, str2] = line.split("~");
    const [x1, y1, z1] = str1.split(",").map(str => parseInt(str));
    const [x2, y2, z2] = str2.split(",").map(str => parseInt(str));

    return {
        x1: x1,
        y1: y1,
        z1: z1,
        x2: x2,
        y2: y2,
        z2: z2
    } as Brick;
});

bricks.forEach((brick) => {
    console.log(
        `${brick.x1},${brick.y1},${brick.y1}~${brick.x2},${brick.y2},${brick.z2}`
    );
});

// Sort the bricks so that the lowest bricks are at the front of the list.
bricks.sort((a, b) => {
    return calcLowestZ(a) - calcLowestZ(b);
});
console.log("\n\n")
bricks.forEach(brick => {
    console.log(`${brick.x1},${brick.y1},${brick.y1}~${brick.x2},${brick.y2},${brick.z2}`);
});