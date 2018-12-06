export const generateArray = function (length, val) {
    return Array.from({ length: length }, () => {
        return typeof(val) === "object" ? 
            val.slice() :
            val; 
    });
}

export const sumArray = function(array) {
    return array.reduce((curr,nxt) => {
        return curr + nxt;
    }, 0);
}export const generateArray = function (length, val) {
    return Array.from({ length: length }, () => val);
}

export const sumArray = function(array) {
    return array.reduce((curr,nxt) => {
        return curr + nxt;
    }, 0);
}