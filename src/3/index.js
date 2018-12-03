import input from './input.txt';

const CLAIM_REGEX = /(?<id>#[0-9]+)\s@\s(?<x1>[0-9]+),(?<y1>[0-9]+):\s(?<w>[0-9]+)x(?<h>[0-9]+)/

const processClaims = function(claims) {
    return claims.map((claim) => {
        const {x1, y1, h, w, id} =  CLAIM_REGEX.exec(claim).groups;
        return {
            x1: parseInt(x1),
            x2: parseInt(x1) + parseInt(w),
            y1: parseInt(y1),
            y2: parseInt(y1) + parseInt(h),
            id,
        }
    });
}

const createFabric = function (height, width) {
    let fabric = [];
    for (let i = 0; i < height; i++) {
        let thread = [];
        for (let j = 0; j < width; j++) {
            thread.push(0);
        }
        fabric.push(thread);
    }
    return fabric;
}

const cutFabric = function (claims, fabric) {
    for (let i = 0; i < claims.length; i++) {
        let { x1, x2, y1, y2 } = claims[i];
        for (let y = y1; y < y2; y++) {
            for (let x = x1; x < x2; x++) {
                fabric[x][y]++;
            }
        }
    }
    return fabric;
}

const partOne = function(fabric) {
    let overlaps = 0;
    fabric.forEach((thread) => {
        overlaps = overlaps + thread.filter((x) => x > 1).length
    })
    return overlaps;
}

const isOverlapped = function({ x1, x2, y1, y2 }, fabric) {
    for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
            if(fabric[x][y] > 1) {
                return false;
            }
        }
    }
    return true;
}

const partTwo = function(claims, fabric) {
    for (let i = 0; i < claims.length; i++) {
        if(isOverlapped(claims[i], fabric)) {
            return claims[i].id;
        }
    }
    return undefined
}

export default function () {
    const height = 1500;
    const width = 1500;
    const claims = input.split("\n");
    const processedClaims = processClaims(claims);
    const fabric = cutFabric(processedClaims, createFabric(width, height));
    return {
        partOne: partOne(fabric),
        partTwo: partTwo(processedClaims, fabric),
    }
}