
import { day2 } from "../input";

const run = () => {
    const input = day2.main;
    const lines = input.split("\n");

    let sum = 0;
    for (const line of lines) {
        let minRed = 0;
        let minBlue = 0;
        let minGreen = 0;

        const linePieces = line.split(":");
        const gameNum = linePieces[0].split(" ")[1];

        const pulls = linePieces[1].split(";");
        for (const pull of pulls) {
            const coloredPulls = pull.split(",");
            for (let coloredPull of coloredPulls) {
                coloredPull = coloredPull.trim();
                const [pullCountString, pullColor] = coloredPull.split(" ");
                const pullCount = parseInt(pullCountString);

                switch (pullColor) {
                    case "red":
                        if (pullCount > minRed) {
                            minRed = pullCount;
                        }
                        break;
                    case "blue":
                        if (pullCount > minBlue) {
                            minBlue = pullCount;
                        }
                        break;
                    case "green":
                        if (pullCount > minGreen) {
                            minGreen = pullCount;
                        }
                        break;
                }
            }
        }
        const power = minBlue * minGreen * minRed;
        sum += power;
    }

    console.log(sum);
}
run();