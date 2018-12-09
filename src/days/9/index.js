import { isUndefined } from 'lodash';

const STATEMENT_REGEX = /(?<players>[0-9]+)\splayers;\slast\smarble\sis\sworth\s(?<lastPoints>[0-9]+)\spoints/


const processInput = (input) => {
    const { players, lastPoints} = STATEMENT_REGEX.exec(input).groups;
    return {
        players: parseInt(players),
        lastPoints: parseInt(lastPoints),
    }
}

export const partOne = (input) => {
    const { players, lastPoints } = processInput(input);
    return getHighestScore(players, lastPoints);
}

export const partTwo = (input) => {
    const { players, lastPoints } = processInput(input);
    return getHighestScore(players, lastPoints*100);
}

export const getHighestScore = (players, lastPoints) => {
    const rootMarble = new Marble(0);
    let scores = {};
    rootMarble.placeMarble(rootMarble, rootMarble);
    let currentMarble = rootMarble;
    for (var i = 0; i < lastPoints + 1; i++) {
        let marbleValue = i + 1;
        if (marbleValue % 23) {
            let newMarble = new Marble(marbleValue);
            newMarble.placeMarble(currentMarble.getNthCWMarble(1),currentMarble.getNthCWMarble(2));
            currentMarble = newMarble;
        } else {
            let score = marbleValue;
            let toBeRemovedMarble = currentMarble.getNthACWMarble(7);
            currentMarble = toBeRemovedMarble.cw;
            score = score + toBeRemovedMarble.value;
            toBeRemovedMarble.removeMarble();
            scores[i % players] = isUndefined(scores[i % players]) ? score : scores[i % players] + score;
        }
    }
    return Math.max(...Object.keys(scores).map(x => scores[x]));
}

class Marble {
    constructor(value) {
        this.value = value;
    }

    getNthACWMarble(n) {
        return n ? this.acw.getNthACWMarble(n-1) : this;
    }

    getNthCWMarble(n) {
        return n ? this.cw.getNthCWMarble(n-1) : this;
    }

    placeMarble(acw, cw) {
        this.cw = cw;
        this.acw = acw;
        cw.acw = this;
        acw.cw = this;
    }

    removeMarble() {
        if (this.acw) {
            this.acw.cw = this.cw;
            this.cw.acw = this.acw;
        } else {
            console.error("This Marble Cannot Be Removed, it hasn't been placed yet");
        }
    }
}
