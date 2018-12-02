import input from './input.txt';

const partOne = function () {
        // == Part 1 == //
        return input.split("\n").reduce((curr, x) => {
            return curr + parseInt(x.replace(/\+/g,""))
        }, 0);
}

const partTwo = function () {
    let frequncies = input.split("\n").map((x) => {
        return parseInt(x.replace(/\+/g,""))
    });
    let currFreq = 0;
    let seenFreq = [0];
    let firstRepeastedFrequency;
    while(!firstRepeastedFrequency) {
        firstRepeastedFrequency = frequncies.find((freq) => {
            currFreq = currFreq + freq;
            if (seenFreq.indexOf(currFreq) >= 0) {
                return true
            } else {
                seenFreq.push(currFreq);
                return false;
            }
        });
    }

    return currFreq;
}

export default function () {
    return {
        partOne: partOne(),
        partTwo: partTwo(),
    }
}