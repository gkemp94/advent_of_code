export const partOne = function (input) {
        return input.split("\n").reduce((curr, x) => {
            return curr + parseInt(x.replace(/\+/g,""))
        }, 0);
}

export const partTwo = function (input) {
    let freqs = input.split("\n").map((x) => {
        return parseInt(x.replace(/\+/g,""))
    });
    let currFreq = 0;
    let seenFreqs = [0];
    while (true) {
        for (let i = 0; i < freqs.length; i++) {
            currFreq = currFreq + freqs[i];
            if (seenFreqs.indexOf(currFreq) > -1) {
                return currFreq;
            } else {
                seenFreqs.push(currFreq);
            }
        }
        
    }
}