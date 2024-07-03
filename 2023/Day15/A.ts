

export const getHashValue = (str: string) => {
    let num = 0;
    for(let i = 0; i < str.length; i++) {
        let asciiValue = str.charCodeAt(i);
        num += asciiValue;

        num *= 17;
        num = num % 256
    }
    return num;
}

const getInput = () => {
    const inputFile = Bun.file(
        "llm-playground/src/lib/adventOfCode/Day15/input.txt"
    );
    return inputFile.text();
}

const run = async (): Promise<number> => {
    const input: string = await getInput();
    let strings = input.split(",");
    let sum: number = strings.reduce((accumulator, str) => {
        return accumulator + getHashValue(str);
    }, 0);
    return sum;
}

(async () =>{
    console.log(await run());
})();