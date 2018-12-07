import input from './input.txt';

const STATEMENT_REGEX = /Step\s(?<req>.+)\smust\sbe\sfinished\sbefore\sstep\s(?<step>.+)\scan\sbegin./

export const processInput = (input) => {
    let output = {};
    const statements = input.split("\n");
    for (let i = 0; i < statements.length; i++) {
        let { step, req } = STATEMENT_REGEX.exec(statements[i]).groups;
        if (!output[step]) {
            output[step] = [req];
        } else {
            output[step].push(req);
        } 
        
        if (!output[req]) {
            output[req] = [];
        }
    }
    return output;
}

export const partOne = (steps) => {
    let output = "";
    while (Object.keys(steps).length) {
        const nextStep = findNextSteps(steps)[0];        
        output = output + nextStep;
        delete steps[nextStep];
        for (let i = 0; i < Object.keys(steps).length; i++) {
            var index = steps[Object.keys(steps)[i]].indexOf(nextStep);
            if (index > -1) {
                steps[Object.keys(steps)[i]].splice(index, 1);
            }
        }
    }
    return output;
}

export const partTwo = (steps, availWorkers, baseTime) => {
    let tick = 0;
    let inProgress = [];
    let workers = {};
    for (let w = 0; w < availWorkers; w++) {
        workers[w] = [undefined, undefined]
    }

    while (Object.keys(steps).length) {
        // Free Up Workers Who Have Finished Tasks & Remove Finished Tasks from inProgress and steps master
        for (let worker in workers) {
            if(workers[worker][1] <= tick) {
                // Get Completed Step
                let completedStep = workers[worker][0]

                // Free Up Worker
                workers[worker][0] = undefined;
                workers[worker][1] = undefined;
                inProgress.slice(inProgress.indexOf(completedStep));
                delete steps[completedStep];
                for (let i = 0; i < Object.keys(steps).length; i++) {
                    var index = steps[Object.keys(steps)[i]].indexOf(completedStep);
                    if (index > -1) {
                        steps[Object.keys(steps)[i]].splice(index, 1);
                    }
                }
            }
        }
        // Assign New Steps to Empty Workers
        const nextSteps = findNextSteps(steps).filter((step) => inProgress.indexOf(step) === -1);

        // Remove inProgressSteps
        for (let worker in workers) {
           if(!workers[worker][0]) {
               let assignedStep = nextSteps[0];
               nextSteps.shift();
               if (assignedStep) {
                    //assignedStep.charCodeAt(0) - 65;
                    workers[worker][0] = assignedStep;
                    workers[worker][1] = tick + assignedStep.charCodeAt(0) - 64 + baseTime;
                    inProgress.push(assignedStep);
               }
           } 
        }
       tick++;
    }

    return tick-1;
}

const findNextSteps = (steps) => {
    return Object.keys(steps).filter((step) => !steps[step].length).sort();
}

export default function () {
    return {
        //partOne: partOne(processInput(input)),
        partTwo: partTwo(processInput(input), 5, 60),
    }
}