import { day7 } from "../input";

interface Hand {
    cards: string,
    handType: HandType,
    bid: number
}

enum HandType {
    FiveOfAKind = 6,
    FourOfAKind = 5,
    FullHouse = 4,
    ThreeOfAKind = 3,
    TwoPair = 2,
    OnePair = 1,
    HighCard = 0
}

function getHand(cards: string) {
    let cardArray = cards.split("");
    let cardCountMap = new Map<string, number>();

    cardArray.forEach(card => {
        let currentCardCount = cardCountMap.get(card) ?? 0;

        cardCountMap.set(card, currentCardCount + 1);
    })

    let cardCountArray: number[] = [];
    
    cardCountMap.forEach((cardCount, card) => {
        cardCountArray.push(cardCount);
    });

    console.log(cardCountArray);

    if(cardCountArray.includes(5)) {
        return HandType.FiveOfAKind;
    }
    if(cardCountArray.includes(4)) {
        return HandType.FourOfAKind;
    }
    if(cardCountArray.includes(3) && cardCountArray.includes(2)) {
        return HandType.FullHouse;
    }
    if(cardCountArray.includes(3)) {
        return HandType.ThreeOfAKind;
    }

    let pairCount = 0;
    cardCountArray.forEach(cardCount => {
        if(cardCount === 2) {
            pairCount++;
        }
    });
    if(pairCount === 2) {
        return HandType.TwoPair
    }

    if (pairCount === 1) {
        return HandType.OnePair;
    }

    return HandType.HighCard;
}

function compareHands(hand1: Hand, hand2: Hand) {
    if(hand1.handType !== hand2.handType) {
        return hand1.handType > hand2.handType ? hand1 : hand2;
    } else {
        // Define card values
        const cardValues: Map<string, number> = new Map<string, number>([
            ["A", 14],
            ["K", 13],
            ["Q", 12],
            ["J", 11],
            ["T", 10],
            ["9", 9],
            ["8", 8],
            ["7", 7],
            ["6", 6],
            ["5", 5],
            ["4", 4],
            ["3", 3],
            ["2", 2],
        ]);

        // Compare the hands
        for (let i = 0; i < hand1.cards.length; i++) {
            const card1Value = cardValues.get(hand1.cards[i])!;
            const card2Value = cardValues.get(hand2.cards[i])!;

            if (card1Value !== card2Value) {
                if(card1Value > card2Value) {
                    return hand1;
                } else {
                    return hand2;
                }
            }
        }
    }
    return null;
}

function getHandBidMap(input: string) {
    const lines = input.split("\n");

    const hands: Hand[] = [];

    lines.forEach(line => {
        const [handString, bidString] = line.split(" ");

        hands.push({
            cards: handString,
            handType: getHand(handString),
            bid: parseInt(bidString)
        });
    });

    return hands;
}

/************************************************/

const input = day7.main;

let hands = getHandBidMap(input);

hands = hands.sort((a: Hand, b: Hand) => {
    const winningHand = compareHands(a, b);
    if (a.cards === winningHand?.cards) {
        return 1;
    } else if (b.cards === winningHand?.cards){
        return -1;
    } else {
        return 0;
    }
});

let sum = 0;
hands.forEach((hand, index) => {
    let cardRank = index + 1;
    let bid = hand.bid;
    let product = cardRank * bid;

    console.log(`hand: ${hand.cards}, Sum = ${sum}, adding ${product}, cardRank: ${cardRank}, bid: ${bid}`)
    sum += product;
})

console.log(sum);