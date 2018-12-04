import input from './input.txt';
import moment from 'moment';
import { generateArray, sumArray } from '../helpers';

const EVENT_REGEX = /\[(?<time>.+)\]\s(?<desc>.+)/
const GUARD_REGEX = /Guard #(?<id>[0-9]+) begins shift/

const generateSchedule = function (processedEvents) {
    let schedule = {};
    let currentGuard;
    let fellAsleepAt;

    for (let i = 0; i < processedEvents.length; i++) {
        let { desc, time } = processedEvents[i];
        if (desc === "falls asleep") {
            fellAsleepAt = time;
        } else if (desc === "wakes up") {
            schedule[currentGuard] = schedule[currentGuard] || generateArray(60, 0);
            for ( let min = fellAsleepAt.get("minutes"); min < time.get("minutes"); min++) {
                schedule[currentGuard][min]++;
            }
        } else {
            currentGuard = GUARD_REGEX.exec(desc).groups.id;
        }
    }

    return schedule;
}

export const processInputs = function (input) {
    return input.split("\n").map((event) => {
        const { time, desc } = EVENT_REGEX.exec(event).groups;
        return {
            time: moment(time),
            desc,
        }
    }).sort((a, b) => {
        return b.time.isBefore(a.time) ? 1 : -1;
    });
}

export const partOne = function (events) {
    const schedule = generateSchedule(events);
    const guards = Object.keys(schedule);

    const sleepiestGuard = guards.sort((a, b) => {
        return sumArray(schedule[b]) - sumArray(schedule[a])
    })[0];

    const mins = schedule[sleepiestGuard];
    
    return parseInt(sleepiestGuard) * mins.indexOf(Math.max(...mins));
}

export const partTwo = function(events) {
    let schedule = generateSchedule(events);

    let max = 0;
    let maxGuard
    for (const guard in schedule) {
        if (Math.max(...schedule[guard]) > max) {
            maxGuard = guard;
            max = Math.max(...schedule[guard]);
        }
    }

    return parseInt(maxGuard)*schedule[maxGuard].indexOf(max);   
}

export default function () {
    const processedEvents = processInputs(input);
    return {
        partOne: partOne(processedEvents),
        partTwo: partTwo(processedEvents),
    }
}