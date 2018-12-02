import input from './input.txt';

const getLetterCounts = function (str) {
    let counts = {};
    let letters = str.split("");

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (counts[letter]) {
            counts[letter]++;
        } else {
            counts[letter] = 1;
        }
    }

    return Object.keys(counts).map((letter) => {
        return counts[letter];
    });
}

const areSimilar = function(a, b) {
    let differences = 0;
    let result = "";

    for (let i = 0; (i < a.length && differences < 2); i++) {
        if (a[i] !== b[i]) {
            differences++;
        } else {
            result = result + a[i];
        }
    }

    return differences < 2 ? result : false
}

const partOne = function(ids) {
    // == Part 1 == //
    let twoIdentical = 0;
    let threeIdentical = 0;

    for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        let letterCounts = getLetterCounts(id);
        if (letterCounts.indexOf(2) >= 0) {
            twoIdentical = twoIdentical + 1;
        } 
        
        if (letterCounts.indexOf(3) >= 0) {
            threeIdentical = threeIdentical + 1;
        }
    }
    return threeIdentical * twoIdentical;
}

const partTwo = function (ids) {
    for (let j = 0; j < ids.length; j++) {
        for (let k = j + 1; k < ids.length; k++) {
            if (areSimilar(ids[j], ids[k])) {
                return areSimilar(ids[j], ids[k]);
            }
        }
    }
}

export default function () {
    const ids = input.split("\n");

    return {
        partOne: partOne(ids),
        partTwo: partTwo(ids),
    }
}