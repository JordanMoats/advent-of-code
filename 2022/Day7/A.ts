import { comma } from "postcss/lib/list";
import { day7 } from "../input";

const input = day7.sample;
const lines = input.split("\n");

class File {
    name: string;
    size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size; 
    }
}

class Directory {
    parent: Directory | null;
    name: string;
    files: File[];
    dirs: Directory[];

    constructor (parentDir: Directory | null, name: string) {
        this.parent = parentDir ?? null;
        this.name = name;
        this.files = [];
        this.dirs = [];
    }
}

let currentDirectory = "";
for (let i = 0; i < lines.length; i++) {
    let commandLine = lines[i];

    if(commandLine[0] === "$") {
        let commandParts = commandLine.split(" ");
        let commandType = commandParts[1];
        
    }
}