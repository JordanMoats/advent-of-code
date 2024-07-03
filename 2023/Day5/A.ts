import { day5 } from "../input";

interface Plot {
    num: number,
    type: string
}

const nextPlotType = new Map<string, string>([
    ["seed", "soil"],
    ["soil", "fertilizer"],
    ["fertilizer", "water"],
    ["water", "light"],
    ["light", "temperature"],
    ["temperature", "humidity"],
    ["humidity", "location"]
]);

// Function to get the map for each level
const input = day5.main;

const getMapsAndSeeds = (input: string) => {
	const mapStrings = input.split("\n\n");

	const maps = new Map<string, number[][]>();
	let seedLine = mapStrings.shift();
    let seeds = seedLine?.split(":")[1].trim().split(" ").map(seedNumString => parseInt(seedNumString))!;

	mapStrings.forEach((mapString) => {
		const mapLines = mapString.split("\n");
		
        let mapName = mapLines.shift()!.split(" ")[0].split("-to-")[0];

        let mapNumsArray: number[][] = [];
		mapLines.forEach((numLine) => {
			let nums = numLine
				.split(" ")
				.map((numString) => parseInt(numString));
			mapNumsArray.push(nums);
		});

		maps.set(mapName, mapNumsArray);
	});

    let seedPlots: Plot[] = seeds.map((seedNum) => {
        let newPlot: Plot = {
            num: seedNum,
            type: "seed"
        };
        return newPlot;
    });

    return {
        plotMaps: maps,
        seedPlots: seedPlots
    }
};

const convertPlot = (plot: Plot, plotMap: Map<string, number[][]>) => {
    const numArrays = plotMap.get(plot.type)!;

    let newNum = plot.num;
    numArrays.forEach(numArray => {
        if(plot.num >= numArray[1] && plot.num < (numArray[1] + numArray[2])) {
            newNum = newNum - (numArray[1] - numArray[0])
        }
    });
    let newPlot = {
        num: newNum,
        type: nextPlotType.get(plot.type)!
    };
    return newPlot;
}

const run = (input: string) => {
    const {plotMaps, seedPlots} = getMapsAndSeeds(input);

    let plots: Plot[] = seedPlots;
    for(let i = 0; i < 7; i++) {
        plots = plots.map(plot => {
            let convertedPlot: Plot = convertPlot(plot, plotMaps);
            return convertedPlot;
        });
    }

    let lowestNum = plots.reduce((acc, plot) => {
        return acc < plot.num ? acc : plot.num;
    }, Number.MAX_SAFE_INTEGER);

    console.log(lowestNum);
};
run(input);
