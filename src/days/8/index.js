import { sumArray } from '../../helpers';

export const processInput = (input) => {
    return input.split(" ").map((x) => parseInt(x));
}

export const partOne = (input) => {
    let rootNode = generateNodes(input, 1).children[0];
    return countMeta(rootNode);
}

const generateNodes = (input, nodes) => {
    let outputNodes = [];
    for (let i = 0; i < nodes; i++) {
        const nodeCount = input[0];
        const metaCount = input[1];
        input.splice(0,2);
        const output = generateNodes(input, nodeCount);
        const children = output.children;
        input = output.input;
        const meta = input.splice(0,metaCount);
        outputNodes.push({
            nodeCount,
            metaCount,
            children,
            meta,
        })
    }
    return {
        input,
        children: outputNodes,
    }
}

const countMeta = (node) => {
    let count = sumArray(node.meta);
    for (let i = 0; i < node.children.length; i++) {
        count = count + countMeta(node.children[i])
    }
    return count;
}

export const partTwo = (input) => {
    let rootNode = generateNodes(input, 1).children[0];
    return countCheck(rootNode);
}

const countCheck = (node) => {
    let sum = 0;
    if (node.children.length) {
        for (let i = 0; i < node.meta.length; i++) {
            if (node.children[node.meta[i] - 1]) {
                sum = sum + countCheck(node.children[node.meta[i] - 1]);
            }
        }
    } else {
        sum = sumArray(node.meta);
    }

    return sum;
}