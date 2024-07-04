import { day2 } from "../input";

const run = () => {
    const input = day2.main;
    const lines = input.split("\n");

    let sum = 0;
    for (const line of lines) {
        let validGame = true;
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
                        if (pullCount > 12) {
                            validGame = false;
                        }
                        break;
                    case "blue":
                        if (pullCount > 14) {
                            validGame = false;
                        }
                        break;
                    case "green":
                        if (pullCount > 13) {
                            validGame = false;
                        }
                        break;
                }
            }
        }

        if (validGame) {
            sum += parseInt(gameNum);
        }
    }

    console.log(sum);
}
run();