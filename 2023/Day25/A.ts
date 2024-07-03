import { day25 } from "../input";

const getEdges = (input: string) => {
    let edgeSet = new Set<string>();

    const lines = input.split("\n");
    lines.forEach((line) => {
        let lineParts = line.split(":");
        let nodeName = lineParts[0];
        let connectedNodes = lineParts[1].trim().split(" ");
        connectedNodes.forEach((node) => {
            let edgeString =
                nodeName < node ? `${nodeName}-${node}` : `${node}-${nodeName}`;
            edgeSet.add(edgeString);
        });
    });

    return edgeSet;
};

const createNodeMap = (edges: Set<string>) => {
    const nodeMap = new Map<string, Set<string>>();
    edges.forEach((edge) => {
        let node1 = edge.split("-")[0];
        let node2 = edge.split("-")[1];
        if (!nodeMap.has(node1)) {
            nodeMap.set(node1, new Set<string>());
        }
        if (!nodeMap.has(node2)) {
            nodeMap.set(node2, new Set<string>());
        }
        nodeMap.get(node1)!.add(node2);
        nodeMap.get(node2)!.add(node1);
    });
    return nodeMap;
};

const getConnectedNodes = (node: string, nodeMap: Map<string, Set<string>>) => {
    let visited = new Set<string>();
    let stack = [node];

    while (stack.length > 0) {
        let currentNode = stack.pop()!;
        visited.add(currentNode);
        nodeMap.get(currentNode)!.forEach((neighbor) => {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        });
    }
    return visited;
};

// function to get all unique combination of 3 edges
const getCombinations = (edges: Set<string>) => {
    let combinations = new Set<string>();
    edges.forEach((edge1) => {
        edges.forEach((edge2) => {
            edges.forEach((edge3) => {
                let combination = [edge1, edge2, edge3].sort().join(":");
                combinations.add(combination);
            });
        });
    });
    return combinations;
};

// function to check if removing the 3 edges from the graph will result in a graph with 2 connected components
const checkCombinations = (
    combinations: Set<string>,
    nodeMap: Map<string, Set<string>>
) => {
    let validCombinations = new Set<string>();
    combinations.forEach((combination) => {
        let edges = combination.split(":");
        let node1 = edges[0].split("-")[0];
        let node2 = edges[0].split("-")[1];
        let node3 = edges[1].split("-")[0];
        let node4 = edges[1].split("-")[1];
        let node5 = edges[2].split("-")[0];
        let node6 = edges[2].split("-")[1];

        // remove edges from nodeMap
        nodeMap.get(node1)!.delete(node2);
        nodeMap.get(node2)!.delete(node1);
        nodeMap.get(node3)!.delete(node4);
        nodeMap.get(node4)!.delete(node3);
        nodeMap.get(node5)!.delete(node6);
        nodeMap.get(node6)!.delete(node5);

        let connectedNodes = getConnectedNodes(node1, nodeMap).size;
        let connectedNodes2 = getConnectedNodes(node2, nodeMap).size;

        // add edges back to nodeMap
        nodeMap.get(node1)!.add(node2);
        nodeMap.get(node2)!.add(node1);
        nodeMap.get(node3)!.add(node4);
        nodeMap.get(node4)!.add(node3);
        nodeMap.get(node5)!.add(node6);
        nodeMap.get(node6)!.add(node5);

        if (connectedNodes + connectedNodes2 === nodeMap.size) {
            validCombinations.add(combination);
        }
    });
    return validCombinations;
};

/******************************/

const edges = getEdges(day25.sample);

const nodeMap = createNodeMap(edges);
console.log(nodeMap.size);

const edgeCombinations = getCombinations(edges);

const validCombinations = checkCombinations(edgeCombinations, nodeMap);
console.log(validCombinations.size);
console.log(validCombinations);
