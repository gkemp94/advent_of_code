import { partOne, partTwo } from './index';
import input from './input.txt';
import testInput from './input.test.txt';

describe('Part One', () => {
    test('Result from Test Input should be 17', () => {
        expect(partOne(testInput)).toBe(17);
    });

    test('Result from Challenge Input Should Be 3840', () => {
        expect(partOne(input)).toBe(3840);
    });
});

describe('Part Two', () => {
    test('Result from Test Input should be 16', () => {
        expect(partTwo(testInput, 32)).toBe(16);
    });

    test('Result from Challenge Input Should Be 46542', () => {
        expect(partTwo(input, 10000)).toBe(46542);
    });
});
