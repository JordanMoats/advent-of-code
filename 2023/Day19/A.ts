import { day19 } from "../input";

interface Part {
    x: number,
    m: number,
    a: number,
    s: number
}

interface Condition {
    letter: string,
    comparison: string,
    num: number,
    destination: string
}

interface Workflow {
    name: string,
    conditions: Condition[],
    default: string
}

const getWorkflows = (str: string) => {
    const workflows: Map<string, Workflow> = new Map<string, Workflow>();

    const lines = str.split("\n");
    lines.forEach(line => {
        let workflowDefault: string = "";
        const [workflowName, str] = line.split("{");

        let conditionStrings = str.substring(0, str.length - 1).split(",");
        const conditions: Condition[] = [];
        conditionStrings.forEach((conditionString, index) => {
            if(index === conditionStrings.length - 1) {
                workflowDefault = conditionString;
            } else {
                let [string1, destinationString] = conditionString.split(":");
                let conditionLetter = string1[0];
                let comparsionString = string1[1];
                let conditionNum = parseInt(string1.substring(2));
                let condition: Condition = {
                    letter: conditionLetter,
                    comparison: comparsionString,
                    num: conditionNum,
                    destination: destinationString
                }
                conditions.push(condition);
            }
        });
        const workflow: Workflow = {
            name: workflowName,
            conditions: conditions,
            default: workflowDefault
        }
        workflows.set(workflow.name, workflow);
    });
    return workflows;
}

const getDestination = (part: Part, workflow: Workflow): string => {
    for( let i = 0; i < workflow.conditions.length; i++) {
        let condition = workflow.conditions[i];
        let partNumToCheck = 0;
        switch (condition.letter) {
            case "x":
                partNumToCheck = part.x;
                break;
            case "m":
                partNumToCheck = part.m;
                break;
            case "a":
                partNumToCheck = part.a;
                break;
            case "s":
                partNumToCheck = part.s;
                break;
        }
        if(condition.comparison === "<") {
            if(partNumToCheck < condition.num) {
                return condition.destination;
            }
        } else {
            if(partNumToCheck > condition.num) {
                return condition.destination;
            }
        }
    }
    return workflow.default;
}

/**************************/

const input = day19.main;

const [str1, str2] = input.split("\n\n");

const workflows = getWorkflows(str1);

const parts = str2.split("\n").map((line => {
    let ratings = line.substring(1, line.length - 1).split(",");
    let x: number = 0, m: number = 0, a: number = 0, s: number = 0;
    ratings.forEach(rating => {
        const num = parseInt(rating.split("=")[1])
        switch (rating[0]) {
            case "x": 
                x = num;
                break;
            case "m":
                m = num;
                break;
            case "a":
                a = num;
                break;
            case "s":
                s = num;
                break;
            default:
                throw new Error("How'd you even get here?");
        }
    });
    const newPart = {
        x: x,
        m: m,
        a: a,
        s: s
    };
    console.log(`${JSON.stringify(newPart)} \n\n`)
    return newPart;
}));

const acceptedParts: Part[] = [];
parts.forEach(part => {
    let destination = "in";
    let pathString = `${JSON.stringify(part)}`;
    while(destination !== "R" && destination !== "A") {
        pathString += ` -> ${destination}`;
        destination = getDestination(part, workflows.get(destination)!);
    }
    pathString += ` -> ${destination}`
    if(destination === "A") {
        acceptedParts.push(part);
    }
    console.log(pathString);
});

const sum = acceptedParts.reduce((acc, part) => {
    return acc + part.x + part.m + part.a + part.s;
}, 0);

console.log(sum)