import input from './input.txt';

export const partOne = function (polymer) {
    polymer = polymer.split("");
    let changes = 0;
    let breakIf = 0;
    //while(changes === 0) {
        changes = 0;
        let i = 0;
        while (i < polymer.length) {
            let a = polymer[i];
            let b = polymer[i + 1];
            if (a && b && a != b && a.toLowerCase() === b.toLowerCase()) {
                polymer.splice(i, 2);
                i = i - 2;
                changes++;
            }
            breakIf++;
            i++;
        }
    //}
    return polymer.join();
}

export const partTwo = function(polymer) {
    polymer = polymer.split("");
    let changes = 0;
    while(changes === 0) {
        changes = 0;
        for (let i = 0; i < polymer.length; i++) {
            let a = polymer[i];
            let b = polymer[i + 1];
            if (a != b && a.toLowerCase() === b.toLowerCase()) {
                polymer.splice(i, 2);
                i = i - 2;
                changes++;
            }
        }
    }
    return polymer;   
}

export default function () {
    return {
        //partOne: partOne(processedEvents),
        //partTwo: partTwo(processedEvents),
    }
}