import input from './input.txt';

const reactPolymer = function (polymer) {
    let i = 0;
    while (i < polymer.length) {
        let a = polymer[i];
        let b = polymer[i + 1];
        if (a && b && a != b && a.toLowerCase() === b.toLowerCase()) {
            polymer.splice(i, 2);
            i = i - 2;
        }
        i++;
    }
    return polymer;
}

export const partOne = function (polymer) {
    return reactPolymer(polymer.split("")).length;
}

export const partTwo = function(polymer) {
    const units = "abcdefghijklmnopqrstuvwxyz".split("");
    let min = Infinity;
    polymer = polymer.split("");

    for (let i = 0; i < units.length; i++) {
        let filteredPolymer = polymer.filter((x) => {
            return x.toLowerCase() !== units[i];
        })

        let reactedPolymer = reactPolymer(filteredPolymer);
        if (reactedPolymer.length < min) {
            min = reactedPolymer.length;
        }
    }

    return min;
}

export default function () {
    return {
        partOne: partOne(input),
        partTwo: partTwo(input),
    }
}