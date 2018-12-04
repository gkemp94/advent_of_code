export const generateArray = function (length, val) {
    return Array.from({ length: length }, () => val);
}

export const sumArray = function(array) {
    return array.reduce((curr,nxt) => {
        return curr + nxt;
    }, 0);
}