import { day4 } from "../input";

function getCard(line: string) {
    let lineParts = line.split(":");

    let match = lineParts[0].match(/\d+/)!;
    let cardNum: number = parseInt(match[0]); // default to 0 to avoid bug fixing

    let arrays = lineParts[1].split("|").map((arrayString) => {
        return arrayString.trim().split(/\s+/).map(Number);
    });

    let points = arrays[0].filter((num) => {
        return arrays[1].includes(num);
    }).length;

    return { cardID: cardNum, points: points };
}

function run(){
    const input = day4.main;
    const lines = input.split("\n");

    // card id and number of matches on that card.
    const cardPointsMap = new Map<number, number>()
    lines.forEach((line) => {
        const {cardID, points } = getCard(line);
        cardPointsMap.set(cardID, points);
    });

    const cardCountMap = new Map<number, number>();
    for(let i = 1; i <= cardPointsMap.size; i++) {
        cardCountMap.set(i, 1);
    }

    cardPointsMap.forEach((points, cardNum) => {
        let numOfCards = cardCountMap.get(cardNum)!;
        while(points > 0) {
            let newCardWon = cardNum + points;
            let currentCount = cardCountMap.get(newCardWon)!;
            currentCount += numOfCards;
            cardCountMap.set(newCardWon, currentCount);
            points--;
        }
    })

    let sum = 0;
    cardCountMap.forEach((cardCount, cardNum) => {
        sum += cardCount;
    })

    console.log(sum);

}
run();