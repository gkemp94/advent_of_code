import input from './input.txt';
import moment from 'moment';

const EVENT_REGEX = /\[(?<time>.+)\]\s(?<desc>.+)/
const GUARD_REGEX = /Guard #(?<id>[0-9]+) begins shift/

const processEvents = function (events) {
    return events.map((event) => {
        const { time, desc } = EVENT_REGEX.exec(event).groups;
        return {
            time: moment(time),
            desc,
        }
    }).sort((a, b) => {
        return b.time.isBefore(a.time) ? 1 : -1;
    });
}

const partOne = function (processedEvents) {
    let guardSleep = {};
    let currentGuard;
    let fellAsleepAt = false;

    // find sleepiest guard
    for (let i = 0; i < processedEvents.length; i++) {
        let { desc, time } = processedEvents[i];
        if (desc === "falls asleep") {
            fellAsleepAt = time;
        } else if (desc === "wakes up") {
            let timeAsleep = time.diff(fellAsleepAt, 'minutes');
            guardSleep[currentGuard] = guardSleep[currentGuard] ? 
                guardSleep[currentGuard] + timeAsleep : 
                timeAsleep; 
        } else {
            currentGuard =  GUARD_REGEX.exec(desc).groups.id;
        }
    }

    const sleepiestGuard = Object.keys(guardSleep).sort((a, b) => {
        return guardSleep[b] - guardSleep[a]
    })[0];

    // find out when that guard slept
    let mins = generateArray(60, 0);

    for (let i = 0; i < processedEvents.length; i++) {
        let { desc, time } = processedEvents[i];
        if (desc === "falls asleep" && currentGuard == sleepiestGuard) {
            fellAsleepAt = time;
        } else if (desc === "wakes up" && currentGuard == sleepiestGuard) {
            for ( let min = fellAsleepAt.get("minutes"); min < time.get("minutes"); min++) {
                mins[min]++;
            }
        } else {
            currentGuard =  GUARD_REGEX.exec(desc) && GUARD_REGEX.exec(desc).groups.id;
        }
    }

    return parseInt(sleepiestGuard) * mins.indexOf(Math.max(...mins));
}

const partTwo = function(processedEvents) {
    let guardSleep = {};
    let currentGuard;
    let fellAsleepAt = false;

    for (let i = 0; i < processedEvents.length; i++) {
        let { desc, time } = processedEvents[i];
        if (desc === "falls asleep") {
            fellAsleepAt = time;
        } else if (desc === "wakes up") {
            guardSleep[currentGuard] = guardSleep[currentGuard] ||generateArray(60, 0);
            for ( let min = fellAsleepAt.get("minutes"); min < time.get("minutes"); min++) {
                guardSleep[currentGuard][min]++;
            }
        } else {
            currentGuard = GUARD_REGEX.exec(desc).groups.id;
        }
    }

    let max = 0;
    let maxGuard
    for (const id in guardSleep) {
        if (Math.max(...guardSleep[id]) > max) {
            maxGuard = id;
            max = Math.max(...guardSleep[id]);
        }
    }

    return parseInt(maxGuard)*guardSleep[maxGuard].indexOf(max);   
}

const generateArray = function (length, val) {
    return Array.from({ length: length }, () => val);;
}

export default function () {
    const events = input.split("\n");
    const processedEvents = processEvents(events);

    return {
        partOne: partOne(processedEvents),
        partTwo: partTwo(processedEvents),
    }
}