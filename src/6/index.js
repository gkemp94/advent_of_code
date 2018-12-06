import input from './input.txt';
import { generateArray } from '../helpers';
import _ from 'lodash';

export const processInput = function (input) {
    return input.split("\n").map((line) => {
        let split = line.split(",");
        return [parseInt(split[0]), parseInt(split[1])]
    });
}

export const partOne = function (input) {
    const coords = processInput(input);
    const { x, y } = determineBounds(coords);
    const firstGrid = generateArray(x, generateArray(y, 0));
    for (let i = 0; i < firstGrid.length; i++) {
        for (let j = 0; j < firstGrid[i].length; j++) {
            firstGrid[i][j] = findClosestPoint([i, j], coords);
        }
    }
    const secondGrid =  generateArray(x + 2, generateArray(y + 2, 0));
    for (let i = 0; i < secondGrid.length; i++) {
        for (let j = 0; j < secondGrid[i].length; j++) {
            secondGrid[i][j] = findClosestPoint([i, j], coords.map((coord) => [coord[0] + 1, coord[1] + 1]));
        }
    }

    const flatGridOne = _.countBy(_.flatten(firstGrid), Math.floor);
    const flatGridTwo = _.countBy(_.flatten(secondGrid), Math.floor);

    let areas = [];
    for (var i = 0; i < Object.keys(flatGridOne).length; i++) {
        let key = Object.keys(flatGridOne)[i];
        if (key != "." && flatGridOne[key] === flatGridTwo[key]) {
            areas.push(flatGridOne[key]);
        }
    }

    return Math.max(...areas);
}

const determineBounds = (coords) => {
    const x = Math.max(...coords.map((coord) => coord[0]));
    const y = Math.max(...coords.map((coord) => coord[1]));
    return { x, y }
}

const findClosestPoint = (cell, input) => {
    let minDistance = Infinity;
    let min = undefined;
    for (let i = 0; i < input.length; i++) {
        let distance = getDistance(cell, input[i]);
        if (distance === 0) {
            return i;
        } else if (distance < minDistance) {
            min = i;
            minDistance = distance;
        } else if (distance === minDistance) {
            min = "."
        }
    }
    return min;
}

const getDistance = (a, b) => {
    return Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])
}

export const partTwo = (input, maxDistance) => {
    const coords = processInput(input);
    const { x, y } = determineBounds(coords);
    let area = 0;
    const grid = generateArray(x, generateArray(y, 0));
    for (let i = 0; i < grid.length; i++) {

        for (let j = 0; j < grid[i].length; j++) {
            let distance = 0;
            for (let k = 0; k < coords.length; k++) {
                distance = distance + getDistance([i,j], coords[k]);
            }

            if (distance < maxDistance) {
                area++;
            }
        }
    }
    return area;
}

export default function () {
    return {
        partOne: partOne(input),
        partTwo: partTwo(input, 1000),
    }
}